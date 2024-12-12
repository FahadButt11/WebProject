const model= require("./Models/product.model");

const createProduct= async(title,price,tags)=>{
    
    
    let product= new model();
    product.title=title;
    product.price=price;
    product.tag=tags;
    await product.save();
    return product;

}

const updateProduct= async(_id,title,price,tags)=>{
    
    
    let product= await model.findById(_id);
    product.title=title;
    product.price=price;ss
    product.tag=tags;
    await product.save();
    return product;

}

const getAllProducts= async()=>{
    let all= await model.find();
    return all;

}


const deleteProduct= async(_id)=>{
    let p= await model.findByIdAndDelete(_id);
    return p;

}


module.exports.createProduct=createProduct;
module.exports.updateProduct=updateProduct;
module.exports.getAllProducts=getAllProducts;
module.exports.deleteProduct=deleteProduct;
