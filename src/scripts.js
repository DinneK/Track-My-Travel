// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import dayjs from "dayjs";
// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
// import "./css/glide.core.min.css";
// import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
import Glide from "@glidejs/glide";
import "/node_modules/@glidejs/glide/dist/css/glide.core.min.css";

// const config = {
//   type: "carousel",
//   startAt: 0,
//   perView: 1,
// };

// new Glide(".glide", config).mount();

import Destination from "./classes/Destination";
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
let singleDestinations;

import { fetchAllData, fetchPost } from "./apiCalls.js";

function instantiateData() {
  Promise.all([
    fetchAllData("travelers"),
    fetchAllData("trips"),
    fetchAllData("destinations"),
  ]).then((dataSet) => {
    travelersData = dataSet[0].travelers;
    tripsData = dataSet[1].trips;
    destinationsData = dataSet[2].destinations;
    currentTraveler = new Traveler(
      travelersData[Math.floor(Math.random() * travelersData.length)]
    );
    // currentTraveler = new Traveler(travelersData[47]);
    travelersRepo = new TravelersRepo(travelersData);
    tripsRepo = new TripsRepo(tripsData);
    destinationRepo = new DestinationsRepo(destinationsData);
    console.log(currentTraveler);
    singleDestinations = destinationsData.map(
      (destination) => new Destination(destination)
    );
    // console.log({ currentTraveler });
    // console.log({ travelersData });
    // console.log({ tripsData });
    console.log("1", destinationsData);
    // generatePageLoad(allUserData);
    loadPage();
  });
}

function updateData() {
  Promise.all([
    fetchAllData("travelers"),
    fetchAllData("trips"),
    fetchAllData("destinations"),
  ]).then((dataSet) => {
    travelersData = dataSet[0].travelers;
    tripsData = dataSet[1].trips;
    destinationsData = dataSet[2].destinations;
  });
}

const subtitleMessage = document.getElementById("subtitleMessage");
const dollarsPerYear = document.getElementById("dollarsPerYear");
const pastBookingPic = document.getElementById("pastBookingPic");
const upcomingBookingPic = document.getElementById("upcomingBookingPic");
const pendingBookingPic = document.getElementsByClassName(
  "pending-booking-pic"
)[0];
const destinationSelection = document.getElementsByClassName("destinations")[0];
const submitSearch = document.getElementById("submitSearch");
const confirmTrip = document.getElementById("confirmTrip");
const bookingForm = document.getElementsByClassName("booking-form");
const chosenNumDays = document.getElementById("day-quantity");
const chosenNumPeople = document.getElementById("trav-quantity");
const bookingDetails = document.getElementById("bookingDetails");
const tripConfirmation = document.getElementById("tripConfirmation");

console.log("This is the JavaScript entry file - your code begins here.");
// console.log(dayjs());
// const userInfo = document.getElementById("userInfo");

window.addEventListener("load", instantiateData);
submitSearch.addEventListener("click", createNewTrip);
// confirmTrip.addEventListener("click", postNewTrip);

// bookingForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const formData = new FormData(e.target);
//   console.log(formData.get());
//   const newTripData = {
//     travelerID: currentTraveler.travelerID,
//     date: formData.get("form-date"),
//     destination: destinationSelection.value,
//     duration: formData.get(),
//     // estimatedFlightCostPerPerson: destinationsData.estimatedFlightCostPerPerson,
//     // estimatedLodgingCostPerDay: destinationsData.estimatedLodgingCostPerDay,
//   };
//   formSubmitted = true;
//   // e.target.reset();
//   // showHideForm();
//   createNewTrip();
// });

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
  // renderPendingTrips();
  populateDestinationSelection();
  // createNewTrip();
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
  if (tripsRepo.returnPastTrips(travelerID, date).length === 0) {
    pastBookingPic.innerHTML = `<div class="trip-boxes">You have no past trips</div>`;
  } else {
    tripsRepo.returnPastTrips(travelerID, date).filter((trip) => {
      destinationsData.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          pastBookingPic.innerHTML += `<img class='destination-img' src='${destination.image}'/>`;
        }
      });
    });
  }
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

// function renderPendingTrips() {
//   let travelerID = currentTraveler.travelerID;
//   console.log({ travelerID });
//   if (
//     tripsRepo.returnPendingTrips(travelerID) === "You have no pending trips"
//   ) {
//     pendingBookingPic.innerHTML += `<div class="trip-boxes">You have no pending trips</div>`;
//   } else {
//     tripsRepo.returnPendingTrips(travelerID).filter((trip) => {
//       destinationsData.forEach((destination) => {
//         if (destination.id === trip.destinationID) {
//           console.log({ pendingBookingPic });
//           pendingBookingPic.innerHTML += `<img class="destination-img" src="${destination.image}"/>`;
//           let p = document.createElement("p");
//           pendingBookingPic.classList.add(`Booger`);
//         }
//       });
//     });
//   }
// }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// function renderPendingTrips() {
//   let travelerID = currentTraveler.travelerID;
//   if (tripsRepo.returnUpcomingTrips(travelerID).length > 0) {
//     tripsRepo.returnPendingTrips(travelerID).filter((trip) => {
//       console.log({ trip });
//       destinationsData.forEach((destination) => {
//         if (destination.id === trip.destinationID) {
//           pendingBookingPic.innerHTML += `<img class="destination-img" src="${destination.image}"/>`;
//         }
//       });
//     });
//   } else if (tripsRepo.returnUpcomingTrips(travelerID).length === 0) {
//     pendingBookingPic.innerHTML = `<div class="trip-boxes">You have no pending trips</div>`;
//   }
// }

function populateDestinationSelection() {
  return destinationsData.forEach((destination) => {
    destinationSelection.innerHTML += `<option>${destination.destination}</option>`;
  });
}

function createNewTrip(e) {
  e.preventDefault();
  const numDays = parseInt(chosenNumDays.value);
  const destination = destinationSelection.value;
  const numTravelers = parseInt(chosenNumPeople.value);
  const destinations = singleDestinations;
  const calculateTotal = tripsRepo.calculateTotalCostForASingleTrip(
    destinations,
    destination,
    numTravelers,
    numDays
  );

  tripConfirmation.innerHTML = `<div class="trip-total" id="tripConfirmation">
  <h2 class="trip-destination">Your trip to ${destination}</h2>
  <h2>On DATE for ${numDays} days</h2>
  <h2>Will cost $${calculateTotal}</h2>
  </div>`;

  console.log(calculateTotal);
  return calculateTotal;
}
