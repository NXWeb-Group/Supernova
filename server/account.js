import bcrypt from "bcrypt";
import evalidator from "email-validator";
import { ObjectId } from "mongodb";
import { account } from "./mongo.js";

const saltRounds = Number(process.env.SALT_ROUNDS);

export async function getaccount(user) {
  const query = evalidator.validate(user)
    ? { email: new RegExp(`^${user}$`, "i") }
    : { username: new RegExp(`^${user}$`, "i") };
  return (await account.findOne(query)) || "none";
}

export async function login(req, res) {
  try {
    const acc = await getaccount(req.body.username);
    if (acc === "none")
      res.send({ status: "error", message: "Invalid Username or Password" });
    else {
      if (await bcrypt.compare(req.body.password, acc.password)) {
        req.session.username = acc.username;
        req.session.userid = acc._id;
        req.session.valid = true;
        res.send({
          status: "successful",
          username: acc.username,
          tokens: acc.tokens,
        });
      } else
        res.send({ status: "error", message: "Invalid Username or Password" });
    }
  } catch (error) {
    console.warn(error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
}

export async function signup(req, res) {
  try {
    if (req.body.email.length > 1000)
      res.send({ status: "error", message: "Email too long" });
    else if (req.body.username.length > 50)
      res.send({ status: "error", message: "Username too long" });
    else if (req.body.password.length > 1000)
      res.send({ status: "error", message: "Password too long" });
    else if (!evalidator.validate(req.body.email))
      res.send({ status: "error", message: "Invalid Email" });
    else if (
      await account.findOne({ email: new RegExp(`^${req.body.email}$`, "i") })
    )
      res.send({ status: "error", message: "Email Taken" });
    else if (req.body.username.includes("@"))
      res.send({
        status: "error",
        message: "@ symbol not allowed in username",
      });
    else if (
      await account.findOne({
        username: new RegExp(`^${req.body.username}$`, "i"),
      })
    )
      res.send({ status: "error", message: "Username Taken" });
    else {
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      await account.insertOne({
        email: req.body.email,
        username: req.body.username,
        tokens: 0,
        password: hash,
        rooms: [],
      });
      const acc = await getaccount(req.body.username);
      req.session.username = acc.username;
      req.session.userid = acc._id;
      req.session.valid = true;
      res.send({
        status: "successful",
        username: acc.username,
        tokens: acc.tokens,
      });
    }
  } catch (error) {
    console.warn(error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
}

export async function getuserinfo(req, res) {
  if (req.session.username && req.session.userid) {
    const acc = await account.findOne({
      _id: new ObjectId(String(req.session.userid)),
    });
    res.send({
      username: req.session.username,
      tokens: acc.tokens,
      rooms: acc.rooms,
    });
  } else {
    res.send({ username: null, tokens: 0, rooms: null });
  }
}

export async function renameRoom(req, res) {
  await account.updateOne(
    {
      _id: new ObjectId(String(req.session.userid)),
      "rooms.roomid": new ObjectId(String(req.body.roomid)),
    },
    { $set: { "rooms.$.name": req.body.roomname } }
  );
  res.send("success")
}
