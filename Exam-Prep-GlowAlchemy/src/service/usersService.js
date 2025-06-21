import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/userToken.js"


export default {
   async register(name,email,password,rePassword){

    const isExist = await this.findUser(email)
    
    if (isExist){
        throw Error ('Email alredy exist!')
    }

    if (password !== rePassword){
        throw Error('Wrong rePass')
    }
   if (!password || password.trim() === '') {
  throw new Error('Password is required');
}
    
    const hashPass = await bcrypt.hash(password , 10)
    password = hashPass

    const newUser = await User.create({name , email , password})

    const token = generateToken(newUser)

    return token

    },

   async findUser (email){

    return User.findOne({email: email})
    

   }
   ,
   async login(email , password){

    const existUser =  await this.findUser(email)
    
    if (!existUser){
     throw Error('Wrong username')
    }

    const comparePass = await bcrypt.compare(password , existUser.password)

   if (!comparePass){
    throw Error ('Wrong password')
   }

   //Generate token

   const token = generateToken(existUser)
   console.log(token);
   
   
   return token
   }
}
