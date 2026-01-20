import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const Layouts = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
        <div className='bottom'>

        <Footer />
        </div>
    </div>
  )
}

export default Layouts