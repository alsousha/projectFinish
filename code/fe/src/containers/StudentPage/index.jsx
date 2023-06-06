import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Sidebar from '../../components/Sidebar'
import Subjects from './Subjects'
import Homework from './Homework'
import Statistic from './Statistic'
import Certifications from './Certifications'
import GlobalTasks from './GlobalTasks'
import Profile from '../../pages/Profile';
import NotFound from '../../pages/404';

function StudentPage({isLoggedIn, setIsLoggedIn, userData}) {
	// console.log(isLoggedIn);
	// const [classes, setClasses] = useState();

	const linksData = [
		{"id": 0, "link": "subjects", "linkName": "My subjects"},
		{"id": 1, "link": "homework", "linkName": "My homework"},
		{"id": 2, "link": "statistic", "linkName": "My statistic"},
		{"id": 3, "link": "certifications", "linkName": "My certifications"},
		{"id": 4, "link": "tasks", "linkName": "GlobalTasks"}
	]
	
  return (
	<div>
	  <div className="mainPage d-flex">
			<Sidebar 
				items={linksData} 
				userData={userData} 
				setIsLoggedIn={setIsLoggedIn}
			/>
			<div className='mainContent'>
				<h1>Student</h1>
				<Routes>
					<Route path='/subjects' element={<Subjects />} />
					<Route path='/homework' element={<Homework />} />
					<Route path='/statistic' element={<Statistic />} />
					<Route path='/certifications' element={<Certifications />} />
					<Route path='/globalTasks' element={<GlobalTasks />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/' element={<span>logout</span>} />
				</Routes>
			</div>
	  </div>
	</div>
  )
}

export default StudentPage
