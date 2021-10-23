//all modules
import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";
import request from "request";
import https from "https";

//set modules
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//All variables
var git_data;
var repos;
var user;

//All scripts
app.get('/', (req, res)=>{
    res.render('home', {});
});

app.get('/search', (req, res)=>{
    let l = repos.length;
    res.render('index', {        
        ejs_git_data : git_data,
        ejs_repos_data : repos,
        ejs_cards : l
    });
});

app.post("/search", (req, res)=>{
    user = req.body.user;
    let msg = get_data();
    
    setTimeout(() => {
        // console.log(git_data.name);
        msg.then(message=>{
            if(message === false){
                res.render("error", {});
            }
            else if(message === 404){
                res.render("error", {});
            }
            else{
                res.redirect('/search');
            }
        })
        
    }, 1000);
    
});

//Run server
app.listen(process.env.PORT || 4000, ()=>{
    console.log("listening");
});


//fetch data


async function get_data(){

    try{
        const data = await fetch("https://api.github.com/users/" + user);
        git_data = await data.json();
        // console.log(git_data);
    
        const data_repo = await fetch("https://api.github.com/users/" + user + "/repos");
        repos = await data_repo.json();
        // console.log(repos.length);
        // console.log(data.status);
        return data.status;
    }
    catch{
        // console.log(err);
        return false;
    }
    
}



//API
// https://api.github.com/users/