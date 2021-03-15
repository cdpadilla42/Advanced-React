import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as any);

function makeANiceEmail(text) {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>😘, Chris Padilla</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(resetToken, to) {
  // email user a token
  console.log('sending mail...');
  const info = await transporter.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your Password reset token!',
    html: makeANiceEmail(`Your Password Reset Token is here!
    
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message Sent! Preview at ${getTestMessageUrl(info)}`);
  }
}
