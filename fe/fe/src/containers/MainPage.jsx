import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginSection } from '../components'
import TeacherPage from './TeacherPage';
import StudentPage from './StudentPage';

function MainPage({setIsLoggedIn, setUserName, isLoggedIn}) {
	const userData = {
		id: 1,
		name: 'Anna',
		lastName: 'Danny',
		userImgLink: 'https://loremflickr.com/320/240/girl',
		role: 'teacher',
		sbj: 'English',
	  };
	  const userData2 = {
		id: 2,
		name: 'Ben',
		lastName: 'Fanc',
		userImgLink: 'https://loremflickr.com/320/240/boy',
		role: 'student',
	  };
	  const activeUserRole = `/${userData.role}`
  return (
	<div>
		{!isLoggedIn ?(
			<LoginSection setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>
		):(
			<Routes>
				<Route path="/" element={<Navigate to={activeUserRole} replace/>}/>
				<Route
					exsct
					path='/teacher/*'
					element={
					<TeacherPage
						isLoggedIn={isLoggedIn}
						setIsLoggedIn={setIsLoggedIn}
						userData={userData}
						// setUserData={setUserData}
					/>
					}
				/>	
				<Route
					exsct
					path='/student/*'
					element={
					<StudentPage
						isLoggedIn={isLoggedIn}
						setIsLoggedIn={setIsLoggedIn}
						userData={userData2}
						// setUserData={setUserData}
					/>
					}
				/>			
		    </Routes>
		)}
	  
	  
		  

	</div>
  )
}

export default MainPage
