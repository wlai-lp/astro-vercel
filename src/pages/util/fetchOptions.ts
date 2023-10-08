export function getSsRequestOptions(method: string, body: any) {
  const token = import.meta.env.SS_API_KEY; // Replace with your actual access token

  console.log(" 🚀 ss request options");
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Adjust the content type as needed
  });

  let requestOptions = {};
  if (method == "GET") {
    requestOptions = {
      method: method, // HTTP method (e.g., GET, POST, PUT, DELETE)
      headers: headers,
    };
  } else {
    requestOptions = {
      method: method, // HTTP method (e.g., GET, POST, PUT, DELETE)
      headers: headers,
      body: body,
    };
  }

  return requestOptions;
}
