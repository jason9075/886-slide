const LINKEDIN_URL = "https://www.linkedin.com/in/jason-kuan-03552570/";
const pitchConfig = window.PITCH_CONFIG || {};
const SKYLINE_RUSH_URL =
  pitchConfig.VITE_SKYLINE_RUSH_URL ||
  "https://jason9075.github.io/Skyline-Rush/";
const TAIWAN_DRONE_FLIGHT_URL =
  pitchConfig.VITE_TAIWAN_DRONE_FLIGHT_URL || "";

const app = document.querySelector("#app");

if (!app) {
  throw new Error("Missing #app root element");
}

const externalArrow = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
`;

const arrowLeft = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
`;

const arrowRight = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
`;

app.innerHTML = `
  <main class="deck" aria-live="polite">
    <div class="ambient" aria-hidden="true">
      <div class="ambient__sun"></div>
      <div class="ambient__glow ambient__glow--aqua"></div>
      <div class="ambient__glow ambient__glow--coral"></div>
      <div class="ambient__grain"></div>
    </div>

    <section class="slide slide--cover is-active" data-slide="0" aria-label="Opening slide">
      <div class="slide__inner cover-layout">
        <div class="event-stamp reveal reveal--1">
          <span class="event-stamp__sun" aria-hidden="true"></span>
          IKIGAI VIBE BUILD · SUMMER EDITION
        </div>

        <div class="cover-copy">
          <p class="kicker reveal reveal--2">JASON KUAN · ZERO-TO-ONE AI &amp; SPATIAL SYSTEMS BUILDER</p>
          <h1 class="cover-title reveal reveal--3">
            I built a playable city <em>in one day.</em><br />
            Then I tried <span>Taiwan.</span>
          </h1>
          <p class="manifesto reveal reveal--4">
            Use AI to ship fast. <strong>Go deep when reality pushes back.</strong>
          </p>
          <div class="cover-facts reveal reveal--5" aria-label="Pitch highlights">
            <span><b>01</b> day to playable</span>
            <span><b>02</b> live worlds</span>
            <span><b>01</b> week deeper</span>
          </div>
        </div>

        <div class="cover-world reveal reveal--3" aria-hidden="true">
          <svg viewBox="0 0 760 610" role="img" aria-label="A drone flying from a generated city into Taiwan">
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#2ad3d0" stop-opacity=".22" />
                <stop offset="1" stop-color="#071a2a" stop-opacity="0" />
              </linearGradient>
              <linearGradient id="sunset" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#ffd35a" />
                <stop offset="1" stop-color="#ff765c" />
              </linearGradient>
              <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <rect x="1" y="1" width="758" height="608" rx="44" fill="url(#sky)" stroke="#fff" stroke-opacity=".12" />
            <circle cx="585" cy="148" r="76" fill="url(#sunset)" filter="url(#softGlow)" />
            <path d="M34 397c134-52 227-52 329 0s208 53 363-13" fill="none" stroke="#63eadb" stroke-width="2" stroke-opacity=".4" />
            <path d="M34 423c134-52 227-52 329 0s208 53 363-13" fill="none" stroke="#63eadb" stroke-width="2" stroke-opacity=".2" />

            <g fill="#0d2d3e" stroke="#4fe3d4" stroke-opacity=".42">
              <path d="M50 488v-91h44v91M101 488V348h55v140M167 488V391h45v97M222 488V326h67v162M299 488V372h52v116" />
              <path d="M377 488V379h66v109M453 488V305h76v183M539 488V350h50v138M601 488V269h72v219M684 488V380h35v108" />
            </g>
            <g fill="#ffd45d" opacity=".58">
              <rect x="112" y="371" width="9" height="9" /><rect x="130" y="371" width="9" height="9" />
              <rect x="238" y="347" width="11" height="11" /><rect x="260" y="347" width="11" height="11" />
              <rect x="470" y="329" width="12" height="10" /><rect x="497" y="329" width="12" height="10" />
              <rect x="620" y="294" width="12" height="10" /><rect x="646" y="294" width="12" height="10" />
            </g>

            <path d="M107 284c117-135 275-115 408-14" fill="none" stroke="#fff2c0" stroke-width="3" stroke-dasharray="10 13" stroke-linecap="round" opacity=".62" />
            <g transform="translate(323 190)" filter="url(#softGlow)">
              <path d="M-46 16h92M-17 4 0-8 17 4M-28 16 0 29l28-13" fill="none" stroke="#fff7dc" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="-49" cy="16" r="12" fill="none" stroke="#ffd45d" stroke-width="4" />
              <circle cx="49" cy="16" r="12" fill="none" stroke="#ffd45d" stroke-width="4" />
            </g>
            <g class="world-labels" fill="#fff7dc">
              <text x="52" y="542">GENERATED</text>
              <text x="604" y="542">TAIWAN</text>
            </g>
          </svg>
        </div>

      </div>
    </section>

    <section class="slide slide--day-one" data-slide="1" aria-label="Skyline Rush in one day" aria-hidden="true">
      <div class="slide__inner split-layout split-layout--media-right">
        <div class="story-column">
          <div class="chapter-label reveal reveal--1"><span>DAY 01</span> · AI LEVERAGE</div>
          <h2 class="slide-title reveal reveal--2">From prompt<br />to <em>playable.</em></h2>
          <a class="mobile-play-card reveal reveal--3" href="${SKYLINE_RUSH_URL}" target="_blank" rel="noreferrer">
            <img src="/skyline-rush-qr.svg" alt="QR code to play Skyline Rush on mobile" />
            <span class="mobile-play-card__copy">
              <small>PLAY ON YOUR PHONE</small>
              <strong>Scan &amp; fly now.</strong>
              <em>Mobile-ready · No install</em>
            </span>
            <span class="mobile-play-card__arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <div class="media-column reveal reveal--3">
          <div class="media-card" data-media-card>
            <div class="media-card__topline">
              <span><i class="status-dot"></i> SKYLINE RUSH</span>
              <span>PCG WORLD · BROWSER</span>
            </div>
            <div class="media-card__viewport">
              <div class="video-placeholder" aria-hidden="true">
                <div class="placeholder-sun"></div>
                <div class="placeholder-city placeholder-city--generated"></div>
                <p>Add <code>public/media/skyline-rush.mp4</code></p>
              </div>
              <video autoplay muted loop playsinline preload="metadata" aria-label="Skyline Rush fallback video">
                <source src="/media/skyline-rush.mp4" type="video/mp4" />
              </video>
              <div class="video-vignette"></div>
              <span class="media-badge">1 DAY → PLAYABLE</span>
            </div>
            <div class="media-card__footer">
              <span>Fallback loops automatically</span>
              <a class="demo-button" data-demo="skyline" href="#" target="_blank" rel="noreferrer">
                LIVE DEMO ${externalArrow}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="slide slide--world-model" data-slide="2" aria-label="From visual city to world model" aria-hidden="true">
      <div class="slide__inner">
        <div class="chapter-label reveal reveal--1"><span>THE FIRST WALL</span> · WORLD MODEL</div>
        <div class="world-model-heading">
          <h2 class="slide-title reveal reveal--2">It looked like a city.<br /><em>But it had no meaning.</em></h2>
          <p class="slide-lede reveal reveal--3">
            The game could not tell a road from an obstacle. That wall became the curriculum.
          </p>
        </div>

        <div class="world-model-timeline reveal reveal--4" aria-label="Skyline Rush evolving from obstacle field to road-aware gameplay">
          <figure class="world-step">
            <img src="/imgs/1.png" alt="Early Skyline Rush obstacle field" />
            <figcaption><b>01 · SHIP</b><span>Playable obstacle field</span></figcaption>
          </figure>
          <figure class="world-step">
            <img src="/imgs/2.png" alt="Early Skyline Rush city-shaped scene" />
            <figcaption><b>02 · WALL</b><span>A city with no rules</span></figcaption>
          </figure>
          <figure class="world-step world-step--model">
            <img src="/imgs/3.png" alt="Skyline Rush with a procedural road network" />
            <figcaption><b>03 · ABSTRACT</b><span>Queryable road model</span></figcaption>
          </figure>
          <figure class="world-step world-step--unlock">
            <img src="/imgs/4.png" alt="Gate Rush using the procedural road network" />
            <figcaption><b>04 · UNLOCK</b><span>Gate Rush</span></figcaption>
          </figure>
        </div>

        <div class="learning-strip reveal reveal--5" aria-label="Things learned while building Skyline Rush">
          <span class="learning-strip__label">WHAT I LEARNED</span>
          <span>PROCEDURAL GENERATION</span>
          <span>FLIGHT DYNAMICS</span>
          <span>3D ORIENTATION / QUATERNIONS</span>
          <span>INPUT ABSTRACTION</span>
        </div>

        <div class="lesson-bar lesson-bar--learning reveal reveal--5">
          <span class="lesson-bar__icon">↳</span>
          <p><b>THE LOOP</b> Ship fast. Hit reality. Learn deeply. Unlock capability.</p>
          <span class="lesson-bar__result">WALL → LEARNING → CAPABILITY</span>
        </div>
      </div>
    </section>

    <section class="slide slide--day-two" data-slide="3" aria-label="Taiwan Drone Flight in two days" aria-hidden="true">
      <div class="slide__inner split-layout split-layout--media-left">
        <div class="media-column reveal reveal--2">
          <div class="media-card media-card--taiwan" data-media-card>
            <div class="media-card__topline">
              <span><i class="status-dot"></i> TAIWAN DRONE FLIGHT</span>
              <span>GOOGLE 3D TILES · LIVE</span>
            </div>
            <div class="media-card__viewport">
              <div class="video-placeholder video-placeholder--taiwan" aria-hidden="true">
                <div class="placeholder-sun"></div>
                <div class="placeholder-mountain"></div>
                <div class="placeholder-city placeholder-city--taiwan"></div>
                <p>Add <code>public/media/taiwan-drone-flight.mp4</code></p>
              </div>
              <video autoplay muted loop playsinline preload="metadata" aria-label="Taiwan Drone Flight fallback video">
                <source src="/media/taiwan-drone-flight.mp4" type="video/mp4" />
              </video>
              <div class="video-vignette"></div>
              <span class="media-badge">2 DAYS → FIRST FLIGHT</span>
            </div>
            <div class="media-card__footer">
              <span>Tailscale-ready · MP4 fallback</span>
              <a class="demo-button" data-demo="taiwan" href="#" target="_blank" rel="noreferrer">
                LIVE DEMO ${externalArrow}
              </a>
            </div>
          </div>
        </div>

        <div class="story-column">
          <div class="chapter-label reveal reveal--1"><span>DAY 02</span> · ONE QUESTION</div>
          <h2 class="slide-title reveal reveal--2">Could it fly<br />over <em>Taiwan?</em></h2>
          <p class="slide-lede reveal reveal--3">
            The first demo became leverage for the second. The world changed; the feel of flight carried over.
          </p>
          <div class="reuse-grid reveal reveal--4">
            <div>
              <span>REUSED</span>
              <b>Drone mesh</b>
              <b>Flight logic</b>
            </div>
            <div>
              <span>REBUILT</span>
              <b>World streaming</b>
              <b>Google 3D Tiles</b>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="slide slide--deep" data-slide="4" aria-label="Frame-paced streaming performance optimization" aria-hidden="true">
      <div class="slide__inner deep-layout">
        <div class="deep-heading">
          <div class="chapter-label reveal reveal--1"><span>ONE WEEK DEEPER</span> · FRAME PACING</div>
          <h2 class="slide-title reveal reveal--2">The average looked fast.<br /><em>The worst frames still broke flight.</em></h2>
        </div>

        <div class="perf-compare-card reveal reveal--3" data-media-card>
          <div class="perf-compare-card__topline">
            <span><i class="compare-dot compare-dot--before"></i> PROTOTYPE · BURSTY WORK</span>
            <span>SAME CITY · SAME FLIGHT</span>
            <span><i class="compare-dot compare-dot--after"></i> SYSTEM · FRAME-PACED</span>
          </div>
          <div class="perf-compare-card__viewport">
            <div class="perf-video-placeholder" aria-hidden="true">
              <span>BEFORE</span>
              <i></i>
              <span>AFTER</span>
              <p>Add <code>public/media/perf_compare.mp4</code></p>
            </div>
            <video autoplay muted loop playsinline preload="metadata" aria-label="Before and after frame pacing comparison">
              <source src="/media/perf_compare.mp4" type="video/mp4" />
            </video>
            <div class="perf-video-vignette"></div>
            <span class="perf-watch-label">WATCH p95 / p99 FRAME TIME</span>
          </div>
        </div>

        <aside class="performance-learning reveal reveal--4">
          <div class="performance-learning__copy">
            <span class="mini-label">THE SECOND WALL</span>
            <h3>The world arrived in bursts.</h3>
            <p>Average FPS hid the long frames that broke control. The fix was to budget work across frames.</p>
          </div>

          <div class="fps-gain" aria-label="FPS derived from p95 and p99 frame-time improvement">
            <div class="fps-gain__title">
              <span>DERIVED FPS · 1000 / FRAME TIME</span>
              <span>HIGHER IS BETTER ↑</span>
            </div>
            <div class="fps-gain__grid">
              <div class="fps-gain__metric" style="--before-width: 51.72%">
                <span class="fps-gain__percentile">p95 <small>FRAME-TIME</small></span>
                <div class="fps-gain__values"><span>30</span><i>→</i><strong>58 FPS</strong></div>
                <div class="fps-gain__bars" aria-hidden="true"><i></i><b></b></div>
              </div>
              <div class="fps-gain__metric" style="--before-width: 66.67%">
                <span class="fps-gain__percentile">p99 <small>FRAME-TIME</small></span>
                <div class="fps-gain__values"><span>20</span><i>→</i><strong>30 FPS</strong></div>
                <div class="fps-gain__bars" aria-hidden="true"><i></i><b></b></div>
              </div>
            </div>
          </div>

          <div class="performance-learnings" aria-label="Things learned while optimizing Taiwan Drone Flight">
            <span class="performance-learnings__label">WHAT I LEARNED</span>
            <span>TAIL LATENCY</span>
            <span>FRAME-TIME PROFILING</span>
            <span>STREAMING BACKPRESSURE</span>
            <span>ATOMIC HANDOVER</span>
          </div>

          <div class="performance-principle">
            <span>THE UPGRADE</span>
            <strong>Predictable beats peak.</strong>
          </div>
        </aside>

      </div>
    </section>

    <section class="slide slide--cta" data-slide="5" aria-label="Closing and contact" aria-hidden="true">
      <div class="slide__inner cta-layout">
        <div class="cta-copy">
          <div class="chapter-label reveal reveal--1"><span>WHAT'S NEXT</span> · LET'S BUILD</div>
          <h2 class="cta-title reveal reveal--2">Bring the problem.<br /><em>I’ll bring the build.</em></h2>
          <p class="cta-lede reveal reveal--3">
            I’m choosing my next ambitious chapter in physical &amp; spatial AI.
          </p>

          <div class="path-grid reveal reveal--4">
            <div class="path-card path-card--cofound">
              <span>01 · COFOUND</span>
              <h3>You bring customer access and a problem worth solving.</h3>
              <p>I bring zero-to-one technical execution.</p>
            </div>
            <div class="path-card path-card--join">
              <span>02 · JOIN</span>
              <h3>You’re building an ambitious physical or spatial AI product.</h3>
              <p>I’m ready to own the hard build.</p>
            </div>
          </div>

          <div class="credibility-strip reveal reveal--5" aria-label="Experience highlights">
            <span><b>10+ YRS</b> computer vision systems</span>
            <span><b>3,000+</b> offline edge verifications</span>
            <span><b>CV SDKs</b> iOS · Android</span>
            <span><b>3D</b> Gaussian Splatting · Isaac Sim</span>
          </div>
        </div>

        <aside class="contact-card reveal reveal--3">
          <div class="contact-card__profile">
            <div class="profile-mark">JK</div>
            <div><b>JASON KUAN</b><span>TAIPEI, TAIWAN</span></div>
          </div>
          <div class="qr-frame">
            <img src="/linkedin-qr.svg" alt="QR code linking to Jason Kuan on LinkedIn" />
            <span class="qr-corner qr-corner--tl"></span><span class="qr-corner qr-corner--tr"></span>
            <span class="qr-corner qr-corner--bl"></span><span class="qr-corner qr-corner--br"></span>
          </div>
          <p>SCAN TO CONNECT</p>
          <a href="${LINKEDIN_URL}" target="_blank" rel="noreferrer">linkedin.com/in/jason-kuan-03552570 ${externalArrow}</a>
        </aside>
      </div>
    </section>

    <nav class="deck-nav" aria-label="Slide navigation">
      <div class="deck-nav__progress">
        <span id="slide-count">01 / 06</span>
        <div id="progress-dots" class="progress-dots"></div>
      </div>
      <div class="deck-nav__actions">
        <button id="timer-toggle" class="nav-button nav-button--timer" type="button" aria-label="Toggle presentation timer">T <span id="timer-value">00:00</span></button>
        <button id="fullscreen" class="nav-button nav-button--text" type="button" aria-label="Toggle fullscreen">FULLSCREEN</button>
        <button id="previous" class="nav-button" type="button" aria-label="Previous slide">${arrowLeft}</button>
        <button id="next" class="nav-button nav-button--next" type="button" aria-label="Next slide">${arrowRight}</button>
      </div>
    </nav>

    <div id="toast" class="toast" role="status" aria-live="polite"></div>
  </main>
