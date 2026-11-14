/* =========================================================
   Keyflow — application
   ========================================================= */

"use strict";

const STORAGE_KEY = "keyflow.v1";
const DAILY_GOAL_MINUTES = 15;
const QUALITY_ACCURACY = 90;

const FINGER_LABELS = {
  leftPinky: "Left pinky",
  leftRing: "Left ring",
  leftMiddle: "Left middle",
  leftIndex: "Left index",
  rightIndex: "Right index",
  rightMiddle: "Right middle",
  rightRing: "Right ring",
  rightPinky: "Right pinky",
  thumb: "Either thumb",
};

const FINGER_SHORT = {
  leftPinky: "left pinky",
  leftRing: "left ring",
  leftMiddle: "left middle",
  leftIndex: "left index",
  rightIndex: "right index",
  rightMiddle: "right middle",
  rightRing: "right ring",
  rightPinky: "right pinky",
  thumb: "thumb",
};

const KEY_FINGER = {
  q: "leftPinky", a: "leftPinky", z: "leftPinky",
  w: "leftRing", s: "leftRing", x: "leftRing",
  e: "leftMiddle", d: "leftMiddle", c: "leftMiddle",
  r: "leftIndex", t: "leftIndex", f: "leftIndex", g: "leftIndex", v: "leftIndex", b: "leftIndex",
  y: "rightIndex", u: "rightIndex", h: "rightIndex", j: "rightIndex", n: "rightIndex", m: "rightIndex",
  i: "rightMiddle", k: "rightMiddle", ",": "rightMiddle",
  o: "rightRing", l: "rightRing", ".": "rightRing",
  p: "rightPinky", ";": "rightPinky", "/": "rightPinky", "'": "rightPinky",
  " ": "thumb",
};

const KEY_LABELS = {
  ";": "semicolon",
  ",": "comma",
  ".": "period",
  "/": "slash",
  "'": "apostrophe",
  " ": "space",
};

const COMMON_WORDS = [
  "the", "of", "and", "to", "in", "a", "is", "that", "for", "it", "as", "was", "with", "be", "by",
  "on", "not", "he", "this", "but", "from", "they", "have", "you", "which", "one", "all", "would",
  "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "me", "when", "make",
  "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your",
  "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come",
  "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first",
  "well", "way", "even", "new", "want", "because", "these", "give", "day", "most", "us", "are",
  "were", "been", "has", "had", "do", "does", "did", "will", "should", "may", "might", "must",
  "every", "much", "where", "why", "while", "before", "right", "through", "between", "both",
  "under", "never", "same", "still", "find", "here", "thing", "many", "put", "being", "such",
  "again", "place", "around", "little", "world", "long", "down", "might", "should", "called",
  "each", "those", "very", "more", "such", "through", "where", "much", "before", "right",
];

const LESSONS = [
  {
    id: "home-base",
    nav: "Home base",
    title: "Find your home.",
    category: "Foundation",
    keys: 8,
    subtitle: "Rest on A S D F and J K L ;. Return home after every key.",
    coach: "Find the bumps on F and J without looking. They are your home base — every reach starts and ends there.",
    kbTip: "Return to the home row after every reach.",
    text: "asdf jkl; asdf jkl; ff jj dd kk ss ll aa ;; sad lad ask fall flask glass salad half all dad fad;",
  },
  {
    id: "top-row",
    nav: "Top row",
    title: "Reach for the top.",
    category: "Reach",
    keys: 10,
    subtitle: "Lift one finger at a time to meet the top row. Keep the others anchored.",
    coach: "Reach up with one finger while the rest stay resting. If your whole hand moves, slow down until it doesn't.",
    kbTip: "One finger reaches. The whole hand stays quiet.",
    text: "qwer uiop qwer uiop try type quiet power tower report writer pretty pilot trout trip tree out your write quite",
  },
  {
    id: "bottom-row",
    nav: "Bottom row",
    title: "Drop to the bottom.",
    category: "Reach",
    keys: 9,
    subtitle: "Curl your fingers down without moving your wrists. Let them come back up.",
    coach: "Curl your fingers toward you instead of dropping your wrist. The bottom row should feel like a small scoop.",
    kbTip: "Curl the finger. Don't drop the wrist.",
    text: "zxcv bnm, zxcv bnm, zebra vex cab mix number brave climb movie zone canvas navel mangle crumb.",
  },
  {
    id: "shift-punctuation",
    nav: "Shift & punctuation",
    title: "Shift into gear.",
    category: "Control",
    keys: 14,
    subtitle: "Hold Shift with the opposite pinky. Punctuation follows the same map.",
    coach: "The Shift key belongs to the opposite pinky. If your typing hand is reaching, your other hand holds the capital.",
    kbTip: "Opposite pinky holds Shift. Always.",
    text: "The quick brown fox jumps over the lazy dog. Don't rush; keep your eyes up, not down.",
  },
  {
    id: "common-words",
    nav: "The 100 club",
    title: "The words you use.",
    category: "Fluency",
    keys: 26,
    subtitle: "The most common English words, under your fingers. Read two words ahead.",
    coach: "Read two words ahead of the one you're typing. Your hands can follow a rhythm when your eyes lead.",
    kbTip: "Look two words ahead of the cursor.",
    text: "the of and to in a is that for it as was with be by on not he this but from they have you which one all would there their what so up out if about who get me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because these give day most us part place while again right through between both under never same small",
  },
  {
    id: "real-sentences",
    nav: "Real sentences",
    title: "Think in sentences.",
    category: "Flow",
    keys: 26,
    subtitle: "Full phrases, natural rhythm. Eyes on the screen.",
    coach: "Rhythm beats raw force. Smooth, even keystrokes are the fastest keystrokes — let the clock take care of itself.",
    kbTip: "Smooth is fast. Let the rhythm carry you.",
    text: "Accuracy first, speed second. Let your fingers learn the map, and the clock will take care of itself.",
  },
];

const SPRINT_COACH = "Find a steady rhythm and let your hands stay loose. Speed is a side effect of clean, relaxed movement.";

const SPRINT_TITLES = {
  15: "Fifteen seconds. Go.",
  30: "Thirty seconds. Go.",
  60: "One minute. Go.",
};

const $ = (id) => document.getElementById(id);

