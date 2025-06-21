import { AUTH_COOKIENAME, JWTSECRET } from "../config/index.js"
import jsonwebtoken from 'jsonwebtoken'

export function auth(req,res,next){

    const token = req.cookies[AUTH_COOKIENAME]

    if(!token){
        return next()
    }

    try {
         const user = jsonwebtoken.verify(token,JWTSECRET)
         req.user=  user
         req.isAuthenticated = true

         res.locals.user = user
         res.locals.isAuthenticated = true
         next()
        
    } catch (error) {
        res.clearCookie(AUTH_COOKIENAME)
        res.redirect('/users/login')
    }
    

}

export function isAuth(req,res,next) {

    if(!req.isAuthenticated){
      return  res.redirect('/users/login')

    }

    next()
    
}

export function isGuest(req,res,next) {
    
    if(req.isAuthenticated){
        return res.redirect('/')
    }
    next()
    
}