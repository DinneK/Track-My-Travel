import mockTravelersData from "./data/mockTravelersData";

const BASE_URL = "http://localhost:3001";

function getTravelers() {
  return fetch(`${BASE_URL}/api/v1/travelers`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => data);
}

// function getTravelers() {
//   return Promise.resolve(mockTravelersData).then((data) => data);
// }

export const API = {
  getTravelers,
};
