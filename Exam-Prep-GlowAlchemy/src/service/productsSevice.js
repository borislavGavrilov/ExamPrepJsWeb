import Product from "../models/Product.js"

export default {
  create (productData , owner){
      
   return Product.create({...productData , owner})
    },
    async getAllProducts () {
     
        const products = await Product.find()

        return products
    },
    getProduct(productId) {
        return Product.findById(productId)

    }
}