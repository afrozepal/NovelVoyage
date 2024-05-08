import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './Nav';
import { BooksDisplay } from './BooksDisplay';
import Notepad from './Notepad';
import Badges from './Badges';

function App() {
  return (
    <Router>
      {/* <Nav /> */}
      {/* <BooksDisplay /> */}
      <Routes> 
      <Route path="/" element={<BooksDisplay />} />     
        <Route path="/notepad" element={<Notepad />}/>
        <Route path="/badges" element={<Badges />}/>
      </Routes>
    </Router>
  );
}

export default App;
