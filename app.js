require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');



const list = ["Cook","Eat","Cry"];
const workItems = [];
let item = "";
let day;




app.get("/",function(req,res){

    day = date.getDay();
    // day = date.getDate();

    res.render("list",{
        listTitle: day,
        list: list
    });
});

app.post("/",function(req,res){

    item = req.body.newItem;

    if(item != "")
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        list.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req,res){
    res.render("list",{
        listTitle: "Work List",
        list: workItems
    });
});

app.post("/work", function(req,res){

    item = req.body.newItem;

    if(item != "")
    workItems.push(item);

    res.redirect("/work");
});


app.get("/about", function(req,res){
    res.render("about",{});
});

app.post("/about", function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT||3000,function(){
    console.log("Server is successfully running on port 3000");
});
