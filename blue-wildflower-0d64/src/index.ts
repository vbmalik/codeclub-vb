/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'POST') {
      return handlePostRequest(request);
    } else if (url.hostname === 'www.cloudflareworkers.com' && url.pathname === '/test') {
      return new Response('Hello worker!', {
        headers: {
          'content-type': 'text/plain',
        },
      });
    } else {
      return new Response('Error Worker! Wrong URL', {
        headers: {
          'content-type': 'text/plain',
        },
      });
    }
  },
};

const handlePostRequest = async (request: Request): Promise<Response> => {
  const body = await request.text();
  const jsonResponse = {
    method: request.method,
    body: body,
    message: 'This is a POST request response',
  };

  return new Response(JSON.stringify(jsonResponse), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};