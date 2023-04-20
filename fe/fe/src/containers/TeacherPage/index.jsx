import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Sidebar from '../components/Sidebar'
import Classes from './Classes'
import Categories from './Categories'
import Tasks from './Tasks'
import Students from './Students'

function TeacherPage() {
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
		<Sidebar items={linksData}/>
		<div className='mainContent'>
			<h1>Teacher</h1>
			<Routes>
				<Route path='/classes' element={<Classes classes={classes}/>} />
				<Route path='/categories' element={<Categories />} />
				<Route path='/tasks' element={<Tasks />} />
				<Route path='/students' element={<Students />} />
			</Routes>
		</div>
		
	  </div>
	</div>
  )
}

export default TeacherPage
