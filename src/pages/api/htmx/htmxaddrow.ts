import type { APIRoute } from "astro";
import { supabase } from "../../../db/supabase";

// take webhook, sourceid, destid and create a new record, 
// pass the record id back for the delete logic

export const POST: APIRoute = async ({ request }) => {

  const url = new URL(request.url)
  const formData = await request.formData();
  const webhookId = formData.get("webhook");
  console.log(" 🚀🚀 " + webhookId)
  const sourceColId = formData.get("sourceColumn");
  const deskColId = formData.get("destColumn");
  console.log(sourceColId?.toString())

  const { data, error: groupError } = await supabase
  .from("ss_column_mappings")
  .insert({
    deskt_column_id : deskColId?.toString(),
    source_column_id: sourceColId?.toString(),
    webhook_id: webhookId?.toString()
  })
  .select("id")
  .single()

  if (groupError) {
    console.log("error " + groupError.message);
  }

  console.log(JSON.stringify(data))
  const { id } = data!;
  console.log(id)




  const wei = "dogg";
  const options = `<tr>
<td>${sourceColId?.toString()}</td>
<td>${deskColId?.toString()}</td>
<td>
  <button
    name="deleteColMapping"
    value=${id}
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
