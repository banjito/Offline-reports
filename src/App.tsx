import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Drafts } from './pages/Drafts';
import { Editor } from './pages/Editor';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drafts" element={<Drafts />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;