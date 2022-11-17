import React, {useEffect, useState} from "react";
import Axios from 'axios';
import "./login.css"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

var authenticate=[];

export{authenticate};

export default function Login(){

  const navigate = useNavigate();

  const [myStyles, setMyStyle]=useState({
    marginTop: "120px"
});
const mystyle = {
  paddingLeft: "2.5rem",
  paddingRight: "2.5rem"
};

const textStyle={
  textAlign: "left"
}

const [myStyles2, setMyStyles2]=useState({
  color:"black"
});

 const [userName, setUserName]=useState("");
  const [password, setpassword]=useState(" ");

  const [loginStatus, setLoginStatus]= useState("");
  const [userData, setUserData]= useState({loggedIn: false});

  Axios.defaults.withCredentials=true;

   const login=()=>{
    Axios.post("http://localhost:3001/login", {
      username: userName,
      password:password,
    }).then((response)=>{
      if(response.data.message){
        setLoginStatus(response.data.message);
        setMyStyles2({
          color:"green"
        })
      }
      else{
        setLoginStatus("Successfully Logged In");
        setMyStyles2({
          color:"red"
        })
      }
    });
  }

  useEffect(()=>{
    Axios.get("http://localhost:3001/login").then((response)=>{
      setUserData(response.data);
      console.log(userData)
    })
  })
    return(
      <>
        
        <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div>
      
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <p style={{fontSize:"30px"}}>Login</p>
        <form>
          <div className="form-outline mb-4">
            <input type="text" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid Username" onChange={(e)=>{
                setUserName(e.target.value);
              }}/>
            <label className="form-label" htmlFor="form3Example3">Username</label>
          </div>

          <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" onChange={(e)=>{
                setpassword(e.target.value);
              }}/>
            <label className="form-label" htmlFor="form3Example4">Password</label>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg"
              style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}} onClick={()=>{
                login();
                (userData.loggedIn)? navigate("/profile"):console.log("Abe Register Kar Pehle")
              }}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                className="link-danger">Register</Link></p>
          </div>
          <p>{loginStatus}</p>

        </form>
      </div>
    </div>
  </div>
</section>
</>
  

    )
}