const nodemailer = require("nodemailer");

async function createTransporter() {
  const user = process.env.EMAIL_USER || "rakibhassan.web@gmail.com";
  const pass = process.env.APP_PASS;

  if (user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user, pass },
      });
      await transporter.verify();
      console.log("Using SMTP transporter for", user);
      return transporter;
    } catch (err) {
      console.warn("SMTP verify failed, falling back to test account:", err.message);
    }
  }

  console.log("No valid SMTP credentials found — using Ethereal test account (dev only).");
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
  return transporter;
}

const sendEmail = async ({ email, subject, otp, template, forgettemp, fullName }) => {
  try {
    const transporter = await createTransporter();
    const from = process.env.EMAIL_USER || "no-reply@ecommerce.local";
    const html = template ? template({ otp }) : (forgettemp ? forgettemp(otp, fullName) : `<p>${otp}</p>`);

    try {
      const info = await transporter.sendMail({
        from: `"E-Commerce" <${from}>`,
        to: email,
        subject,
        html,
      });
      console.log("Email sent, messageId:", info.messageId);
      const previewUrl = nodemailer.getTestMessageUrl
        ? nodemailer.getTestMessageUrl(info)
        : null;
      if (previewUrl) console.log("Preview URL:", previewUrl);
      return { info, previewUrl };
    } catch (primaryErr) {
      console.warn("Primary email send failed, attempting Ethereal fallback:", primaryErr.message);
      // try Ethereal fallback
      const testAccount = await nodemailer.createTestAccount();
      const fallbackTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      const info = await fallbackTransporter.sendMail({
        from: `"E-Commerce" <${from}>`,
        to: email,
        subject,
        html,
      });
      console.log("Fallback email sent, messageId:", info.messageId);
      const previewUrl = nodemailer.getTestMessageUrl
        ? nodemailer.getTestMessageUrl(info)
        : null;
      if (previewUrl) console.log("Fallback Preview URL:", previewUrl);
      return { info, previewUrl };
    }
  } catch (error) {
    console.log("Email error:", error);
    throw error;
  }
};

module.exports = { sendEmail };