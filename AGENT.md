# AGENT CONTEXT: resume_site

## WORKSPACE ISOLATION (LAW)

Your scope is THIS FOLDER ONLY: `D:\Dev\01_personal\resume_site\`

You CANNOT see:
- `D:\Dev\00_meta\` (ENGRAM system)
- Any other project folder
- Payload, sessions, or logs

If a task references external paths, it's WRONG. Flag it.

---

## Project

**What:** richiesee.com - Personal resume/portfolio site
**Vibe:** "Wouldn't it be funny if" energy. Playful. Filters for "our people."
**Stack:** Static HTML/CSS/JS (MVP). No framework bloat.

---

## Key Elements

- AI colleague testimonials (Cl***e, P*rpl*xity, G*m*ni, RTX 4090, etc.)
- The Watcher (North Korean guardrail persona)
- [i'm a...] dropdown (law firm / martech / agency / anthropic)
- Portrait phases (unemployed → employed → interview → linkedin)
- The Basement (post-</html> easter eggs)
- Fit assessment tool (tells people NOT to hire if bad fit)
- Ugly tools section

---

## Folder Structure

```
resume_site/
├── AGENT.md          ← you are here
├── inbox/            ← tasks from Orchi
├── outbox/           ← completed tasks
├── 04_src/           ← source code
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── assets/           ← images, etc.
```

---

## STANDARDS

Your task file includes a **STANDARDS** section with specific rules for that job. Follow them.

If your task file does NOT have a standards section, apply these minimums:
- Fix at source, not destination
- Lint before commit (or manual check if no linter)
- Stage-by-stage: build → verify → commit → next stage
- Test the spread — not just the happy path
- Log with levels (DEBUG/INFO/WARNING/ERROR)
- No hardcoded credentials
- Git commit before reporting done
- Friction mandatory if time > 1.5x estimate

---

## Agent Protocol

1. Read task from `inbox/`
2. Execute within scope — **staged, verified at each step**
3. Lint / verify before commit
4. Git commit + push with task ID
5. Append receipt to task file (with commit hash)
6. Move task to `outbox/`
7. Die

---

*Bi-lal kaifa.* 🦛
