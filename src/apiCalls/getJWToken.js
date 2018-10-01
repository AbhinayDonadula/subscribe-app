const getJWToken = () => {
  const headers = new window.Headers({
    "Content-Type": "application/json",
    Accept: "application/json"
  });

  const endPoint = "/json/jwtSubscription.do";

  const request = new window.Request(endPoint, {
    headers,
    method: "GET",
    credentials: "same-origin"
  });

  return window
    .fetch(request)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response;
    })
    .then(jsonResponse => ({
      token: jsonResponse.token,
      ok: true
    }))
    .catch(err => ({
      error: err,
      ok: false
    }));
};

export default getJWToken;
