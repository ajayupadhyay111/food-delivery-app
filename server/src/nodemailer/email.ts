import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";
import transporter from "./nodemailer";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification mail",
      html: htmlContent.replace("{verificationToken}", verificationToken),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error sending mail ", error);
      } else {
        console.log("Email sent successfully: ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to send verification email");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your email is verified",
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error while send welcome email ", error);
      } else {
        console.log("Welcome email sent successfully: ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to send welcome email");
  }
};

export const sendResetPasswordEmail = async (
  email: string,
  resetURL: string
) => {
  const htmlContent = generatePasswordResetEmailHtml(resetURL);
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password email",
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error while send welcome email ", error);
      } else {
        console.log("Welcome email sent successfully: ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to reset password email");
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const recipients = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password reset successfully",
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error while send welcome email ", error);
      } else {
        console.log("Welcome email sent successfully: ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to send password reset successfull email");
  }
};
