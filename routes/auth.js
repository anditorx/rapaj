const router = require("express").Router();
const User = require("../model/User");

// validation
const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required().email(),
  password: Joi.string().min(3).required(),
});

router.post("/register", async (req, res) => {
  // validate the data before we a user
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", (req, res) => {
  res.send("login");
});

module.exports = router;
