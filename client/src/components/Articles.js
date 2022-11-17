import React, {useEffect, useState} from "react";
import './Articles.css';
import Axios from 'axios';
import {res, search} from './Homepage2.js';
import { res1, search1 } from "./category";
import { format, parseISO } from 'date-fns'
// import {result2, search2} from "./Articles"

import {
    Link,
    useNavigate
  } from "react-router-dom";

  var result2=[];
    var search2=null;

  export default function Articles(){
    const navigate = useNavigate();
    const [display, setDisplay]=useState(false);
    const[wordEnteredList, setWordEnteredList]=useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const[searchWord, setSearchWord]=useState();
    const[result, setResult]=useState([]);
    const [articleData, setArticleData]= useState([]);
    const [res2, setres2]=useState([]);
    
    

    useEffect(()=>{
        Axios.post("http://localhost:3001/s").then((response)=>{
            setres2(response.data);
            console.log(response.data);
        })
    })

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
                search2=searchWord
                setResult(response.data);
                result2=response.data;
            })}
        )
    
    useEffect(()=>{
        Axios.post('http://localhost:3001/homepage').then((response)=>{
            console.log(response.data);
            setArticleData(response.data);
        })
    })
    
    const get2=()=>{
        navigate(`/search/${searchWord}`)

    }

    // console.log(result2);
    // console.log(search2);

    const r=()=>{
        if(result2.length>0)
        return result2;
        else if(res1.length>0)
        return res1;
        else
        return res;
    }

    console.log(r);

    const s=()=>{
        if(search2!=null)
        return search2;
        else if(search!=null)
        return search;
        else
        return search1;
    }

    

    return(
        <>
        <div className="up" style={{display: "flex"}}>
            <div className="heading">
        <h1 style={{marginLeft: "3%", marginTop:"3%"}}><span style={{color:"rgb(120, 8, 8)"}}>"{r().length}"</span> Results found for <span style={{color:"rgb(120, 8, 8)"}}>"{s()}"</span></h1>
        <hr className="cat_hr" style={{width:"75%"}}/>
        </div>
        <div className="searchEngine">
        <div class="sub-add1">
                    <form class="search3" style={{height: "70%"}}>
                        <input type="text" placeholder="Search Article " class="inp1 color-dark" onChange={(event)=>{
                            setWordEntered(event.target.value);
                            (event.target.value==="")?setDisplay(false):setDisplay(true);
                            console.log(wordEntered);
                        }}/>
                        <button type="submit" class="submit2" onClick={get2}><svg xmlns="http://www.w3.org/2000/svg" width="16"
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
            search2=val.KEYWORD;
            setDisplay(false);
        }}>{val.KEYWORD}</button></li>)
          )}
          </ul> 
          </div>
        </div>
         <div class="full" style={{display: "flex"}}>
    <div class="allcards">
    {r().map((val)=>
    (<div class="card">

    <div class="article-sidebar">

        <a
            href={val.URL}>
            <img class="article-image"
                src={val.IMAGES}
                alt=""/>
        </a>
    </div>
    <div class="article-main">

        <a
            href={val.URL}>
            <h2 class="article-title" style={{overflow: "hidden"}}>{val.HEADING}</h2>
        </a>
        <p class="article-details">
            <li class="article-info1" id="date">{format(parseISO(val.PUBLISHED_DATE), 'dd/mm/yy')}</li>
            <li class="article-info2" id="author">{val.AUTHOR}</li>
        </p>
        <a
            href={val.URL}>
            <p class="article-content" style={{overflow:"hidden"}}>{val.CONTENT}</p>
        </a>

        <button class="btn btn-dark "><a
                href={val.URL}>
                Read The Article</a></button>

    </div>

</div>))}
    

    </div>

<div class="side">

    <h3 class="dis-3">You May Like This...</h3>
    <hr/>
    <ul>
        {res2.map((val)=>
        (<li><a href={val.URL}>{val.HEADING}</a></li>))}
        
        
    </ul>
</div>
</div>
</>
        
    )
  }

//   export{search2, result2};

  {/* <h1 style={{marginLeft: "3%", marginTop:"3%"}}>{res.length} Results found for {search}</h1>
        {console.log(res)}
        <div className="main">
            {res.map((val)=>{
                return( <div class="card">

                <div class="article-sidebar">
        
                    <a
                        href={val.URL}>
                        <img class="article-image" src={val.IMAGES}
                            alt=""/>
                    </a>
                </div>
                <div class="article-main">
        
                    <a
                        href={val.URL}>
                        <h2 class="article-title">{val.HEADING}</h2>
                    </a>
                    <p class="article-details">
                        <li class="article-info1" id="date">Published on {val.PUBLISHED_DATE}</li>
                        <li class="article-info2" id="author">By {val.AUTHOR}</li>
                    </p>
                    <a
                        href={val.URL}>
                        <p class="article-content">{val.CONTENT}</p>
                    </a>
                    
                        <button class="btn btn-dark "><a href={val.URL}> Read The Article</a></button>
                    
                </div>
        
            </div>)
  })}
        
        </div>
        </> */}