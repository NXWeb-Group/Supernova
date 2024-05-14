"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLInputElement}
 */
const proxy = document.getElementById("select");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = search(address.value, searchEngine.value);
  console.log(url)
  if(proxy.value == 'uv'){
    location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  }
  if(proxy.value == 'dynamic'){
    location.href = __dynamic$config.prefix + __uv$config.encodeUrl(url);
  }
  
});