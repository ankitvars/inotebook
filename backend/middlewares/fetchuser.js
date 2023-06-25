const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "MySecretKey$1214522";

const fetchuser = async (req, res, next) => {
  // Get the user id from jwt and add it to request object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    // catching errors
    console.error(error.message);
    res.status(401).send("Invalid Auth token");
  }

};

module.exports = fetchuser;
