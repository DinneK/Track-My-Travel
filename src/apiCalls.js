// import mockTravelersData from "./data/mockTravelersData";

const BASE_URL = "http://localhost:3001";

const fetchAllData = (dataName) => {
  return fetch(`${BASE_URL}/api/v1/${dataName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => data);
};

const fetchPost = (newData, initObject) => {
  return fetch(`${BASE_URL}/api/v1/${newData}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(initObject),
  })
    .then((response) => handleErrors(response))
    .then((response) => response.json())
    .catch((err) => showErrorMessage(err));
};
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  } else {
    return response;
  }
}
function showErrorMessage() {
  console.log("MISTAKE!");
}
// export { fetchData, fetchPost };

// function getTravelers() {
//   return fetch(`${BASE_URL}/api/v1/travelers`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error();
//       }
//       return response.json();
//     })
//     .then((data) => data);
// }

// function getTravelers() {
//   return Promise.resolve(mockTravelersData).then((data) => data);
// }

export { fetchAllData, fetchPost };
// export const API = {
//   fetchAllData,
// };

// const fetchData = (dataFileName, dataKey) => {
//   return fetch(http://localhost:3001/api/v1/${dataFileName})
//     .then(response => response.json())
//     .then(data => data[dataKey])
//   };
// const fetchPost = (url, initObject) => {
//   return fetch(http://localhost:3001/api/v1/${url}, {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(initObject)
//   })
//     .then(response => handleErrors(response))
//     .then(response => response.json())
//     .catch(err => showErrorMessage())
// };
// function handleErrors(response) {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   } else {
//   return response;
//   }
// }
// function showErrorMessage() {
//  alert('There was an error!')
// }
// export { fetchData, fetchPost }
