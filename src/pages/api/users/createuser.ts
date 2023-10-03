import type { APIRoute } from "astro";
import { addUser } from "../../../db/ss_users";

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      greeting: "Hello add user",
    })
  );
};

export const POST: APIRoute = async ({ request }) => {
  console.log(request.method);
  //   console.log(await request.json());
  const payload = await request.json();

  // payload is already a parsed json
  console.log(payload.api_key);
  //   const data = JSON.parse(payload)// as IAddUserType;
  const createdUser = await addUser(payload);

  return new Response(JSON.stringify({ createdUser }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
