const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  // Get the token from the Auth header:
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ")[1] : null; // Remove the word 'Bearer' from the token

  if (tokenKey) {
    //  JWT must be verified!
    jwt.verify(
      tokenKey,
      process.env.ACCESS_KEY,
      (err, data) => (req.user = data)
    );
    console.log("User:", req.user);
  } else {
    res.errorStatusCode = 401;
    throw new Error("Not authorized to access this route");
  }

  next();
};
