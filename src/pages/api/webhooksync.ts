import type { APIRoute } from "astro";

// #REF: astro read regular request payload using async request.json()
export const POST: APIRoute = async ({ request }) => {
  console.log(request.method);
  //   console.log(await request.json());
  const payload = await request.json();

  // replicate logic
  // check webhook payload to see if we have a matching trigger column id
  // 1. get webhook from payload
  // 2. query ss_sheet_mappings for webhook_id, get source_trigger_column_id
  // 3. check webhook payload to see if any of it is trigger
  // 4a. if no trigger then disregard
  // 4b. if there's trigger then perfrom the update logic


  // TBD: comment logic
  

  return new Response(JSON.stringify({ payload }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
