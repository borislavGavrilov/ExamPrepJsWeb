import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userControler.js";

const routs = Router()

routs.use(homeController)
routs.use('/users',userController)
routs.all('*url' , (req,res) => {
  res.render('404', {pageTitle : 'Not Found'})
})


export default routs