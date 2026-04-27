const emailtemplate = ({ otp , }) => {
  return `
  <div style="
    width:100%;
    background-color:#f4f6f8;
    padding:40px 0;
    font-family:Arial, Helvetica, sans-serif;
  ">
    <div style="
      max-width:500px;
      margin:0 auto;
      background:#ffffff;
      border-radius:8px;
      overflow:hidden;
      box-shadow:0 4px 10px rgba(0,0,0,0.1);
    ">
      
      <!-- Header -->
      <div style="
        background:#0f172a;
        color:#ffffff;
        padding:20px;
        text-align:center;
        font-size:22px;
        font-weight:bold;
      ">
        E-Commerce
      </div>

      <!-- Body -->
      <div style="padding:30px; color:#333333;">
        <p style="font-size:16px; margin-bottom:10px;">
          Hello User,
        </p>

        <p style="font-size:14px; line-height:1.6;">
          Thank you for signing up. Please use the verification code below to
          confirm your email address.
        </p>

        <div style="
          margin:30px 0;
          text-align:center;
        ">
          <span style="
            display:inline-block;
            padding:15px 30px;
            font-size:24px;
            letter-spacing:6px;
            font-weight:bold;
            color:#0f172a;
            background:#e5e7eb;
            border-radius:6px;
          ">
            ${otp}
          </span>
        </div>

        <p style="font-size:13px; color:#555;">
          This code will expire in <b>10 minutes</b>.
        </p>

        <p style="font-size:13px; color:#777; margin-top:20px;">
          If you did not request this, please ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="
        background:#f1f5f9;
        text-align:center;
        padding:15px;
        font-size:12px;
        color:#666;
      ">
        © ${new Date().getFullYear()} E-Commerce. All rights reserved.
      </div>

    </div>
  </div>
  `;
};


const forgetPassTemp= (otp,fullName)=>{

  return`
  
  
  
  
  

        <!-- Header -->
        <tr>
          <td style="background:#2563eb; padding:20px; text-align:center;">
            <h1 style="color:#ffffff; margin:0; font-size:24px;">
              Password Reset Request
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px; color:#333333;">
            <p style="font-size:16px; margin:0 0 15px 0;">
              Hi <strong>${fullName}</strong>,
            </p>

            <p style="font-size:15px; line-height:1.6;">
              You requested to reset your password. Use the OTP below to reset your password.
              This OTP will expire in <strong>10 minutes</strong>.
            </p>

            <!-- OTP -->
            <div style="margin:25px 0; text-align:center;">
              <span style="display:inline-block; background:#f1f5f9; padding:15px 30px; font-size:24px; letter-spacing:5px; font-weight:bold; color:#111827; border-radius:6px;">
                ${otp}
              </span>
            </div>

            <p style="font-size:14px; color:#555;">
              If you did not request a password reset, please ignore this email.
            </p>

            <p style="font-size:14px; margin-top:30px;">
              Thanks,<br/>
              <strong>Your App Team</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
            © 2026 Your App. All rights reserved.
          </td>
        </tr>

  

  `
}

module.exports = { emailtemplate, forgetPassTemp };