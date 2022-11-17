import React, {useEffect, useState} from "react";
import './NavbarWithLogin.css'
import Axios from 'axios';

import {
    Link,
    useNavigate,
    useParams
  } from "react-router-dom";

var cat=[];

var cat_name="";

var res=[];
export{res}

var authenticate=[];

export default function NavbarWithLogin(){
    const navigate = useNavigate();
    const [display, setDisplay]=useState(false);
    const [display2, setDisplay2]=useState(true);
    const [category, setCategory]=useState('');
    const [data, setData]=useState([]);
    const [userData, setUserData]=useState({loggedIn: false});
    const[wordEnteredList, setWordEnteredList]=useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const[searchWord, setSearchWord]=useState();
    const[result, setResult]=useState([]);
    var user=[];
    const set=(cat)=>{
       setCategory(cat);
    }

    //Sending users category request to loacalhost and getting the response
    useEffect(()=>{
        Axios.post("http://localhost:3001/category", {
            category:category
        }).then((response)=>{
            cat=response.data
            setData(response.data);
        })
    })

    //Getting login details
    useEffect(()=>{
        Axios.get("http://localhost:3001/login").then((response)=>{
          setUserData(response.data);
        //   console.log(userData.user);
        })
    })
    //   authenticate=userData.user;
      user=userData.user

    // Logging out
    const logout=()=>{
        Axios.get("http://localhost:3001/logout").then((response)=>{
            setUserData(response.data)
            });
        navigate('/')
    }

   

// const addArticle=()=>{
//     if(userData.loggedIn===true){
//         navigate('/article')
//     }
//     else{
//         alert("Please Login first")
//     }
// }

    return(
        <nav>
        <div className={`menuHamburger ${display ? "display-none" : ""}`}><button className="bon" onClick={()=>{setDisplay(true)}}>&#9776;</button></div>
        <div className={`sidebarMenu ${display ? "" : "display-none"}`} >
            <div className="cat">
                <h2>Category</h2>
            </div>
            <div className="close"><button onClick={()=>{setDisplay(false)}}>&times;</button></div>
            <button className="catbon" onClick={()=>{navigate('/')}}>Home</button>
            <button href="#"  className="catbon" onClick={()=>{
                            setCategory("ASTROLOGY")
                        console.log(category);
                        cat_name=category;
                        (category==="ASTROLOGY")? navigate("/category/astrology"):console.log("shit")}}>Astrology</button>
            <button href="#" className="catbon" onClick={()=>{
                            setCategory("BUSSINESS/ECONOMY")
                        console.log(category);
                        cat_name=category;
                        (category==="BUSSINESS/ECONOMY")?navigate("/category/bussinessoreconomy"):console.log("shit")}}>Business/Economy</button>
            <button href="#" className="catbon"  onClick={()=>{
                cat_name="Culture";
                setCategory("CULTURE");
                console.log(category);
                        (category==="CULTURE")?navigate("/category/culture"):console.log("shit")
            }}>Culture</button>
            <button href="#" className="catbon" onClick={()=>{
                            setCategory("EDUCATION");
                            console.log(category);
                            cat_name=category;
                                    (category==="EDUCATION")?navigate("/category/education"):console.log("shit")
            }}>Education</button>
            <button href="#" className="catbon" onClick={()=>{
                            setCategory("FASHION")
                        console.log(category);
                        cat_name=category;
                        (category==="FASHION")?
                        navigate("/category/fashion"):console.log("shit")}}>Fashion</button>
            <button href="#" className="catbon" onClick={()=>{
                            setCategory("HEALTH")
                        // console.log(category);
                        cat_name=category;
                        (category==="HEALTH")?
                        navigate("/category/health"):console.log("shit")}}>Health</button>
            <button href="#" className="catbon" onClick={()=>{
                            setCategory("INDIA")
                        console.log(category);
                        cat_name=category;
                        (category==="INDIA")?
                        navigate("/category/india"):console.log("shit")}}>India</button>
            <button href="#" className="catbon" onClick={()=>{
                            setCategory("POLITICS")
                        console.log(category);
                        cat_name=category;
                        (category==="POLITICS")?
                        navigate("/category/politics"):console.log("shit")}}>Politics</button>
            <button href="#" className="catbon" onClick={()=>{
                            setCategory("SPORTS")
                        console.log(category);
                        cat_name=category;
                        (category==="SPORTS")?
                        navigate("/category/sports"):console.log("shit")}}>Sports</button>
            <button href="#" className="catbon" onClick={()=>{
                            setCategory("TECHNOLOGY")
                        console.log(category);
                        cat_name=category;
                        (category==="TECHNOLOGY")?
                        navigate("/category/technology"):console.log("shit")}}>Technology</button>
            <button href="#" className="catbon" onClick={()=>{
                            setCategory("WORLD")
                            cat_name=category;
                        console.log(category);
                        (category==="WORLD")?
                        navigate("/category/world"):console.log("shit")}}>World</button>
{/* {console.log(cat_name)} */}

        </div>
        {(userData.loggedIn)? 
        <>
        <div className="logo"><a>Article</a></div>
         <ul>
         
         <div className="main">
                 
                 <li>
                     <button className="searchbar1">
                         <h4>Add Article</h4>
                         <button type="add" className="add" onClick={()=>{
                            navigate('/article')
                         }}/><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                 height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16" style={{position:"absolute", marginLeft:"100px"}}>
                                 <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                 <path
                                     d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                             </svg></button>
                 </li>
             <li>
             <div className="dropdown">
                 
                     {/* <img src="user (2).png" title="user icons" alt="Avatar" className="avatar" height="45px"
                         width="45px"/> */}
                         {user.map((val)=>
                         (<button type="button" className="btn  dropdown-toggle" data-toggle="dropdown" style={{border: "none", backgroundColor:"black", marginBottom: "0"}}>{val.USERNAME}</button>))}
                 
                 <div className="dropdown-menu">
                     <button className="dropdown-item" onClick={()=>{
                        navigate('/profile')
                     }}>Your Profile</button>
                     <button className="dropdown-item" onClick={logout}>Log Out</button>

                 </div>
             </div>
         </li>
         </div>
     </ul> 
     </>:

<ul>

<li><button className="searchbar1" style={{color:"white"}} onClick={()=>{navigate("/login")}}>Login/Register</button></li> 

</ul>
     }
       

        
    </nav>
    )
}

export{cat};
export{cat_name}