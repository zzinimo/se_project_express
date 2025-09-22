const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");
//get request
router.get("/", getUsers);

//get request using ID's
router.get("/:userId", getUser);

//post request
router.post("/", createUser);

module.exports = router;
