var jwt = require('jsonwebtoken');
const crypto = require("crypto");
// ----------------otp Genarator----------------

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};


// ----------acc_token Generate---------------

const GenerateACCTkn=(user)=>{
  return jwt.sign({
 
    _id : user._id,
    email:user.email,
    role:user.role

}, process.env.JWT_SEC , { expiresIn: '1h' });
}

 // ----------refresh_token Generate---------------

const GenerateREFR_Tkn=(user)=>{
  return jwt.sign({

    _id : user._id,
    email:user.email,
    role:user.role
}
, process.env.JWT_SEC , { expiresIn: '10d' });
}
// -----------------forget pass tkn-----------

const generateResetPassToken = () => {
  const resetToken = crypto.randomBytes(16).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  return { resetToken, hashedToken };
};

const hashResetToken = (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return hashedToken;
};

const verifyToken = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.JWT_SEC);
    return decoded;
  } catch (err) {
    return null;
  }
};





// -----------------verify token------------------
const verifytoken = (token)=>{
  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC)
    return decoded
  } catch (error) {
     return null
  }
}


module.exports= {generateOTP, GenerateACCTkn, GenerateREFR_Tkn, verifytoken,generateResetPassToken, hashResetToken, verifyToken}