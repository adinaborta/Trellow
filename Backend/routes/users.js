var express = require("express");
var router = express.Router();
const query = require("../db.js");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const result = await query(`SELECT username FROM public."user"`);
  res.send(result.rows);
});

/* GET users listing. */
router.get("/:user_id", async function (req, res, next) {
  const user_id = req.params.user_id;
  console.log(user_id);
  if (null == user_id) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  const result = await query(
    `SELECT username, name FROM public."user" WHERE user_id = $1`,
    [user_id]
  );
  res.send(result.rows[0]);
});

/* LOGIN USER. */
router.post("/login", async function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  try {
    const result = await query(
      `SELECT user_id FROM public."user" WHERE email=$1 and password=$2`,
      [email, password]
    );
    if (result.rows[0]) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Email already in use." });
  }
});

/* SIGNUP USER. */
router.post("/signup", async function (req, res, next) {
  let email = req.body.email;
  let name = req.body.name;
  let username = req.body.username;
  let password = req.body.password;
  if (!email || !password || !name || !username) {
    return res.status(400).send({ message: "Bad request. Try again." });
  }
  try {
    const result = await query(
      `INSERT INTO public."user" (email, name, password, username) VALUES ($1, $2, $3, $4) RETURNING user_id`,
      [email, name, password, username]
    );
    res.send(result.rows[0]);
  } catch (error) {
    res.status(400).send({ message: "Email already in use." });
  }
});

module.exports = router;
