import { Link } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import "./Home.css";
import HightlightText from "../componens/core/Homepage/HightlightText";
import CTAButton from "../componens/core/Homepage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../componens/core/Homepage/CodeBlocks";
import TimelineSection from "../componens/core/Homepage/TimelineSection";
import LearningLanguageSection from "../componens/core/Homepage/LearningLanguageSection";
import InstructorSection from "../componens/core/Homepage/Instructorection";
import Footer from '../componens/common/Footer'
import ExploreMore from '../componens/core/Homepage/ExploreMore'
export default function Home() {
  return (
    <>
      <div className="relative mx-auto flex flex-col w-[100%] items-center max-w-maxContent text-white justify-center">
        {/* section1 */}
        <div>
          <Link to={"/signup"}>
            <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
              <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
                <p>Become an Instructor</p>
                <FaArrowRightToBracket />
              </div>
            </div>
          </Link>
          <div className="text-center text-4xl font-semibold mt-8">
            Empower Your Future SKills
            <HightlightText text="Eklavya"></HightlightText>
          </div>

          <div className="mt-8 w-[90%] text-center text-lg font-bold text-richblack-300">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>
          <div className="justify-center flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>
          </div>
          <div className=" mx-3 my-7 relative justify-center content-center flex items-center shadow-[10px_-5px_50px_-5px] shadow-blue-200">
            <video
              muted
              loop
              autoPlay
              className="shadow-[20px_20px_rgba(255,255,255)]"
            >
              <source src={Banner} type="video/mp4"></source>
            </video>
          </div>
        </div>

        <div className="">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your with Eklavya Elearning{" "}
                <HightlightText text={"EKlavya "} />
              </div>
            }
            subHeading={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you. our interactive coding platforms and learn at your own pace. `}
            ctabtn1={{
              btnText: "Try Now",
              linkto: "./signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "View Our Courses",
              linkto: "./signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n' <html>\nhead><title>Example</title></span>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody\nh1><ahref="/">Header</a>\n/h1\nnav><ahref="one/">One</a><ahref="two/">\nTwo</a><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute "></div>}
          />
        </div>
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[100%]">
                Start <HightlightText text={"coding in seconds"} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.our interactive coding platforms and learn at your own pace."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codeColor={"text-richblue-200"}
            backgroundGradient={
              <div className="codeblock2 absolute bg-yellow-50"></div>
            }
          />
        </div>
        <ExploreMore/>
      </div>

      {/* section2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[120px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRightToBracket />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex  items-center gap-3">
                  Learn More
                  <FaArrowRightToBracket />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className = "mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">

                <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                    <div className = "text-4xl font-semibold lg:w-[45%] ">
                        Get the Skills you need for a
                        <HightlightText text={"Job that is in demand"} />
                    </div>

                    <div className = "flex flex-col items-start gap-10 lg:w-[40%]">
                        <p className='text-[16px]'> The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills. </p>                   
                        <CTAButton active={true} linkto={"/signup"}>  Learn more </CTAButton>
                    </div>
                </div>
            
                <TimelineSection />
                <LearningLanguageSection />
            </div>
      </div>
       {/*Section 3 */}
       <div className = "relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">

<InstructorSection />
<h1 className = "text-center text-4xl font-semibold mt-8"> Review from Other Learners </h1>
{/* Review Slider here */}
{/* <ReviewSlider/> */}

</div>
<Footer/>
    </>
  );
}
