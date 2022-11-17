const express= require('express');
const app= express();
const mysql= require('mysql');
const cors=require('cors');
const bcrypt=require('bcrypt');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session= require('express-session');


const saltRounds=10;

var user=[];

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET", "POST"],
    credentials:true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key:"userId",
    secret:"subscribe",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires:60*60*24*60*60*60,
    },
}))

//Database Connection
const db=mysql.createConnection(
    {
        user:"root",
        host:"localhost",
        password:"password",
        database:"ARTICLE_SEARCH_ENGINE"
    }
)


//localhost connection
app.listen('3001', ()=>{
    console.log('Listening on port 3001');
})

//Regetration form
app.post('/register', (req,res)=>{

    const username= req.body.username;
    const email= req.body.email;
    const password= req.body.password;
    const intrest_of_field_1= req.body.intrest_of_field_1;
    const intrest_of_field_2= req.body.intrest_of_field_2;
    const intrest_of_field_3= req.body.intrest_of_field_3;

    console.log(username)

    bcrypt.hash(password, saltRounds, (err,hash)=>{
        if(err){
            console.log(err);
        }

        db.query("INSERT INTO users (username, email, password_, intrest_of_field_1, intrest_of_field_2, intrest_of_field_3) values (?,?,?,?,?,?)", 
    [username, email, hash, intrest_of_field_1, intrest_of_field_2, intrest_of_field_3], 
    (err,res)=>{
        console.log(err);
    } )
    })
})

