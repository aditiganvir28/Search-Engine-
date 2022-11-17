import React, {useState, useEffect} from 'react';

import Axios from 'axios';
import Login from './components/Login';
import HomePage2 from './components/Homepage2';
import Category from './components/category';
import Register from './components/register';
import AddArticle from './components/AddArticle';
import Profile from './components/Profile';
import { authenticate } from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";
import Articles from './components/Articles';
import NavbarWithLogin from './components/NavbarWithLogin';
import { withRouter } from 'react-router-dom';

function App() {
  
  const [userData, setUserData]= useState("");
 
  return (

    
    <>
    
    <Router>
    <NavbarWithLogin/>
      <Routes>
     
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/" element={<HomePage2/>} />
      <Route exact path="/category/:cat_name" element={<Category />} />
      <Route exact path="/article" element={<AddArticle />} />
      <Route exact path="/search/:keyword" element={<Articles />} />
      <Route exact path="/profile" element={<Profile />} />
      
      
    

        </Routes>
    </Router>
    </>
   
);
}

export default App;
