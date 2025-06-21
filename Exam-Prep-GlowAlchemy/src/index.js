import express from 'express'
import routs from './routes.js';
import handlebars from 'express-handlebars'
import initDb from './config/dbConfig.js';
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/authMiddlewares.js';


// init express
const app = express()

//db
initDb()

//css 
app.use(express.static('src/public'))

//use cookie-parser
app.use(cookieParser())

// use body parser like body
app.use(express.urlencoded());

//config handlebars as view engine
app.engine('hbs',handlebars.engine({
  extname : 'hbs',
  runtimeOptions:{
    allowProtoMethodsByDefault:true,
    allowProtoPropertiesByDefault:true
  }
}))

//Set handlebars as default view engine
app.set('view engine' , 'hbs')

//change default views directory
app.set('views' , 'src/views')

//Use auth middlewares
app.use(auth)

//Use routes
app.use(routs)



app.listen(3000 , () => {console.log('Server is listenong on this port 3000...');
})