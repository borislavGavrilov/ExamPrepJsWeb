import { Router } from "express";
import { isAuth } from "../middlewares/authMiddlewares.js";
import { getError } from "../utils/errorUtils.js";
import productsSevice from "../service/productsSevice.js";

const productController = Router()

productController.get('/create', isAuth , (req,res) => {
  res.render('product/create')
})

productController.post('/create', isAuth , async (req,res) => {
  
    const productData = req.body
    
    const getOwnerId = req.user.id
    
    try {
          
        await productsSevice.create(productData , getOwnerId)
         res.redirect('catalog')
        
    } catch (err) {

         res.render('product/create' , {error : getError(err) , productData : productData})
        
    }
   
})
productController.get('/catalog' , async (req,res) => {
    const productService = await productsSevice.getAllProducts()

    console.log(productService);
    
  res.render('product/catalog' , {productService})
})
productController.get('/:productId/details' , async (req,res) => {
  const productId = req.params.productId
  
  try {

    const productData = await productsSevice.getProduct(productId)
    productData.ingredients = productData.ingredients.replaceAll(',' , '/')

    res.render('product/details' , {productData})
  } catch (err) {
    
  }
  
})
export default productController