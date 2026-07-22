/* ============================================================
   OurHomeLane — app logic
   You shouldn't need to edit this file. Everything you'd want
   to change lives in config.js.
   ============================================================ */

"use strict";

/* ---------- tiny pure-JS SHA-256 (works on file:// too) ---------- */
async function sha256(str) {
  if (window.crypto && crypto.subtle && window.isSecureContext) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  }
  return sha256Fallback(str);
}
function sha256Fallback(ascii) {
  function rightRotate(v, a) { return (v >>> a) | (v << (32 - a)); }
  const mathPow = Math.pow, maxWord = mathPow(2, 32);
  let result = "", words = [], asciiBitLength = ascii.length * 8;
  let hash = sha256Fallback.h = sha256Fallback.h || [];
  const k = sha256Fallback.k = sha256Fallback.k || [];
  let primeCounter = k.length;
  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) isComposite[i] = candidate;
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  ascii += "\x80";
  while ((ascii.length % 64) - 56) ascii += "\x00";
  for (let i = 0; i < ascii.length; i++) {
    const j = ascii.charCodeAt(i);
    if (j >> 8) return "";
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;
  for (let j = 0; j < words.length;) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0, 8);
    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];
      const temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & hash[5]) ^ (~e & hash[6]))
        + k[i]
        + (w[i] = i < 16 ? w[i] : (w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | 0);
      const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
      hash.length = 8;
    }
    for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? "0" : "") + b.toString(16);
    }
  }
  return result;
}

/* ---------- elements ---------- */
const $ = id => document.getElementById(id);
const splash = $("splash"), stage = $("stage");
const layerA = $("layerA"), layerB = $("layerB");
const captionEl = $("caption"), progressFill = $("progress-fill");
const songDock = $("song-dock"), song = $("song");
const interlude = $("interlude"), clip = $("clip");
const clipPlay = $("clip-play"), clipInstruction = $("clip-instruction");
const closing = $("closing");

/* ---------- splash text from config ---------- */
$("splash-title").textContent = CONFIG.splashTitle;
$("splash-subtitle").textContent = CONFIG.splashSubtitle;
$("unlock").textContent = CONFIG.unlockButton;
$("closing-title").textContent = CONFIG.closingTitle;
$("closing-message").textContent = CONFIG.closingMessage;
$("replay").textContent = CONFIG.replayButton;
document.title = CONFIG.splashTitle;

/* ---------- password gate ---------- */
async function tryUnlock() {
  const guess = $("password").value.trim();
  if (!guess) return;
  const hash = await sha256(guess);
  if (hash === CONFIG.passwordHash) {
    beginExperience();
  } else {
    const wrong = $("wrong");
    wrong.textContent = CONFIG.wrongPasswordHint;
    wrong.hidden = false;
    $("password").classList.add("shake");
    setTimeout(() => $("password").classList.remove("shake"), 450);
    $("password").select();
  }
}
$("unlock").addEventListener("click", tryUnlock);
$("password").addEventListener("keydown", e => { if (e.key === "Enter") tryUnlock(); });

/* ---------- build the sequence ----------
   STRICT fixed placement: clips sit at evenly spaced photo
   positions computed only from the counts (64 photos / 12 clips
   -> a clip after every ~5th photo). No timing math, no lyric
   dependence, identical every run. Clips play in config order. */
function buildSequence() {
  const photos = CONFIG.photos.map(p => ({ type: "photo", ...p }));
  const clips  = CONFIG.clips.map(c => ({ type: "clip", ...c }));
  const n = photos.length, m = clips.length;
  if (!m || !n) return [...photos, ...clips];

  // clip i goes after photo number positions[i] (1-based)
  const positions = clips.map((_, i) => Math.round((i + 1) * n / (m + 1)));

  const seq = [];
  let ci = 0;
  photos.forEach((p, k) => {
    seq.push(p);
    if (ci < m && k + 1 === positions[ci]) seq.push(clips[ci++]);
  });
  // safety net (only reachable if clips outnumber photos)
  while (ci < m) seq.splice(seq.length - 1, 0, clips[ci++]);
  return seq;
}

/* ---------- audio fade helper ---------- */
function fadeVolume(media, target, ms = 900) {
  return new Promise(resolve => {
    const start = media.volume, delta = target - start;
    if (Math.abs(delta) < 0.01) { media.volume = target; return resolve(); }
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min(1, (t - t0) / ms);
      media.volume = Math.min(1, Math.max(0, start + delta * p));
      p < 1 ? requestAnimationFrame(step) : resolve();
    })(t0);
  });
}

/* ---------- slideshow engine ---------- */
let sequence = [], index = 0, activeLayer = layerA, timer = null;

/* the framed-photo layers need .blur and .pic children; build them
   if the HTML doesn't already have them (self-healing, so an older
   index.html can't break the slideshow) */
[layerA, layerB].forEach(layer => {
  if (!layer.querySelector(".pic")) {
    layer.innerHTML = '<div class="blur"></div><img class="pic" alt="" />';
  }
});

function preload(src) { const img = new Image(); img.src = src; }

function showPhoto(item, kbToggle) {
  const incoming = activeLayer === layerA ? layerB : layerA;
  incoming.querySelector(".blur").style.backgroundImage = `url("${item.src}")`;
  incoming.querySelector(".pic").src = item.src;
  incoming.classList.remove("kb-in", "kb-out");
  void incoming.offsetWidth; // restart animation
  incoming.classList.add(kbToggle ? "kb-in" : "kb-out", "visible");
  activeLayer.classList.remove("visible");
  activeLayer = incoming;

  if (item.caption) {
    captionEl.textContent = item.caption;
    captionEl.classList.add("visible");
  } else {
    captionEl.classList.remove("visible");
  }

  // preload next photo
  const next = sequence.slice(index + 1).find(s => s.type === "photo");
  if (next) preload(next.src);
}

