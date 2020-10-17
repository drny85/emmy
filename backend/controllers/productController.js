import Product from '../models/productModel.js'

export const addProduct = async (req, res) => {
    try {

        const {name, description, price, imageUrl, estimatedDelivery, available} = req.body
    
        const product = new Product({name, description, price, imageUrl, estimatedDelivery, available})
        await product.save()
        
    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async (req, res) => {
    try {
        
        const products = await Product.find()
        
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        return res.json(product)
    } catch (error) {
        console.log(error)
    }
}