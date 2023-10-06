// this has all the ss_users related ops
import { supabase } from "./supabase";
import type { Database, Tables } from "./types";

export const addSheet = async (sheet: Tables<"ss_sheets">) => {
  const { data, error: groupError } = await supabase
    .from("ss_sheets")
    .insert(sheet)
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