import "dotenv/config";
import express from "express";
import proxy from "express-http-proxy";
import ExpressMongoSanitize from "express-mongo-sanitize";
import session from "express-session";
import { createBareServer } from "@tomphttp/bare-server-node";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { bareModulePath } from "@mercuryworkshop/bare-as-module3";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { Socket } from "node:net";
import { createServer } from "node:http";
import { hostname } from "node:os";
import path from "node:path";
import url from "node:url";
import { createServer as createViteServer } from "vite";
import wisp from "wisp-server-node";

import { mongoStore } from "./server/mongo.js";
import { api } from "./server/api.js";

const bare = createBareServer("/bare/");
const app = express();
const isHttps = process.env.HTTPS === "true";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ExpressMongoSanitize());
if (process.env.AI === "true") {
  app.use(
    session({
      secret: process.env.SECRET_KEY || "default_secret_key",
      resave: false,
      saveUninitialized: false,
      store: mongoStore,
      cookie: {
        secure: isHttps,
        maxAge: 1000 * 60 * 60 * 12, // 1/2 day
      },
    })
  );
  app.use("/api/", api);
} else
  app.use("/api/", (req: express.Request, res: express.Response) => {
    res.send(false);
  });

app.use(
  "/cdn",
  proxy(`https://3kh0-assets.nxweb.xyz`, {
    proxyReqPathResolver: (req: express.Request) => req.url,
  })
);
if (process.argv.includes("--dev")) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);
  console.log("Vite middleware");
} else {
  app.use(express.static("dist/vue"));
}
app.use("/uv/", express.static(uvPath));
app.use("/scramjet/", express.static("scramjet"));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/libcurl/", express.static(libcurlPath));
app.use("/bareasmodule/", express.static(bareModulePath));
app.use("/baremux/", express.static(baremuxPath));

const __dirname = url.fileURLToPath(new URL("./", import.meta.url));
app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(__dirname, "vue", "index.html"));
});

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else if (req.url && req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket as Socket, head);
  } else socket.end();
});

server.on("listening", () => {
  const address = server.address();

  // by default we are listening on 0.0.0.0 (every interface)
  // we just need to list a few
  console.log("Listening on:");
  if (address && typeof address === "object" && "port" in address) {
    console.log(`\thttp://localhost:${address.port}`);
    console.log(`\thttp://${hostname()}:${address.port}`);
    console.log(
      `\thttp://${
        address.family === "IPv6" ? `[${address.address}]` : address.address
      }:${address.port}`
    );
  } else {
    console.log("Server address is null");
  }
});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen(process.env.PORT);
