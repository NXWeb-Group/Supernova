import { login, signup } from "./account.js";

export const api = (req, res, next) => {
  switch (req.method) {
    case "GET":
      switch (req.url) {
        default:
          next();
      }
      
    case "POST":
      switch (req.url) {
        case "/login":
          login(req, res);
          break;
        case "/signup":
          signup(req, res);
          break;
        default:
          next();
      }
  }
};