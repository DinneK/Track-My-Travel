import dayjs from "dayjs";
import "./css/styles.css";
import Glide from "@glidejs/glide";
import "/node_modules/@glidejs/glide/dist/css/glide.core.min.css";
import Destination from "./classes/Destination";
import DestinationsRepo from "./classes/DestinationsRepo";
import Traveler from "./classes/Traveler";
import TravelersRepo from "./classes/TravelersRepo";
import TripsRepo from "./classes/TripsRepo";
import { fetchAllData, fetchPost } from "./apiCalls.js";

const config = {
  type: "carousel",
  startAt: 0,
  perView: 1,
};

new Glide(".glide", config).mount();

let travelersData;
let tripsData;
let destinationsData;
let currentTraveler;
let tripsRepo;
let travelersRepo;
let destinationRepo;
let singleDestinations;
let userID;

function instantiateData() {
  Promise.all([
    fetchAllData("travelers"),
    fetchAllData("trips"),
    fetchAllData("destinations"),
  ]).then((dataSet) => {
    travelersData = dataSet[0].travelers;
    tripsData = dataSet[1].trips;
    destinationsData = dataSet[2].destinations;
    travelersRepo = new TravelersRepo(travelersData);
    tripsRepo = new TripsRepo(tripsData);
    destinationRepo = new DestinationsRepo(destinationsData);
    singleDestinations = destinationsData.map(
      (destination) => new Destination(destination)
    );
    loadLoginPage();
  });
}

function postNewTrip() {
  const tripID = tripsData.sort((a, b) => b.id - a.id)[0].id + 1;
  const travelerID = currentTraveler.travelerID;
  const descriptionID = destinationsData.find(
    (destination) => destination.destination === destinationSelection.value
  ).id;
  const formDate = dayjs(dateInput.value).format("YYYY/MM/DD");
  let newTripData = {
    id: tripID,
    userID: travelerID,
    destinationID: descriptionID,
    travelers: parseInt(chosenNumPeople.value),
    date: formDate,
    duration: parseInt(chosenNumDays.value),
    status: "pending",
    suggestedActivities: [],
  };

  fetchPost("trips", newTripData).then((data) => {
    const newTrip = data.newTrip;
    tripsRepo.trips.push(newTrip);
    renderPendingTrips();
  });
  clearForm();
  hide(bookingDetContainer);
  show(bookingForm);
}

const subtitleMessage = document.getElementById("subtitleMessage");
const dollarsPerYear = document.getElementById("dollarsPerYear");
const pastBookingPic = document.getElementById("pastBookingPic");
const upcomingBookingPic = document.getElementsByClassName(
  "upcoming-booking-pic"
)[1];
const pendingBookingPic = document.getElementsByClassName(
  "pending-booking-pic"
)[1];
const destinationSelection = document.getElementById("destinations");
const submitSearch = document.getElementById("submitSearch");
const chosenNumDays = document.getElementById("day-quantity");
const chosenNumPeople = document.getElementById("trav-quantity");
const tripConfirmation = document.getElementById("tripConfirmation");
const dateInput = document.querySelector("input[type='date']");
const bookingDetContainer = document.getElementById("bookDetContainer");
const glideContainer = document.getElementById("glideContainer");
const loginFormHolder = document.getElementById("loginFormHolder");
const confirmBooking = document.getElementById("confirmBooking");
const bookingForm = document.getElementById("bookingFormHolder");
const booking = document.getElementById("bookingForm");
const errorMessage = document.getElementById("error-message");
const userName = document.getElementById("username");
const password = document.getElementById("password");
const signInBtn = document.getElementById("sign-in");

window.addEventListener("load", () => {
  instantiateData();
  loadLoginPage();
});
signInBtn.addEventListener("click", loadTravelerDashboard);
submitSearch.addEventListener("click", createNewTrip);
confirmBooking.addEventListener("click", postNewTrip);

function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function loadPage() {
  let userID = parseInt(userName.value.slice(8, userName.value.length));
  currentTraveler = new Traveler(travelersRepo.travelers[userID - 1]);
  renderSubtitleMessage();
  renderTotalSpentPerYear();
  renderPastTrips();
  renderUpcomingTrips();
  renderPendingTrips();
  populateDestinationSelection();
  loadCurrentDate();
  loadTravelerDashboard();
}

function loadLoginPage() {
  show(loginFormHolder);
  hide(glideContainer);
  userName.value = "";
  password.value = "";
}

