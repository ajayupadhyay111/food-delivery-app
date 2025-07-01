
export const generateVerificationCode = async () => {
  let characterStrings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let verificationCode = ""

  const charactersLength = characterStrings.length;

  for(let i =0;i<charactersLength;i++){
    verificationCode+=characterStrings.charAt(Math.floor(Math.random()*charactersLength))
  }

  return verificationCode;
};

