import React from 'react'

import './header.scss'
import logo from '../../assets/img/logo.svg'

function Header() {
  return (
	<header>
		<a href="/" className="logo d-flex aic g1">
			<img src={logo} alt="logo" />
			<span className="slogan">Funny App</span>
		</a>
	</header>
  )
}

export default Header
