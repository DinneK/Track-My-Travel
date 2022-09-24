// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
// import "./css/glide.core.min.css";
// import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
import Glide from "@glidejs/glide";
import "/node_modules/@glidejs/glide/dist/css/glide.core.min.css";

const config = {
  type: "carousel",
  startAt: 0,
  perView: 1,
};

new Glide(".glide", config).mount();

// new Glide(".glide").mount();

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

// let currentTraveler;
// let tripName;
// let tripDate;

import { API } from "./apiCalls.js";

console.log("This is the JavaScript entry file - your code begins here.");

// const userInfo = document.getElementById("userInfo");

// window.addEventListener("load", renderUserInfo);

// function renderUserInfo() {
//   userInfo.innerHTML = `<p>Loading</p>`;
//   API.getTravelers()
//     .then((data) => renderUser(data))
//     .catch((error) => renderError());
// }

// function renderUser(users) {
//   console.log(users);
//   const randomIndex = Math.floor(Math.random() * users.travelers.length);
//   const user = users.travelers[randomIndex];
//   userInfo.innerHTML = `
//    <p>Hello</p>
//    <p>${user.name}</p>
//    <p>${user.id}</p>
//    <p>${user.travelerType}</p>
//   `;
// }

// function renderError() {
//   userInfo.innerHTML = `
//    <p>Ooops!</p>
//   `;
// }
