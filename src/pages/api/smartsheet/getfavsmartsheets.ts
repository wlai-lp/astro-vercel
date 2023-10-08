import type { APIRoute } from "astro";
import { CacheFav } from "../vercelkv";

export const GET: APIRoute = async ({ request }) => {
  console.log(request.method);

  function getFav(favDataArray: Fav[], sheetdataArray: Sheet[]) {
    console.log(
      "i'm getting the data " +
        favDataArray.length +
        " " +
        sheetDataArray.length
    );
    const intersection: Sheet[] = sheetDataArray.filter((obj1) =>
      favDataArray.some((obj2) => obj2.name === obj1.name)
    );

    try {
      CacheFav(intersection);
    } catch (e) {}
    return intersection;
  }

  async function fetchData(url: string): Promise<string> {
    const token = import.meta.env.SS_API_KEY; // Replace with your actual access token

    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Adjust the content type as needed
    });

    const requestOptions = {
      method: "GET", // HTTP method (e.g., GET, POST, PUT, DELETE)
      headers: headers,
    };

    return fetch(url, requestOptions).then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }
      return response.json();
    });
  }

  const apiUrl = import.meta.env.SS_API_ENDPOINT + "sheets?includeAll=true";
  const apiFavUrl =
    "https://app.smartsheet.com/2.0/internal/favorites?include=name,directId&includeAll=true";

  const allsheet: Promise<any> = fetchData(apiUrl);
  const favsheet: Promise<any> = fetchData(apiFavUrl);

  const [sheetdata, favdata] = await Promise.all([allsheet, favsheet]);

  type Sheet = {
    id: number;
    name: String;
  };

  type Fav = {
    type: String;
    name: String;
  };

  const favDataArray = favdata.data as Fav[];
  const sheetDataArray = sheetdata.data as Sheet[];

  const data = getFav(favDataArray, sheetDataArray);

  //   const fav = getFav(data);

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
