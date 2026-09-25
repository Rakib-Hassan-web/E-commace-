const { verifytoken } = require("../services/helpers")


    const authMiddleware = ( req, res, next)=>{ 

        try {  const token = req.cookies["X-AS-Token"]
 

  
        req.user =decoded
        next()
            
        } catch (error) {
            res.status(401).send({message : "Internal Server Error"})
        }
    }
  





module.exports= authMiddleware