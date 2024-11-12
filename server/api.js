import express from "express";
import { login, signup, getuserinfo, renameRoom } from "./account.js";
import { ask, getChats } from "./ai.js";

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
    await getuserinfo(req, res);
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

router.post("/ask", async (req, res, next) => {
  try {
    if (req.session.valid) {
      await ask(req, res);
    } else res.send("invalid-session");
  } catch (error) {
    next(error);
  }
});

router.post("/getChats", async (req, res, next) => {
  try {
    if (req.session.valid) {
      await getChats(req, res);
    } else res.send("invalid-session");
  } catch (error) {
    next(error);
  }
});

router.post("/renameRoom", async (req, res, next) => {
  try {
    if (req.session.valid) {
      await renameRoom(req, res);
    } else res.send("invalid-session");
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

export const api = router;
