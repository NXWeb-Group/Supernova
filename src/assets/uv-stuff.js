import { BareMuxConnection } from "@mercuryworkshop/bare-mux";

const conn = new BareMuxConnection("/baremux/worker.js");
const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const bareUrl = location.protocol + "//" + location.host + "/bare/";
var transport = localStorage.getItem("transport");

if (!transport) {
  transport = "libcurl";
  localStorage.setItem("transport", transport);
}

export async function setTransport(transportsel) {
  if (transportsel == "epoxy") {
    await conn.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
  } else if (transportsel == "libcurl") {
    await conn.setTransport("/libcurl/index.mjs", [{ wisp: wispUrl }]);
  } else {    
    await conn.setTransport("/bareasmodule/index.mjs", [ bareUrl ]);
  }
}
setTransport(transport);

export function search(input) {
  let template = "https://www.google.com/search?q=%s";
  try {
    // input is a valid URL:
    return new URL(input).toString();
  } catch (err) {
  }

  try {
    let url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
  }

  return template.replace("%s", encodeURIComponent(input));
}