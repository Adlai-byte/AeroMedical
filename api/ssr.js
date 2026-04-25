// Vercel Serverless Function — bridges TanStack Start's fetch handler
// to Vercel's (req, res) Node.js function signature.
import { Readable } from "node:stream";

// TanStack Start's built server exports a default with a `fetch` method
const server = await import("../dist/server/server.js");

export default async function handler(req, res) {
  try {
    // Build a Web API Request from Node's IncomingMessage
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["host"] || "localhost";
    const url = new URL(req.url, `${protocol}://${host}`);

    // Collect the request body
    let body = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = Buffer.concat(chunks);
    }

    const webReq = new Request(url, {
      method: req.method,
      headers: Object.entries(req.headers).reduce((h, [k, v]) => {
        if (v !== undefined) h.set(k, Array.isArray(v) ? v.join(", ") : v);
        return h;
      }, new Headers()),
      body: body || undefined,
    });

    // Call TanStack Start's fetch handler
    const webRes = await server.default.fetch(webReq);

    // Stream the Web API Response back to Node's ServerResponse
    res.statusCode = webRes.status;
    webRes.headers.forEach((v, k) => res.setHeader(k, v));

    if (webRes.body) {
      const reader = webRes.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error("SSR error:", err);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain");
    res.end("Internal Server Error");
  }
}
