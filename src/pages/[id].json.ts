export async function GET({ params }) {
  const id = params.id;
  
  console.log("server side " + id)
    return new Response(
      JSON.stringify({msg: 'producasdft'}), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }