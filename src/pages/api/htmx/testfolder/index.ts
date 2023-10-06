import type { APIRoute } from "astro";
import { addUser } from "../../../../db/ss_users";

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      greeting: "Hello add user",
    })
  );
};

export const POST: APIRoute = async ({ request }) => {
  console.log(' 🚀 ' + request.method);
  //   console.log(await request.json());
//   const payload = (await request.formData()).forEach(d => console.log(d));

/* given this button
div id="replaceMe">
    <td colspan="3">
      <button
        name="htmxbutton"
        value="htmxbutton-valuexxx"
        class="btn"
        hx-post="/api/htmx/testfolder"
        hx-target="#replaceMe"
        hx-swap="outerHTML"
      >
        click me</button
      >
    </td>
  </div>
  */

// this is how you get the post form data from the button
  const payload = (await request.formData()).get('htmxbutton')
//   const payload2 = (await JSON.stringify(request.formData()));
  console.log(' 🚀🚀🚀 ' + payload);

  // payload is already a parsed json
//   console.log(payload.api_key);
  //   const data = JSON.parse(payload)// as IAddUserType;
//   const createdUser = await addUser(payload);

  return new Response(JSON.stringify({  }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
