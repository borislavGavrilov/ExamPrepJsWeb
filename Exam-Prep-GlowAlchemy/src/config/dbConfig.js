import mongoose from "mongoose";

async function initDb (params) {

const dbUrl ='mongodb://127.0.0.1:27017'
const dbName = 'test_exams'
try {

    await mongoose.connect(dbUrl , {dbName})
    console.log('Succsesful connect to DB!');
    
    
} catch (error) {

    console.log('Some problem with Db');
    
    
}

 
} 

export default initDb