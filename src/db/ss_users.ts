// this has all the ss_users related ops
import { supabase } from "./supabase";
import type { Database, Tables } from "./types";

// copied from types
export interface IAddUserType {
  api_key: string | null;
  created_at: string;
  id: number;
  idp_name: string | null;
  name: string | null;
}

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
