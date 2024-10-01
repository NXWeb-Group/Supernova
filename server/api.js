import { ObjectId } from "mongodb";
import { login, signup } from "./account.js";
import { account } from "./mongo.js";

export const api = async (req, res, next) => {
  try {
    switch (req.method) {
      case "GET":
        switch (req.url) {
          case "/config":
            res.send(process.env.OPENAI);
            break;
          case "/user":
            if (req.session.username && req.session.userid) {
              const acc = await account.findOne({ _id: new ObjectId(String(req.session.userid)) });
              res.send({ username: req.session.username, tokens: acc.tokens });
            } else {
              res.send({ username: null, tokens: 0 });
            }
            break;
          default:
            next();
        }
        break;
      case "POST":
        switch (req.url) {
          case "/login":
            await login(req, res);
            break;
          case "/signup":
            await signup(req, res);
            break;
          case "/logout":
            req.session.destroy();
            res.send("done");
            break;
          default:
            next();
        }
        break;
      default: next();
    }
  } catch (error) {
    console.warn(error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};