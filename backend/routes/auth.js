const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middlewares/fetchUser");
const JWT_SECRET_KEY = "MySecretKey$1214522";

//ROUTE 1: Create a User using POST method "/api/auth/createuser". No login required.
router.post(
  "/createuser",
  // providing validation for different field so that user will send a valid value
  [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "Invalid Name").isLength({ min: 5 }),
    body("password", "Password should be at least 8 chars").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // If there are errors then returning the bad request and the errors that are occuring
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check whether the user with this email already exists in database(mongodb collection)
    try {
      // finding if user email is already present in collection wait for check using await
      let user = await User.findOne({ email: req.body.email });
      // console.log(user);
      // if user with same email exists sending the message with status code 400 i.e. Bad request response
      if (user) {
        return res.status(400).json({ error: "Email already exists!" });
      }

      const salt = bcrypt.genSaltSync(10);
      const secPassword = await bcrypt.hashSync(req.body.password, salt);
      // Create a new user with name email and password after extracting from request body
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      console.log("user",user);

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET_KEY);
      console.log(authtoken);

      // sending user token from server
      res.json({ authtoken });
    } catch (error) {
      // catching errors
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// ROUTE 2 : Authenticate a user using POST method "/api/auth/login". No Login required.
router.post(
  "/login",
  // providing validation for different field so that user will send a valid value of email during login time
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password should be non-empty").exists(),
  ],
  async (req, res) => {
    // If there are errors then returning the bad request and the errors that are occuring
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // checking user details from database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({ error: "Credentials not matched" });
      }

      const passCompare = await bcrypt.compareSync(password, user.password);
      if (!passCompare) {
        return res.status(400).send({ error: "Credentials not matched" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET_KEY);
      console.log(authtoken);
      const success = true;
      // sending user token from server
      res.status(200).json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//ROUTE 3: Create Logged in User details using POST method "/api/auth/getuser". Login required.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// exporting the router module to use in index.js so that we can use it in url /api/auth/ to send request
module.exports = router;
