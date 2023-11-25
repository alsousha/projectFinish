import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ContactForm from '../Forms/ContactForm';
const Footer = () => {
  const [isFormVisiable, setIsFormVisiable] = useState(false);

  const handlePopupClose = () => {
    setIsFormVisiable(false);
  };
  return (
    <footer className=''>
      <div className='container d-flex jcsb aic mt2 mb2'>
        <a href='/' className='logo d-flex aic g1'>
          <span className='slogan'>Funny App</span>
        </a>
        {/* <span>Alsu Bogdanov</span> */}
        <div className='menu d-flex g1'>
          <NavLink to='about'>About</NavLink>
          <button className='basic' onClick={() => setIsFormVisiable(true)}>
            Contacts
          </button>
        </div>
      </div>
      {isFormVisiable && <ContactForm handlePopupClose={handlePopupClose} />}
    </footer>
  );
};

export default Footer;
