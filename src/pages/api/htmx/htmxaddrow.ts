import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
const options = `<tr>
<td>htmx swap</td>
<td>htmx swap</td>
<td>
  <button
    name="abc"
    value="abc"
    class="btn btn-danger"
    hx-delete="/api/htmxdeletecolumn"
  >
    Delete
  </button>
</td>
</tr>`

return new Response(options, {
  status: 200,
  headers: {
    "Content-Type": "text/html",
  },
});

}