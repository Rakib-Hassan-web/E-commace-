const { verifytoken } = require("../services/helpers")


    const authMiddleware = ( req, res, next)=>{ 

        try {  const token = req.cookies["X-AS-Token"]
 
    if(!token) return res.status(401).send({message : "Invalid Request"})
    const decoded = verifytoken(token)

    if(!decoded) return res.status(401).send({message : "Invalid Request"})
  
        req.user =decoded
        next()
            
        } catch (error) {
            res.status(500).send({message : "Internal Server Error"})
        }
    }
  





module.exports= authMiddleware