import React from 'react'
import { Link } from 'react-router-dom'
import {arrow} from "../assets/icons"

const InforBox = ({text,link, btnText}) =>(
    <div className="info-box">
            <p className="font-medium sm:text-xl text-center">{text}</p>
            
            <Link className="neo-brutalism-white neo-btn" to={link}>
                {btnText}
                <img src={arrow} alt="arrow" className='w-4 h-4 object-contain'/>
            </Link>
    </div>
)

const renderContent ={
    1: (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
            Hello World!, I am <span className="font-semibold">Stanric</span> 😊
            <br />
            A kid who wants to escape the matrix from India 🇮🇳.
        </h1>
    ),
    2: (
        <InforBox 
        text="Passionate Student Innovator with a Trail of Mini Projects – Ready to Elevate Your Team with Fresh Ideas and Dedication!"
        link="/about"
        btnText="More About Me"
        />
    ),
    3: (
        <InforBox 
            text="Peek Behind the Code Curtain – Check Out My Projects!"
            link="/projects"
            btnText="Learn more"
        />
    ),
    4: (
        <InforBox 
            text="Let's Turn Ideas into Code – Reach Out and Let's Create Something Amazing Together!"
            link="/contact"
            btnText="Contact Me"
        />
    ),
}



const HomeInfo = ({currentStage}) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo