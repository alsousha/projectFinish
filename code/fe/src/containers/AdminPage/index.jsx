import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Sidebar from '../../components/Sidebar'
import Teachers from './Teachers';
import Students from './Students';
import Tasks from '../Tasks';
import Templates from './Templates';
import Profile from '../../pages/Profile';
import Article from '../../pages/Article';
import Blog from '../../pages/Blog';
import Certifications from './Certifications';
import EditArticle from '../../pages/EditArticle';
import CreateArticle from '../../pages/createArticle';
import GlobalTasks from '../Tasks/GlobalTasks';
import Task from '../Tasks/Task';


function AdminPage({isLoggedIn, setIsLoggedIn, userData}) {
	const linksData = [
		{"id": 0, "link": "teachers", "linkName": "Teachers"},
		{"id": 1, "link": "students", "linkName": "Students"},
		{"id": 2, "link": "tasks", "linkName": "Tasks"},
		{"id": 3, "link": "templates", "linkName": "Templates"},
		{"id": 4, "link": "certifications", "linkName": "Certifications"},
		{"id": 5, "link": "blog", "linkName": "Blog"}
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
				<Routes>
					<Route path='/teachers' element={<Teachers />} />
					<Route path='/students' element={<Students />} />
					<Route path='/tasks' element={<GlobalTasks />} />
					<Route path='/task/:id' element={<Task />} />
					<Route path='/certifications' element={<Certifications />} />
					<Route path='/templates' element={<Templates />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/blog' element={<Blog/>} />
					<Route path='/blog/edit/:id' element={<EditArticle/>} />
					<Route path='/blog/:id' element={<Article />} />
					<Route path='/newarticle' element={<CreateArticle />} />
					<Route path='/' element={<Blog/>} />
				</Routes>
			</div>
	  </div>
	</div>
	)
}

export default AdminPage
