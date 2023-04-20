import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header, LoginSection } from './components'; //general file for imports
import TeacherPage from './containers/TeacherPage';
function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <Routes>
          {/* <Route exact path='/' element={<Home />} /> */}
          <Route path='/login' element={<LoginSection />} />
          <Route exsct path='/teacher' element={<TeacherPage />} />
          <Route exsct path='/teacher/*' element={<TeacherPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
