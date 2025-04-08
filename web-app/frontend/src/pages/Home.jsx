import React from 'react';
import Header from '../components/header.jsx';
import '../styles/Home.css';
import ParticleBackground from "../components/particles.jsx";
import AboutSection from "../components/aboutSection.jsx";



function Home() {
  return (
    <>
        <Header />
        <div className='logoContainer'>
          <h1 className='title'>The <br /> Martian Project</h1>
        </div>
        <AboutSection id="about" />
        
        <ParticleBackground />
    </>
  );
}

export default Home;
