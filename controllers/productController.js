import Product from "../models/productModel"


const addProduct = async(req,res)=>{
    try {
        const {name,price,image,incrediants,category,isAvailable,isVeg,stock} = req.body

        if(!name || !price || !image || !incrediants || !category || !isAvailable || !isVeg || !stock){
            return res.status(400).json({message:"All fields are required"})
        }
        const productExist = await Product.findOne({name})

        if(!productExist){
            return  res.status(404).json({message:"Product not found"})
        }
    } catch (error) {
        
    }
}

export {addProduct}