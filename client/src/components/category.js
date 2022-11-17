import  Axios  from "axios";
import './category.css'
import React, {useEffect, useState} from "react";
// import {cat} from "./NavbarWithLogin"
import {cat} from "./NavbarWithLogin"
import {cat_name} from "./NavbarWithLogin";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";

  var res1=[];

  var search1=null;

export default function Category(){
    console.log(cat_name);
    const navigate = useNavigate();
const[wordEnteredList, setWordEnteredList]=useState([]);
const [wordEntered, setWordEntered] = useState("");
const[searchWord, setSearchWord]=useState();
const[result, setResult]=useState([]);
const [articleData, setArticleData]= useState([]);
const [display, setDisplay] = useState(false);

useEffect(()=>{
    Axios.post('http://localhost:3001/api/get',{
        wordEntered: wordEntered
    }).then((response)=>{
        setWordEnteredList(response.data)
    })
})
    useEffect(()=>{
        Axios.post('http://localhost:3001/api/get2',{
            searchWord:searchWord
        }).then((response)=>{
            // console.log(searchWord)
            setResult(response.data);
            res1=response.data;
            console.log(res1)
        })}
    )
    
    useEffect(()=>{
        Axios.post('http://localhost:3001/homepage').then((response)=>{
            console.log(response.data);
            setArticleData(response.data);
        })
    })
    
    const get2=()=>{
        navigate(`/search/${search1}`)
    }
   return(
        <>
    <div className="main">
    <div className="upper">
        <div className="heading">
        <h1 style={{marginTop: "2.5%", marginLeft:"5%", color:"rgb(120,8,8)"}}>{cat_name}</h1>
        <hr className="cat_hr"/>
        </div>
        <div style={{width: "30%", display:"block"}}>
        <div class="sub-add2">
                    <form action="https://www.google.com/search" method="get" class="search3">
                        <input type="text" placeholder="Search Article " class="inp1 color-dark" onChange={(event)=>{
                            setWordEntered(event.target.value);
                            (event.target.value==="")?setDisplay(false):setDisplay(true);
                            console.log(wordEntered);
                        }} value={searchWord}/>
                        <button type="submit" class="submit1" onClick={get2}><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg></button>

                    </form>
                </div>
                <ul className={`btnsearch ${(display)?"":"display-none"}`} style={{marginLeft: "1.4%", width: "21%"}}>           
        {wordEnteredList.map((val)=>
     (<li><button  class="btnsearch2"  key={val.toString()}  onClick={(e)=>{
        e.preventDefault();
            setSearchWord(val.KEYWORD)
            search1=val.KEYWORD;
        }}>{val.KEYWORD}</button></li>)
          )}
          </ul> 
        </div>
        </div>

    {cat.map((val)=>
            ( <div className="cards-cat">

            <div className="image" style={{image:"10rem", objectFit:"cover"}} key={val.toString()}>
                <img   src={val.IMAGES}
                    alt=""/>
            </div>
            <div className="title">
                <a href={val.URL}>
                    <h2 className="display-8 color-dark" style={{overflow:"hidden"}}>{val.HEADING}</h2>
                </a>
            </div>
            <div className="des">
                <a href={val.URL}>
                    <p style={{width: "fit-content", height:"7.3rem", overflow: "hidden"}}>{val.CONTENT}</p>
                </a>
                <button type="button" className="btn "><a href={val.URL}> Read The Article</a></button>
            </div>
        </div>)
          )}
    </div>
    </>

    )
}

export{res1, search1};