import React from 'react';
import logo  from '../assets/martian_logo.png';
import Header from '../components/header.jsx';
import '../styles/Home.css';
import ParticleBackground from "../components/particles";



function Home() {
  return (
    <>
        <Header />
        <img className="logo" src= { logo } />
        <ParticleBackground />
    </>
  );
}

export default Home;
