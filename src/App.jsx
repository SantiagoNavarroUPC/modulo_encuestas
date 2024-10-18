import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './menu/menu';
import Login from './login/login';
import Surveys from './surveys/surveys';
import Questions from './questions/questions';
import Users from './users/users';  


function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    );

  }
  
  

export default App;
