import React from 'react'

import LoginForm from './LoginForm'

function Intro({setIsLoggedIn, setUserName}) {
  return (
			<section className='loginSection'>
				<div className="container">
					
					<div className="loginSection__wrap d-flex jcsb bg-main white p3">
						<div className="loginSection__intro w60">
							<h2>Welcome to Funny learn</h2>
							<p>Funny learn is platform allows teachers and students, to create and manage multimedia learning modules in an appealing form online with little effort.</p>

						</div>
						<div className="loginSection__form w35">
							<LoginForm />
						</div>

					</div>
				</div>	  
			</section>
  )
}

export default Intro
