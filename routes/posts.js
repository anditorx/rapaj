const router = require("express").Router();
const headerToken = require("./verifyToken");
const Post = require("../model/Post");

// get all data
router.get("/", headerToken, async (req, res) => {
  // check if user exists
  const user = await Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving data.",
      });
    });
});

// create data
router.post("/", headerToken, async (req, res) => {
  const post = new Post({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get data by id
router.get("/:id", headerToken, async (req, res) => {
  const id = req.params.id;
  // check if user exists
  const post = await Post.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving data.",
      });
    });
});

// update data
router.put("/:id", headerToken, async (req, res) => {
  const id = req.params.id;
  // check if user exists
  const post = await Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Data not found",
        });
      }
      res.send({
        message: "Data was updated",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while update data.",
      });
    });
});

// delete data
router.delete("/:id", headerToken, async (req, res) => {
  const id = req.params.id;
  // check if user exists
  const post = await Post.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Data not found",
        });
      }
      res.send({
        message: "Data was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete data.",
      });
    });
});

module.exports = router;
