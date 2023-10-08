// this offload the db relation ops to supabase function
// this way we don't have to worry about the implementation here

import type { APIRoute } from "astro";
import { addSheet, selectSheet } from "../../db/ss_sheets";
import { addColumn, selectColumn } from "../../db/ss_columns";
import { addSheetMapping } from "../../db/ss_sheet_mappings";
import type { Database, Tables } from "../../db/types";
import { GetSheetNameByID } from "./vercelkv";
import { CreateWebHook } from "./smartsheet/createWebhook";
import { supabase } from "../../db/supabase";

// note: used by sheet mapping page to perform htmx update
// htmx posts to this page
// logic:
// 1. get post payload, select from sheet table by id
// 2. if no results the create a new table
// 3. do the same for column
// TODO 4. create webhook
// TODO 5. init webhook request
// TODO 6. update webhook table
// 7. create sheet mapping table

export const GET: APIRoute = async ({ request }) => {
  
  const url = new URL(request.url);
  const sourceid = url.searchParams.get("source")!;
  const destid = url.searchParams.get("dest")!;
  const keyfieldid = url.searchParams.get("keyfield")!;

  // kv call
  const destname = "destname";
  // kv call
  const sourcename = "sourceSheet.name!";
  // ss call
  const webhookid = await CreateWebHook("smartersheet", sourceid!)!;
  // TODO
  const keyfieldname = "smartersheet key field name";

  let { data, error } = await supabase.rpc("create_sheet_mapping", {
    sourceid, 
    sourcename,
    destid,
    destname,
    keyfieldid,
    keyfieldname,
    webhookid 
  });

  if(error){
    console.error("🛑⛔🚫 RPC error " + JSON.stringify(error))
  }
  
  console.log("🚀🚀🚀 RPC call " + data)


  return new Response(`<h1>hell</h1>`, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "HX-Redirect": `mapcolumns?source=${sourceid}&dest=${destid}`,
    },
  });
};