function loadTravelerDashboard(event) {
  event.preventDefault();
  if (userName.value === "" || password.value === "") {
    errorMessage.innerText = `Please Fill Out All Fields`;
  } else if (password.value !== "travel") {
    errorMessage.innerText = `Wrong Password, Please Try Again.`;
  } else if (!userName.value.includes("traveler")) {
    errorMessage.innerText = `Please Try A Different User Name.`;
  } else {
    let userID = parseInt(userName.value.slice(8, userName.value.length));
    hide(loginFormHolder);
    show(glideContainer);
    show(bookingForm);
    loadPage();
  }
}

function renderSubtitleMessage() {
  subtitleMessage.innerHTML = `<h2 class="subtitle-massage" id="subtitleMessage">Welcome Back ${currentTraveler.returnTravelerFirstName()}</h2>`;
}

function renderTotalSpentPerYear() {
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
  if (tripsRepo.returnPastTrips(travelerID, date).length === 0) {
    pastBookingPic.innerHTML = `<div class="trip-boxes">You have no past trips</div>`;
  } else {
    tripsRepo.returnPastTrips(travelerID, date).filter((trip) => {
      destinationsData.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          pastBookingPic.innerHTML += `<div class="pic-box-style"><img class='destination-img' src="${destination.image}" alt="${destination.alt}"/><div>${destination.destination}</div></div>`;
        }
      });
    });
  }
}

function renderUpcomingTrips() {
  let travelerID = currentTraveler.travelerID;
  let date = dayjs().format("YYYY/MM/DD");
  if (
    tripsRepo.returnUpcomingTrips(travelerID, date) ===
    `You have no upcoming trips`
  ) {
    upcomingBookingPic.innerHTML = `<div class="trip-boxes">You have no upcoming trips</div>`;
  } else {
    tripsRepo.returnUpcomingTrips(travelerID, date).filter((trip) => {
      destinationsData.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          upcomingBookingPic.innerHTML += `<div class="pic-box-style"><img class='destination-img' src="${destination.image}" alt="${destination.alt}"/><div>${destination.destination}</div></div>`;
        }
      });
    });
  }
}

function renderPendingTrips() {
  pendingBookingPic.innerHTML = "";
  let travelerID = currentTraveler.travelerID;
  if (!tripsRepo.returnPendingTrips(travelerID).length) {
    pendingBookingPic.innerHTML += `<div class="trip-boxes">You have no pending trips</div>`;
  } else {
    tripsRepo.returnPendingTrips(travelerID).filter((trip) => {
      destinationsData.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          pendingBookingPic.innerHTML += `<div class="pic-box-style"><img class="destination-img" src="${destination.image}" alt="${destination.alt}"/><div>${destination.destination}</div></div>`;
        }
      });
    });
  }
}

function loadCurrentDate() {
  let now = dayjs().format("YYYY-MM-DD");
  dateInput.value = now;
}

function populateDestinationSelection() {
  return destinationsData.forEach((destination) => {
    destinationSelection.innerHTML += `<option>${destination.destination}</option>`;
  });
}

function createNewTrip(e) {
  e.preventDefault();
  loadErrorMessageInSubmission();
  show(bookingDetContainer);
  const chosenDate = dayjs(dateInput.value).format("MM/DD/YYYY");
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
  <h2>Trip Details:</h2>
  <h2 class="trip-destination">Your trip to ${destination}</h2>
  <h2>Starting on: ${chosenDate} for ${numDays} days,</h2>
  <h2>will cost $${calculateTotal}, this includes a 10% agent fee</h2>
  </div>`;
  hide(bookingForm);
}

function clearForm() {
  errorMessage.innerText = "";
  tripConfirmation.innerHTML = "";
  booking.reset();
}

function loadErrorMessageInSubmission() {
  if (
    dateInput.value === "" ||
    chosenNumDays.value === "" ||
    destinationSelection.value === "Pick Destination" ||
    chosenNumPeople.value === ""
  ) {
    errorMessage.innerText = `Please Fill Out All Fields`;
    button.disabled = true;
  } else if (
    dateInput.value === dayjs(dateInput.value).format("MM/DD/YYYY") &&
    chosenNumDays.value === parseInt(chosenNumDays.value) &&
    destinationSelection.value === destinationSelection.value &&
    chosenNumPeople.value === parseInt(chosenNumPeople.value)
  ) {
    errorMessage.innerText = "";
    button.disabled = false;
  }
}
