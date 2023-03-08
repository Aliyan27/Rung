const baseUrl: string | undefined = process.env.REACT_APP_Base_URL;

const newBaseUrl = () => {
  if (window.location.protocol === "http:") {
    let newBaseUrl: string | undefined = baseUrl;
    newBaseUrl = newBaseUrl?.replace("https", "http");
    return newBaseUrl;
  } else {
    return baseUrl;
  }
};

export const fetchApiGet = async (token: string | null, endPoint: string) => {
  let response = await fetch(`${newBaseUrl()}${endPoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? "Bearer " + token : "",
    },
  });
  let jsonResponse = await response.json();
  return jsonResponse;
};
export const fetchApiPost = async (
  token: string | null,
  endPoint: string,
  data: any
) => {
  let response = await fetch(`${newBaseUrl()}${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  let jsonResponse = await response.json();
  return jsonResponse;
};
