import type { APIRoute } from "astro";
import { updateUser } from "../../../../../db/ss_users";
import type { Tables } from "../../../../../db/types";

export const POST: APIRoute = async ({ request }) => {
  console.log(request.method);
  //   console.log(await request.json());
  const payload = await request.json();
  
  // TODO: validation?
  const data = payload as Tables<'ss_users'>
  // if(Tables<'ss_users'> instanceof payload)

  // payload is already a parsed json
  console.log(payload.api_key);
  //   const data = JSON.parse(payload)// as IAddUserType;
  const createdUser = await updateUser(payload);

  return new Response(JSON.stringify({ createdUser }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
