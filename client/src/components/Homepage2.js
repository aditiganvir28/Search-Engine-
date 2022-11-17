import React, {useEffect, useState} from "react";
import './Homepage2.css'
import Axios from 'axios';
import {
    Link,
    useNavigate
  } from "react-router-dom";
  var cat=[];
  var res=[];
  var search=null;

  export default function HomePage2(){
    const navigate = useNavigate();
    const [category, setCategory]=useState('');
    const [data, setData]=useState([])
    const [userData, setUserData]= useState({loggedIn: false});
    const [articleData, setArticleData]= useState([]);
    const [display, setDisplay] = useState(false);
    const[wordEnteredList, setWordEnteredList]=useState([]);
const [wordEntered, setWordEntered] = useState("");
const[searchWord, setSearchWord]=useState();
const[result, setResult]=useState([]);


    const category_name=(num)=>{
        switch(num){
            case 1:
            return ("ASTROLOGY");
            case 2:
                return("BUSSINESS/ECONOMY");
            case 3:
                return("CULTURE")
            case 4:
                return("EDUCATION")
            case 5:
                return("FASHION")
            case 6:
                return("HEALTH")
            case 7:
                return("INDIA")
            case 8:
                return("POLITICS")
            case 9:
                return("SPORTS")
            case 10:
                return("TECHNOLOGY")
            case 11:
                return("WEB SERIES")
            case 12:
                return("WORLD")
        }
    }

    useEffect(()=>{
        Axios.get("http://localhost:3001/login").then((response)=>{
          setUserData(response.data);
        //   console.log(response.data)
        })
      })

      useEffect(()=>{
        Axios.post("http://localhost:3001/category", {
            category:category
        }).then((response)=>{
            cat=response.data
            setData(response.data);
        })
    })

    // useEffect(()=>{
    //     Axios.post("http://localhost:3001/category", {
    //         category:category
    //     }).then((response)=>{
    //         cat=response.data
    //         setData(response.data);
    //     })
    // })


//Search Engine
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
        res=response.data;
        // console.log(res)
    })}
)
const get2=()=>{
    navigate(`/search/${search}`)
}

//Highlights on homepage
useEffect(()=>{
    Axios.post('http://localhost:3001/homepage').then((response)=>{
        // console.log(response.data);
        setArticleData(response.data);
    })
})

return(
        <>
        <div className="homepage">
        <div className="page">

        <h2 className="display-2 color-dark">Article</h2>
        <h3 className="display-3">Art to Search</h3>

        <ul>
            <li>
                <div>
                <div className="sub-add">
                    <form action="https://www.google.com/search" method="get" className="search">
                        <input type="text" placeholder="Search Article " className="inp color-dark" onChange={(event)=>{
                            setWordEntered(event.target.value);
                            
                            (event.target.value==="")?setDisplay(false):setDisplay(true);
                            console.log(wordEntered);
                        }} value={searchWord}/>
                        <button type="submit" className="submit" onClick={get2}><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg></button>

                    </form>
                </div>
                <ul className={`btnsearch ${(display)?"":"display-none"}`}>           
        {wordEnteredList.map((val)=>
     (<li><button  className="btnsearch2" key={val.toString()}  onClick={(e)=>{
        e.preventDefault();
            setSearchWord(val.KEYWORD)
            search=val.KEYWORD;
        }}>{val.KEYWORD}</button></li>)
          )}
          </ul> 
          </div>
            </li>
        </ul>
    </div>

    <h4 className="art-add">Highlights</h4>
    <hr className="highlight"></hr>
<div id="slider-container" className="slider">

        {articleData.map((val)=>
            (<div className="slide">
            <div className="cards">
    
                <div >
                <h4 className="category" style={{height:"8%"}}>{category_name(val.CATEGORY_ID)}</h4>
                </div>
    
                <hr className='cat_name' style={{height:"0.5%", color:"rgb(2, 2, 23)"}}></hr>
                <div className="ima" style={{height:"45%"}}>
                    <img src={val.IMAGES}
                        alt=""/>
                </div>
                <div className="title" style={{height:"27%"}}>
                    <a href={val.URL}>
                        <h2 className="display-8 color-dark">{val.HEADING}</h2>
                    </a>
                </div>
                <div className="de">
                    <button type="button" className="bt " onClick={()=>{
                        navigate(`/category/${category_name(val.CATEGORY_ID)}`)
                    }}>Read Article</button>
                </div>
            </div>
        </div>)
        )}

	
	
	{/* <div onClick="prev()" className="control-prev-btn">
		 <i className="fas fa-arrow-left"></i>
	</div>
	<div onClick="next()" className="control-next-btn">
		<i className="fas fa-arrow-right"></i>
	</div> */}
</div>


<div className="overlay"></div>
</div>
</>
    )
  }

  export{cat}

  export{res}

  export{search}
