import type { APIRoute } from "astro";
import { addSheet, selectSheet } from "../../db/ss_sheets";
import type { Tables } from "../../db/types";

// note: used by sheet mapping page to perform htmx update
// htmx posts to this page
// logic:
// get post payload, select from sheet table by id
// if no results the create a new table

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const sourceSheetId = url.searchParams.get("source");
  const destSheetId = url.searchParams.get("dest");
  const userId = url.searchParams.get("userid");
  console.log(sourceSheetId);

  let sourceSheet: Tables<"ss_sheets"> = {
    created_at: new Date().toISOString(),
    name: "",
    ss_id: sourceSheetId!,
  };

  let destSheet = {
    created_at: "",
    name: "",
    ss_id: "",
  };

  const hasSourceSheet = await selectSheet(sourceSheet);
  if(hasSourceSheet?.length == 0){
    console.log("no sheet id in db, create one");
    const addSourceSheet = await addSheet(sourceSheet)
  }

  sourceSheet.ss_id = sourceSheetId!;

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
    console.log(" 🚀🚀 " + JSON.stringify(import.meta.env))
  const token = import.meta.env.SS_API_KEY; // Replace with your actual access token

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Adjust the content type as needed
  });

  const requestOptions = {
    method: "GET", // HTTP method (e.g., GET, POST, PUT, DELETE)
    headers: headers,
  };

  // const res = await fetch('https://reqres.in/api/users?page=2')
  const res = await fetch(apiUrl, requestOptions);
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
  //   console.log(JSON.stringify(data.data))

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
