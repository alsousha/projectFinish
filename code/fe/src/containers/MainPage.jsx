import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { Intro } from '../components'
import TeacherPage from './TeacherPage';
import StudentPage from './StudentPage';
import Register from './Register';
import { AuthContext } from '../context/authContext';

function MainPage({setIsLoggedIn, setUserName, isLoggedIn}) {
	const { currentUser } = useContext(AuthContext)
	console.log(currentUser);

	const userData = {
		id: 1,
		name: 'Anna',
		lastname: 'Serhil',
		userImgLink: 'https://loremflickr.com/320/240/girl',
		role: 'teacher',
		sbj: 'English',
	  };
	const userData2 = {
	id: 2,
	name: 'Ben',
	lastname: 'Fanc',
	userImgLink: 'https://loremflickr.com/320/240/boy',
	role: 'student',
	};
	const activeUserRole = `/${userData.role}`
  return (
	<div>
		{/* if user logged -> show Teacher/Student/AdminPage => Login/Register Page */}
		{!isLoggedIn ?(
			<>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<Intro setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>} />
				</Routes>
			</>
			
		):(
			<Routes>
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
				<Route path="/" element={<Navigate to={activeUserRole} replace/>}/>
		    </Routes>
		)}
	</div>
  )
}

export default MainPage
