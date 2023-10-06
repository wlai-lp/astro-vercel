const kvtoken = import.meta.env.KV_REST_API_TOKEN; // Replace with your actual access token
const kvendpoint = import.meta.env.KV_REST_API_URL; // Replace with your actual access token

const kvheaders = new Headers({
  Authorization: `Bearer ${kvtoken}`,
  "Content-Type": "application/json", // Adjust the content type as needed
});

const kvrequestOptions = {
  method: "GET", // HTTP method (e.g., GET, POST, PUT, DELETE)
  headers: kvheaders,
};

// NOTE: this is not generic enough, be careful using it
export async function FetchData(url: string): Promise<string> {
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

type Sheet = {
  id: Number;
  name: String;
};
// usage set/{key}/{value}
// set/sheet[id]/sheetname
export async function CacheFav(intersection: Sheet[]) {
  try {
    intersection.map((sheet) => {
      const url = `${kvendpoint}/set/sheet${sheet.id}/${sheet.name}`;
      console.log("cache " + url);
      fetch(url, kvrequestOptions);
    });
  } catch (error) {}
}

export async function GetSheetNameByID(sheetId: string) {}
