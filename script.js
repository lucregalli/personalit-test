// Domande in italiano
const questions = [
  "Mi piace comprendere a fondo le meccaniche di gioco.",
  "Mi piace perdermi nel mondo di gioco, nelle mappe e nei dettagli.",
  "Mi piacciono i giochi che funzionano bene anche se giocati da soli.",
  "Ottimizzare risorse, build o percorsi mi dà soddisfazione.",

  "Il gioco è più divertente quando interagisco con altri giocatori.",
  "Mi piace osservare come giocano gli altri e reagire alle loro azioni.",
  "Le dinamiche sociali sono più importanti dell’ambientazione o della storia.",
  "Senza altri giocatori, il gioco perde gran parte del suo fascino.",

  "Mi piace avere obiettivi chiari da raggiungere.",
  "Sono motivato dai risultati, dalle vittorie o dal completamento.",
  "Preferisco agire piuttosto che osservare.",
  "Mi piace conquistare o portare a termine qualcosa nel gioco.",

  "Mi piace esplorare anche senza un obiettivo preciso.",
  "Sperimento cose nuove anche se non sono efficienti.",
  "L’esperienza conta più del risultato finale.",
  "Mi piace provare approcci e strategie diverse."
];

// Livelli / icone (7 livelli)
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

// Genera le domande
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
      <span class="scale-text left">Completamente in disaccordo</span>
      <div class="levels">${levelsHTML}</div>
      <span class="scale-text right">Completamente d'accordo</span>
    </div>
  `;

  container.appendChild(div);
});

// Click sui livelli con scroll automatico per mobile
document.querySelectorAll(".level").forEach(level => {
  level.addEventListener("click", () => {
    const q = level.dataset.question;
    const val = parseInt(level.dataset.value);
    answers[q] = val;

    // rimuove selezione precedente
    document
      .querySelectorAll(`.level[data-question="${q}"]`)
      .forEach(l => l.classList.remove("selected"));

    // aggiunge selezione
    level.classList.add("selected");

    // scroll automatico alla prossima domanda su mobile
    if (window.innerWidth < 600) {
      const nextQ = document.querySelector(`.question:nth-child(${parseInt(q)+2})`);
      if (nextQ) {
        nextQ.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
});

// Submit
document.getElementById("testForm").addEventListener("submit", e => {
  e.preventDefault();

  const world = answers.slice(0,4).reduce((a,b)=>a+b,0);
  const people = answers.slice(4,8).reduce((a,b)=>a+b,0);
  const action = answers.slice(8,12).reduce((a,b)=>a+b,0);
  const interact = answers.slice(12,16).reduce((a,b)=>a+b,0);

  let profile = '';

  // Determinazione personalità
  if (world >= people && action >= interact) profile = "Achiever Ambizioso";
  else if (world >= people && interact > action) profile = "Explorer Sperimentale";
  else if (people > world && interact >= action) profile = "Socializer Gentile";
  else if (people > world && action > interact) profile = "Socializer Intraprendente";
  else if (action >= world && action >= people && action >= interact) profile = "Killer Dominante";
  else profile = "Achiever Metodico";

  const descriptions = {
    "Achiever Metodico": "Pianificatore e preciso, ami completare ogni sfida nel dettaglio.",
    "Achiever Ambizioso": "Cerchi risultati e vittorie, sei motivato dalle sfide.",
    "Explorer Contemplativo": "Ami scoprire e osservare il mondo di gioco senza fretta.",
    "Explorer Sperimentale": "Ti piace provare nuove strategie e approcci, anche rischiosi.",
    "Socializer Gentile": "Collabora e aiuta gli altri, ami l’interazione positiva.",
    "Socializer Intraprendente": "Guida gli altri, sei intraprendente e motivi il gruppo.",
    "Killer Tragico": "Competitivo ma riflessivo, ami dominare senza essere aggressivo.",
    "Killer Dominante": "Cerchi dominio e vittoria, vuoi essere al top in ogni sfida."
  };

  const icons = {
    "Achiever Metodico": "🏆",
    "Achiever Ambizioso": "🏅",
    "Explorer Contemplativo": "🧭",
    "Explorer Sperimentale": "🔬",
    "Socializer Gentile": "🤝",
    "Socializer Intraprendente": "💪",
    "Killer Tragico": "⚔️",
    "Killer Dominante": "🔥"
  };

  const resultDiv = document.getElementById("result");

  // Colori sfondo e testo
  let bgColor = '', textColor = '';
  if (profile.includes("Achiever")) {
    bgColor = "#B8860B";    // giallo scuro
    textColor = "#FFF8DC";  // chiaro
  } else if (profile.includes("Explorer")) {
    bgColor = "#2E8B57";    // verde scuro
    textColor = "#DFFFE0";  // verde chiaro
  } else if (profile.includes("Socializer")) {
    bgColor = "#1565C0";    // blu scuro
    textColor = "#CDE7FF";  // blu chiaro
  } else if (profile.includes("Killer")) {
    bgColor = "#8B0000";    // rosso scuro
    textColor = "#FFCCCC";  // rosa chiaro
  }

  // Nascondi quiz
  document.querySelector(".quiz-container").style.display = "none";

  // Mostra risultato al centro
  resultDiv.style.display = "flex";
  resultDiv.style.flexDirection = "column";
  resultDiv.style.justifyContent = "center";
  resultDiv.style.alignItems = "center";
  resultDiv.style.minHeight = "60vh";
  resultDiv.style.padding = "30px";
  resultDiv.style.borderRadius = "12px";
  resultDiv.style.fontFamily = "'Chunko', sans-serif";
  resultDiv.style.textAlign = "center";
  resultDiv.style.transition = "background-color 1s ease, color 1s ease";

  // Applica colori con transizione
  setTimeout(() => {
    resultDiv.style.backgroundColor = bgColor;
    resultDiv.style.color = textColor;
  }, 50);

  // Inserisci contenuto
  resultDiv.innerHTML = `
    <h2 style="font-size: 40px; margin-bottom: 20px;">${icons[profile]} ${profile}</h2>
    <p style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; text-align: center; max-width: 90%; line-height: 1.5;">
      ${descriptions[profile]}
    </p>
  `;

  // Scroll su risultato (utile su mobile)
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