const dom = {
  trainView: $("trainView"),
  progressView: $("progressView"),
  navItems: Array.from(document.querySelectorAll(".nav-item")),
  brandHome: $("brandHome"),

  headerStreak: $("headerStreak"),
  streakPill: $("streakPill"),
  soundToggle: $("soundToggle"),
  themeToggle: $("themeToggle"),

  lessonsDone: $("lessonsDone"),
  pathProgressBar: $("pathProgressBar"),
  lessonList: $("lessonList"),
  sprintOptions: $("sprintOptions"),
  sprintBest: $("sprintBest"),
  pathEyebrow: $("pathEyebrow"),
  pathTitle: $("pathTitle"),
  modeButtons: Array.from(document.querySelectorAll("[data-mode]")),
  durationButtons: Array.from(document.querySelectorAll("[data-duration]")),

  dailyRing: $("dailyRing"),
  dailyMinutes: $("dailyMinutes"),
  dailyTitle: $("dailyTitle"),
  dailyNote: $("dailyNote"),

  sessionBadge: $("sessionBadge"),
  sessionCategory: $("sessionCategory"),
  sessionTitle: $("sessionTitle"),
  sessionSubtitle: $("sessionSubtitle"),
  restartBtn: $("restartBtn"),

  trainerPanel: $("trainerPanel"),
  statusText: $("statusText"),
  liveWpm: $("liveWpm"),
  liveAcc: $("liveAcc"),
  liveTime: $("liveTime"),
  charProgress: $("charProgress"),
  charTotal: $("charTotal"),
  typingStage: $("typingStage"),
  textScroller: $("textScroller"),
  textFlow: $("textFlow"),
  sessionProgress: $("sessionProgress"),
  footHint: $("footHint"),

  nextKeyMini: $("nextKeyMini"),
  nextFingerMini: $("nextFingerMini"),
  nextKeyBig: $("nextKeyBig"),
  nextFinger: $("nextFinger"),
  nextShiftHint: $("nextShiftHint"),
  fingerMap: $("fingerMap"),
  coachTip: $("coachTip"),
  coachNumber: $("coachNumber"),
  kbTip: $("kbTip"),
  keyboard: $("keyboard"),

  progressFraction: $("progressFraction"),
  statBestWpm: $("statBestWpm"),
  statBestNote: $("statBestNote"),
  statAvgAcc: $("statAvgAcc"),
  statAccNote: $("statAccNote"),
  statTotalTime: $("statTotalTime"),
  statSessionNote: $("statSessionNote"),
  statStreak: $("statStreak"),
  statStreakNote: $("statStreakNote"),
  historyCount: $("historyCount"),
  historyChart: $("historyChart"),
  historyEmpty: $("historyEmpty"),
  pathSummaryList: $("pathSummaryList"),
  activityStrip: $("activityStrip"),
  resetProgressBtn: $("resetProgressBtn"),

  resultModal: $("resultModal"),
  resultCard: document.querySelector(".result-card"),
  resultClose: $("resultClose"),
  resultEyebrow: $("resultEyebrow"),
  resultTitle: $("resultTitle"),
  resultSub: $("resultSub"),
  recordBadge: $("recordBadge"),
  resultWpm: $("resultWpm"),
  resultAcc: $("resultAcc"),
  resultRaw: $("resultRaw"),
  resultTime: $("resultTime"),
  resultErrors: $("resultErrors"),
  resultChart: $("resultChart"),
  chartPeak: $("chartPeak"),
  resultMessage: $("resultMessage"),
  resultPrimary: $("resultPrimary"),
  resultRetry: $("resultRetry"),

  toast: $("toast"),
  confettiLayer: $("confettiLayer"),
  typingInput: $("typingInput"),
};

const state = {
  view: "train",
  mode: "guided",
  lessonIndex: 0,
  duration: 30,
  target: "",
  typed: [],
  pos: 0,
  status: "idle",
  startedAt: 0,
  elapsed: 0,
  keypresses: 0,
  errors: 0,
  wpmHistory: [],
  lastSampleSecond: -1,
  tickId: null,
  result: null,
  secondaryMode: "retry",
  charEls: [],
  keyEls: [],
  lastHandledChar: "",
  lastHandledAt: 0,
  resetArmed: false,
  resetTimer: null,
  toastTimer: null,
  errorTimer: null,
  audioContext: null,
  modalOpen: false,
};

let store = createDefaultStore();

/* =========================================================
   Helpers
   ========================================================= */

function createDefaultStore() {
  return {
    version: 1,
    stats: {
      sessions: 0,
      totalSeconds: 0,
      totalChars: 0,
      bestWpm: 0,
      bestAccuracy: 0,
    },
    lessons: {},
    history: [],
    activeDays: [],
    daily: { date: localDateKey(), seconds: 0, sessions: 0 },
    settings: { sound: false, theme: "dark" },
  };
}

function loadStore() {
  const base = createDefaultStore();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return base;
    const merged = {
      ...base,
      ...saved,
      stats: { ...base.stats, ...(saved.stats || {}) },
      lessons: saved.lessons && typeof saved.lessons === "object" ? saved.lessons : {},
      history: Array.isArray(saved.history) ? saved.history.slice(0, 60) : [],
      activeDays: Array.isArray(saved.activeDays) ? saved.activeDays.slice(-400) : [],
      daily: { ...base.daily, ...(saved.daily || {}) },
      settings: { ...base.settings, ...(saved.settings || {}) },
    };
    if (merged.daily.date !== localDateKey()) {
      merged.daily = { date: localDateKey(), seconds: 0, sessions: 0 };
    }
    return merged;
  } catch {
    return base;
  }
}

function saveStore() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* Storage can be unavailable; the session still works in memory. */
  }
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function pad(number, length = 2) {
  return String(number).padStart(length, "0");
}

