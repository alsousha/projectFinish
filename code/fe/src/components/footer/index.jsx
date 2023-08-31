import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {
		return (
				<footer className=''>
					<div className="container d-flex jcsb aic mt2 mb2">
						<a href="/" className="logo d-flex aic g1">
							<span className="slogan">Funny App</span>
						</a>
						{/* <span>Alsu Bogdanov</span> */}
						<div className="menu d-flex g1">
							<Link>About</Link>
							<Link>Contacts</Link>
						</div>
						
					</div>
				</footer>
		)
}

export default Footer
