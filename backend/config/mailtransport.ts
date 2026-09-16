import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();
  console.log(testAccount);

  // Create a transporter using the test account
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  
  export default transporter;