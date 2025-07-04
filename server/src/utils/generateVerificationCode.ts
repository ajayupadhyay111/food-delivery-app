export const generateVerificationCode = (length = 6): string => {
  let characterStrings =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let verificationCode = "";

  const charactersLength = characterStrings.length;

  for (let i = 0; i < length; i++) {
    verificationCode += characterStrings.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  return verificationCode;
};
