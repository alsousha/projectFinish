import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Sidebar from '../../components/Sidebar'
import Classes from './Classes'
import Categories from './Categories'
import Tasks from '../Tasks/'
import Task from '../Tasks/Task';
import WriteTask from '../Tasks/WriteTask';
import Students from './Students'

function TeacherPage({isLoggedIn, setIsLoggedIn, userData}) {
	console.log(isLoggedIn);
	const [classes, setClasses] = useState();

	const linksData = [
		{"id": 0, "link": "classes", "linkName": "My classes"},
		{"id": 1, "link": "categories", "linkName": "My categories"},
		{"id": 2, "link": "tasks", "linkName": "My tasks"},
		{"id": 3, "link": "students", "linkName": "My students"}
	]
	
	
	
  return (
	<div>
	  
	  <div className="mainPage d-flex">
			<Sidebar 
				items={linksData} 
				// userData={userData} 
				// setIsLoggedIn={setIsLoggedIn}
			/>
			<div className='mainContent'>
				<h1>Teacher</h1>
				<Routes>
					<Route path='classes' element={<Classes classes={classes}/>} />
					<Route path='/categories' element={<Categories />} />
					<Route path='/write' element={<WriteTask />} />
					<Route path='/tasks' element={<Tasks />} />
					<Route path='/task/:id' element={<Task />} />
					<Route path='/students' element={<Students />} />
					<Route path='/' element={<span>logout</span>} />
				</Routes>
			</div>
	  </div>
	</div>
  )
}

export default TeacherPage