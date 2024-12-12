const express = require("express");
const route = express.Router();
const products = require("../Models/product.model");
// route.use(express.json());
route.post('/create', async (req, res) => {
    try {
        let product = new products(req.body);
        await product.save();
        res.send(product);
    } catch (error) {
        res.send(error.message);
    }
});
route.get('/', async (req, res) => {
    try {
        let allPro = await products.find();
        res.send(allPro);
    } catch (error) {
        res.send(error.message);
    }
});
route.delete("/deleteByPrice/:Price", async (req, res) => {
    // let product=await products.find({price:3000});
    try {
        let pro = await products.findOneAndDelete({ price: req.params.Price });
        res.send(pro);
    } catch (error) {
        res.send(error.message);
    }
});
route.put("/update/:title", async (req, res) => {
    try {
        let titled = req.params.title;
        let update = req.body;
        let options = { new: true };
        // let product= await products.find({title:req.params.title});
        let updated = await products.findOneAndUpdate({title: titled }, update, options);
        res.send(updated);

    } catch (error) {
        res.send(error.message);
        console.log(error.message);
    }
});
module.exports = route;