// ===============================
// DOMANDE
// ===============================
const questions = [
  "Mi piace comprendere a fondo le meccaniche di gioco.",
  "Mi piace perdermi nel mondo di gioco, nelle mappe e nei dettagli.",
  "Mi piacciono i giochi che funzionano bene anche se giocati da soli.",
  "Ottimizzare risorse, build o percorsi mi dà soddisfazione.",

  "Il gioco è più divertente quando interagisco con altri giocatori.",
  "Mi piace osservare come giocano gli altri e reagire alle loro azioni.",
  "Le dinamiche sociali sono più importanti della storia.",
  "Senza altri giocatori, il gioco perde fascino.",

  "Mi piace avere obiettivi chiari da raggiungere.",
  "Sono motivato dai risultati e dalle vittorie.",
  "Preferisco agire piuttosto che osservare.",
  "Mi piace portare a termine ciò che inizio.",

  "Mi piace esplorare senza uno scopo preciso.",
  "Sperimento anche se non è efficiente.",
  "L’esperienza conta più del risultato.",
  "Mi piace provare approcci diversi."
];

// ===============================
// ICONE SCALA (7)
// ===============================
const levelIcons = [
  "img/1x/Risorsa 1.png",
  "img/1x/Risorsa 2.png",
  "img/1x/Risorsa 3.png",
  "img/1x/Risorsa 4.png",
  "img/1x/Risorsa 5.png",
  "img/1x/Risorsa 6.png",
  "img/1x/Risorsa 7.png"
];

const answers = new Array(questions.length).fill(4);
const container = document.getElementById("questions");

// ===============================
// GENERA DOMANDE
// ===============================
questions.forEach((text, qIndex) => {
  const div = document.createElement("div");
  div.className = "question";

  let levelsHTML = "";
  levelIcons.forEach((src, i) => {
    levelsHTML += `
      <span class="level ${i === 3 ? "selected" : ""}"
            data-question="${qIndex}"
            data-value="${i + 1}">
        <img src="${src}">
      </span>
    `;
  });

  div.innerHTML = `
    <label>${text}</label>
    <div class="scale">
      <span class="scale-text">D'accordo</span>
      <div class="levels">${levelsHTML}</div>
      <span class="scale-text">In disaccordo</span>
    </div>
  `;

  container.appendChild(div);
});

// ===============================
// CLICK RISPOSTE
// ===============================
document.addEventListener("click", e => {
  const level = e.target.closest(".level");
  if (!level) return;

  const q = level.dataset.question;
  const val = parseInt(level.dataset.value);
  answers[q] = val;

  document
    .querySelectorAll(`.level[data-question="${q}"]`)
    .forEach(l => l.classList.remove("selected"));

  level.classList.add("selected");
});

// ===============================
// PROFILI
// ===============================
const icons = {
  "Stratega": "🧠",
  "Guerriero": "🛡️",
  "Curatore": "❤️",
  "Cacciatore": "🏹"
};

const descriptions = {
  "Stratega": "Analitico e riflessivo, ami capire come funzionano le cose prima di agire.",
  "Guerriero": "Determinato e orientato all’azione, punti dritto all’obiettivo.",
  "Curatore": "Empatico e collaborativo, trovi valore nell’aiutare gli altri.",
  "Cacciatore": "Istintivo e solitario, reagisci rapidamente cogliendo le opportunità."
};
const abilities = {
  "Stratega": { ability: "Visione Tattica", effect: "Comprendi sistemi e regole nascoste." },
  "Guerriero": { ability: "Assalto Diretto", effect: "Ottieni vantaggi agendo subito." },
  "Curatore": { ability: "Supporto", effect: "Sostieni e rafforzi gli altri." },
  "Cacciatore": { ability: "Istinto", effect: "Reagisci più velocemente alle occasioni." }
};

// ===============================
// SUBMIT
// ===============================
document.getElementById("testForm").addEventListener("submit", e => {
  e.preventDefault();

  const world = answers.slice(0, 4).reduce((a, b) => a + b, 0);
  const people = answers.slice(4, 8).reduce((a, b) => a + b, 0);
  const action = answers.slice(8, 12).reduce((a, b) => a + b, 0);
  const interact = answers.slice(12, 16).reduce((a, b) => a + b, 0);

  let profile = "";

  if (world >= people && world >= action && world >= interact) {
    profile = "Stratega";
  } else if (people >= world && people >= action && people >= interact) {
    profile = "Curatore";
  } else if (action >= world && action >= people && action >= interact) {
    profile = "Guerriero";
  } else {
    profile = "Cacciatore";
  }

  document.querySelector(".quiz-container").style.display = "none";

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";

  resultDiv.innerHTML = `
    <h2 style="font-size:48px">${icons[profile]} ${profile}</h2>
    <p style="font-size:22px; max-width:600px; margin:auto;">
      ${descriptions[profile]}
    </p>
    <div style="margin-top:30px; padding:20px; background:#222; border-radius:10px;">
      <h3>${abilities[profile].ability}</h3>
      <p>${abilities[profile].effect}</p>
    </div>
  `;
});