function formatTime(seconds, mode = "floor") {
  const safe = Math.max(0, mode === "ceil" ? Math.ceil(seconds) : Math.floor(seconds));
  return `${Math.floor(safe / 60)}:${pad(safe % 60)}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function getLesson() {
  return LESSONS[state.lessonIndex] || LESSONS[0];
}

function getCurrentChar() {
  return state.target[state.pos] || "";
}

function getFingerForChar(char) {
  const lower = char === " " ? " " : char.toLowerCase();
  return KEY_FINGER[lower] || "leftIndex";
}

function getShiftSide(finger) {
  if (!finger) return null;
  if (finger.startsWith("left")) return "right";
  if (finger.startsWith("right")) return "left";
  return null;
}

function requiresShift(char) {
  return char !== char.toLowerCase();
}

function svgCheck() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function svgArrow() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

/* =========================================================
   Theme / sound
   ========================================================= */

function applyTheme(theme, persist = true) {
  const next = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  store.settings.theme = next;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "dark" ? "#0b0d0f" : "#f2f0e8");
  if (dom.themeToggle) {
    dom.themeToggle.setAttribute(
      "aria-label",
      next === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
    dom.themeToggle.title = next === "dark" ? "Switch to light theme" : "Switch to dark theme";
  }
  if (persist) saveStore();
}

function applySoundSetting() {
  const on = Boolean(store.settings.sound);
  dom.soundToggle.setAttribute("aria-pressed", String(on));
  dom.soundToggle.setAttribute("aria-label", on ? "Turn keyboard sounds off" : "Turn keyboard sounds on");
  dom.soundToggle.title = on ? "Keyboard sounds on" : "Keyboard sounds off";
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  focusTyping();
}

function toggleSound() {
  store.settings.sound = !store.settings.sound;
  applySoundSetting();
  saveStore();
  if (store.settings.sound) playClick(false, 0.7);
  focusTyping();
}

function getAudioContext() {
  if (!state.audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    state.audioContext = new AudioContext();
  }
  return state.audioContext;
}

function playClick(isError = false, volume = 1) {
  if (!store.settings.sound) return;
  const context = getAudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});

  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = isError ? "sawtooth" : "triangle";
  oscillator.frequency.setValueAtTime(isError ? 165 : 410 + Math.random() * 130, now);
  oscillator.frequency.exponentialRampToValueAtTime(isError ? 92 : 200, now + 0.038);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.038 * volume, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.06);
}

/* =========================================================
   Keyboard
   ========================================================= */

function buildKeyboard() {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
    ["shift-left", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift-right"],
    ["space"],
  ];

  dom.keyboard.innerHTML = "";
  rows.forEach((keys, rowIndex) => {
    const row = document.createElement("div");
    row.className = "kb-row";

    keys.forEach((key) => {
      const element = document.createElement("div");
      element.className = "key";

      if (key === "shift-left" || key === "shift-right") {
        element.classList.add("key--shift");
        element.dataset.shift = key === "shift-left" ? "left" : "right";
        element.dataset.key = key === "shift-left" ? "ShiftLeft" : "ShiftRight";
        element.textContent = "⇧";
        element.setAttribute("aria-label", "Shift");
      } else if (key === "space") {
        element.classList.add("key--space");
        element.dataset.key = " ";
        element.dataset.finger = "thumb";
        element.textContent = "space";
      } else {
        element.dataset.key = key;
        element.dataset.finger = KEY_FINGER[key] || "leftIndex";
        element.textContent = key;
      }

      row.appendChild(element);
    });

    if (rowIndex === 1) row.classList.add("kb-row-home");
    dom.keyboard.appendChild(row);
  });

  state.keyEls = Array.from(dom.keyboard.querySelectorAll(".key"));
}

function clearKeyHints() {
  state.keyEls.forEach((element) => element.classList.remove("is-next", "is-hold"));
}

function findKeyElement(key) {
  return state.keyEls.find((element) => element.dataset.key === key) || null;
}

function updateNextKeyGuide() {
  clearKeyHints();

  const next = getCurrentChar();
  if (!next) {
    setGuideDone();
    return;
  }

  const isSpace = next === " ";
  const lower = isSpace ? " " : next.toLowerCase();
  const shift = requiresShift(next);
  const finger = getFingerForChar(next);
  const keyElement = findKeyElement(lower);

  if (keyElement) keyElement.classList.add("is-next");

  let shiftSide = null;
  if (shift) {
    shiftSide = getShiftSide(finger);
    if (shiftSide) {
      const shiftKey = state.keyEls.find((element) => element.dataset.shift === shiftSide);
      if (shiftKey) shiftKey.classList.add("is-hold");
    }
  }

  const display = isSpace ? "SPACE" : next.toUpperCase();
  const keyChanged = dom.nextKeyBig.textContent !== display;
  dom.nextKeyBig.textContent = display;
  dom.nextKeyBig.classList.toggle("is-space", isSpace);
  if (keyChanged) {
    dom.nextKeyBig.classList.remove("is-pop");
    void dom.nextKeyBig.offsetWidth;
    dom.nextKeyBig.classList.add("is-pop");
  }

  dom.nextKeyMini.textContent = isSpace ? "␣" : next.toUpperCase();
  dom.nextFinger.textContent = FINGER_LABELS[finger] || "Index";
  dom.nextFingerMini.textContent = FINGER_SHORT[finger] || "index";
  dom.nextShiftHint.textContent = shift
    ? `Hold ${shiftSide} Shift + ${next.toUpperCase()}`
    : isSpace
      ? "Tap lightly with either thumb"
      : "No shift needed";
  dom.nextShiftHint.classList.toggle("is-shift", shift);

  dom.fingerMap.querySelectorAll(".finger-row").forEach((row) => {
    row.classList.toggle("is-active", row.dataset.finger === finger);
  });

  dom.kbTip.textContent = shift
    ? "Opposite pinky holds Shift. Never the same hand."
    : state.mode === "sprint"
      ? "Relax your hands. Let the rhythm do the work."
      : getLesson().kbTip;
}

function setGuideDone() {
  clearKeyHints();
  dom.nextKeyBig.textContent = "✓";
  dom.nextKeyBig.classList.remove("is-space");
  dom.nextKeyMini.textContent = "✓";
  dom.nextFinger.textContent = "Session complete";
  dom.nextFingerMini.textContent = "done";
  dom.nextShiftHint.textContent = "Take a breath";
  dom.nextShiftHint.classList.remove("is-shift");
  dom.fingerMap.querySelectorAll(".finger-row").forEach((row) => row.classList.remove("is-active"));
}

function flashPressedKey(char, isError) {
  if (!char) return;
  const lower = char === " " ? " " : char.toLowerCase();
  const element = findKeyElement(lower);
  if (!element) return;

  element.classList.add("is-pressed");
  window.setTimeout(() => element.classList.remove("is-pressed"), 90);

  if (!isError) return;
  dom.trainerPanel.classList.add("is-error");
  window.clearTimeout(state.errorTimer);
  state.errorTimer = window.setTimeout(() => dom.trainerPanel.classList.remove("is-error"), 240);
}

/* =========================================================
   Rendering the target
   ========================================================= */

function buildText() {
  dom.textFlow.innerHTML = "";
  dom.textFlow.style.transform = "translateY(0)";
  state.charEls = [];

  if (!state.target) {
    dom.charTotal.textContent = "0";
    return;
  }

  const fragment = document.createDocumentFragment();
  const words = state.target.split(" ");
  let index = 0;

  words.forEach((word, wordIndex) => {
    const wordElement = document.createElement("span");
    wordElement.className = "word";

    for (const char of word) {
      const charElement = makeCharElement(char, index);
      wordElement.appendChild(charElement);
      state.charEls.push(charElement);
      index += 1;
    }

    fragment.appendChild(wordElement);

    if (wordIndex < words.length - 1) {
      const spaceElement = makeCharElement(" ", index);
      fragment.appendChild(spaceElement);
      state.charEls.push(spaceElement);
      index += 1;
    }
  });

  dom.textFlow.appendChild(fragment);
  dom.charTotal.textContent = String(state.target.length);
  dom.charProgress.textContent = "0";

  if (state.charEls[0]) state.charEls[0].classList.add("is-current");
  window.requestAnimationFrame(scrollCurrentIntoView);
}

function makeCharElement(char, index) {
  const element = document.createElement("span");
  element.className = `char${char === " " ? " space" : ""}`;
  element.dataset.index = String(index);
  if (char !== " ") element.textContent = char;
  return element;
}

function paintIndex(index) {
  const element = state.charEls[index];
  if (!element) return;
  element.classList.remove("is-correct", "is-wrong");

  const typed = state.typed[index];
  if (typed === null || typed === undefined) return;

  if (typed === state.target[index]) {
    element.classList.add("is-correct");
  } else {
    element.classList.add("is-wrong");
  }
}

function focusCurrentChar() {
  dom.textFlow.querySelectorAll(".char.is-current").forEach((element) => {
    element.classList.remove("is-current");
  });
  const element = state.charEls[state.pos];
  if (element) element.classList.add("is-current");
  scrollCurrentIntoView();
}

function scrollCurrentIntoView() {
  const element = state.charEls[state.pos];
  if (!element) return;

  const top = element.offsetTop;
  const viewport = dom.textScroller.clientHeight;
  const maxShift = Math.max(0, dom.textFlow.scrollHeight - viewport + 8);
  const desired = Math.max(0, top - viewport * 0.3);
  dom.textFlow.style.transform = `translateY(${-Math.min(desired, maxShift)}px)`;
}

/* =========================================================
   Session flow
   ========================================================= */

function generateSprintText(seconds) {
  const count = Math.max(100, Math.ceil(seconds * 3.5));
  const words = [];
  let previous = "";
  for (let index = 0; index < count; index += 1) {
    let word = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
    if (word === previous) {
      word = COMMON_WORDS[(Math.floor(Math.random() * COMMON_WORDS.length) + 1) % COMMON_WORDS.length];
    }
    words.push(word);
    previous = word;
  }
  return words.join(" ");
}

function resetSession({ focus = true } = {}) {
  stopClock();
  dom.trainerPanel.classList.remove("is-running", "is-finished", "is-error");

  state.status = "idle";
  state.startedAt = 0;
  state.elapsed = 0;
  state.keypresses = 0;
  state.errors = 0;
  state.wpmHistory = [];
  state.lastSampleSecond = -1;
  state.pos = 0;
  state.result = null;

  if (state.mode === "guided") {
    state.target = getLesson().text;
  } else {
    state.target = generateSprintText(state.duration);
  }

  state.typed = new Array(state.target.length).fill(null);
  buildText();
  updateSessionCopy();
  updateLiveStats();
  updateNextKeyGuide();
  updateCoach();

  dom.statusText.textContent = "Ready";
  dom.liveWpm.textContent = "0";
  dom.liveAcc.textContent = "100";
  dom.liveTime.textContent = state.mode === "sprint" ? formatTime(state.duration, "ceil") : "0:00";
  dom.charProgress.textContent = "0";
  dom.sessionProgress.style.width = "0%";
  dom.sessionProgress.style.transition = "none";
  window.requestAnimationFrame(() => {
    dom.sessionProgress.style.transition = "";
  });
  dom.footHint.textContent = isCoarsePointer()
    ? "Tap the text, then type."
    : state.mode === "sprint"
      ? "Start typing to start the clock."
      : "Start typing to begin.";

  if (focus) focusTyping();
}

function startSession() {
  if (state.status !== "idle") return;
  state.status = "running";
  state.startedAt = performance.now();
  state.elapsed = 0;
  state.lastSampleSecond = -1;
  dom.trainerPanel.classList.add("is-running");
  dom.trainerPanel.classList.remove("is-finished");
  dom.statusText.textContent = "Live";
  dom.footHint.textContent = state.mode === "sprint" ? "Find a rhythm. Stay loose." : "Breathe. Keep it smooth.";

  if (state.mode === "sprint") {
    dom.liveTime.textContent = formatTime(state.duration, "ceil");
  }

  stopClock();
  state.tickId = window.setInterval(tick, 100);
}

function stopClock() {
  if (state.tickId) {
    window.clearInterval(state.tickId);
    state.tickId = null;
  }
}

function tick() {
  if (state.status !== "running" || !state.startedAt) return;

  const elapsed = (performance.now() - state.startedAt) / 1000;
  state.elapsed = state.mode === "sprint" ? Math.min(elapsed, state.duration) : elapsed;

  if (state.mode === "sprint") {
    dom.liveTime.textContent = formatTime(Math.max(0, state.duration - elapsed), "ceil");
    if (elapsed >= state.duration) {
      finishSession("time");
      return;
    }
  } else {
    dom.liveTime.textContent = formatTime(elapsed);
  }

  updateLiveStats();

  const second = Math.floor(elapsed);
  if (second > state.lastSampleSecond && second >= 1) {
    state.lastSampleSecond = second;
    state.wpmHistory.push({ t: state.elapsed, wpm: computeMetrics().wpm });
  }
}

function computeMetrics() {
  let correct = 0;
  for (let index = 0; index < state.target.length; index += 1) {
    if (state.typed[index] !== null && state.typed[index] === state.target[index]) correct += 1;
  }

  const minutes = state.elapsed / 60;
  const canMeasure = state.elapsed >= 0.6;
  const wpm = canMeasure && minutes > 0 ? Math.round((correct / 5) / minutes) : 0;
  const rawWpm = canMeasure && minutes > 0 ? Math.round((state.keypresses / 5) / minutes) : 0;
  const accuracy = state.keypresses
    ? Math.max(0, Math.round(((state.keypresses - state.errors) / state.keypresses) * 100))
    : 100;

  return { correct, wpm, rawWpm, accuracy };
}

function updateLiveStats() {
  const metrics = computeMetrics();
  dom.liveWpm.textContent = String(metrics.wpm);
  dom.liveAcc.textContent = String(metrics.accuracy);
  dom.charProgress.textContent = String(state.pos);
  dom.charTotal.textContent = String(state.target.length);

  let percent = 0;
  if (state.mode === "sprint") {
    percent = state.status === "finished" ? 100 : (state.elapsed / state.duration) * 100;
  } else {
    percent = state.target.length ? (state.pos / state.target.length) * 100 : 0;
  }
  dom.sessionProgress.style.width = `${clamp(percent, 0, 100)}%`;
}

function handleCharacter(char) {
  if (state.view !== "train" || state.modalOpen) return;
  if (state.status === "finished") return;
  if (!char) return;
  if (state.status === "idle") startSession();

  const index = state.pos;
  const expected = state.target[index];
  if (expected === undefined) return;

  const correct = char === expected;
  state.typed[index] = char;
  state.keypresses += 1;
  if (!correct) state.errors += 1;
  state.pos += 1;

  paintIndex(index);
  flashPressedKey(char, !correct);
  playClick(!correct);

  if (state.pos >= state.target.length) {
    finishSession("complete");
    return;
  }

  focusCurrentChar();
  updateLiveStats();
  updateNextKeyGuide();
}

function handleBackspace() {
  if (state.view !== "train" || state.modalOpen) return;
  if (state.status !== "running" || state.pos === 0) return;

  const previousIndex = state.pos - 1;
  state.pos = previousIndex;
  state.typed[previousIndex] = null;

  const element = state.charEls[previousIndex];
  if (element) element.classList.remove("is-correct", "is-wrong");

  focusCurrentChar();
  updateLiveStats();
  updateNextKeyGuide();
}

function finishSession(reason) {
  if (state.status !== "running") return;
  state.status = "finished";
  stopClock();

  const wallElapsed = state.startedAt ? (performance.now() - state.startedAt) / 1000 : 0;
  state.elapsed = state.mode === "sprint" && reason === "time"
    ? state.duration
    : Math.max(wallElapsed, 0.1);

  const metrics = computeMetrics();
  const finalWpm = metrics.wpm;

  if (!state.wpmHistory.length || state.elapsed - state.wpmHistory[state.wpmHistory.length - 1].t > 0.15) {
    state.wpmHistory.push({ t: state.elapsed, wpm: finalWpm });
  }

  dom.trainerPanel.classList.remove("is-running");
  dom.trainerPanel.classList.add("is-finished");
  dom.statusText.textContent = "Complete";
  dom.liveWpm.textContent = String(finalWpm);
  dom.liveAcc.textContent = String(metrics.accuracy);
  dom.liveTime.textContent = formatTime(state.elapsed);
  dom.footHint.textContent = "Run it back or move on.";
  updateLiveStats();
  dom.textFlow.querySelectorAll(".char.is-current").forEach((element) => {
    element.classList.remove("is-current");
  });
  setGuideDone();

  const lesson = getLesson();
  const previousLesson = state.mode === "guided" ? store.lessons[lesson.id] : null;
  const passed = state.mode === "guided" && metrics.accuracy >= 85;
  const qualityRun = metrics.accuracy >= QUALITY_ACCURACY;
  const isFirstCompletion = Boolean(passed && !(previousLesson && previousLesson.completed));
  const previousOverallBest = store.stats.bestWpm;
  const isNewBest = qualityRun && finalWpm > previousOverallBest && finalWpm > 0;

  ensureToday();
  markActiveToday();

  store.stats.sessions += 1;
  store.stats.totalSeconds += Math.max(0, state.elapsed);
  store.stats.totalChars += state.keypresses;
  if (qualityRun) store.stats.bestWpm = Math.max(store.stats.bestWpm, finalWpm);
  store.stats.bestAccuracy = Math.max(store.stats.bestAccuracy, metrics.accuracy);
  store.daily.seconds += Math.max(0, state.elapsed);
  store.daily.sessions += 1;

  if (state.mode === "guided") {
    const existing = previousLesson || {
      attempts: 0,
      bestWpm: 0,
      bestAccuracy: 0,
      completed: false,
    };
    const updated = {
      ...existing,
      attempts: (existing.attempts || 0) + 1,
      bestWpm: passed ? Math.max(existing.bestWpm || 0, finalWpm) : (existing.bestWpm || 0),
      bestAccuracy: Math.max(existing.bestAccuracy || 0, metrics.accuracy),
      completed: Boolean(existing.completed || passed),
    };
    store.lessons[lesson.id] = updated;
  }

  const historyEntry = {
    date: new Date().toISOString(),
    mode: state.mode,
    lessonId: state.mode === "guided" ? lesson.id : null,
    duration: state.mode === "sprint" ? state.duration : null,
    wpm: finalWpm,
    rawWpm: metrics.rawWpm,
    accuracy: metrics.accuracy,
    errors: state.errors,
    seconds: Number(state.elapsed.toFixed(1)),
    chars: state.keypresses,
  };
  store.history.unshift(historyEntry);
  store.history = store.history.slice(0, 60);
  saveStore();

  refreshStoreUI();
  renderProgressPage();

  state.result = {
    mode: state.mode,
    lessonIndex: state.lessonIndex,
    passed,
    isNewBest,
    isFirstCompletion,
    finalWpm,
    metrics,
    lesson,
  };

  showResult({
    mode: state.mode,
    lesson,
    passed,
    isNewBest,
    isFirstCompletion,
    finalWpm,
    metrics,
  });

  if (isNewBest) {
    launchConfetti();
    if (state.mode !== "guided") showToast("New personal best!");
  }
}

/* =========================================================
   Result modal
   ========================================================= */

function showResult({ mode, lesson, passed, isNewBest, isFirstCompletion, finalWpm, metrics }) {
  const totalChars = state.target.length;
  const failedLesson = mode === "guided" && !passed;

  dom.resultEyebrow.textContent = failedLesson
    ? "Lesson logged"
    : mode === "guided"
      ? `Lesson ${pad(state.lessonIndex + 1)} complete`
      : "Sprint complete";

  dom.resultTitle.textContent = failedLesson
    ? "Not quite yet."
    : isNewBest
      ? "That's a new best."
      : metrics.accuracy >= 98
        ? "Dialed in."
        : metrics.accuracy >= 94
          ? "Clean run."
          : metrics.accuracy >= 88
            ? "Good rhythm."
            : "Speed is built.";

  dom.resultSub.textContent = mode === "guided"
    ? `${lesson.nav} · ${totalChars} characters`
    : `Sprint · ${state.duration} seconds · ${state.keypresses} keys`;

  if (isNewBest) {
    dom.recordBadge.hidden = false;
    dom.recordBadge.textContent = "New best";
  } else if (isFirstCompletion) {
    dom.recordBadge.hidden = false;
    dom.recordBadge.textContent = "Lesson passed";
  } else {
    dom.recordBadge.hidden = true;
  }

  dom.resultWpm.textContent = String(finalWpm);
  dom.resultAcc.textContent = `${metrics.accuracy}%`;
  dom.resultRaw.textContent = String(metrics.rawWpm);
  dom.resultTime.textContent = formatTime(state.elapsed);
  dom.resultErrors.textContent = String(state.errors);

  renderResultChart();

  if (failedLesson) {
    dom.resultMessage.textContent = `You need 85% accuracy to pass this lesson. You logged ${metrics.accuracy}%. Drop the pace a little and run it back — clean beats fast.`;
  } else if (mode === "guided") {
    dom.resultMessage.textContent = `Lesson passed at ${metrics.accuracy}% accuracy. ${lesson.coach.split(".")[0]}. Keep this rhythm into the next lesson.`;
  } else if (metrics.accuracy >= 97) {
    dom.resultMessage.textContent = `${finalWpm} WPM at ${metrics.accuracy}% accuracy. Strong control. Next round, push the pace by 5% — no more.`;
  } else {
    dom.resultMessage.textContent = `${finalWpm} WPM at ${metrics.accuracy}% accuracy. Keep accuracy above 95% before chasing speed. The pace will follow.`;
  }

  const hasNextLesson = state.lessonIndex < LESSONS.length - 1;
  let primaryLabel = "Run it back";
  if (failedLesson) {
    primaryLabel = "Try again";
    state.secondaryMode = "advance";
    dom.resultRetry.innerHTML = `${hasNextLesson ? "Next lesson" : "Start a sprint"} <span aria-hidden="true">→</span>`;
  } else if (mode === "guided") {
    primaryLabel = hasNextLesson ? "Next lesson" : "Start a sprint";
    state.secondaryMode = "retry";
    dom.resultRetry.innerHTML = `Try again <kbd>r</kbd>`;
  } else {
    primaryLabel = "Run another sprint";
    state.secondaryMode = "retry";
    dom.resultRetry.innerHTML = `Try again <kbd>r</kbd>`;
  }
  dom.resultPrimary.innerHTML = `${primaryLabel} <span aria-hidden="true">→</span>`;

  dom.resultModal.hidden = false;
  state.modalOpen = true;
  document.body.style.overflow = "hidden";
  window.setTimeout(() => dom.resultPrimary.focus({ preventScroll: true }), 80);
}

function hideResult() {
  dom.resultModal.hidden = true;
  state.modalOpen = false;
  document.body.style.overflow = "";
}

function dismissResult() {
  hideResult();
  resetSession();
}

function retryResult() {
  hideResult();
  resetSession();
}

function handleSecondaryResult() {
  if (state.secondaryMode === "advance") forceAdvanceResult();
  else retryResult();
}

function goToNextFromResult(result) {
  if (result.mode === "guided") {
    if (result.lessonIndex < LESSONS.length - 1) {
      selectLesson(result.lessonIndex + 1);
    } else {
      setMode("sprint");
    }
  } else {
    resetSession();
  }
}

function forceAdvanceResult() {
  const result = state.result;
  hideResult();
  if (!result) {
    resetSession();
    return;
  }
  goToNextFromResult(result);
}

function advanceResult() {
  const result = state.result;
  hideResult();
  if (!result) {
    resetSession();
    return;
  }

  if (result.mode === "guided" && !result.passed) {
    resetSession();
    return;
  }

  goToNextFromResult(result);
}

function renderResultChart() {
  const finalWpm = state.result ? state.result.finalWpm : computeMetrics().wpm;
  const points = [{ t: 0, wpm: 0 }, ...state.wpmHistory, { t: state.elapsed, wpm: finalWpm }]
    .filter((point, index, all) => point.t <= state.elapsed + 0.05 && (index === 0 || point.t > all[index - 1].t - 0.03));

  const width = 640;
  const height = 120;
  const padX = 10;
  const padTop = 12;
  const padBottom = 12;
  const actualPeak = Math.max(0, ...points.map((point) => point.wpm));
  const peak = Math.max(10, actualPeak);
  const yMax = Math.max(20, Math.ceil(peak / 10) * 10);
  const duration = Math.max(state.elapsed, 0.1);

  const xFor = (time) => padX + (clamp(time, 0, duration) / duration) * (width - padX * 2);
  const yFor = (wpm) => height - padBottom - (clamp(wpm, 0, yMax) / yMax) * (height - padTop - padBottom);

  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${xFor(point.t).toFixed(1)},${yFor(point.wpm).toFixed(1)}`).join(" ");
  const lastPoint = points[points.length - 1];
  const area = `${line} L${xFor(lastPoint.t).toFixed(1)},${height - padBottom} L${xFor(points[0].t).toFixed(1)},${height - padBottom} Z`;
  const grid = [0.25, 0.5, 0.75].map((fraction) => {
    const y = (height - padBottom - fraction * (height - padTop - padBottom)).toFixed(1);
    return `<line x1="${padX}" x2="${width - padX}" y1="${y}" y2="${y}" style="stroke: var(--line); stroke-dasharray: 3 5;" />`;
  }).join("");

  dom.resultChart.innerHTML = `
    <defs>
      <linearGradient id="resultChartFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style="stop-color: var(--accent); stop-opacity: 0.24;"></stop>
        <stop offset="100%" style="stop-color: var(--accent); stop-opacity: 0;"></stop>
      </linearGradient>
    </defs>
    ${grid}
    <path d="${area}" style="fill: url(#resultChartFill);"></path>
    <path d="${line}" style="fill: none; stroke: var(--accent); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;" vector-effect="non-scaling-stroke"></path>
    <circle cx="${xFor(lastPoint.t).toFixed(1)}" cy="${yFor(lastPoint.wpm).toFixed(1)}" r="3.5" style="fill: var(--accent);"></circle>
  `;

  dom.chartPeak.textContent = `Peak ${actualPeak} WPM`;
}

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#d8ff4d", "#ff8c7a", "#ffc65c", "#7ce0b0", "#79b9ff", "#f3f1e8"];
  dom.confettiLayer.innerHTML = "";

  for (let index = 0; index < 30; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--duration", `${1.8 + Math.random() * 1.4}s`);
    piece.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    piece.style.setProperty("--spin", `${360 + Math.random() * 720}deg`);
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    dom.confettiLayer.appendChild(piece);
  }

  window.setTimeout(() => {
    dom.confettiLayer.innerHTML = "";
  }, 3600);
}

