import { Application, Response } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import router from './routes/routes.ts';

const port = 8000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

router.get('/api/v1/books', ({response}: {response: Response}) => {
    response.body = 'Hello world';
});

console.log(`server running at ${port}`)
await app.listen({ port });