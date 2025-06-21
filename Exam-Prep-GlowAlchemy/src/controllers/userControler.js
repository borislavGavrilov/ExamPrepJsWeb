import e, { Router } from "express";
import usersService from "../service/usersService.js";
import { AUTH_COOKIENAME } from "../config/index.js";
import { auth, isAuth, isGuest } from "../middlewares/authMiddlewares.js";
import { getError } from "../utils/errorUtils.js";

const userController = Router()


userController.get('/register', isGuest , (req,res) => {
  res.render('user/register' , {pageTitle : 'Register'})
})

userController.post('/register',isGuest, async (req,res) => {
 
    const {name , email , password , confimPassword} = req.body 

    console.log(req.body);
    
    

   try {

   const token =  await usersService.register(name , email , password , confimPassword)

   //attach cookie
    res.cookie(AUTH_COOKIENAME , token)

    res.redirect('/')

  
   } catch (err) {

    res.render('user/register' , {error : getError(err) , userData : req.body})
    

   }
   

})

userController.get('/login',isGuest, (req,res) => {
   res.render('user/login' , {pageTitle : 'Login'})
 })

 userController.post('/login',isGuest, async (req,res) => {
   const {email,password} = req.body
   
   try {
     const token =  await usersService.login(email , password)

  //attach token

  res.cookie(AUTH_COOKIENAME , token)

  res.redirect('/')
    
   } catch (err) {
    res.render('user/login' , {error : getError(err) , userData : req.body})
    
   }

 })

 userController.get('/logout',isAuth, (req,res) => {
   res.clearCookie(AUTH_COOKIENAME)
   res.redirect('/')
 } )


export default userController