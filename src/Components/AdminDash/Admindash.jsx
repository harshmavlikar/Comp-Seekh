import React from 'react'
import Header from './Header/Navbar'
import MainContent from './MainContent/MainContent'
import './Admindash'
import Navbar from '../Navbar/Navbar'


const Admindash = () => {
    
    return (
        <div className="layout">
            <Header/>
          <div className="main-content">
            <MainContent />
          </div>
        </div>
      );
}


export default Admindash
