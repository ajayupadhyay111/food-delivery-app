import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipients = [{ email }];
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html:htmlContent.replace("{verificationToken}",verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to send verification email");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipients = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html:htmlContent,
      template_variables:{
        company_info_name:"BiteNow",
        name:name
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to send welcome email");
  }
};

export const sendResetPasswordEmail = async(email:string,resetURL:string)=>{
    const recipients = [{ email }];
  const htmlContent=generatePasswordResetEmailHtml(resetURL);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset your password",
      html:htmlContent,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to reset password email")
  }
}

export const sendResetSuccessEmail = async(email:string)=>{
    const recipients = [{ email }];
  const htmlContent=generateResetSuccessEmailHtml()
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Password reset successfully",
      html:htmlContent,
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to send password reset successfull email")
  }
}