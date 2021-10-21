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
var data;

//All scripts
app.get('/', (req, res)=>{
    res.render('index', {});
});

//Run server
app.listen(process.env.PORT || 4000, ()=>{
    console.log("listening");
});


//API
// https://api.github.com/users/