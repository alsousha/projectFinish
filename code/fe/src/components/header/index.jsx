import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

import './header.scss';
import logo from '../../assets/img/logo.svg';

function Header() {
  const { currentUser, logout, login } = useContext(AuthContext);

  return (
    <header className='d-flex jcsb aic'>
      <a href='/' className='logo d-flex aic g1'>
        <img src={logo} alt='logo' />
        <span className='slogan'>Funny App</span>
      </a>
      <div className='menu d-flex g1 mr2'>
        {/* <Link>About</Link> */}
        <Link>Contacts</Link>
        <NavLink to='about'>About</NavLink>
      </div>

      {/* <span>{currentUser?.username}</span> */}
      {/* {currentUser ? <span onClick={logout}><Link className="link" to="/">Logoutt</Link></span> : <Link className="link" to="/">Login</Link>} */}
    </header>
  );
}

export default Header;
