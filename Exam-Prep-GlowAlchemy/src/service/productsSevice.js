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

    },
    async recommend (userId,productId){

        const product = await this.getProduct(productId)

        if (product.owner.equals(userId)){
            throw Error('Owners cannot like or recommend')
        }

        product.recommends.push(userId)

        return product.save()

    },
     getLatest(){
        return Product.find().sort({_id:-1}).limit(3)
    }
}