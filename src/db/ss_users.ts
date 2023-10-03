// this has all the ss_users related ops
import { supabase } from "./supabase";
import type { Database, Tables } from "./types";

export const addUser = async (ss_insert: Tables<"ss_users">) => {
  console.log(ss_insert.name);
  const { data, error: groupError } = await supabase
    .from("ss_users")
    .insert(ss_insert)
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

export const updateUser = async (ss_insert: Tables<"ss_users">) => {
    console.log(ss_insert.name);
    const { data, error: groupError } = await supabase
      .from("ss_users")
      .update(ss_insert)
      .eq('id', ss_insert.id)
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
  