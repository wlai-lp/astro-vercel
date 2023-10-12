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


// export const GET: APIRoute = async ({ request }) => {
  export async function EnableWebHook(webhookId: string, flag: boolean) {
    //   console.log(request.method);
  
    const apiUrl = import.meta.env.SS_API_ENDPOINT + "webhooks/" + webhookId ;
  
    const body = {
      "enabled": flag
    };
  
    const res = await fetch(
      apiUrl,
      getSsRequestOptions("PUT", JSON.stringify(body))
    );
    // You can return Date, Map, Set, etc.
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // throw new Error('Failed to fetch data')
      console.error("error");
    }
  
    const data = await res.json();
    console.log("🚀 webhook return is  " + JSON.stringify(data));
    return data;
  //   console.log("🚀🚀🚀 returning webhook json data " + JSON.stringify(data));
  //   return new Response(data, {
  //     status: res.status,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  }

  

  export async function DeleteWebHook(webhookId: string) {
    //   console.log(request.method);
  
    const apiUrl = import.meta.env.SS_API_ENDPOINT + "webhooks/" + webhookId ;
  
    const body = {
    };
  
    const res = await fetch(
      apiUrl,
      getSsRequestOptions("DELETE", JSON.stringify(body))
    );
    // You can return Date, Map, Set, etc.
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // throw new Error('Failed to fetch data')
      console.error("error");
    }
  
    const data = await res.json();
    console.log("🚀 webhook deleted  " + JSON.stringify(data));
    return data;

  }