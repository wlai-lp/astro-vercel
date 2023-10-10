import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

// take webhook, sourceid, destid and create a new record, 
// pass the record id back for the delete logic

export const POST: APIRoute = async ({ request }) => {

  const url = new URL(request.url)
  const webhookId = url.searchParams.get("webhook")
  const formData = await request.formData();
  const sourceColId = formData.get("sourceColumn");
  const deskColId = formData.get("destColumn");
  console.log(sourceColId?.toString())

  const { data, error: groupError } = await supabase
  .from("ss_column_mappings")
  .insert({
    deskt_column_id : deskColId?.toString(),
    source_column_id: sourceColId?.toString(),
    webhook_id: webhookId
  })
  .select("id")
  .single()

  if (groupError) {
    console.log("error " + groupError.message);
  }

  console.log(JSON.stringify(data))

  const wei = "dogg";
  const options = `<tr>
<td>htmx swap</td>
<td>${wei}</td>
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
</tr>`;

  return new Response(options, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
};
