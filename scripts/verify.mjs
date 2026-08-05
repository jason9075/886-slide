import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/styles.css",
  "public/linkedin-qr.svg",
  "public/skyline-rush-qr.svg",
  "public/imgs/1.png",
  "public/imgs/2.png",
  "public/imgs/3.png",
  "public/imgs/4.png",
  "SPEAKER_NOTES.md",
  ".env.example",
];

const missingFiles = requiredFiles.filter((file) => !existsSync(resolve(root, file)));
if (missingFiles.length > 0) {
  throw new Error(`Missing required files: ${missingFiles.join(", ")}`);
}

const main = readFileSync(resolve(root, "src/main.js"), "utf8");
const slideCount = (main.match(/data-slide="\d"/g) || []).length;
if (slideCount !== 6) throw new Error(`Expected 6 slides, found ${slideCount}`);

const requiredCopy = [
  "I built a playable city",
  "Use AI to ship fast",
  "PROCEDURAL GENERATION",
  "FLIGHT DYNAMICS",
  "QUATERNIONS",
  "INPUT ABSTRACTION",
  "The average looked fast",
  "DERIVED FPS",
  "58 FPS",
  "TAIL LATENCY",
  "ATOMIC HANDOVER",
  "Bring the problem",
  "jason-kuan-03552570",
];

for (const text of requiredCopy) {
  if (!main.includes(text)) throw new Error(`Required slide copy is missing: ${text}`);
}

const demoButtons = (main.match(/data-demo="/g) || []).length;
if (demoButtons !== 2) throw new Error(`Expected 2 live-demo buttons, found ${demoButtons}`);

const mediaFiles = [
  "public/media/skyline-rush.mp4",
  "public/media/taiwan-drone-flight.mp4",
  "public/media/perf_compare.mp4",
];
const missingMedia = mediaFiles.filter((file) => !existsSync(resolve(root, file)));

console.log("Static pitch deck checks passed.");
if (missingMedia.length > 0) {
  console.log(`Fallback videos still to add: ${missingMedia.join(", ")}`);
}
