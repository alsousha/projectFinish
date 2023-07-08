import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import LoginForm from './LoginForm'
import InteractivTasks from './InteractivTasks'
import { API_URL } from '../../constans';

import { ReactComponent as Check } from '../../assets/img/check3.svg';


function Intro() {
	

  return (
		<>
			<section className='loginSection'>
				<div className="container">
					<div className="loginSection__wrap d-flex jcsb bg-main white p3">
						<div className="loginSection__intro w60">
							<h2 className='mb1'>Welcome to Funny learn</h2>
							<p>Funny learn is platform allows teachers and students, to create and manage multimedia learning modules in an appealing form online with little effort.</p>

						</div>
						<div className="loginSection__form w35">
							<LoginForm />
						</div>
					</div>
				</div>	  
			</section>
			
			<section className="our_sbjs mt4">
				<InteractivTasks/>
			</section>

			<section className="help_teacher mt4">
				<div className="container">
					<div className="help_teacher__wrap d-flex g1">
						<div className="help_teacher__item w30 left-item">
							<h3>Join us</h3>
							<p>Study at any convenient time at school and at home</p>
							<Link to="/register" className="btn_main mt2">Register</Link>
						</div>
						<div className="help_teacher__item w70 right-item ">
							<h3 className='mb2'>Useful for parent</h3>
							<ul className="d-flex f-column jcsb">
							<li className='d-flex g1 mb1'>
								<div className=""><Check/></div>
								<span>The tasks are designed so that the child can study independently.</span>
							</li>
							<li className='d-flex g1 mb1'>
							<div className=""><Check/></div>
								<span>Safe and verified content on our website</span>
							</li>
							<li className='d-flex g1 mb1'>
								<div className=""><Check/></div>
								<span>Interactive flashcards engage students in learning and reduce class preparation time</span>
							</li>
						</ul>
						</div>
						
					</div>
				</div>
			</section>
			<section className='benefits mt6'>
				<div className="container">
					<div className="benefits__wrap">
						<h2 className='mb3 center'>What's the benefits?</h2>
						<div className="benefits__inner d-flex f-wrap mb6">
							<div className="benefits__item w50 d-flex g1 aic mb3">
								<img src={`${API_URL}/uploads/ben1.svg`} alt="sbj_icon" className="sbj__icon" />
								<div className="">Pupils get to know the new topic</div>
							</div>
							<div className="benefits__item w50 d-flex g1 aic mb3">
								<img src={`${API_URL}/uploads/ben2.svg`} alt="sbj_icon" className="sbj__icon" />
								<div className="">The game form helps to interest children in learning</div>
							</div>
							<div className="benefits__item w50 d-flex g1 aic mb3">
								<img src={`${API_URL}/uploads/ben3.svg`} alt="sbj_icon" className="sbj__icon" />
								<div className="">Children practice already acquired skills</div>
							</div>
							<div className="benefits__item w50 d-flex g1 aic mb3">
								<img src={`${API_URL}/uploads/ben4.svg`} alt="sbj_icon" className="sbj__icon" />
								<div className="">Tasks are becoming more diverse - we have more than 1000 cards!</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
			
  )
}

export default Intro
