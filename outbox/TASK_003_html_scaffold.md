# TASK_003: HTML/CSS Scaffold — Single-Page Resume Site

## Scope
WRITE: `04_src/index.html`
WRITE: `04_src/css/styles.css`
WRITE: `04_src/js/script.js`

## Known Gotchas
- This is a SCAFFOLD with placeholder content. Don't write real copy — mark placeholders with `<!-- CONTENT: description -->` comments.
- Variation switching is show/hide with vanilla JS. No framework, no page reload.
- Mobile-first CSS. Test at 375px width minimum.
- Print styles must hide nav/selector — people will print this as a PDF resume.
- Deploy step requires TASK_002 to be complete first (nginx serving on VPS).

## Standards
```
☐ Stage-by-stage: build → verify → commit → next stage
☐ Lint before commit (manual check if no linter: consistent indentation, no dead code)
☐ Comment WHY not WHAT
☐ Git commit before reporting done
☐ Friction mandatory if time > 1.5x estimate
```

## Instructions

### Stage 1: File structure
1. Create directories:
   ```
   04_src/css/
   04_src/js/
   ```
2. Create empty files: `index.html`, `css/styles.css`, `js/script.js`
3. Verify structure exists.

### Stage 2: HTML structure
Build `index.html` with semantic sections:
```
<header>  — Name, tagline, contact links
<nav>     — Resume variation selector
<main>
  <section id="summary">      — Professional summary (varies by selection)
  <section id="experience">   — Work experience (emphasis varies)
  <section id="skills">       — Skills grid
  <section id="projects">     — Project highlights (varies by selection)
  <section id="testimonials"> — AI testimonials (always visible)
</main>
<footer>  — Links, copyright, 🦛
```

**Variation system:**
- Four audience variants: `lawfirm`, `agency`, `martech`, `smallbiz`
- Default active: `lawfirm`
- Use `data-variant` attributes on content blocks to mark which variants show them
- Example: `<div data-variant="lawfirm,agency">` shows for law firm AND agency selections
- Blocks with no `data-variant` are always visible

**Nav selector:**
- Four clickable options (tabs, buttons, or pills — your design call)
- Labels should describe the audience, e.g. "Law Firm Hiring" / "Agency Side" / "Legal MarTech" / "Small Business"
- Active state styling

**Placeholder content:**
- Use realistic resume-shaped text, NOT lorem ipsum
- Summary: 2-3 sentences per variant about a marketing ops professional
- Experience: 3-4 job entries with bullet points
- Skills: grid of 8-12 skill tags
- Projects: 3-4 project cards with title + one-liner
- Testimonials: 3 cards with AI persona names (e.g. "Cl***e", "G*m*ni", "P*rpl*x") and placeholder quotes
- Mark ALL placeholder text: `<!-- CONTENT: what real content goes here -->`

Verify: opens in browser, all sections visible, no broken layout.

### Stage 3: CSS
Build `css/styles.css`:
- **Mobile-first** responsive (base = mobile, `@media (min-width: 768px)` for tablet+, `1024px` for desktop)
- Clean professional base: dark text (#1a1a1a), light background (#fafafa or similar)
- Subtle personality — not a corporate template, not a circus. Think "the resume of someone who'd put a hippo emoji in their footer"
- Typography: system font stack or one clean Google Font (Inter, Source Sans, etc.)
- Skills grid: flexbox or CSS grid, wrapping tags/pills
- Project cards: simple card layout
- Testimonial cards: slightly different styling (quotes, persona avatars optional)
- Nav selector: clear active state, hover states
- **Print styles:** `@media print` — hide nav, hide selector, clean single-column layout, no backgrounds

Verify: responsive at 375px, 768px, 1024px in Chrome DevTools.

### Stage 4: Variation JS
Build `js/script.js`:
- On page load: set `lawfirm` as active variant
- On nav click: update active variant, show/hide content blocks
- Logic:
  ```
  1. Get all elements with [data-variant]
  2. For each: if data-variant includes active selection → show, else → hide
  3. Elements WITHOUT data-variant → always visible
  ```
- Update nav active state styling
- No dependencies. Vanilla JS only.

Verify: clicking each variant changes visible content. No reload. Console has no errors.

### Stage 5: Local integration test
1. Open `index.html` in browser
2. Test all 4 variants — content switches correctly
3. Test responsive: 375px, 768px, 1024px
4. Test print preview: nav hidden, clean layout
5. Check console for JS errors

### Stage 6: Deploy
1. SCP files to VPS:
   ```bash
   scp -r 04_src/* myself@richiesee.com:/opt/docker/resume_site/html/
   ```
2. Verify live: https://richiesee.com shows the scaffold
3. Test variant switching on live site

### Stage 7: Commit
```bash
cd D:\Dev\01_personal\resume_site
git add -A
git commit -m "TASK_003: HTML/CSS scaffold with variant switching"
git push
```

## Expected Time
45 minutes

## Acceptance
- [ ] `index.html` renders locally in browser
- [ ] Variation selector switches content without reload
- [ ] Responsive: works at 375px mobile viewport
- [ ] Print styles hide nav/selector
- [ ] All placeholder content marked with `<!-- CONTENT: -->` comments
- [ ] Files SCP'd and live on richiesee.com
- [ ] Committed to repo with hash in receipt

## RECEIPT
Status: Complete
Commit: 8a5c7ab, aadf42b
Time: 45 min → (not reported by agent)

### Acceptance
- [x] `index.html` renders locally in browser
- [x] Variation selector switches content without reload
- [x] Responsive: works at 375px mobile viewport
- [x] Print styles hide nav/selector
- [x] All placeholder content marked with `<!-- CONTENT: -->` comments
- [x] Files SCP'd and live on richiesee.com
- [x] Committed to repo with hash in receipt

### Friction
Receipt format not followed (missing time, unchecked acceptance boxes). Same pattern as TASK_002 — count: 2.

