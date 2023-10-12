// this has all the ss_users related ops
import { supabase } from "./supabase";
import type { Database, Tables } from "./types";


export const addSheetMapping = async (sheetMapping: Database['public']['Tables']['ss_sheet_mappings']['Insert'] ) => {
  console.log("🚀 add sheetmapping")
    const { data, error: groupError } = await supabase
    .from("ss_sheet_mappings")
    .insert(sheetMapping)
    .select();

  if (!data) {
    console.error("No data returned");
  }

  if (groupError) {
    console.log("error " + groupError.message);
  }
  console.log(JSON.stringify(data));

  return data;
};

export const updateSheetMappingByWebhookId = async (sheetMapping: Tables<"ss_sheet_mappings"> ) => {
  console.log("🚀 add sheetmapping")
    const { data, error: groupError } = await supabase
    .from("ss_sheet_mappings")
    .update(sheetMapping)
    .eq("webhook_id", sheetMapping.webhook_id!)
    .select();

  if (!data) {
    console.error("No data returned");
  }

  if (groupError) {
    console.log("error " + groupError.message);
  }
  console.log(JSON.stringify(data));

  return data;
};

// TODO: update as needed
export const selectSheet = async (sheet: Tables<"ss_sheets">) => {
    console.log("selet sheets where ss_id = " + sheet.ss_id)
    const { data, error: groupError } = await supabase
      .from("ss_sheets")
      .select()
      .eq('ss_id', sheet.ss_id)
  
    if (!data) {
      console.error("No data returned");
    }
  
    if (groupError) {
      console.log("error " + groupError.message);
    }
    console.log(JSON.stringify(data));
  
    return data;
  };

export const updateSheet = async (sheet: Tables<"ss_sheets">) => {
    const { data, error: groupError } = await supabase
      .from("ss_sheet")
      .update(sheet)
      .eq('ss_id', sheet.ss_id)
      .select();
  
    if (!data) {
      console.error("No data returned");
    }
  
    if (groupError) {
      console.log("error " + groupError.message);
    }
    console.log(JSON.stringify(data));
  
    return data;
  };
  
  export const deleteSheet = async (sheet: Tables<"ss_sheets">) => {
    const { data, error: groupError } = await supabase
      .from("ss_users")
      .delete()
      .eq('ss_id', sheet.ss_id)
  
    if (!data) {
      console.error("No data returned");
    }
  
    if (groupError) {
      console.log("error " + groupError.message);
    }
    console.log(JSON.stringify(data));
  
    return data;
  };