//login form
app.post('/login', (req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
    db.query("SELECT * FROM USERS WHERE USERNAME=?", 
    [username],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>0){
                bcrypt.compare(password, result[0].PASSWORD_, (error,response)=>{
                    if(error){
                        console.log(error)
                    }
                    if(response){
                        req.session.user=result;
                        // console.log(req.session.user);
                        res.send({message: "Successfully logged in"});
                    }else{
                        res.send({message: "Wrong username/password combination!"})
                    }
                })
            }
            else{
                console.log(result)
                res.send({message: "User does not exist"})
            }
           
        });
    } )
    
    //get request for login
    app.get("/login", (req,res)=>{
        if(req.session.user){
            res.send({loggedIn: true, user:req.session.user})
            user=req.session.user[0].USER_ID;
        }
        else{
            res.send({loggedIn: false})
        }
    })

    //logout
    app.get("/logout", (req,res)=>{
        req.session.destroy();
        res.send({loggedIn: false})
    })

    //Category Page
    app.post('/category', (req,res)=>{
        const category=req.body.category;

        db.query("SELECT * FROM ARTICLES INNER JOIN CATEGORY ON ARTICLES.CATEGORY_ID=CATEGORY.CATEGORY_ID AND TYPE_OF_CATEGORY=?", [category], (e,r)=>{
            if(e){
                console.log(e)
            }
            if(r){
                res.send(r)
            }
        })
    })

    //Add article Form
    app.post('/addArticle', (req,res)=>{
        const articleHeading= req.body.articleHeading;
        const articleUrl= req.body.articleUrl;
        const category= req.body.category;
        const date= req.body.date;
        const imageUrl= req.body.imageUrl;
        const website= req.body.website;
        const author= req.body.author;
        const content= req.body.content;
        const userData=req.body.userData


        //If new websites enter it will be added in the website table of database
        db.query("INSERT INTO websites (website_name) SELECT ? WHERE NOT EXISTS (SELECT website_name FROM websites WHERE website_name=?);",[website, website], (e,r)=>{
            if(e){
                console.log(e);
            }
            if(r){
                console.log("website name inserted");
            }
        })

        //if new author enters it will be added in the author table of database
        db.query("INSERT INTO author (author_name) SELECT ? WHERE NOT EXISTS (SELECT author_name FROM author WHERE author_name=?);",[author, author], (e,r)=>{
            if(e){
                console.log(e);
            }
            if(r){
                console.log("author name inserted");
            }
        })

        //Incrmenting the no of articles in category table
        db.query("update category set no_of_article=no_of_article+1 where type_of_category=?", [category], (e,r)=>{
            if(e){
                console.log(e)
            }
            if(r){
            console.log(r);
            }
        })

       //Adding article to articles table in the database
         db.query("INSERT INTO ARTICLES (HEADING,URL,IMAGES,CATEGORY_ID, WEBSITE_ID, PUBLISHED_DATE, AUTHOR_ID, CONTENT) VALUES (?,?,?,(SELECT CATEGORY_ID FROM CATEGORY WHERE TYPE_OF_CATEGORY=?),(SELECT WEBSITE_ID FROM WEBSITES WHERE WEBSITE_NAME=?),?,(SELECT AUTHOR_ID FROM AUTHOR WHERE AUTHOR_NAME=?),?)"
        ,[articleHeading, articleUrl, imageUrl,category ,website, date,author, content], (e,r)=>{
            if(e){
                console.log(e)
            }
            if(r){
            console.log(r);
            }
        }
        )
   
        //Adding article id to user added articles
        db.query("INSERT INTO USER_ADDED_ARTICLES (USER_ID, ARTICLE_ID) VALUES (?,(SELECT ARTICLE_ID FROM ARTICLES WHERE HEADING=?))",
        [userData, articleHeading], (e,r)=>{
            if(e){
                console.log(e)
            }
            if(r){
            console.log(r);
            }
        })

        // //Articles heading for User profile
        // db.query("SELECT HEADING FROM ARTICLES INNER JOIN USER_ADDED_ARTICLES ON ARTICLES.ARTICLE_ID=USER_ADDED_ARTICLES.ARTICLE_ID WHERE USER_ADDED_ARTICLES.USER_ID=?",
        // [userData.USER_ID], (e,r)=>{
        //     if(e){
        //         console.log(e)
        //     }
        //     if(r){
        //     console.log(r);
        //     }
        // })

    })

    //Search engine
    app.post('/api/get', (req,res)=>{
        const wordEntered=req.body.wordEntered;
        console.log(wordEntered);
        db.query("Select * from keywords where keyword like ?",  [wordEntered + '%'],  (err,r)=>{
            if(err){
                console.log(err);
            }
                res.send(r)
            
        })
    })
    
    //Search engine
    app.post('/api/get2', (req,res)=>{
        const searchWord=req.body.searchWord;
        db.query("SELECT * FROM articles WHERE heading REGEXP ?", [searchWord + '?'] , (e,r)=>{
            if(e){
                console.log(e);
            }
                res.send(r);
            
        })
    })

    //Adding Articles to the database
    app.post('/profile', (req,res)=>{
        db.query("SELECT HEADING FROM ARTICLES INNER JOIN USER_ADDED_ARTICLES ON ARTICLES.ARTICLE_ID=USER_ADDED_ARTICLES.ARTICLE_ID WHERE USER_ID=?",
         [user],
        (e,r)=>{
            if(e){
                console.log(e)
            }
            if(r){
                res.send(r);
            }
        })
    })

    app.post('/del', (req,res)=>{
        const heading= req.body.heading
        const article_id=req.body.article_id

        console.log(heading);
        console.log(article_id);

        db.query("DELETE FROM USER_ADDED_ARTICLES WHERE ARTICLE_ID=?", [article_id],
        (e,r)=>{
            if(e){
                console.log(e)
            }
            if(r){
                console.log(r);
            } 
        })

        db.query("DELETE FROM ARTICLES WHERE HEADING=?",[heading],
        (e,r)=>{
            if(e){
                console.log(e)
            }
            if(r){
                console.log(r);
                res.send("deleted")
            }
        })
    })

    app.post('/homepage', (req,res)=>{
        db.query("WITH added_row_number AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY category_id ORDER BY published_date) AS rown FROM articles) SELECT * FROM added_row_number WHERE rown = 1",
        (e,r)=>{
            if(e){
                console.log(e)
            }
            if(r){
                // console.log(r);
                res.send(r);
            }
        })
    })

    

    app.post('/s', (req,res)=>{
        db.query("WITH added_row_number AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY category_id ORDER BY published_date) AS rown FROM articles) SELECT * FROM added_row_number WHERE rown = 3",
        (e,r)=>{
            if(e){
                console.log(e);
            }
            if(r){
                // console.log(r);
                res.send(r);
            }
        })

    })

