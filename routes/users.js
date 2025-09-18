const router = require("express").Router();
//get request
router.get("/", (req, res) => {
  res.send("Success");
});

//get request using ID's
router.get("/:userId", (req, res) => {
  res.send("Success userId");
});

//post request
router.post("/", (req, res) => {
  res.send("Success post");
});

module.exports = router;
