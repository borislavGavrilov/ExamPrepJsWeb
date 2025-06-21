import { Router } from "express";
import productsSevice from "../service/productsSevice.js";

const homeController = Router()


homeController.get('/' , async (req,res) => {

  const productService = await productsSevice.getLatest()

  res.render('home' , {pageTitle : 'Home' , productService})
})


export default homeController