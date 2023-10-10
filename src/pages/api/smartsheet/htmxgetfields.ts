import type { APIRoute } from "astro";
import { getSsRequestOptions } from "../../util/fetchOptions";
import { CacheColName } from "../vercelkv";
import { supabase } from "../../../db/supabase";

export const GET: APIRoute = async ({ request }) => {
  console.log(request.url);
  const url = new URL(request.url);
  const sourceSheetId = url.searchParams.get("source") || url.searchParams.get("dest");
  console.log("get sheet id fields " + sourceSheetId);

  if (!sourceSheetId) {
    console.log("no source id");
    return new Response(`<option></option>`, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  const apiUrl =
    "https://api.smartsheet.com/2.0/sheets/" + sourceSheetId + "/columns";
  //   const token = import.meta.env.SS_API_KEY; // Replace with your actual access token

  //   const headers = new Headers({
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json", // Adjust the content type as needed
  //   });

  //   const requestOptions = {
  //     method: "GET", // HTTP method (e.g., GET, POST, PUT, DELETE)
  //     headers: headers,
  //   };

  // const res = await fetch('https://reqres.in/api/users?page=2')
  const res = await fetch(apiUrl, getSsRequestOptions("GET", ""));
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data')
    console.error("error");
  }

  // Generated by https://quicktype.io

  interface SsColumn {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    data: Datum[];
  }

  interface Datum {
    id: number;
    version: number;
    index: number;
    title: string;
    type: string;
    primary?: boolean;
    validation: boolean;
    width: number;
  }

  const data: SsColumn = await res.json();
  const result = JSON.stringify(data.data) 

  type KV = {
    id: number;
    name: string;
  };

  const kv: KV[] = data.data.map((d) => {
    return { id: d.id, name: d.title };
  });
  // send cachec kb request
  CacheColName(kv);

  kv.map(async (d) =>{
    const { data, error: groupError } = await supabase
    .from("ss_columns")
    .insert({
      name : d.name.toString(),
      ss_id :d.id.toString()
    })
    .select()
  })
  
  const option: string[] = data.data.map((d) => {
    return `<option value="${d.id}">${d.title}</option>`;
  });

  console.log(option.join());

  const options = option.join("");
  //   console.log(data.map((d) => d * d));
  //   let options = `<option value='325i'>325i</option>
  //   <option value='325ix'>325ix</option>
  //   <option value='X5'>X5</option>`

  return new Response(options, {
    status: res.status,
    headers: {
      "Content-Type": "text/html",
    },
  });
};
