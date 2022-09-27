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

export { fetchAllData, fetchPost };
