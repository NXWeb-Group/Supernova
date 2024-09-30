import bcrypt from "bcrypt";
import evalidator from "email-validator";
import { account, sanitize } from "./mongo.js";

const saltRounds = Number(process.env.SALT_ROUNDS);

export async function getaccount(user) {
  let query = evalidator.validate(user)
    ? { email: new RegExp(`^${user}$`, 'i') }
    : { username: new RegExp(`^${user}$`, 'i') };
  let accountData = await account.findOne(sanitize(query));
  return accountData || "none";
}

export async function login(req, res) {
  try {
    const acc = await getaccount(req.body.username);
    if (acc === "none")
      res.send("Invalid Username or Password")
    else {
      if (await bcrypt.compare(req.body.password, acc.password)) {
        req.session.username = acc.username;
        req.session.userid = acc._id;
        res.send("successful");
      }
      else res.send("Invalid Username or Password")
    };
  } catch (error) {
    console.warn(error);
    res.status(500).send("Internal Server Error");
  };
}

export async function signup(req, res) {
  try {
    if (req.body.email.length > 1000) res.send("Email too long");
    else if (req.body.username.length > 50) res.send("Username too long");
    else if (req.body.password.length > 1000) res.send("Password too long");
    else if (!evalidator.validate(req.body.email)) res.send("Invalid Email")
    else if (req.body.username.includes("@")) res.send("@ symbol not allowed in username");
    else if (await account.findOne({ email: sanitize(new RegExp(`^${req.body.email}$`, 'i')) })) res.send("Email Taken");
    else if (await account.findOne({ username: sanitize(new RegExp(`^${req.body.username}$`, 'i')) })) res.send("Username Taken");
    else {
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      await account.insertOne({ email: sanitize(req.body.email), username: sanitize(req.body.username), password: hash })
      const acc = await getaccount(req.body.username);
      req.session.username = acc.username;
      req.session.userid = acc._id;
      res.send("successful");
    };

  } catch (error) {
    console.warn(error);
    res.status(500).send("Internal Server Error");
  };
}