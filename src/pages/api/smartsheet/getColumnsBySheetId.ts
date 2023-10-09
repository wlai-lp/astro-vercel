import type { APIRoute } from "astro";
import { getSsRequestOptions } from "../../util/fetchOptions";

export async function getColumnsBySheetId(sourceSheetId: string) {
  const apiUrl =
    import.meta.env.SS_API_ENDPOINT + "sheets/" + sourceSheetId + "/columns";
  const res = await fetch(apiUrl, getSsRequestOptions("GET", ""));
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data')
    console.error("error");
  }

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
  const result = JSON.stringify(data.data);
  return result
}