`;

const slides = Array.from(document.querySelectorAll(".slide"));
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const fullscreenButton = document.querySelector("#fullscreen");
const timerButton = document.querySelector("#timer-toggle");
const timerValue = document.querySelector("#timer-value");
const slideCount = document.querySelector("#slide-count");
const progressDots = document.querySelector("#progress-dots");
const toast = document.querySelector("#toast");

let currentSlide = Math.min(
  Math.max(Number.parseInt(window.location.hash.slice(1), 10) - 1 || 0, 0),
  slides.length - 1,
);
let touchStartX = 0;
let toastTimeout = 0;
let timerStartedAt = null;
let timerVisible = false;

function formatSlideNumber(value) {
  return value.toString().padStart(2, "0");
}

function showToast(message) {
  if (!toast) return;
  window.clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function goToSlide(index) {
  const nextIndex = Math.min(Math.max(index, 0), slides.length - 1);
  currentSlide = nextIndex;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === currentSlide;
    slide.classList.toggle("is-active", isActive);
    slide.classList.toggle("is-before", slideIndex < currentSlide);
    slide.classList.toggle("is-after", slideIndex > currentSlide);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  document.documentElement.style.setProperty("--current-slide", String(currentSlide));
  window.history.replaceState(null, "", `#${currentSlide + 1}`);

  if (slideCount) {
    slideCount.textContent = `${formatSlideNumber(currentSlide + 1)} / ${formatSlideNumber(slides.length)}`;
  }

  document.querySelectorAll(".progress-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
    dot.setAttribute("aria-current", dotIndex === currentSlide ? "step" : "false");
  });

  if (previousButton) previousButton.disabled = currentSlide === 0;
  if (nextButton) nextButton.disabled = currentSlide === slides.length - 1;

  if (timerStartedAt === null && currentSlide > 0) {
    timerStartedAt = performance.now();
  }
}

