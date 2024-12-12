const express= require("express");
let server=express();

server.use(express.json());
let products=["one","two","Three"];


server.get("/",(req,res)=>{

    res.send("hello world");



}).listen(3030);

server.get("/api/products",(req,res)=>{
    res.send(products);
})
server.get("/api/products/:index",(req,res)=>{
    res.send(products[req.params.index]);

})

server.post("/api/products",(req,res)=>{
    products.push(req.body.name);
    res.send(products);

})

server.put("/api/products/:index",(req,res)=>{
    products[req.params.index]= req.body.name;
    res.send(products);
})

server.delete("/api/products/:index",(req,res)=>{
    products.splice(req.params.index,1);
    res.send([products]);
})