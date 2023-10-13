import type { APIRoute } from "astro";
import { getSsRequestOptions } from "../../util/fetchOptions";

// export const GET: APIRoute = async ({ request }) => {
export async function updateDestSheet(sheetId: string, payload: string) {
  // do a post to  https://api.smartsheet.com/2.0/sheets/4444268315758468/rows/
  const apiUrl =
    import.meta.env.SS_API_ENDPOINT + "sheets/" + sheetId + "/rows/";

  const body = JSON.parse(payload);

  const res = await fetch(apiUrl, getSsRequestOptions("POST", payload));
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data')
    console.error("error");
  }

  const data = await res.json();
  console.log("🚀 updateDestSheet result is " + JSON.stringify(data));
  return data;
  //   console.log("🚀🚀🚀 returning webhook json data " + JSON.stringify(data));
  //   return new Response(data, {
  //     status: res.status,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
}
