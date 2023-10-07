// this has all the ss_users related ops
import { supabase } from "./supabase";
import type { Database, Tables } from "./types";

export const addColumn = async (column: Tables<"ss_columns">) => {
  const { data, error: groupError } = await supabase
    .from("ss_columns")
    .insert(column)
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

export const selectColumn = async (column: Tables<"ss_columns">) => {
    console.log("selet sheets where ss_id = " + column.ss_id)
    const { data, error: groupError } = await supabase
      .from("ss_columns")
      .select()
      .eq('ss_id', column.ss_id)
  
    if (!data) {
      console.error("No data returned");
    }
  
    if (groupError) {
      console.log("error " + groupError.message);
    }
    console.log(JSON.stringify(data));
  
    return data;
  };

  // todo
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