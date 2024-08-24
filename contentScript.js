'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  response => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("vvv")
  if (request.type === 'COUNT') {
    console.log(`Current a count is ${request.payload.count}`);
    // document.querySelector("video").playbackRate=request.payload.count
    // document.querySelector("video").play()
    setTimeout(()=>{
      document.querySelector("video").play();
      document.querySelector("video").playbackRate=request.payload.count
    },500);
    document.body.innerHTML += '<div style="position:fixed; bottom:0;right:0;z_index:9999;width:200Px;height:200px;background-color:red"><h2>倍速</h2></div>'
  }
  // else if (request.type === 'END') {
  // else {
  if (request.type === 'END') {
    console.log(`Current eee count is ${request.payload.count}`);
    setTimeout(()=>{
      document.querySelector("video").play();
      document.querySelector("video").currentTime=document.querySelector("video").duration
    },500);
  
    document.body.innerHTML += '<div style="position:fixed; bottom:0;right:0;z_index:9999;width:200Px;height:200px;background-color:blue"><h2>完成</h2></div>'
    console.log(`END`);
  }
  console.log("bvbv")
  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});
// window.onload=()=>{
//    document.body.innerHTML += '<div style="position:fixed; bottom:0;right:0;z_index:9999;width:200Px;height:200px;background-color:blue"><h2>完成</h2></div>'
// }