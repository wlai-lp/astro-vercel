

const supabaseUrl = import.meta.env.KV_REST_API_READ_ONLY_TOKEN
console.log(supabaseUrl)

export async function GET({ }) {
  // const id = params.id;
  
  console.log("server side ")
    return new Response(
      JSON.stringify({msg: '[id].json.ts is working'}), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }