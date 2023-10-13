// this has all the ss_users related ops
import { supabase } from "./supabase";
import type { Database, Tables } from "./types";

export const selectColumnByWebhookId = async (webhookId : string) => {
  const { data, error: groupError } = await supabase
    .from("ss_column_mappings")    
    .select()
    .eq("webhook_id", webhookId)

  if (!data) {
    console.error("No data returned");
  }

  if (groupError) {
    console.log("error " + groupError.message);
  }
  console.log(JSON.stringify(data));

  return data;
};