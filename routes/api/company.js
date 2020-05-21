const express = require("express");
const Company = require("../../models/Company");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const router = express.Router();

//@ROUTE POST API/COMPANY
//@DESC  create a company
//@ACCESS PrivateServer Error");

router.post(
  "/",
  [
    auth,
    check("companyName", "Please provide a name for your company")
      .not()
      .isEmpty(),
    check("address", "Please provide an address")
      .not()
      .isEmpty(),
    check("description", "Please provide a brief description for this team")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { companyName, address, description, admin } = req.body;

    try {
      if (admin == false) {
        return res.status(401).json({ errors: [{ msg: "Not authorized" }] });
      }
      let company = await Company.findOne({
        $and: [{ owner: req.user.id }, { companyName }]
      });
      if (company) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Company already exists" }] });
      }
      let user = await User.findById(req.user.id);

      company = new Company({
        owner: req.user.id,
        companyName,
        address,
        description
      });
      await company.save();

      let createdCompany = await Company.findOne({
        $and: [{ owner: req.user.id }, { companyName }]
      });
      user.owns.unshift(createdCompany._id);
      await user.save();

      return res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@GET api/company/:company_id
//@ Get info about the company
//@private auth

router.get("/:company_id", auth, async (req, res) => {
  try {
    let company = await Company.findById(req.params.company_id).populate(
      "workers.user_id"
    );
    if (!company) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No assocciated company found" }] });
    }

    return res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@PUT api/company/add_worker/:company_id
//@ add a worker to the company
//@private auth + owner

router.put(
  "/add_worker/:company_id",
  [
    auth,
    check("name", "Please provide a full name of your employee.")
      .not()
      .isEmpty(),
    check("email", "You must provide a correct an email address").isEmail(),
    check(
      "accessKey",
      "Please provide at least 4 characters password"
    ).isLength({ min: 4 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, accessKey } = req.body;
      let company = await Company.findOne({
        $and: [
          { owner: req.user.id },
          { _id: req.params.company_id },
          { workers: { $elemMatch: { email: email } } }
        ]
      });
      if (company) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "Provided email is already on your list" }]
          });
      }
      company = await Company.findById(req.params.company_id);
      let worker = {
        name,
        email,
        accessKey,
        user_id: req.user.id
      };

      company.workers.unshift(worker);
      await company.save();
      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@PUT api/company/delete_worker/:company_id
//@ delete a worker from the company
//@private auth + owner

router.put("/delete_worker/:company_id/:email", auth, async (req, res) => {
  try {
    let email = req.params.email;

    let company = await Company.findOne({
      $and: [
        { owner: req.user.id },
        { _id: req.params.company_id },
        { workers: { $elemMatch: { email: email } } }
      ]
    });
    if (!company) {
      return res.status(400).json({
        errors: [{ msg: "Not authorized or no accociated email fonud" }]
      });
    }
    company = await Company.findById(req.params.company_id);
    let listOfWorkers = company.workers;

    let index = listOfWorkers.findIndex(x => x.email == email);

    company.workers.splice(index, 1);

    const teams = company.teams;

    const a = teams.map(e => {
      const emailInMembers = e.members.includes(email);
      if (emailInMembers) {
        const indexIn = e.members.indexOf(email);
        e.members.splice(indexIn, 1);
      }
    });

    await company.save();
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
