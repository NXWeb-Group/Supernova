import express from "express";
import { ObjectId } from "mongodb";
import { login, signup } from "./account.js";
import { account } from "./mongo.js";

const router = express.Router();

router.get("/config", (req, res) => {
  try {
    res.send(process.env.AI);
  } catch (error) {
    next(error);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    if (req.session.username && req.session.userid) {
      const acc = await account.findOne({
        _id: new ObjectId(String(req.session.userid)),
      });
      res.send({ username: req.session.username, tokens: acc.tokens });
    } else {
      res.send({ username: null, tokens: 0 });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    await signup(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (req, res, next) => {
  try {
    req.session.destroy();
    res.send("done");
  } catch (error) {
    next(error);
  }
});

router.use((req, res) => {
  res.status(404).send({ status: "error", message: "Not Found" });
});

router.use((error, req, res, next) => {
  console.warn(error);
  res.status(500).send({ status: "error", message: "Internal Server Error" });
});

export default api = router;
