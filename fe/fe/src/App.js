import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header, TeacherPage, MainPage } from './components'; //general file for imports

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  //   const [userData, setUserData] = useState(localStorage.getItem('userData'));

  const setUserName = () => {
    //tmp const
  };

  console.log(isLoggedIn, 'isLogged');
  return (
    <div className='App'>
      <Header />
      <main>
        <MainPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} isLoggedIn={isLoggedIn} />
      </main>
    </div>
  );
}

export default App;
