import { BareMuxConnection } from "@mercuryworkshop/bare-mux";
import '/scramjet/scramjet.controller.js';

let scramjet;
let conn;
try {
  conn = new BareMuxConnection("/baremux/worker.js");

  scramjet = new ScramjetController({
    prefix: "/service/scramjet/",
    files: {
      wasm: "/scramjet/scramjet.wasm.js",
      worker: "/scramjet/scramjet.worker.js",
      client: "/scramjet/scramjet.client.js",
      shared: "/scramjet/scramjet.shared.js",
      sync: "/scramjet/scramjet.sync.js",
    },
  });
} catch (err) {
  console.error(err);
}

const wispUrl =
  (location.protocol === "https:" ? "wss" : "ws") +
  "://" +
  location.host +
  "/wisp/";

const bareUrl = location.protocol + "//" + location.host + "/bare/";
let proxy = localStorage.getItem("proxy");
let transport = localStorage.getItem("transport");

if (!proxy) {
  localStorage.setItem("proxy", "uv");
  proxy = "uv";
}

if (!transport) {
  localStorage.setItem("transport", "epoxy");
  transport = "epoxy";
}

export async function setProxy(proxysel) {
  localStorage.setItem("proxy", proxysel);
  proxy = proxysel;
}

export async function setTransport(transportsel) {
  try {
    localStorage.setItem("transport", transportsel);
    transport = transportsel;
    if (transportsel == "epoxy") {
      await conn.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
    } else if (transportsel == "libcurl") {
      await conn.setTransport("/libcurl/index.mjs", [{ wisp: wispUrl }]);
    } else {
      await conn.setTransport("/bareasmodule/index.mjs", [bareUrl]);
    }
  } catch (err) {
    console.error(err);
  }
}
setTransport(transport);

export function search(input) {
  let template = "https://www.google.com/search?q=%s";
  try {
    // input is a valid URL:
    return new URL(input).toString();
  } catch (err) {}

  try {
    let url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {}

  return template.replace("%s", encodeURIComponent(input));
}

export { proxy, scramjet };