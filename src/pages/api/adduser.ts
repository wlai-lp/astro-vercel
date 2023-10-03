import type { APIRoute } from "astro";
import { addUser, type IAddUserType } from "../../db/ss_users";

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
  
  console.log(payload.api_key)
//   const data = JSON.parse(payload)// as IAddUserType;
  const createdUser = await addUser(payload);

  return new Response(JSON.stringify({createdUser}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
