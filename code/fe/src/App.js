import React, { useState } from 'react';
import { Header, MainPage } from './components'; //general file for imports
import Footer from './components/footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'false');
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
      <Footer />
    </div>
  );
}

export default App;
