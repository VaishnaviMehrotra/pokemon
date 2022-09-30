const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();


const createAccessToken = (payload, expiresIn = "1hr") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

module.exports = {
  async registerUser(req, res) {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ msg: "User already Exist" });
      }

      let saltRounds = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      let newUser = new User({
        password: hashedPassword,
        email: req.body.email,
      });

      user = await newUser.save();
      let payload = {
        _id: user._id,
        email: user.email,
        password:user.password,
      
      };

      let accessToken = createAccessToken(payload);
      res.cookie('jwt',accessToken)
      res.status(201).json({ payload, accessToken });
    } catch (err) {
      console.log("hbhbhb",err);
    }
  },



  async loginUser(req, res) {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        let passwordMatch = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!passwordMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }
        let payload = {
          _id: user._id,
          email: user.email,
          password:user.password,
        };
        let accessToken = createAccessToken(payload);

        return res.status(200).json({ payload, accessToken });
      }
      return res.status(400).json({ msg: "Invalid credentials" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

 

  
 
  
  

  
  
};