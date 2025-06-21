import { JWTSECRET } from "../config/index.js"
import jsonwebtoken from 'jsonwebtoken'

export function generateToken(user) {
    

   const payload = {
    id : user.id,
    email : user.email,
    name : user.name
   }

   const token = jsonwebtoken.sign(payload , JWTSECRET , {expiresIn : '2h'})

   return token
}