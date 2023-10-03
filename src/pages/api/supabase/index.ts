import { supabase, getGroups } from "../../../db/supabase";

// const {data} = await supabase.rpc("draw_name", {groupid: group.id, username: userName}).single()

export async function GET({}) {
//   const { data, error: groupError } = await supabase.from("groups").select("*");
const data = await getGroups()

//   if (groupError) {
//     console.error(groupError);
//   }

  if (!data) {
    console.error("No data returned");
  }

  console.log("this is server side");
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST({}) {
  console.log("this is server side post");
  return new Response(JSON.stringify({ msg: "hello world3" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
