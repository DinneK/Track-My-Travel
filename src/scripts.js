// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import dayjs from "dayjs";
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

import DestinationsRepo from "./classes/DestinationsRepo";
import Traveler from "./classes/Traveler";
import TravelersRepo from "./classes/TravelersRepo";
import TripsRepo from "./classes/TripsRepo";

// new Glide(".glide").mount();

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

let travelersData;
let tripsData;
let destinationsData;
let currentTraveler;
let tripsRepo;
let travelersRepo;
let destinationRepo;

import { fetchAllData } from "./apiCalls.js";

function instantiateData() {
  Promise.all([
    fetchAllData("travelers"),
    fetchAllData("trips"),
    fetchAllData("destinations"),
  ]).then((dataSet) => {
    travelersData = dataSet[0].travelers;
    tripsData = dataSet[1].trips;
    destinationsData = dataSet[2].destinations;
    // currentTraveler = new Traveler(
    //   travelersData[Math.floor(Math.random() * travelersData.length)]
    // );
    currentTraveler = new Traveler(travelersData[6]);
    travelersRepo = new TravelersRepo(travelersData);
    tripsRepo = new TripsRepo(tripsData);
    destinationRepo = new DestinationsRepo(destinationsData);
    // console.log({ currentTraveler });
    // console.log({ travelersData });
    // console.log({ tripsData });
    // console.log({ destinationsData });
    // generatePageLoad(allUserData);
    loadPage();
  });
}
// function updateData() {
// Promise.all([fetchData('sleep', 'sleepData'), fetchData('hydration', 'hydrationData'), fetchData('activity', 'activityData')])
//   .then((dataSet) => {
//     allSleepData = dataSet[0];
//     allHydrationData = dataSet[1];
//     allActivityData = dataSet[2];
// })
// };

const subtitleMessage = document.getElementById("subtitleMessage");
const dollarsPerYear = document.getElementById("dollarsPerYear");
const pastBookingPic = document.getElementById("pastBookingPic");
const upcomingBookingPic = document.getElementById("upcomingBookingPic");
const pendingBookingPic = document.getElementById("pendingBookingPic");

console.log("This is the JavaScript entry file - your code begins here.");
// console.log(dayjs());
// const userInfo = document.getElementById("userInfo");

window.addEventListener("load", instantiateData);

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
function loadPage() {
  renderSubtitleMessage();
  renderTotalSpentPerYear();
  renderPastTrips();
  renderUpcomingTrips();
  renderPendingTrips();
}

function renderSubtitleMessage() {
  subtitleMessage.innerHTML = `<h2 class="subtitle-massage" id="subtitleMessage">Welcome Back ${currentTraveler.returnTravelerFirstName()}</h2>`;
}

function renderTotalSpentPerYear() {
  // let destinations = destinationsData;
  let travelerID = currentTraveler.travelerID;
  let date = dayjs().format("YYYY/MM/DD");
  dollarsPerYear.innerHTML = `<div class="dollars-per-year" id="dollarsPerYear">$${tripsRepo.calculateCostsForPastYear(
    destinationsData,
    travelerID,
    date
  )}</div>`;
}

function renderPastTrips() {
  let travelerID = currentTraveler.travelerID;
  let date = dayjs().format("YYYY/MM/DD");
  // console.log(tripsRepo.returnPastTrips(travelerID, date));
  tripsRepo.returnPastTrips(travelerID, date).filter((trip) => {
    destinationsData.forEach((destination) => {
      if (destination.id === trip.destinationID) {
        pastBookingPic.innerHTML += `<img class='destination-img' src='${destination.image}'/>`;
      }
    });
  });
}

function renderUpcomingTrips() {
  let travelerID = currentTraveler.travelerID;
  let date = dayjs().format("YYYY/MM/DD");
  // const result = tripsRepo.returnUpcomingTrips(travelerID, date);
  if (
    tripsRepo.returnUpcomingTrips(travelerID, date) ===
    `You have no upcoming trips`
  ) {
    upcomingBookingPic.innerHTML = `<div class="trip-boxes">You have no upcoming trips</div>`;
  } else {
    tripsRepo.returnUpcomingTrips(travelerID, date).filter((trip) => {
      destinationsData.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          upcomingBookingPic.innerHTML += `<img class='destination-img' src='${destination.image}'/>`;
        }
      });
    });
  }
}

function renderPendingTrips() {
  let travelerID = currentTraveler.travelerID;
  console.log(tripsRepo.returnPendingTrips(travelerID));
  if (
    tripsRepo.returnUpcomingTrips(travelerID, date) ===
    `You have no pending trips`
  ) {
    upcomingBookingPic.innerHTML = `<div class="trip-boxes">You have no pending trips</div>`;
  } else {
    tripsRepo.returnPendingTrips(travelerID).filter((trip) => {
      destinationsData.forEach((destination) => {
        // console.log({ trip });
        if (destination.id === trip.destinationID) {
          pendingBookingPic.innerHTML += `<img class='destination-img' src='${destination.image}'/>`;
        }
      });
    });
  }
}
