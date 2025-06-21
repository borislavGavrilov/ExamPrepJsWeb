export function getError(err) {

    if (err.name === 'ValidationError'){
     return Object.values(err.errors).at(0).message
    }else {
       return err.message
    }


    
}