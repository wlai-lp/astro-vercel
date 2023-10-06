export function getSsRequestOptions() {
  const token = import.meta.env.SS_API_KEY; // Replace with your actual access token

  console.log(" 🚀 ss request options" )
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Adjust the content type as needed
  });

  const requestOptions = {
    method: "GET", // HTTP method (e.g., GET, POST, PUT, DELETE)
    headers: headers,
  };

  return requestOptions;
}
