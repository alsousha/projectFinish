import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Sidebar from '../../components/Sidebar'
import Classes from './Classes'
import Categories from './Categories'
import Accounts from './Accounts'
import Tasks from '../Tasks/'
import NewTask from '../Tasks/NewTask'
import Task from '../Tasks/Task';
import WriteTask from '../Tasks/WriteTask';
import Students from './Students'
import Profile from '../../pages/Profile';
import Classfolders from './Classfolders';

import '../containers.scss'
import SingleClassFolder from './SingleClassFolder';
import TaskSequence from '../Tasks/TaskSequence';
import EditTask from '../Tasks/EditTask';
import Blog from '../../pages/Blog';
import Article from '../../pages/Article';
import Statistic from './Statistic';

function TeacherPage() {

	const linksData = [
		{"id": 0, "link": "classes", "linkName": "My classes"},
		{"id": 1, "link": "categories", "linkName": "My categories"},
		{"id": 2, "link": "tasks", "linkName": "My tasks"},
		{"id": 3, "link": "students", "linkName": "My students"},
		{"id": 4, "link": "statistic", "linkName": "My statistic"}
	] 

  return (
	<div>
	  
	  <div className="mainPage d-flex">
			<Sidebar 
				items={linksData} 
			/>
			<div className='mainContent'>
				<Routes>
					<Route path='classes' element={<Classes/>} />
					<Route path='accounts/:id_class' element={<Accounts/>} />
					<Route path='classfolder/:id_class' element={<Classfolders/>} />
					<Route path='singlefolder/:id_tskFolder' element={<SingleClassFolder/>} />
					<Route path='/categories' element={<Categories />} />
					{/* <Route path='/write' element={<WriteTask />} /> */}
					<Route path='/tasks' element={<Tasks />} />
					<Route path='/task/:id' element={<Task />} />
					<Route path='/blog/:id' element={<Article />} />
					<Route path='/taskedit/:id' element={<EditTask />} />
					<Route path='/task/sequence/:id' element={<TaskSequence />} />
					<Route path='/newtask' element={<NewTask />} />
					<Route path='/students' element={<Students />} />
					<Route path='/statistic' element={<Statistic />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/' element={<Blog/>} />
				</Routes>
			</div>
	  </div>
	</div>
  )
}

export default TeacherPage
