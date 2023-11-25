import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import ContactForm from '../Forms/ContactForm';

import './header.scss';
import logo from '../../assets/img/logo.svg';

function Header() {
  const { currentUser, logout, login } = useContext(AuthContext);
  const [isFormVisiable, setIsFormVisiable] = useState(false);

  const handlePopupClose = () => {
    setIsFormVisiable(false);
  };
  return (
    <header className='d-flex jcsb aic'>
      <a href='/' className='logo d-flex aic g1'>
        <img src={logo} alt='logo' />
        <span className='slogan'>Funny App</span>
      </a>
      <div className='menu d-flex g1 mr2'>
        <NavLink to='about'>About</NavLink>
        <button className='basic' onClick={() => setIsFormVisiable(true)}>
          Contacts
        </button>
      </div>
      {isFormVisiable && <ContactForm handlePopupClose={handlePopupClose} />}
      {/* <span>{currentUser?.username}</span> */}
      {/* {currentUser ? <span onClick={logout}><Link className="link" to="/">Logoutt</Link></span> : <Link className="link" to="/">Login</Link>} */}
    </header>
  );
}

export default Header;