/* =========================================================
   Session copy / mode
   ========================================================= */

function updateSessionCopy() {
  dom.pathEyebrow.textContent = state.mode === "guided" ? "Learning path" : "Speed test";
  dom.pathTitle.textContent = state.mode === "guided" ? "Type from zero." : "Beat the clock.";

  if (state.mode === "guided") {
    const lesson = getLesson();
    dom.sessionBadge.textContent = `Lesson ${pad(state.lessonIndex + 1)}`;
    dom.sessionCategory.textContent = lesson.category;
    dom.sessionTitle.textContent = lesson.title;
    dom.sessionSubtitle.textContent = lesson.subtitle;
    dom.coachTip.textContent = lesson.coach;
    dom.coachNumber.textContent = `${pad(state.lessonIndex + 1)} / ${pad(LESSONS.length)}`;
    dom.kbTip.textContent = lesson.kbTip;
    document.title = `${lesson.nav} — Keyflow`;
  } else {
    dom.sessionBadge.textContent = "Sprint";
    dom.sessionCategory.textContent = `${state.duration} second test`;
    dom.sessionTitle.textContent = SPRINT_TITLES[state.duration] || "Beat the clock.";
    dom.sessionSubtitle.textContent = `Common words, live speed. ${state.duration} seconds on the clock — accuracy still counts.`;
    dom.coachTip.textContent = SPRINT_COACH;
    dom.coachNumber.textContent = "∞";
    dom.kbTip.textContent = "Relax your hands. Let the rhythm do the work.";
    document.title = `${state.duration}s sprint — Keyflow`;
  }
}

