import React, {useEffect, useState} from "react";
import Axios from 'axios';
import "./profile.css"
import { authenticate } from "./NavbarWithLogin";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

export default function Profile(){

    const [userData, setUserData]= useState([]);
    const [addedArticle, setAddedArticle]= useState([]);
    const user=[];
    useEffect(()=>{
        Axios.get("http://localhost:3001/login").then((response)=>{
          setUserData(response.data.user);
        //   console.log(userData)
        })
      })

      useEffect(()=>{
        Axios.post("http://localhost:3001/profile").then((response)=>{
            setAddedArticle(response.data);
            console.log(response.data)
        })
      })


    return(
        <div className="profile">
        <div className="profile-box">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" className="icon"/>
            {userData.map((val)=>
                (<h3 className="username" >{val.USERNAME}</h3>)
            )}

{userData.map((val)=>
                (<p >{val.EMAIL}</p>)
            )}
            <div className="info">
                <p>My Field Of Interest</p>
                <div className="field">
                    
{userData.map((val)=>
                (<button>{val.INTREST_OF_FIELD_1}</button>))}
                {userData.map((val)=>
                    (<button>{val.INTREST_OF_FIELD_2}</button>))}
                    {userData.map((val)=>
                    (<button>{val.INTREST_OF_FIELD_3}</button>))}

                </div>
                <div className="article">
                    <h3>Article Added By Me</h3>
                    <ul>
                        {addedArticle.map((val)=>
                            (<li key={val.ARTICLE_ID}>{val.HEADING}
                                <button onClick={()=>{
                                    Axios.post("http://localhost:3001/del",{
                                        heading: val.HEADING,
                                        article_id: val.ARTICLE_ID
                                    }).then((response)=>{
                                        console.log(response);
                                    })
                                }}>Delete</button></li>)
                        )}
                    </ul>
                </div>
            </div>
            </div>
            </div>
        
    )
}