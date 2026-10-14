<div align="center">

# THE CONFIDENTIAL FILES

### CASE 001 — THE VANISHING HEIRESS

**Every secret leaves a trace.**

An original, interactive detective mystery set at a private estate in Johannesburg. Investigate a disappearance, interrogate suspects, inspect clues, connect evidence and present your final accusation.

[**Play the game ↗**](https://st10458151.github.io/the-confidential-files/) · [**Developer Portfolio**](https://st10458151.github.io/developer-portfolio/) · [**GitHub Profile**](https://github.com/ST10458151)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Hosting-GitHub_Pages-24292f?logo=github)

</div>

## The Premise

A wealthy heiress vanishes during a family gala at the Vale Estate. A champagne glass is shattered. Security cameras go dark for eleven minutes. Four people have something to hide.

You are Detective #0047, assigned to uncover the truth.

**One case. Four suspects. Seven pieces of evidence. Eight interview questions. Three critical connections. Multiple case outcomes.**

All characters, events, documents and evidence are **fictional**.

## Features

- Cinematic opening screen styled as a restricted case folder
- Dossiers for four suspects, including motives and alibis
- Seven interactive pieces of evidence with expanded examination notes
- Eight witness/suspect interrogation prompts with unlockable answers
- Evidence-board connections requiring the player to match clues to suspects
- Automatic detective notebook tracking discovered details
- Final accusation: choose the suspect, motive and key piece of evidence
- Different ending results based on the accuracy of your deductions
- Persistent progress saved locally in the same browser
- Replay/reset option and optional simple sound effects
- Responsive layout for desktop and mobile

## Technology

| Technology | Purpose |
|---|---|
| HTML5 | Semantic markup, interactive controls and detail dialog |
| CSS3 | Original dark-academia UI, faux manila folder and responsive styling |
| JavaScript | Game state, branching logic, validation and rendering |
| Structured game data | Original suspects, evidence and dialogue stored in a separate JS data file |
| localStorage | Browser-only saved game |
| GitHub Pages | Free static hosting |

## Run locally

```bash
git clone https://github.com/ST10458151/the-confidential-files.git
cd the-confidential-files
python3 -m http.server 8000
```

Visit **http://localhost:8000**.

You can also open `index.html` directly in a modern browser.

## GitHub Pages deployment

Go to **Settings → Pages → Build and deployment**, select **Deploy from a branch**, choose `main` and `/(root)`, then save.

Once deployment completes, the site should be available at:
https://st10458151.github.io/the-confidential-files/

## Gameplay instructions

1. Open the restricted case file.
2. Read the **Case Briefing**.
3. Review each suspect dossier.
4. Examine the **Evidence Locker** and reveal details.
5. Question suspects in **Interrogations**.
6. Match evidence with suspects on the **Evidence Board**.
7. Review the automatically updated **Detective's Notes**.
8. File the **Final Accusation** by selecting a suspect, motive and supporting evidence.

Evidence-board confirmations and your chosen explanation affect the outcome; careless guesses may close the case with an inconclusive result.

## Project structure

```text
the-confidential-files/
├── index.html    # Main layout, opening scene, game shell and modal
├── style.css     # Dark academia design and responsive interface
├── case-data.js  # Fictional suspects, evidence, interviews and solution
├── game.js       # Navigation, game state, rendering, evidence connections, verdict
└── README.md     # Documentation
```

## Programming concepts demonstrated

- Object and array manipulation
- State management and browser persistence
- Data-driven DOM rendering
- User input validation and conditional branching
- Interactive event handling
- Progressive disclosure of content
- Multiple outcome conditions
- Accessible dialogs and keyboard-operable controls
- Component-like separation between case data and game logic

## Privacy & limitations

This is a **single-player frontend portfolio game**. No account or backend exists, and no user data is sent to an application server. Local progress is not backed up and can be lost if browser storage is cleared.

The mystery solution is embedded in client-side source code by design; this is a replayable educational experience, not a tamper-proof competitive puzzle. The game is intended for entertainment.

---

Built by **Shakeelah Khan** · [Portfolio](https://st10458151.github.io/developer-portfolio/) · [LinkedIn](https://www.linkedin.com/in/shakeelah-k-867b13320/)
