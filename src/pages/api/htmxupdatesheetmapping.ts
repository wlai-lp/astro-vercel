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

// Note: this code has been replaced by ...withfunc that uses postgres function do the all the db related tasks

function getSheet(reqUrl: string, name: string) {
  const url = new URL(reqUrl);
  const sourceSheetId = url.searchParams.get(name);
  const sheet: Tables<"ss_sheets"> = {
    created_at: new Date().toISOString(),
    name: "",
    ss_id: sourceSheetId!,
  };

  return sheet;
}

function getColumn(reqUrl: string, name: string) {
  const url = new URL(reqUrl);
  const keycolumnssid = url.searchParams.get(name);
  const column: Tables<"ss_columns"> = {
    created_at: new Date().toISOString(),
    id: 0,
    name: "place holder name",
    ss_id: keycolumnssid!,
  };

  return column;
}

async function syncColumn(column: Tables<"ss_columns">) {
  const hasColumn = await selectColumn(column);
  if (hasColumn?.length == 0) {
    console.log("no column id in db, create one");
    // todo
    // const columnName = await GetSheetNameByID(column.ss_id);
    // console.log(" 🚀 " + columnName);
    column.name = "place holder";
    const addSourceSheet = await addColumn(column);
  }
}

async function syncSheet(sheet: Tables<"ss_sheets">) {
  const hasSheet = await selectSheet(sheet);
  if (hasSheet?.length == 0) {
    console.log("no sheet id in db, create one");
    const sheetName = await GetSheetNameByID(sheet.ss_id);
    console.log(" 🚀 " + sheetName);
    // sheet.name = sheetName.result;
    const addSourceSheet = await addSheet(sheet);
  }
}

async function addToSheetMapping(
  source: string,
  dest: string,
  trigger: string,
  webhookId: string
) {
  console.log("🚀 column id = " + trigger);
  const sheetMapping: Database["public"]["Tables"]["ss_sheet_mappings"]["Insert"] =
    {
      created_at: new Date().toISOString(),
      dest_id: dest,
      source_id: source,
      source_trigger_column_id: trigger,
      user_id: 10,
      webhook_established: false,
      webhook_id: webhookId,
    };
  addSheetMapping(sheetMapping);
}

export const GET: APIRoute = async ({ request }) => {
  // const url = new URL(request.url);
  // const sourceSheetId = url.searchParams.get("source");
  // const destSheetId = url.searchParams.get("dest");
  // const userId = url.searchParams.get("userid");
  // console.log(sourceSheetId);

  // let sourceSheet: Tables<"ss_sheets"> = {
  //   created_at: new Date().toISOString(),
  //   name: "",
  //   ss_id: sourceSheetId!,
  // };


  const sourceSheet = getSheet(request.url, "source");
  const destSheet = getSheet(request.url, "dest");
  const keycolumn = getColumn(request.url, "keyfield");

  const destid = destSheet.ss_id;
  const destname = destSheet.name!;
  const keyfieldid = keycolumn.ss_id;
  const sourceid = sourceSheet.ss_id;
  const sourcename = sourceSheet.name!;
  const webhookid = "";

  let { data, error } = await supabase.rpc("create_sheet_mapping", {
    destid,
    destname,
    keyfieldid,
    sourceid,
    sourcename,
    webhookid,
  });

  console.log("RPC call " + data)

  // if (error) console.error(error);
  // else console.log(data);

  
  

  // syncSheet(sourceSheet);
  // syncSheet(destSheet);
  // syncColumn(keycolumn);

  // // webhook
  // const webhookId = await CreateWebHook("webhooktest1", sourceSheet.ss_id);
  // addToSheetMapping(
  //   sourceSheet.ss_id,
  //   destSheet.ss_id,
  //   keycolumn.ss_id,
  //   webhookId
  // );

  return new Response(`<h1>hell</h1>`, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "HX-Redirect": `mapcolumns?source=${sourceSheet.ss_id}&dest=${destSheet.ss_id}`,
    },
  });
  // let destSheet = {
  //   created_at: "",
  //   name: "",
  //   ss_id: "",
  // };
};
