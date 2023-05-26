import React, { useState } from 'react';
import { Header, MainPage } from './components'; //general file for imports
import Footer from './components/footer';

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <MainPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
