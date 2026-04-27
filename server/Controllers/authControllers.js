const userSchema = require("../models/userSchema")
const { uplodecloudinary, deletfromCloudinary } = require("../services/cloudinaryServices")
const {
  sendEmail
} = require("../services/emailServices")
const { sendError, sendSuccess } = require("../services/responseHandler");
const emailtemplate = require("../services/emailTemplate")
const {
  generateOTP,
  GenerateACCTkn,
  GenerateREFR_Tkn,
  GenerateFORGET_Tkn,
  generateResetPassToken,
  verifyToken
} = require("../services/helpers")
const {
  isValidEmail,
  isValidPassword
} = require("../services/validation")

// -----------registration--------------
const RegisterUSer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone
    } = req.body;

    if (!fullName) return sendError(res, "fullName is Required", 400);  
    if (!email) return sendError(res, "email is Required", 400);       
    if (!isValidEmail(email)) return sendError(res, "Invalid Email", 400);   
    if (!password) return  sendError(res, "password is Required", 400);  
    if (!isValidPassword(password)) return   sendError(res, "Invalid Password", 400);   
    const existinguser = await userSchema.findOne({
      email
    });
    if (existinguser) return sendError(res, "User Already Exists", 400);    

    const otp = generateOTP();

    const newUser = new userSchema({
      fullName,
      email,
      password,
      phone,
      otp,
      otpExpires: new Date(Date.now() + 2 * 60 * 1000),
    });

    await newUser.save();

    await sendEmail({
      email,
      subject: "Email Verification",
      otp,
      template: emailtemplate,

    });
    sendSuccess(res, "User Registered Successfully", 201);

   

  } catch (error) {
   
   sendError(res, "Server error", 500);

  }
};


// -----------verifyOTP--------------

const verifyOTP = async (req, res) => {
  try {
    const {
      otp,
      email
    } = req.body

    if (!otp) return  sendError(res, "OTP is required", 400);  
    if (!email) return   sendError(res, "Email is required", 400);  

    const user = await userSchema.findOne({
      email,
      otp: Number(otp),
      otpExpires: {
        $gt: new Date()
      },
      isverified: false,
    })

    if (!user) return   sendError(res, "Invalid or Expired OTP", 400); 
    user.isverified = true
    user.otp = null
    user.otpExpires = null
    await user.save()

    sendSuccess(res, "OTP Verified Successfully", 200);

  

  } catch (error) {

    sendError(res, "Server error", 500);
  }

}


// ------------resendOTP-------------

const resendOTP = async (req, res) => {
  try {
    const {
      email
    } = req.body

    if (!email) return sendError(res, "Email is required", 400);     
    
    const user = await userSchema.findOne({
      email,
      isverified: false,
    })
    if (!user) return  sendError(res, "Invalid or Unverified User", 404);

    const otp = generateOTP();
    user.otp = otp
    user.otpExpires = new Date(Date.now() + 2 * 60 * 1000)

    await user.save();

    await sendEmail({
      email,
      subject: "Email Verification",
      otp,
      template: emailtemplate,

    });

     sendSuccess(res, "OTP Resent Successfully", 200);


  } catch (error) {
    sendError(res ,"server Error" ,500)

  }
}


// ------------login------------


const LoginUser = async( req,res)=> {
  try {

    const {email ,password} = req.body;

    

 if (!email)  return sendError(res, "Email is Required", 400);  
 if (!isValidEmail(email)) return sendError(res, "Invalid Email", 400); 

    if (!password) return  sendError(res, "password is Required", 400);  
 if (!isValidPassword(password)) return sendError(res, "Invalid Password", 400);   



 const user = await userSchema.findOne({email})

   if (!user) return sendError(res, "User Not Registered", 400);     
    const Pass_Match = await user.comparePassword(password)

    if (!Pass_Match) return  sendError(res, "Wrong Password", 400);   
    if (!user.isverified) return sendError(res, "User Not Verified", 400);  
    const ACC_TKN =  GenerateACCTkn(user)
    const REF_TKN =  GenerateREFR_Tkn (user)

      
      res.cookie( "X-AS-Token" ,ACC_TKN)
      res.cookie( "X-RF-Token" ,REF_TKN)

    res.cookie('X-AS-Token', ACC_TKN, {
     httpOnly: false,
     secure: false,   
     maxAge:3600000
     });

      res.cookie('X-RF-Token', REF_TKN, {
     httpOnly: false,
     secure: false,   
     maxAge:864000000
     });


 sendSuccess(res, "Login Successful", 200);  

    
  } catch (error) {
   sendError(res, "Server error", 500);
  
  }
}


//-------------------forget pass-------------


const forgetpass = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return sendError(res, "Email is Required", 400); 

    if (!isValidEmail(email))  return sendError(res, "Invalid Email", 400); 

    const user = await userSchema.findOne({ email });
    if (!user)  return sendError(res, "User Not Registered", 400); 

     const { resetToken, hashedToken } = generateResetPassToken();
    user.resetPassToken = hashedToken;
    user.resetExpire = Date.now() + 2 * 60 * 1000;
    await user.save();
    const RESET_PASSWORD_LINK = `${process.env.CLIENT_URL || "http://localhost:3000"
      }/auth/resetpass/${resetToken}`;
    sendEmail({
      email,
      subject: "Reset Your Password",
      otp: RESET_PASSWORD_LINK,
      template: emailtemplate.forgetPassTemp,
      fullName: user.fullName
    });
   sendSuccess(res, "Forget password email sent successfully", 200); 
   

  } catch (error) {
   sendError(res, "Server error", 500);
  }
};

// --------------user Get profile-------------

const GetUserProfile = async (req, res) => {


try {
  const userID = await userSchema.findById(req.user._id).select(" -password -otp -otpExpires -resetExpire -resetPassToken")

if(!userID)  return sendError(res, "user not found", 404); 

  sendSuccess(res, "user profile fetched successfully",userID, 200); 
  
} catch (error) {
 sendError(res, "Server error", 500);
  
  
}


}

// -------------- update user profile-----------


const updateUserProfile = async ( req, res)=>{

try {

    const {phone,fullName} = req.body;
    const userId = req.user._id;
    const avatar = req.file
  
const user = await userSchema.findById(userId).select("-password -otp -otpExpires -resetExpire -resetPassToken")

    if(avatar) {
       const imgPublicId = user.avatar.split("/").pop().split(".")[0];
     deletfromCloudinary(`avatar/${imgPublicId}`);
      const response =await uplodecloudinary(avatar ,"avatar")
     
      user.avatar =response.secure_url;
    }
    if(phone) user.phone =phone;
    if(fullName) user.fullName =fullName;

    
user.save()
   sendSuccess(res, "user profile updated successfully",user, 200); 

  
  
} 
catch (error) {
  sendError(res, "Server error", 500);
}
}



// -----------refresh token---------------]

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies?.["X-RF-Token"] || req.headers.authorization;
    if (!refreshToken)  return sendError(res, "Refresh token missing", 400); 
   
    const decoded = verifyToken(refreshToken)
    if(!decoded) return;
    const accessToken = GenerateACCTkn(decoded)
    res.cookie('X-AS-Token', accessToken, {
     httpOnly: false,
     secure: false,   
     maxAge:3600000
     }).send({ message:"access token refreshed successfully"});

  } catch (error) {

    sendError(res, "Server error", 500);
  }
};


module.exports = {
  RegisterUSer,
  verifyOTP,
  resendOTP,
  LoginUser,
  forgetpass,
  GetUserProfile,
  updateUserProfile,
  refreshAccessToken
  
}