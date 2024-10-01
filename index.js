import express from "express";
import proxy from 'express-http-proxy';
import { createServer } from "node:http";
import { hostname } from "node:os";
import path from 'node:path';
import url from "node:url"
import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { bareModulePath } from "@mercuryworkshop/bare-as-module3";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import wisp from "wisp-server-node"
import { createServer as createViteServer } from 'vite'
import 'dotenv/config'
import session from 'express-session';

import { mongoStore } from "./server/mongo.js";
import { api } from "./server/api.js";

const bare = createBareServer("/bare/");
const app = express();
const isHttps = process.env.HTTPS === 'true';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.OPENAI === 'true') {
  app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
      secure: isHttps,
      maxAge: 1000 * 60 * 60 * 12 // 1/2 day
    }
  }));
  app.use('/api/', api);
} else app.use('/api/', (req, res) => {
  res.send(false);
});

app.use(
  '/cdn',
  proxy(`https://3kh0-assets.silvereen.net`, {
    proxyReqPathResolver: (req) => `/3kh0-assets/${req.url}`,
  })
);
if (process.argv.includes("--dev")) {
  const vite = await createViteServer({
    server: { middlewareMode: 'html' }
  })
  app.use(vite.middlewares)
  console.log("Vite middleware")
} else {
  app.use(express.static('dist'));
}
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/libcurl/", express.static(libcurlPath));
app.use("/bareasmodule/", express.static(bareModulePath));
app.use("/baremux/", express.static(baremuxPath));

const __dirname = url.fileURLToPath(new URL("./", import.meta.url))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
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
  } else if (req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else socket.end();
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();

  // by default we are listening on 0.0.0.0 (every interface)
  // we just need to list a few
  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
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
