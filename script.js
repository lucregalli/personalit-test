// ===============================
// DOMANDE
// ===============================
const questions = [
  "Mi piace comprendere a fondo le meccaniche di gioco.",
  "Mi piace perdermi nel mondo di gioco, nelle mappe e nei dettagli.",
  "Mi piacciono i giochi che funzionano bene anche se giocati da soli.",
  "Ottimizzare risorse, build o percorsi mi dÃ  soddisfazione.",

  "Il gioco Ã¨ piÃ¹ divertente quando interagisco con altri giocatori.",
  "Mi piace osservare come giocano gli altri e reagire alle loro azioni.",
  "Le dinamiche sociali sono piÃ¹ importanti dellâ€™ambientazione o della storia.",
  "Senza altri giocatori, il gioco perde gran parte del suo fascino.",

  "Mi piace avere obiettivi chiari da raggiungere.",
  "Sono motivato dai risultati, dalle vittorie o dal completamento.",
  "Preferisco agire piuttosto che osservare.",
  "Mi piace conquistare o portare a termine qualcosa nel gioco.",

  "Mi piace esplorare anche senza un obiettivo preciso.",
  "Sperimento cose nuove anche se non sono efficienti.",
  "Lâ€™esperienza conta piÃ¹ del risultato finale.",
  "Mi piace provare approcci e strategie diverse."
];

// ===============================
// ICONE LIVELLI
// ===============================
const levelIcons = [
  "<img src='img/1x/Risorsa 1.png'>",
  "<img src='img/1x/Risorsa 2.png'>",
  "<img src='img/1x/Risorsa 3.png'>",
  "<img src='img/1x/Risorsa 4.png'>",
  "<img src='img/1x/Risorsa 5.png'>",
  "<img src='img/1x/Risorsa 6.png'>",
  "<img src='img/1x/Risorsa 7.png'>"
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
  levelIcons.forEach((icon, i) => {
    levelsHTML += `
      <span class="level ${i === 3 ? "selected" : ""}"
            data-question="${qIndex}"
            data-value="${i + 1}">
        ${icon}
      </span>`;
  });

  div.innerHTML = `
    <label>${text}</label>
    <div class="scale">
      <span class="scale-text left">Completamente d'accordo</span>
      <div class="levels">${levelsHTML}</div>
      <span class="scale-text right">Completamente in disaccordo</span>
    </div>
  `;

  container.appendChild(div);
});

// ===============================
// CLICK LIVELLI
// ===============================
document.querySelectorAll(".level").forEach(level => {
  level.addEventListener("click", () => {
    const q = level.dataset.question;
    const val = parseInt(level.dataset.value);
    answers[q] = val;

    document
      .querySelectorAll(`.level[data-question="${q}"]`)
      .forEach(l => l.classList.remove("selected"));

    level.classList.add("selected");
  });
});

// ===============================
// ICONE PROFILI
// ===============================
const icons = {
  "Stratega": "ðŸ§ ",
  "Guerriero": "âš”ï¸",
  "Cartografo": "ðŸ§­",
  "Inventore": "ðŸ§ª",
  "Curatore": "â¤ï¸",
  "Araldo": "ðŸ“£",
  "Cacciatore": "ðŸ¹",
  "Condottiero": "ðŸ”¥"
};

// ===============================
// DESCRIZIONI
// ===============================
const descriptions = {
  "Stratega": "Analitico e metodico, pianifichi ogni mossa sfruttando informazioni nascoste.",
  "Guerriero": "Determinato e diretto, affronti le sfide puntando alla vittoria.",
  "Cartografo": "Esploratore paziente, scopri il mondo di gioco senza fretta.",
  "Inventore": "Sperimentatore creativo, provi soluzioni nuove e imprevedibili.",
  "Curatore": "Supportivo ed empatico, tieni unito e vivo il gruppo.",
  "Araldo": "Leader carismatico, guidi e motivi gli altri allâ€™azione.",
  "Cacciatore": "Osservatore letale, studi il bersaglio prima di colpire.",
  "Condottiero": "Dominante e aggressivo, imponi il tuo controllo sugli altri."
};

// ===============================
// ABILITÃ€
// ===============================
const abilities = {
  "Stratega": { ability: "Visione dei Dati Segreti", effect: "Vedi informazioni e statistiche nascoste." },
  "Guerriero": { ability: "Segugio", effect: "Tracci e insegui un obiettivo prioritario." },
  "Cartografo": { ability: "Mappa Estesa", effect: "Riveli aree e percorsi segreti." },
  "Inventore": { ability: "Effetti Variabili", effect: "Ogni azione ha effetti imprevedibili." },
  "Curatore": { ability: "Vita Extra", effect: "Concedi una seconda possibilitÃ  a un alleato." },
  "Araldo": { ability: "Ispirazione", effect: "Fornisci bonus temporanei al gruppo." },
  "Cacciatore": { ability: "Bussola", effect: "Individui la direzione dei bersagli." },
  "Condottiero": { ability: "Intimidazione", effect: "Indebolisci gli avversari vicini." }
};

// ===============================
// SUBMIT + LOGICA COMPLETA
// ===============================
document.getElementById("testForm").addEventListener("submit", e => {
  e.preventDefault();

  const world = answers.slice(0, 4).reduce((a, b) => a + b, 0);
  const people = answers.slice(4, 8).reduce((a, b) => a + b, 0);
  const action = answers.slice(8, 12).reduce((a, b) => a + b, 0);
  const interact = answers.slice(12, 16).reduce((a, b) => a + b, 0);

  let profile = "";

  // Dominanze forti
  if (action >= world && action >= people && action >= interact && action >= 20) {
    profile = "Tiranno";
  }
  else if (world >= people && world >= action && world >= interact && world >= 20) {
    profile = "Stratega";
  }

  // Esplorazione
  else if (interact > action && world > people) {
    profile = "Cartografo";
  }
  else if (interact > action && people == world) {
    profile = "Inventore";
  }

  // SocialitÃ 
  else if (people > world && interact == action) {
    profile = "Curatore";
  }
  else if (people > world && action > interact) {
    profile = "Araldo";
  }

  // Azione
  else if (action >= interact && world == people) {
    profile = "Guerriero";
  }
  else {
    profile = "Cacciatore";
  }

  const resultDiv = document.getElementById("result");
  document.querySelector(".quiz-container").style.display = "none";

  resultDiv.style.display = "flex";
  resultDiv.style.flexDirection = "column";
  resultDiv.style.justifyContent = "center";
  resultDiv.style.alignItems = "center";
  resultDiv.style.minHeight = "60vh";
  resultDiv.style.padding = "40px";
  resultDiv.style.borderRadius = "12px";

  const ability = abilities[profile];

resultDiv.innerHTML = `
  <h2 style="font-family: chunko; font-size:50px; text-transform: uppercase; letter-spacing: 2px;">
    ${icons[profile]} ${profile}
  </h2>
  <p style="font-size:26px; text-align:center; max-width:640px;">
    ${descriptions[profile]}
  </p>
  <div style="margin-top:25px; padding:25px; border-radius:12px; background:rgba(0,0,0,.3)">
    <h3 style="font-family: chunko; font-size:34px; text-transform: uppercase; letter-spacing: 1.5px;">
      â­ ${ability.ability}
    </h3>
    <p style="font-size:22px">${ability.effect}</p>
  </div>
`;

});