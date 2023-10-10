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

type KV = {
  id: number;
  name: String;
};
// usage set/{key}/{value}
// set/sheet[id]/sheetname
export async function CacheFav(intersection: KV[]) {
  try {
    intersection.map((sheet) => {
      const url = `${kvendpoint}/set/sheet${sheet.id}/${sheet.name}`;
      // #DATA https://right-mouse-42513.kv.vercel-storage.com/set/sheet6167495171172228/AskServices
      // console.log("cache " + url);
      fetch(url, kvrequestOptions);
    });
  } catch (error) {}
}

export async function GetSheetNameByID(sheetId: string) {
  try {
    const url = `${kvendpoint}/get/sheet${sheetId}/`;
    const data = await fetch(url, kvrequestOptions);
    console.log("KV url = " + url)
    // return data.json()
    const kvresult = JSON.parse(JSON.stringify(await data.json())) as KvResult;
    // return data.json()
    return kvresult.result
  } catch (error) {}
}

// NOTE: the type is the same, just id and name, so reusing Sheet
export async function CacheColName(data: KV[]) {
  try {
    data.map((col) => {
      const url = `${kvendpoint}/set/col${col.id}/${col.name}`;
      // #DATA https://right-mouse-42513.kv.vercel-storage.com/set/sheet6167495171172228/AskServices
      console.log("cache " + url);
      fetch(url, kvrequestOptions);
    });
  } catch (error) {}
}
type KvResult = {
  result: string
}
export async function GetSsColNameByID(ss_colId: string) {
  try {
    const url = `${kvendpoint}/get/col${ss_colId}/`;
    const data = await fetch(url, kvrequestOptions);
    const kvresult = JSON.parse(JSON.stringify(await data.json())) as KvResult;
    // return data.json()
    return kvresult.result
  } catch (error) {}
}
