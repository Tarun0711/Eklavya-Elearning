import React from 'react'
import Home from './Pages/Home'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './componens/common/Navbar'
// import OpenRoute from './componens/core/core/Auth/OpenRoute'
// import Login from './Pages/Login'
// import Signup from './Pages/Signup'


function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path="signup" element = { <OpenRoute> <Signup /> </OpenRoute> } />
        <Route path="login" element = { <OpenRoute> <Login /> </OpenRoute> } /> */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App