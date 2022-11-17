import React, {useState} from "react";
import Axios from 'axios';
import {
  Link,
  useNavigate
} from "react-router-dom";

export default function Register(){
  const navigate = useNavigate();

    const mystyle = {
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem"
      };
    
    const mystyle1={
        width:"100px"
    }

     const [userName, setUserName]=useState("");
  const [email, setEmail]=useState(" ");
  const [password, setPassword]=useState("");
  const [intrest1, setIntrest1]=useState("");
  const [intrest2, setIntrest2]=useState("");
  const [intrest3, setIntrest3]=useState("");

  const register=()=>{
    Axios.post("http://localhost:3001/register", {
      username: userName,
      email:email,
      password:password,
      intrest_of_field_1:intrest1,
      intrest_of_field_2:intrest2,
      intrest_of_field_3:intrest3,
    }).then((response)=>{
      console.log(response);
    });
    navigate('/login')
  }

    return(
        
        <section className="vh-100" >
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <h3>Registration Form</h3>
        <form>
          
          <div className="form-outline mb-2">
            <input type="text" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid Username" onChange={(e)=>{
                      setUserName(e.target.value);
                    }} />
            <label className="form-label" htmlFor="form3Example3">Username</label>
          </div>

          <div className="form-outline mb-2">
            <input type="email" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid Email Address" onChange={(e)=>{
                      setEmail(e.target.value);
                    }}/>
            <label className="form-label" htmlFor="form3Example3">Email</label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-2">
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" onChange={(e)=>{
                      setPassword(e.target.value);
                    }}/>
            <label className="form-label" htmlFor="form3Example4">Password</label>
          </div>
          <div className="row">
                <div className="col-12">

                  <select className="select form-control-lg" style={{width: "100%", marginBottom:"5%"}} 
                  onChange={(e)=>{
          setIntrest1(e.target.value);
        }}>         <option disabled>Intrest_of_Field_1</option>
                    <option value="ASTROLOGY">Astrology</option>
                    <option value="BUSSINESS/ECONOMY">Bussiness/Economy</option>
                    <option value="CULTURE">Culture</option>
                    <option value="EDUCATION">Education</option>
                    <option value="FASHION">Fashion</option>
                    <option value="HEALTH">Culture</option>
                    <option value="INDIA">India</option>
                    <option value="POLITICS">Politics</option>
                    <option value="SPORTS">Sports</option>
                    <option value="TECHNOLOGY">Technology</option>
                    <option value="WEB SERIES">Web Series</option>
                    <option value="WORLD">World</option>
                  </select>

                </div>
              </div>
              <div className="row">
                <div class="col-12">

                  <select className="select form-control-lg" style={{width: "100%", marginBottom:"5%"}}
                  onChange={(e)=>{
                    setIntrest2(e.target.value);
                  }}>
                    <option disabled>Intrest_of_Field_2</option>
                    <option value="ASTROLOGY">Astrology</option>
                    <option value="BUSSINESS/ECONOMY">Bussiness/Economy</option>
                    <option value="CULTURE">Culture</option>
                    <option value="EDUCATION">Education</option>
                    <option value="FASHION">Fashion</option>
                    <option value="HEALTH">Culture</option>
                    <option value="INDIA">India</option>
                    <option value="POLITICS">Politics</option>
                    <option value="SPORTS">Sports</option>
                    <option value="TECHNOLOGY">Technology</option>
                    <option value="WEB SERIES">Web Series</option>
                    <option value="WORLD">World</option>
                  </select>

                </div>
              </div>
              <div className="row">
                <div className="col-12">

                  <select className="select form-control-lg" style={{width: "100%", marginBottom:"5%"}}
                  onChange={(e)=>{
                    setIntrest3(e.target.value);
                  }}>
                    <option disabled>Intrest_of_Field_3</option>
                  <option value="ASTROLOGY">Astrology</option>
                    <option value="BUSSINESS/ECONOMY">Bussiness/Economy</option>
                    <option value="CULTURE">Culture</option>
                    <option value="EDUCATION">Education</option>
                    <option value="FASHION">Fashion</option>
                    <option value="HEALTH">Culture</option>
                    <option value="INDIA">India</option>
                    <option value="POLITICS">Politics</option>
                    <option value="SPORTS">Sports</option>
                    <option value="TECHNOLOGY">Technology</option>
                    <option value="WEB SERIES">Web Series</option>
                    <option value="WORLD">World</option>
                  </select>

                </div>
              </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg"
              style={mystyle} onClick={register}>Register</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
    )
}
