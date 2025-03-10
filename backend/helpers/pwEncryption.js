const crypto = require("node:crypto");

// Use environment variable for the secret key
const pwEncrypt = function (password) {
  // Get the secret key from environment variable
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("SECRET_KEY environment variable is not defined");
  }

  // Configuration
  const loopCount = 10_000;
  const charCount = 32;
  const encType = "sha512";

  // Use the secret key as the salt
  return crypto
    .pbkdf2Sync(password, secretKey, loopCount, charCount, encType)
    .toString("hex");
};

module.exports = pwEncrypt;
