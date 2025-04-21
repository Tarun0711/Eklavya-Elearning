import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/Designer.png"
const  Navbar = () => {
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
    
      <div  className="flex w-11/12 max-w-maxContent items-center justify-center ">
        <Link to="/">
          <img src={logo} width={160 } height={42} loading='lazy' alt='logo'/>

        </Link>

      </div>
    </div>
  )
}

export default Navbar