function createProgressDots() {
  if (!progressDots) return;
  slides.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "progress-dot";
    button.setAttribute("aria-label", `Go to slide ${index + 1}`);
    button.addEventListener("click", () => goToSlide(index));
    progressDots.append(button);
  });
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch {
    showToast("Fullscreen is unavailable in this browser.");
  }
}

function toggleTimer() {
  timerVisible = !timerVisible;
  timerButton?.classList.toggle("is-visible", timerVisible);
  if (timerVisible && timerStartedAt === null) timerStartedAt = performance.now();
}

function resetTimer() {
  timerStartedAt = performance.now();
}

function updateTimer() {
  if (!timerValue || timerStartedAt === null) return;
  const totalSeconds = Math.floor((performance.now() - timerStartedAt) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerValue.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  timerButton?.classList.toggle("is-over", totalSeconds >= 360);
}

function handleKeydown(event) {
  const target = event.target;
  if (target?.matches("input, textarea, select")) return;

  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    goToSlide(currentSlide + 1);
  } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    goToSlide(currentSlide - 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    goToSlide(0);
  } else if (event.key === "End") {
    event.preventDefault();
    goToSlide(slides.length - 1);
  } else if (event.key.toLowerCase() === "f") {
    event.preventDefault();
    void toggleFullscreen();
  } else if (event.key.toLowerCase() === "t") {
    event.preventDefault();
    toggleTimer();
  } else if (event.key.toLowerCase() === "r" && timerVisible) {
    event.preventDefault();
    resetTimer();
  }
}

