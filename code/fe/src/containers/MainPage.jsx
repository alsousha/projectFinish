import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Intro } from '../components';
import TeacherPage from './TeacherPage';
import StudentPage from './StudentPage';
import AdminPage from './AdminPage';
import Register from './Register';
import { AuthContext } from '../context/authContext';
import NotFound from '../pages/404';
import Reset from './Intro/Reset';
import PasswordResetForm from './Intro/PasswordResetForm';
import Article from '../pages/Article';
import About from '../pages/About';

function MainPage({ setIsLoggedIn, setUserName, isLoggedIn }) {
  // const [currentLink, setCurrentLink] = useState()
  const { currentUser } = useContext(AuthContext);
  const currentLink = currentUser ? `/${currentUser['role']}` : '/';

  const roles = ['teacher', 'student', 'admin'];

  // Mapping the routes
  const renderedRoutes = roles.map((role, index) => (
    <Route key={index} path={`/${role}/`} element={<Navigate to='/' replace />} />
  ));

  return (
    <div className=''>
      {/* if user logged -> show Teacher/Student/AdminPage => Login/Register Page */}
      {currentUser !== null ? (
        <Routes>
          {currentUser['role'] === 'teacher'}&&
          <Route
            exsct
            path='/teacher/*'
            element={<TeacherPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          {currentUser['role'] === 'student'}&&
          <Route
            exsct
            path='/student/*'
            element={<StudentPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          {currentUser['role'] === 'admin'}&&
          <Route
            exsct
            path='/admin/*'
            element={<AdminPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path='/' element={<Navigate to={currentLink} replace />} />
          <Route path='/' element={<Navigate to={'404'} replace />} />
          <Route path='/about' element={<About />} />
        </Routes>
      ) : (
        <>
          <Routes>
            {renderedRoutes}
            <Route path='/register' element={<Register />} />
            <Route path='/reset' element={<Reset />} />

            <Route path='/reset-password' element={<PasswordResetForm />} />
            <Route exact path='/' element={<Intro />} />
            <Route exact path='/*' element={<NotFound />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default MainPage;
