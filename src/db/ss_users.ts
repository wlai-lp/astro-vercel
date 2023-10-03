// this has all the ss_users related ops
import { supabase } from "./supabase";
import type { Database, Tables } from "./types";

export const addUser = async (user: Tables<"ss_users">) => {
  console.log(user.name);
  const { data, error: groupError } = await supabase
    .from("ss_users")
    .insert(user)
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

export const updateUser = async (user: Tables<"ss_users">) => {
    console.log(user.name);
    const { data, error: groupError } = await supabase
      .from("ss_users")
      .update(user)
      .eq('id', user.id)
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
  
  export const deleteUser = async (user: Tables<"ss_users">) => {
    console.log(user.name);
    const { data, error: groupError } = await supabase
      .from("ss_users")
      .delete()
      .eq('id', user.id)
  
    if (!data) {
      console.error("No data returned");
    }
  
    if (groupError) {
      console.log("error " + groupError.message);
    }
    console.log(JSON.stringify(data));
  
    return data;
  };