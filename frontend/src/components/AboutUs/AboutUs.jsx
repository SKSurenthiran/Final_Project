import React from 'react'
import './AboutUs.css'
import NavBar from '../NavBar/NavBar';

function about() {
  return (
    <>
    <NavBar/>
     <div className='Img'></div>
     <div className='main_d'>
        <div className='div_1'>
            <h3>Vision</h3>
            <p>
            To be the essential network of communication among its motoring members. Membership of the AAC must be relevant, 
            helpful and attractive - in a word. Indispensable.</p>
        </div>
        <div className='div_2'>
            <h3>Mission</h3>
            <p>
            The AAC is the leading and most successful body in Sri Lanka concerned with motoring, 
            touring, road assistance services and leisure. It works to safeguard freedom of mobility within sensible, 
            sustainable limits, to promote road safety and to provide quality services to international members whose 
            organizations are affiliated to the Federation Internationale de l’ Automobile (FIA).</p>
        </div>
    </div>
    <div className='main_d2'>
            <div className='Values'>
                <h3>Values</h3>
                  <p>
                    The AAC reflects and promotes its members' image of integrity and independence.</p>
                   <p> The AAC is recognised by and works with all relevant organisations, governmental and non-governmental.</p>
                   <p> The AAC defends the interests of international motoring members visiting Sri Lanka.</p>
                    <p>The AAC offers reciprocal services to all international motorists whose clubs are affiliated to the FIA.</p>
                   <p> The AAC is governed by an experienced Executive Committee and managed by a highly motivated general and technical staff.</p>
            </div>
            <div className='Values'>
                <h3>Objectives</h3>
                    <p>To increase the influence of the AAC at international and regional levels, with particular regard to issues surrounding sustainable mobility and tourist facilities.</p>
                    <p>To disseminate relevant data and club-related information to its members.</p>
                    <p>To improve reciprocal services for the benefit of international FIA affiliated members.</p>
                    <p>To secure the financial structure and future services to members by regular review of membership fees and document charges and costs.</p>
            </div>
        </div>
    </>
   
)
}

export default about;