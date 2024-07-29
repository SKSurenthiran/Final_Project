import React from 'react'
import "./Home.css"
import NavBar from '../../components/NavBar/NavBar'
import Hero from '../../components/Hero/Hero'
import Service from '../../components/Service/Service'
import Footer from '../../components/Footer/Footer'




function Home() {
  return (
    <div className='home-body'>
        <NavBar/>
        <Hero/>
        <Service/>
        <Footer/>
     
       
       

    </div>
  )
}

export default Home