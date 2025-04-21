const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {paymentSuccess} = require("../Mail/Templates/paymentSuccess");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");


exports.capturePayment = async (req, res) => {
    //get courseId and UserID
    const {courses} = req.body;
    const userId = req.user.id;
    //validation
    //valid courseID
    try{
    if(courses.length === 0) {
        return res.json({
            success:false,
            message:'Please provide valid course ID',
        })
    };

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        // console.log("courseid=",course_id);
        try{
            course = await Course.findById(course_id);
            if(!course) {
                return res.json({
                    success:false,
                    message:'Could not find the course',
                });
            }
    
            //user already pay for the same course
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success:false,
                    message:'Student is already enrolled',
                });
            }
            totalAmount += course.price;
        }
        catch(error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
        // totalAmount += course.price;
    }
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
        };

        try{
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log("payment",paymentResponse);
            //return response
            return res.status(200).json({
                success:true,
                orderId: paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount,
            });
        }
        catch(error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    
};



    //verify the signature
exports.verifySignature = async (req, res) => {
        //get the payment details
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
        const {courses} = req.body;
        const userId = req.user.id;


        if(!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({
                success:false,
                message:'Payment details are incomplete',
            });
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;

        const enrolleStudent = async (courses, userId) => {
            if(!courses || !userId) {
                return res.status(400).json({
                    success:false,
                    message:'Please provide valid courses and user ID',
                });
            }
                    try{
                        //update the course
                        for(const course_id of courses){
                        console.log("verify courses=",course_id);
                        const course = await Course.findByIdAndUpdate(
                            course_id,
                            {$push:{studentsEnrolled:userId}},
                            {new:true}
                        );
                        //update the user
                        const user = await User.updateOne(
                            {_id:userId},
                            {$push:{courses:course_id}},
                            {new:true}
                        );
                        //set course progress
                        const newCourseProgress = new CourseProgress({
                            userID: userId,
                            courseID: course_id,
                          })
                          await newCourseProgress.save()
                    
                          //add new course progress to user
                          await User.findByIdAndUpdate(userId, {
                            $push: { courseProgress: newCourseProgress._id },
                          },{new:true});
                        //send email
                        const recipient = await User.findById(userId);
                        console.log("recipient=>",course);
                        const courseName = course.courseName;
                        const courseDescription = course.courseDescription;
                        const thumbnail = course.thumbnail;
                        const userEmail = recipient.email;
                        const userName = recipient.firstName + " " + recipient.lastName;
                        const emailTemplate = courseEnrollmentEmail(courseName,userName, courseDescription, thumbnail);
                        await mailSender(
                            userEmail,
                            `You have successfully enrolled for ${courseName}`,
                            emailTemplate,
                        );
                        }
                        return res.status(200).json({
                            success:true,
                            message:'Payment successful',
                        });
                    }
                    catch(error) {
                        console.error(error);
                        return res.status(500).json({
                            success:false,
                            message:error.message,
                        });
                    }
                
            }

        try{
            //verify the signature
            const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
            if(generatedSignature === razorpay_signature) {
                await enrolleStudent(courses, userId);
            }

        }
        catch(error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }

     
    }




//send email

exports.sendPaymentSuccessEmail = async (req, res) => {
    const {amount,paymentId,orderId} = req.body;
    const userId = req.user.id;
    if(!amount || !paymentId) {
        return res.status(400).json({
            success:false,
            message:'Please provide valid payment details',
        });
    }
    try{
        const enrolledStudent =  await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Study Notion Payment successful`,
            paymentSuccess(amount/100, paymentId, orderId, enrolledStudent.firstName, enrolledStudent.lastName),
        );
}
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
