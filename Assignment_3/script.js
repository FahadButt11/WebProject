const express= require("express");
let server= express();

server.set("view engine", "ejs");
server.use(express.static("public"));

server.get('/', (req,res) => {
    console.log("layout page");
    res.render("landingPage");
});

server.get('/portfolio',(req,res) => {
    console.log("portfolio page");
    res.render("myPortfolio");
});

server.listen(5030,()=>{
    console.log("server created at local host 5030");
});
