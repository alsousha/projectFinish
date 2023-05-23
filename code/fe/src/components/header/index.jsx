import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import { AuthContext, logout } from '../../context/authContext'

import './header.scss'
import logo from '../../assets/img/logo.svg'

function Header() {
	const { currentUser, logout, login } = useContext(AuthContext)

  return (
	<header>
		<a href="/" className="logo d-flex aic g1">
			<img src={logo} alt="logo" />
			<span className="slogan">Funny App</span>
		</a>
		<span>{currentUser?.username}</span>
		{currentUser ? <span onClick={logout}>Logoutt</span> : <Link className="link" to="/login">Login</Link>}
	</header>
  )
}

export default Header
