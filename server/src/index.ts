import { createApp } from "./app.js";

/** Default 4010 to avoid clashing with other local stacks that often bind :4000 (e.g. Docker). */
const port = Number(process.env.PORT ?? 4010);

const app = createApp();

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    // eslint-disable-next-line no-console
    console.error(
      `\nPort ${port} is already in use (EADDRINUSE).\n` +
        `• Free it (macOS):  lsof -nP -iTCP:${port} -sTCP:LISTEN\n` +
        `• Then stop that PID:  kill <pid>\n` +
        `• Or use another port for both processes:\n` +
        `    PORT=4020 API_PROXY_PORT=4020 npm run dev\n` +
        `  (server listens on PORT; Vite proxies to API_PROXY_PORT.)\n`
    );
  } else {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  process.exit(1);
});
