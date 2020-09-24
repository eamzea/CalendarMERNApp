const baseURL = process.env.REACT_APP_API_URL;

export const fetchNoToken = (endpoint, data, method) => {
  const url = `${baseURL}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};
