import React from 'react';
import logo  from '../assets/martian_logo.png';
import Header from '../components/header.jsx';
import '../styles/Home.css';


function Home() {
  return (
    <>
        <Header />
        <img className="logo" src= { logo } />
    </>
  );
}

export default Home;