function configureDemoLinks() {
  const urls = {
    skyline: SKYLINE_RUSH_URL,
    taiwan: TAIWAN_DRONE_FLIGHT_URL,
  };

  document.querySelectorAll("[data-demo]").forEach((link) => {
    const key = link.dataset.demo || "";
    const url = urls[key];
    link.href = url || "#";
    link.classList.toggle("is-unconfigured", !url);
    link.addEventListener("click", (event) => {
      if (url) return;
      event.preventDefault();
      showToast("Set VITE_TAIWAN_DRONE_FLIGHT_URL in .env, then restart just dev.");
    });
  });
}

function configureVideos() {
  document.querySelectorAll("[data-media-card] video").forEach((video) => {
    const card = video.closest("[data-media-card]");
    const markReady = () => card?.classList.add("has-video");
    video.addEventListener("loadeddata", markReady, { once: true });
    video.addEventListener("canplay", markReady, { once: true });
    video.addEventListener("error", () => card?.classList.remove("has-video"));
    void video.play().catch(() => undefined);
  });
}

function configureTouchNavigation() {
  document.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0]?.screenX || 0;
    },
    { passive: true },
  );
  document.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0]?.screenX || 0;
      const distance = touchEndX - touchStartX;
      if (Math.abs(distance) < 60) return;
      goToSlide(currentSlide + (distance < 0 ? 1 : -1));
    },
    { passive: true },
  );
}

createProgressDots();
configureDemoLinks();
configureVideos();
configureTouchNavigation();
goToSlide(currentSlide);

previousButton?.addEventListener("click", () => goToSlide(currentSlide - 1));
nextButton?.addEventListener("click", () => goToSlide(currentSlide + 1));
fullscreenButton?.addEventListener("click", () => void toggleFullscreen());
timerButton?.addEventListener("click", toggleTimer);
document.addEventListener("keydown", handleKeydown);
document.addEventListener("fullscreenchange", () => {
  fullscreenButton?.classList.toggle("is-active", Boolean(document.fullscreenElement));
});
window.addEventListener("hashchange", () => {
  const requestedSlide = Number.parseInt(window.location.hash.slice(1), 10) - 1;
  if (Number.isFinite(requestedSlide)) goToSlide(requestedSlide);
});
window.setInterval(updateTimer, 250);
