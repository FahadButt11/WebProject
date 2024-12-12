const express= require("express");
let server= express();
const {createProduct,getAllProducts,deleteProduct,updateProduct}= require("./productOperations")
// ClusterPassword=> .24eNjRMkYg94MN
server.use(express.json());
const products= require("./Routes/Products.route");
server.use('/products',products);



const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://cluster0.2owop.mongodb.net/",{
    dbName: "E-Commerce",
    user: "fahadbutt",
    pass: ".24eNjRMkYg94MN",})
    .then(async()=>{

    console.log("successfully connected!");

    // const p=await createProduct("hello",200,["one","two"]);
    // console.log(p);
    // let p= await getAllProducts();
    // console.log(p);
    // let p=await deleteProduct("67584b10f1f7462a23137cc0");

    // console.log(p);

    // console.log(await updateProduct("675849da81bbd05e65f4edba","updated helldfafo",500,[]));


}).catch(err=>{
    console.log(err);
});


server.listen(3000,()=>{
    console.log("server started on port 3000...");
});



