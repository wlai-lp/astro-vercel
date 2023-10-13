import type { APIRoute } from "astro";
import { getSsRequestOptions } from "../../util/fetchOptions";

// export const GET: APIRoute = async ({ request }) => {
export async function getRowBySsIdAndRowId(sheetId: string, rowId: string) {
  //   console.log(request.method);
// sheets/312023288074116/rows/6087635526258564
  const apiUrl = import.meta.env.SS_API_ENDPOINT + "sheets/" + sheetId + "/rows/" + rowId;



  const res = await fetch(
    apiUrl,
    getSsRequestOptions("GET", "")
  );
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data')
    console.error("error");
  }

  const data = await res.json();
  console.log("🚀 getRowBySsIdAndRowId id is " + JSON.stringify(data));
  return data;
//   console.log("🚀🚀🚀 returning webhook json data " + JSON.stringify(data));
//   return new Response(data, {
//     status: res.status,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
}
