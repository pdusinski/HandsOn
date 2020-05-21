const express = require("express");
const config = require("config");
const router = express.Router();

const auth = require("../../middleware/auth");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

//@ROUTE POST  API/USERS
//@DESC SING UP USER
// @PUBLIC

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email.").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters."
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, admin } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exsts" }] });
      }
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      user = new User({
        name,
        email,
        avatar,
        password,
        admin
      });

      //encrypted password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@put api/users/connect
//@ connect with company
//@ private

router.put(
  "/connect",
  [
    auth,
    check("accessKey", "Please provide a Secret Key")
      .not()
      .isEmpty(),
    check(
      "companyName",
      "Please provide a name of company you want to connect to"
    )
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { accessKey, companyName } = req.body;
    try {
      let user = await User.findById(req.user.id);
      let company = await Company.findOne({
        $and: [
          { companyName: companyName },
          { workers: { $elemMatch: { email: user.email } } }
        ]
      });
      if (!company) {
        return res.status(400).json({ errors: [{ msg: "Not authorized" }] });
      }
      let workers = company.workers;
      let index = workers.findIndex(x => x.email == user.email);

      if (company.workers[index].accessKey !== accessKey) {
        return res.status(400).json({ errors: [{ msg: "Not Authorized" }] });
      }
      company.workers[index].accessGranted = true;
      company.workers[index].user_id = req.user.id;
      await company.save();
      user.worksFor.unshift(company._id);
      user.save();

      return res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
