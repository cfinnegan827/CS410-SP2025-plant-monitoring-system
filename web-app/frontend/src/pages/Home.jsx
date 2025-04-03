import React from 'react';
import logo  from '../assets/martian_logo.png';
import Header from '../components/header.jsx';
import '../styles/Home.css';
import ParticleBackground from "../components/particles.jsx";



function Home() {
  return (
    <>
        <Header />
        <div className='logoContainer'>
          <h1 className='title'>The <br /> Martian Project</h1>

        </div>
        
        <ParticleBackground />
    </>
  );
}

export default Home;