function updateCoach() {
  if (state.mode === "guided") {
    const lesson = getLesson();
    dom.coachTip.textContent = lesson.coach;
    dom.coachNumber.textContent = `${pad(state.lessonIndex + 1)} / ${pad(LESSONS.length)}`;
  } else {
    dom.coachTip.textContent = SPRINT_COACH;
    dom.coachNumber.textContent = "∞";
  }
}

function applyModeUI() {
  const guided = state.mode === "guided";
  dom.lessonList.hidden = !guided;
  dom.sprintOptions.hidden = guided;

  dom.modeButtons.forEach((button) => {
    const active = button.dataset.mode === state.mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  dom.durationButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.duration) === state.duration);
  });
}

function setMode(mode) {
  if (mode !== "guided" && mode !== "sprint") return;
  if (state.mode === mode) {
    focusTyping();
    return;
  }

  state.mode = mode;
  applyModeUI();
  renderLessonList();
  updateSprintBest();
  updateSessionCopy();
  resetSession();
}

function selectLesson(index) {
  if (index < 0 || index >= LESSONS.length) return;
  state.mode = "guided";
  state.lessonIndex = index;
  applyModeUI();
  updateSessionCopy();
  renderLessonList();
  renderProgressPage();
  resetSession();
}

function setDuration(seconds) {
  if (![15, 30, 60].includes(seconds)) return;
  state.duration = seconds;
  applyModeUI();
  updateSprintBest();
  updateSessionCopy();
  if (state.mode === "sprint") resetSession();
  else focusTyping();
}

