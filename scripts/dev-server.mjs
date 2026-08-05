import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const PROJECT_ROOT = process.cwd();
const PUBLIC_ROOT = resolve(PROJECT_ROOT, "public");
const PORT = Number.parseInt(process.env.PITCH_PORT || "7333", 10);
const HOST = "0.0.0.0";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webm": "video/webm",
};

function parseEnvFile() {
  const envPath = resolve(PROJECT_ROOT, ".env");
  if (!existsSync(envPath)) return {};

  return Object.fromEntries(
    readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separator = line.indexOf("=");
        const key = line.slice(0, separator).trim();
        const rawValue = line.slice(separator + 1).trim();
        const value = rawValue.replace(/^(["'])(.*)\1$/, "$2");
        return [key, value];
      }),
  );
}

function pitchConfigScript() {
  const env = parseEnvFile();
  const config = {
    VITE_SKYLINE_RUSH_URL: env.VITE_SKYLINE_RUSH_URL || "",
    VITE_TAIWAN_DRONE_FLIGHT_URL: env.VITE_TAIWAN_DRONE_FLIGHT_URL || "",
  };
  return `window.PITCH_CONFIG = ${JSON.stringify(config)};`;
}

function safePath(base, relativePath) {
  const candidate = resolve(base, relativePath);
  return candidate === base || candidate.startsWith(`${base}${sep}`) ? candidate : null;
}

function fileForPath(pathname) {
  if (pathname === "/") return resolve(PROJECT_ROOT, "index.html");
  if (pathname === "/linkedin-qr.svg") return resolve(PUBLIC_ROOT, "linkedin-qr.svg");
  if (pathname === "/skyline-rush-qr.svg") return resolve(PUBLIC_ROOT, "skyline-rush-qr.svg");
  if (pathname.startsWith("/imgs/")) return safePath(PUBLIC_ROOT, pathname.slice(1));
  if (pathname.startsWith("/media/")) return safePath(PUBLIC_ROOT, pathname.slice(1));
  if (pathname.startsWith("/src/")) return safePath(PROJECT_ROOT, pathname.slice(1));
  return null;
}

function sendFile(request, response, filePath) {
  const stats = statSync(filePath);
  const contentType = mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream";
  const range = request.headers.range;

  response.setHeader("Content-Type", contentType);
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Accept-Ranges", "bytes");

  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!match) {
      response.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
      response.end();
      return;
    }

    const start = match[1] ? Number.parseInt(match[1], 10) : 0;
    const end = match[2] ? Number.parseInt(match[2], 10) : stats.size - 1;
    if (start > end || end >= stats.size) {
      response.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
      response.end();
      return;
    }

    response.writeHead(206, {
      "Content-Length": end - start + 1,
      "Content-Range": `bytes ${start}-${end}/${stats.size}`,
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(filePath, { start, end }).pipe(response);
    return;
  }

  response.writeHead(200, { "Content-Length": stats.size });
  if (request.method === "HEAD") response.end();
  else createReadStream(filePath).pipe(response);
}

const server = createServer((request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    if (url.pathname === "/favicon.ico") {
      response.writeHead(204);
      response.end();
      return;
    }

    if (url.pathname === "/config.js") {
      const body = pitchConfigScript();
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Length": Buffer.byteLength(body),
        "Content-Type": "text/javascript; charset=utf-8",
      });
      response.end(body);
      return;
    }

    const filePath = fileForPath(decodeURIComponent(url.pathname));
    if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    sendFile(request, response, filePath);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Internal server error");
    console.error(error);
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other process and retry.`);
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log(`Pitch deck ready at http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop.");
});
