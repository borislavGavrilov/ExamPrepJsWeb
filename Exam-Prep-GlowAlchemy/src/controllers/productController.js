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

  res.render('product/catalog' , {productService})
})

productController.get('/:productId/details' , async (req,res) => {
  const productId = req.params.productId

  try {

    const productData = await productsSevice.getProduct(productId)
    
    const isOwner = productData.owner.equals(req.user?.id)

    productData.ingredients = productData.ingredients.replaceAll(',' , '/')

    const isRecommended = productData.recommends.includes(req.user?.id)


    res.render('product/details' , {productData , isOwner , isRecommended})
  } catch (err) {

    res.render('404' , {error : getError(err)})
    
  }
  
})

productController.get('/:productId/recommend' , isAuth, async (req,res) => {
  const productId = req.params.productId

  const userId = req.user.id

  
 try {

  await productsSevice.recommend(userId , productId)

  res.redirect(`/products/${productId}/details`)
  
  
 } catch (err) {

  res.render('404' , {error : getError(err)})
  
 } 
  
})
export default productController