import type { APIRoute } from "astro";
import { getSsRequestOptions } from "../../util/fetchOptions";

// export const GET: APIRoute = async ({ request }) => {
export async function CreateWebHook(name: string, souceSSId: string) {
  //   console.log(request.method);

  const apiUrl = import.meta.env.SS_API_ENDPOINT + "webhooks";
  const callbackurl = import.meta.env.SS_WEBHOOK_CALLBACK_URL;

  const body = {
    name: name,
    callbackUrl: callbackurl,
    scope: "sheet",
    scopeObjectId: souceSSId,
    events: ["*.*"],
    version: 1,
  };

  const res = await fetch(
    apiUrl,
    getSsRequestOptions("POST", JSON.stringify(body))
  );
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data')
    console.error("error");
  }

  const data = await res.json();
  console.log("🚀 webhook id is " + data.result.id);
  return data.result.id;
//   console.log("🚀🚀🚀 returning webhook json data " + JSON.stringify(data));
//   return new Response(data, {
//     status: res.status,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
}
