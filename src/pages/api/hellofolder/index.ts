
export async function GET({ }) {
    console.log("this is server side");
    return new Response(
      JSON.stringify({msg: 'hello world'}), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  export async function POST({ }) {
    console.log("this is server side post");
    return new Response(
      JSON.stringify({msg: 'hello world'}), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }