const defaultRoster = [
  "Alex Rivera",
  "Elena Chen",
  "Marcus Thorne",
  "Sana Miller",
  "Jordan Blake",
  "Chloe Vance"
];

const insectNames = [
  "Atlas Moth",
  "Crimson Dragonfly",
  "Velvet Beetle",
  "Shadow Cicada",
  "Silver Ant",
  "Glint Wasp",
  "Neon Firefly",
  "Emerald Grasshopper",
  "Azure Butterfly",
  "Obsidian Spider"
];

const draftNames = [
  "Kai Hunter",
  "Ava Storm",
  "Milo Frost",
  "Zara Blaze",
  "Luna Reed",
  "Rex Nova",
  "Nia Vale",
  "Orion Vale",
  "Mira Quill",
  "Jax Steel"
];

const rosterList = document.getElementById("rosterList");
const activeCountText = document.getElementById("activeCountText");
const activeCountValue = document.getElementById("activeCount");
const nameInput = document.getElementById("nameInput");
const addNamesBtn = document.getElementById("addNamesBtn");
const addRandomBtn = document.getElementById("addRandomBtn");
const generateInsectBtn = document.getElementById("generateInsectBtn");
const clearNamesBtn = document.getElementById("clearNamesBtn");
const statusMessage = document.getElementById("statusMessage");
const spinBtn = document.getElementById("spinBtn");
const resultOverlay = document.getElementById("resultOverlay");
const selectedNameEl = document.getElementById("selectedName");
const acknowledgeBtn = document.getElementById("acknowledgeBtn");
const wheel = document.getElementById("wheel");
const pulseBar = document.getElementById("pulseBar");
const recentFeed = document.getElementById("recentFeed");

let roster = defaultRoster.map((name) => ({ name, active: true }));
let statusTimer = null;

function showStatus(message) {
  if (statusTimer) {
    clearTimeout(statusTimer);
  }
  statusMessage.textContent = message;
  statusTimer = setTimeout(() => {
    statusMessage.textContent = "";
  }, 4000);
}

function getActiveNames() {
  return roster.filter((entry) => entry.active).map((entry) => entry.name);
}

function updateRosterCounts() {
  const activeCount = getActiveNames().length;
  activeCountText.textContent = `${activeCount} ACTIVE`;
  activeCountValue.textContent = activeCount;
}

function createRosterItem(entry, index) {
  const container = document.createElement("div");
  container.className = "flex items-center justify-between p-3 bg-surface-container rounded-lg border border-outline-variant/30";

  const nameSpan = document.createElement("span");
  nameSpan.className = "text-label-caps text-on-surface";
  nameSpan.textContent = entry.name;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = entry.active;
  checkbox.className = "w-5 h-5 rounded border-outline bg-surface-container-low text-primary focus:ring-primary ring-offset-background";
  checkbox.addEventListener("change", () => {
    roster[index].active = checkbox.checked;
    updateRosterCounts();
  });

  container.append(nameSpan, checkbox);
  return container;
}

function renderRoster() {
  rosterList.innerHTML = "";
  if (roster.length === 0) {
    rosterList.innerHTML = `<div class="p-4 rounded-lg bg-surface-container-low text-on-surface-variant">No names in the roster yet. Add names to begin.</div>`;
    updateRosterCounts();
    return;
  }
  roster.forEach((entry, index) => rosterList.appendChild(createRosterItem(entry, index)));
  updateRosterCounts();
}

function parseNames(text) {
  return text
    .split(/[,\n]+/)
    .map((name) => name.trim())
    .filter(Boolean);
}
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function addNamesToRoster(names, autoChoose = false) {
  const existingNames = new Set(roster.map((entry) => entry.name.toLowerCase()));
  const added = names.filter((name) => {
    const normalized = name.toLowerCase();
    if (!existingNames.has(normalized)) {
      existingNames.add(normalized);
      return true;
    }
    return false;
  });
  roster.push(...added.map((name) => ({ name, active: true })));
  renderRoster();
  showStatus(`${added.length} name(s) added to the roster.`);

  if (autoChoose && added.length > 0) {
    setTimeout(() => {
      pickRandomName();
    }, 600);
  }
}

function addNamesFromInput() {
  const names = parseNames(nameInput.value);
  if (names.length === 0) {
    showStatus("Enter at least one name to add.");
    return;
  }
  addNamesToRoster(shuffleArray(names));
  nameInput.value = "";
}

function addRandomDraft() {
  const picks = shuffleArray(draftNames).slice(0, 3);
  addNamesToRoster(shuffleArray(picks));
}

function generateInsectName() {
  const insect = insectNames[Math.floor(Math.random() * insectNames.length)];
  addNamesToRoster([insect], true);
}

function clearNames() {
  roster = [];
  renderRoster();
  showStatus("Roster cleared. Add new names to continue.");
}

function addWinnerFeed(name) {
  const item = document.createElement("div");
  item.className = "p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-lg relative overflow-hidden";
  item.innerHTML = `
    <div class="flex justify-between items-start mb-2">
      <span class="font-label-caps text-secondary">${name}</span>
      <span class="text-[10px] text-outline-variant font-label-caps">Now</span>
    </div>
    <div class="text-xs text-on-surface-variant font-body-md">Action: <span class="text-tertiary">Selected by Arena</span></div>
    <div class="absolute top-0 right-0 w-1 h-full bg-tertiary opacity-50"></div>
  `;
  recentFeed.prepend(item);
  if (recentFeed.children.length > 6) {
    recentFeed.removeChild(recentFeed.lastElementChild);
  }
}

function pickRandomName() {
  const activeNames = getActiveNames();
  if (activeNames.length === 0) {
    showStatus("No active names available. Add or enable names to spin.");
    return;
  }

  const randomName = activeNames[Math.floor(Math.random() * activeNames.length)];
  const spinDegrees = Math.floor(Math.random() * 720) + 720;
  wheel.style.transform = `rotate(${spinDegrees}deg)`;
  pulseBar.style.width = "0%";

  requestAnimationFrame(() => {
    pulseBar.style.width = "100%";
  });

  setTimeout(() => {
    selectedNameEl.textContent = randomName.toUpperCase();
    resultOverlay.style.opacity = "1";
    resultOverlay.style.pointerEvents = "auto";
    addWinnerFeed(randomName);
  }, 1200);
}

function closeResultOverlay() {
  resultOverlay.style.opacity = "0";
  resultOverlay.style.pointerEvents = "none";
}

addNamesBtn.addEventListener("click", addNamesFromInput);
addRandomBtn.addEventListener("click", addRandomDraft);
generateInsectBtn.addEventListener("click", generateInsectName);
clearNamesBtn.addEventListener("click", clearNames);
spinBtn.addEventListener("click", pickRandomName);
acknowledgeBtn.addEventListener("click", closeResultOverlay);

renderRoster();