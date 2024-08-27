const jwt = require ('jsonwebtoken');


const  Protect = async (req,res,next) =>{
    try {
        
        const token =req.cookies?.token
        
        if(token){
            
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
           
           req.user = decoded
           
           
           next()

        } 
    } catch (error) {
        console.log(error)
       res.status(401).send("Unauthorized access") 
    }
}

const restrictTo = (roles) => {
    return async (req,res,next) => {
        const userRole = req.user.role
        if(!roles.includes(userRole)){
            res.status(401).send("Unauthorized access")
        }
        next()

    }
}



module.exports ={
    Protect,
    restrictTo
}