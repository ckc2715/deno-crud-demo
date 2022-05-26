import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
serve((_req) => new Response(body), { port: 8000 });
console.log("http://localhost:8000/");
const body = new TextEncoder().encode("Hello Worldsss\n");