/* =========================================================
   Rendering the learning path
   ========================================================= */

function renderLessonList() {
  dom.lessonList.innerHTML = "";
  let completeCount = 0;

  LESSONS.forEach((lesson, index) => {
    const saved = store.lessons[lesson.id];
    const complete = Boolean(saved && saved.completed);
    if (complete) completeCount += 1;

    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lesson-button";
    button.dataset.index = String(index);
    button.classList.toggle("is-complete", complete);
    button.classList.toggle("is-active", state.mode === "guided" && state.lessonIndex === index);
    button.setAttribute("aria-current", state.mode === "guided" && state.lessonIndex === index ? "true" : "false");

    const number = document.createElement("span");
    number.className = "lesson-number";
    number.textContent = pad(index + 1);

    const copy = document.createElement("span");
    copy.className = "lesson-copy";
    const title = document.createElement("strong");
    title.textContent = lesson.nav;
    const meta = document.createElement("small");
    meta.textContent = complete && saved && saved.bestWpm
      ? `${lesson.keys} keys · best ${saved.bestWpm} WPM`
      : `${lesson.keys} keys · ${lesson.text.length} chars`;
    copy.append(title, meta);

    const icon = document.createElement("span");
    icon.className = "lesson-state";
    if (state.mode === "guided" && state.lessonIndex === index) {
      icon.innerHTML = svgArrow();
    } else if (complete) {
      icon.innerHTML = svgCheck();
    } else {
      icon.innerHTML = "";
    }

    button.append(number, copy, icon);
    button.addEventListener("click", () => selectLesson(index));
    item.appendChild(button);
    dom.lessonList.appendChild(item);
  });

  dom.lessonsDone.textContent = String(completeCount);
  dom.pathProgressBar.style.width = `${(completeCount / LESSONS.length) * 100}%`;
  dom.progressFraction.textContent = String(completeCount);
}

