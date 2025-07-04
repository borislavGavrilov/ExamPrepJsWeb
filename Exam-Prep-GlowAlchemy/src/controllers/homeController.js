import { Router } from "express";
import productsSevice from "../service/productsSevice.js";

const homeController = Router()


homeController.get('/' , async (req,res) => {

  const productService = await productsSevice.getLatest()

  res.render('home' , {pageTitle : 'Home' , productService})
})

homeController.get('/search' , async (req,res) => {
   
  const products = await productsSevice.getAllProducts()

  res.render('search' , {products})
})


export default homeController