function updateProgress() {
  progressFill.style.width = `${(index / sequence.length) * 100}%`;
}

function advance() {
  if (index >= sequence.length) return finale();
  const item = sequence[index];
  updateProgress();

  if (item.type === "photo") {
    showPhoto(item, index % 2 === 0);
    index++;
    timer = setTimeout(advance, CONFIG.slideDuration * 1000);
  } else {
    index++;
    startInterlude(item);
  }
}

/* ---------- clip interlude ---------- */
async function startInterlude(item) {
  clearTimeout(timer);
  captionEl.classList.remove("visible");
  songDock.classList.add("dimmed");

  await fadeVolume(song, 0, 900);
  song.pause();

  clip.src = item.src;
  clip.currentTime = 0;
  clipInstruction.textContent = item.caption || `Press play, ${CONFIG.recipientName}`;
  clipPlay.classList.remove("hidden");
  clipInstruction.classList.remove("hidden");
  interlude.hidden = false;
  interludeActive = true;
  requestAnimationFrame(() => interlude.classList.add("visible"));
}

clipPlay.addEventListener("click", () => {
  clipPlay.classList.add("hidden");
  clipInstruction.classList.add("hidden");
  clip.volume = 1;
  clip.play().catch(() => {
    // playback refused (bad file/codec) — restore the button so it's
    // not a dead end, and log why for debugging
    console.error("Clip failed to play:", clip.src, clip.error);
    clipPlay.classList.remove("hidden");
    clipInstruction.textContent = "This clip won't play — tap anywhere to continue";
    clipInstruction.classList.remove("hidden");
    interlude.addEventListener("pointerdown", endInterlude, { once: true });
  });
});

clip.addEventListener("ended", endInterlude);

// if the file 404s or the codec is unsupported, skip the clip
// gracefully instead of stalling the whole show
clip.addEventListener("error", () => {
  if (interlude.hidden) return;
  console.error("Clip failed to load:", clip.currentSrc || clip.src);
  endInterlude();
});

let interludeActive = false;

async function endInterlude() {
  if (!interludeActive) return;
  interludeActive = false;
  interlude.classList.remove("visible");
  setTimeout(() => { interlude.hidden = true; clip.removeAttribute("src"); clip.load(); }, 850);

  songDock.classList.remove("dimmed");
  song.volume = 0;
  try { await song.play(); } catch (e) { /* resume blocked — dock click will restart */ }
  fadeVolume(song, 1, 1400);
  advance();
}

/* ---------- finale ---------- */
function finale() {
  progressFill.style.width = "100%";
  captionEl.classList.remove("visible");
  closing.hidden = false;
  requestAnimationFrame(() => closing.classList.add("visible"));
  // let the song play out; when it ends, hold the closing card quietly
}

$("replay").addEventListener("click", () => {
  closing.classList.remove("visible");
  setTimeout(() => { closing.hidden = true; }, 800);
  song.currentTime = 0;
  song.volume = 1;
  song.play().catch(() => {});
  sequence = buildSequence();
  index = 0;
  advance();
});

/* ---------- lyric-video dock: tap to enlarge ---------- */
songDock.addEventListener("click", () => {
  songDock.classList.toggle("large");
  if (song.paused && !interlude.classList.contains("visible")) song.play().catch(() => {});
});

/* ---------- timed lyric overlay (driven by CONFIG.lyrics) ---------- */
const lyricEl = document.createElement("p");
lyricEl.className = "lyric-line";
stage.appendChild(lyricEl);

const LYRICS = (CONFIG.lyrics || []).slice().sort((a, b) => a.t - b.t);
let lyricIdx = -1;

song.addEventListener("timeupdate", () => {
  if (!LYRICS.length) return;
  const t = song.currentTime;
  let i = -1;
  for (let j = 0; j < LYRICS.length; j++) {
    if (t >= LYRICS[j].t) i = j; else break;
  }
  if (i === lyricIdx) return;
  lyricIdx = i;
  const line = i >= 0 ? (LYRICS[i].line || "") : "";
  lyricEl.classList.remove("visible");
  if (line) {
    setTimeout(() => {
      lyricEl.textContent = line;
      lyricEl.classList.add("visible");
    }, 300);
  }
});

// dock display mode from config: "small" (default), "large", "hidden"
if (CONFIG.songDockMode === "large") songDock.classList.add("large");
if (CONFIG.songDockMode === "hidden") songDock.classList.add("ghost");

// timestamp helper: while the show plays, press "L" to log the
// current song time to the browser console — use it to build
// the lyrics array in config.js
document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "l" && !song.paused) {
    console.log(`lyric cue → { t: ${song.currentTime.toFixed(1)}, line: "" },`);
  }
});

/* ---------- kick everything off (called on password success) ---------- */
function beginExperience() {
  splash.classList.add("leaving");
  setTimeout(() => { splash.remove(); }, 1500);

  stage.hidden = false;
  song.src = CONFIG.song;
  song.volume = 1;
  // this runs inside the click handler chain — the user gesture
  // that lets browsers play sound
  song.play().catch(() => {
    // if a strict browser still blocks it, first tap anywhere starts it
    const kick = () => { song.play().catch(() => {}); document.removeEventListener("pointerdown", kick); };
    document.addEventListener("pointerdown", kick);
  });

  sequence = buildSequence();
  index = 0;
  advance();
}