function updateSprintBest() {
  const best = store.history
    .filter((entry) => entry.mode === "sprint"
      && Number(entry.duration) === state.duration
      && (entry.accuracy || 0) >= QUALITY_ACCURACY)
    .reduce((max, entry) => Math.max(max, entry.wpm || 0), 0);
  dom.sprintBest.textContent = best ? `${best} WPM` : "—";
}

/* =========================================================
   Progress page
   ========================================================= */

function currentStreak() {
  const active = new Set(store.activeDays);
  const cursor = new Date();
  if (!active.has(localDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let count = 0;
  while (active.has(localDateKey(cursor))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

function longestStreak() {
  const days = Array.from(new Set(store.activeDays)).sort();
  let best = 0;
  let run = 0;
  let previous = null;
  days.forEach((key) => {
    const date = dateFromKey(key);
    if (previous) {
      const difference = Math.round((date - previous) / 86400000);
      run = difference === 1 ? run + 1 : 1;
    } else {
      run = 1;
    }
    best = Math.max(best, run);
    previous = date;
  });
  return best;
}

function ensureToday() {
  const today = localDateKey();
  if (store.daily.date !== today) {
    store.daily = { date: today, seconds: 0, sessions: 0 };
  }
}

function markActiveToday() {
  const today = localDateKey();
  if (!store.activeDays.includes(today)) store.activeDays.push(today);
  store.activeDays = store.activeDays.slice(-400);
}

function refreshStoreUI() {
  ensureToday();
  const streak = currentStreak();
  dom.headerStreak.textContent = String(streak);
  dom.streakPill.title = streak
    ? `${pluralize(streak, "day")} strong. Practice today to keep it alive.`
    : "Practice today to start a streak.";

  const minutes = Math.floor(store.daily.seconds / 60);
  const percent = Math.min(100, (store.daily.seconds / (DAILY_GOAL_MINUTES * 60)) * 100);
  dom.dailyRing.style.setProperty("--pct", percent.toFixed(1));
  dom.dailyMinutes.textContent = String(minutes);

  if (percent >= 100) {
    dom.dailyTitle.textContent = "Goal met.";
    dom.dailyNote.textContent = "Fifteen minutes in. Anything else is a bonus.";
  } else if (percent > 0) {
    const left = Math.max(1, DAILY_GOAL_MINUTES - minutes);
    dom.dailyTitle.textContent = "Keep the wheel turning.";
    dom.dailyNote.textContent = `${pluralize(left, "minute")} left to hit today's goal.`;
  } else {
    dom.dailyTitle.textContent = "A little every day.";
    dom.dailyNote.textContent = "Fifteen focused minutes keeps the streak alive.";
  }

  renderLessonList();
  updateSprintBest();
}

function renderProgressPage() {
  if (!dom.progressView) return;

  ensureToday();
  const history = store.history;
  const streak = currentStreak();
  const best = store.stats.bestWpm || 0;
  const bestEntry = history.find((entry) => entry.wpm === best
    && (entry.accuracy || 0) >= QUALITY_ACCURACY);
  const averageAccuracy = history.length
    ? Math.round(history.reduce((total, entry) => total + (entry.accuracy || 0), 0) / history.length)
    : null;
  const totalMinutes = Math.round(store.stats.totalSeconds / 60);

  dom.statBestWpm.textContent = String(best);
  dom.statBestNote.textContent = bestEntry
    ? `Set in a ${bestEntry.mode === "sprint" ? "sprint" : "lesson"} · ${shortDate(bestEntry.date)}`
    : history.length
      ? "Hit 90% accuracy to set a benchmark."
      : "Finish a session to set your benchmark.";

  dom.statAvgAcc.textContent = averageAccuracy === null ? "—" : String(averageAccuracy);
  dom.statAccNote.textContent = averageAccuracy === null
    ? "Precision before pace."
    : averageAccuracy >= 95
      ? "Your precision is the engine."
      : "Aim to keep this above 95%.";

  dom.statTotalTime.textContent = String(totalMinutes);
  dom.statSessionNote.textContent = history.length
    ? `${pluralize(store.stats.sessions, "session")} logged · best streak ${pluralize(longestStreak(), "day")}`
    : "No sessions yet.";

  dom.statStreak.textContent = String(streak);
  dom.statStreakNote.textContent = streak
    ? `${pluralize(longestStreak(), "day")} is your longest run.`
    : "Today counts. Start small.";

  dom.historyCount.textContent = pluralize(history.length, "run");
  renderHistoryChart(history);
  renderPathSummary();
  renderActivity();
}

function shortDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "recently";
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const difference = Math.round((start - target) / 86400000);
  if (difference === 0) return "today";
  if (difference === 1) return "yesterday";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function renderHistoryChart(history) {
  const entries = history.slice(0, 12).reverse();
  dom.historyChart.innerHTML = "";

  if (!entries.length) {
    dom.historyChart.hidden = true;
    dom.historyEmpty.hidden = false;
    return;
  }

  dom.historyChart.hidden = false;
  dom.historyEmpty.hidden = true;
  const peak = Math.max(10, ...entries.map((entry) => entry.wpm || 0));

  entries.forEach((entry) => {
    const column = document.createElement("div");
    column.className = "bar-column";
    column.title = `${entry.wpm} WPM · ${entry.accuracy}% accuracy · ${shortDate(entry.date)}`;

    const value = document.createElement("span");
    value.className = "bar-value";
    value.textContent = String(entry.wpm);

    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.height = `${Math.max(4, ((entry.wpm || 0) / peak) * 100)}%`;

    const label = document.createElement("span");
    label.className = "bar-label";
    const date = new Date(entry.date);
    label.textContent = Number.isNaN(date.getTime())
      ? "run"
      : `${date.getMonth() + 1}/${date.getDate()}`;

    column.append(value, fill, label);
    dom.historyChart.appendChild(column);
  });
}

function renderPathSummary() {
  dom.pathSummaryList.innerHTML = "";
  let completeCount = 0;

  LESSONS.forEach((lesson, index) => {
    const saved = store.lessons[lesson.id] || {};
    const complete = Boolean(saved.completed);
    if (complete) completeCount += 1;

    const row = document.createElement("div");
    row.className = `summary-row${complete ? " is-complete" : ""}`;

    const check = document.createElement("span");
    check.className = "summary-check";
    check.innerHTML = complete ? svgCheck() : svgArrow();

    const copy = document.createElement("span");
    copy.className = "summary-copy";
    const title = document.createElement("strong");
    title.textContent = `${pad(index + 1)} · ${lesson.nav}`;
    const meta = document.createElement("span");
    meta.textContent = complete
      ? "Passed · 85% accuracy or better"
      : saved.attempts
        ? `${pluralize(saved.attempts, "attempt")} · needs 85%`
        : "Not started";
    copy.append(title, meta);

    const best = document.createElement("span");
    best.className = "summary-best";
    best.innerHTML = saved.bestWpm ? `<b>${saved.bestWpm}</b> WPM` : "—";

    row.append(check, copy, best);
    dom.pathSummaryList.appendChild(row);
  });

  dom.progressFraction.textContent = String(completeCount);
}

function renderActivity() {
  dom.activityStrip.innerHTML = "";
  const active = new Set(store.activeDays);
  const today = new Date();
  const weekday = ["S", "M", "T", "W", "T", "F", "S"];

  for (let offset = 13; offset >= 0; offset -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);
    const key = localDateKey(date);
    const day = document.createElement("div");
    day.className = "activity-day";
    day.classList.toggle("is-active", active.has(key));
    day.classList.toggle("is-today", offset === 0);
    day.textContent = weekday[date.getDay()];
    day.title = `${date.toLocaleDateString(undefined, { month: "long", day: "numeric" })}${active.has(key) ? " · practiced" : ""}`;
    dom.activityStrip.appendChild(day);
  }
}

/* =========================================================
   View switching + focus
   ========================================================= */

function setView(view) {
  if (view !== "train" && view !== "progress") return;
  if (view === "progress" && state.status === "running") resetSession({ focus: false });

  state.view = view;
  dom.trainView.hidden = view !== "train";
  dom.progressView.hidden = view !== "progress";

  dom.navItems.forEach((item) => {
    const active = item.dataset.view === view;
    item.classList.toggle("is-active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });

  if (view === "progress") {
    document.title = "Progress — Keyflow";
    renderProgressPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    updateSessionCopy();
    focusTyping();
  }

  try {
    const hash = view === "progress" ? "#progress" : "#train";
    window.history.replaceState(null, "", hash);
  } catch {
    /* Ignore environments where history updates are restricted. */
  }
}

function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function focusTyping() {
  if (state.view !== "train" || state.modalOpen) return;
  try {
    dom.typingInput.focus({ preventScroll: true });
  } catch {
    dom.typingInput.focus();
  }
}

/* =========================================================
   Toast
   ========================================================= */

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("is-visible");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    dom.toast.classList.remove("is-visible");
  }, 2400);
}

/* =========================================================
   Reset data
   ========================================================= */

function handleResetProgress() {
  if (!state.resetArmed) {
    state.resetArmed = true;
    dom.resetProgressBtn.classList.add("is-confirming");
    dom.resetProgressBtn.textContent = "Click again to reset";
    window.clearTimeout(state.resetTimer);
    state.resetTimer = window.setTimeout(() => {
      state.resetArmed = false;
      dom.resetProgressBtn.classList.remove("is-confirming");
      dom.resetProgressBtn.textContent = "Reset data";
    }, 3000);
    return;
  }

  window.clearTimeout(state.resetTimer);
  const theme = store.settings.theme;
  const sound = store.settings.sound;
  store = createDefaultStore();
  store.settings = { theme, sound };
  saveStore();
  state.resetArmed = false;
  dom.resetProgressBtn.classList.remove("is-confirming");
  dom.resetProgressBtn.textContent = "Reset data";

  renderLessonList();
  updateSprintBest();
  refreshStoreUI();
  renderProgressPage();
  resetSession({ focus: false });
  showToast("Progress reset. A clean slate.");
}

/* =========================================================
   Event wiring
   ========================================================= */

function bindEvents() {
  dom.navItems.forEach((item) => {
    item.addEventListener("click", () => setView(item.dataset.view));
  });

  document.querySelectorAll("[data-view]").forEach((item) => {
    if (item.classList.contains("nav-item")) return;
    item.addEventListener("click", () => setView(item.dataset.view));
  });

  dom.brandHome.addEventListener("click", (event) => {
    event.preventDefault();
    setView("train");
  });

  dom.themeToggle.addEventListener("click", toggleTheme);
  dom.soundToggle.addEventListener("click", toggleSound);

  dom.modeButtons.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });

  dom.durationButtons.forEach((button) => {
    button.addEventListener("click", () => setDuration(Number(button.dataset.duration)));
  });

  dom.restartBtn.addEventListener("click", () => resetSession());

  dom.typingStage.addEventListener("click", () => focusTyping());
  dom.typingStage.addEventListener("pointerdown", () => focusTyping());

  dom.resultClose.addEventListener("click", dismissResult);
  dom.resultRetry.addEventListener("click", handleSecondaryResult);
  dom.resultPrimary.addEventListener("click", advanceResult);

  dom.resetProgressBtn.addEventListener("click", handleResetProgress);

  document.addEventListener("keydown", onDocumentKeyDown);

  dom.typingInput.addEventListener("input", () => {
    const value = dom.typingInput.value;
    dom.typingInput.value = "";
    if (!value || state.modalOpen || state.view !== "train") return;

    const chars = Array.from(value);
    const justHandled = performance.now() - state.lastHandledAt < 120
      && chars.length === 1
      && chars[0] === state.lastHandledChar;
    if (justHandled) return;

    chars.forEach((char) => {
      if (char.length === 1) handleCharacter(char);
    });
  });

  window.addEventListener("resize", () => {
    window.clearTimeout(state.resizeTimer);
    state.resizeTimer = window.setTimeout(scrollCurrentIntoView, 120);
  });

  window.addEventListener("hashchange", () => {
    const view = window.location.hash === "#progress" ? "progress" : "train";
    if (view !== state.view) setView(view);
  });
}

function onDocumentKeyDown(event) {
  if (state.modalOpen) {
    if (event.key === "Escape") {
      event.preventDefault();
      dismissResult();
      return;
    }
    if (event.key === "Tab") {
      trapModalFocus(event);
      return;
    }
    if (event.key.toLowerCase() === "r" && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      retryResult();
      return;
    }
    if (event.key === "Enter" && !event.target.closest("button")) {
      event.preventDefault();
      advanceResult();
    }
    return;
  }

  if (state.view !== "train") return;
  if (event.defaultPrevented) return;
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  const target = event.target;
  const isInteractive = target instanceof Element
    && (target.closest("button, a, input, textarea, select, [contenteditable='true']"));
  if (isInteractive && target !== dom.typingInput) return;

  if (event.key === "Escape") {
    event.preventDefault();
    resetSession();
    return;
  }

  if (event.key === "Backspace") {
    event.preventDefault();
    if (event.repeat) return;
    handleBackspace();
    return;
  }

  if (event.key.length === 1) {
    event.preventDefault();
    if (event.repeat) return;
    state.lastHandledChar = event.key;
    state.lastHandledAt = performance.now();
    handleCharacter(event.key);
  }
}

function trapModalFocus(event) {
  const focusable = Array.from(
    dom.resultCard.querySelectorAll("button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* =========================================================
   Init
   ========================================================= */

function init() {
  store = loadStore();
  applyTheme(store.settings.theme, false);
  applySoundSetting();
  buildKeyboard();
  bindEvents();

  const firstIncomplete = LESSONS.findIndex((lesson) => !(store.lessons[lesson.id] && store.lessons[lesson.id].completed));
  const allComplete = firstIncomplete === -1;
  state.lessonIndex = allComplete ? 0 : firstIncomplete;
  state.mode = allComplete ? "sprint" : "guided";

  applyModeUI();
  updateSessionCopy();
  renderLessonList();
  updateSprintBest();
  refreshStoreUI();
  renderProgressPage();
  resetSession({ focus: false });

  const startView = window.location.hash === "#progress" ? "progress" : "train";
  setView(startView);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      scrollCurrentIntoView();
      window.setTimeout(() => focusTyping(), 250);
    });
  } else {
    window.setTimeout(() => focusTyping(), 250);
  }

  window.setTimeout(() => {
    if (state.view === "train" && !state.modalOpen) focusTyping();
  }, 500);
}

init();
