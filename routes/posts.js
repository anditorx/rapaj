const router = require("express").Router();
const verify = require("./verifyToken");

const { registerValidation, loginValidation } = require("../validation");

// LOGIN
router.get("/", verify, async (req, res) => {
  res.json({
    posts: {
      title: "My first post",
      description: "random data you should not access",
    },
  });
});

module.exports = router;
