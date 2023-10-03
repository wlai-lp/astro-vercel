import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  console.log(request.method);
  
  const apiUrl = import.meta.env.SS_API_ENDPOINT + "?include=favorites";
  const apiFavUrl =
    "https://app.smartsheet.com/2.0/internal/favorites?include=name,directId&includeAll=true";
  const token = import.meta.env.SS_API_KEY; // Replace with your actual access token

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Adjust the content type as needed
  });

  const requestOptions = {
    method: "GET", // HTTP method (e.g., GET, POST, PUT, DELETE)
    headers: headers,
  };
  // const res = await fetch('https://reqres.in/api/users?page=2')
  const res = await fetch(apiUrl, requestOptions);
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data')
    console.error("error");
  }

  const data = await res.json()

  return new Response(JSON.stringify({ data }), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
