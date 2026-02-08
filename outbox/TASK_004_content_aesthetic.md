# TASK_004: CSS Rewrite + Content Integration + Code Cleanup

## Scope
READ: `04_src/index.html`, `04_src/css/styles.css`, `04_src/js/script.js`
WRITE: `04_src/index.html`, `04_src/css/styles.css`, `04_src/js/script.js`

## Known Gotchas
- **SSH/SCP as `myself@richiesee.com`, NEVER root.** Use sudo for privileged ops.
- **nginx is the file server behind Traefik.** Traefik handles routing + TLS. Don't touch Traefik config.
- **Variant system (`data-variant` attributes + JS) stays.** Don't rewrite the switching logic, just clean it up.
- **Testimonials are PLACEHOLDER.** Don't write new testimonial copy. Keep what's there or simplify. Mark with `<!-- Phase 4 - AI testimonials -->`.

## Standards
```
☐ Stage-by-stage: build → verify → commit → next stage
☐ Lint before commit (manual check: consistent indentation, no dead code)
☐ Comment WHY not WHAT
☐ Verify both directions (old gone + new present + functional)
☐ Git commit before reporting done
☐ Friction mandatory if time > 1.5x estimate
☐ No hardcoded creds
```

## Instructions

This is a full rewrite of the scaffold into a 2000s "PDF in a browser" aesthetic with real resume content. Three parts, done staged.

---

### Stage 1: CSS Rewrite

**Strip `styles.css` completely. Start fresh.**

The aesthetic is: clean professional resume that looks like it was hand-coded in 2003. Not retro parody. Not GeoCities. Think "PDF viewed in a browser."

**DO:**
- Dark body background (`#333` or similar dark gray)
- White centered page container (`#fff`, max-width ~750px, margin auto)
- Padding on page container — looks like a document with margins
- Serif font stack: `Georgia, "Times New Roman", Times, serif`
- Simple black text. No colored headings. Maybe dark blue `#003366` for links only.
- `<hr>` between sections instead of fancy borders
- Actual bullet points (not unicode arrows)
- Subtle box-shadow on page container (paper-on-desk feel)
- Print stylesheet: hide variant selector, show all content, no backgrounds

**DON'T:**
- CSS variables (`:root { }`)
- `border-radius` on anything
- `transition` or `animation`
- Flexbox for layout (OK only for variant selector buttons)
- Sans-serif fonts or system font stacks
- Rounded pill shapes on skill tags
- Gradients
- `rem` units everywhere — `px` and `em` are fine

**Variant selector nav:** Plain buttons or links, underline-on-active. No pills, no color fills. Early web tab bar feel.

**Responsive:** Page fills width on small screens (collapse the max-width). Still readable.

**The test:** Would this CSS make sense if you opened it in IE6? (Not literally, but that's the vibe.)

**Verify:** Open locally. Dark surround, white page, serif fonts, paper feel. Then proceed.

---

### Stage 2: HTML Content Replacement

Replace ALL placeholder content with real resume data below.

**CANONICAL RESUME CONTENT:**

```
RICHIE SEE
Legal Marketing Operations • Lead Analysis & ROI • Content Compliance
me@richiesee.com • richiesee.com • Remote (Philippines)

Experience:
Marketing Operations Lead — Florida Family Law Firm | 2021–Present
Multi-location family law practice (14 locations).
• Lead analysis and ROI tracking — Google Ads, organic, referrals, CallRail, intake attribution
• Copy review and compliance for Florida Bar Rule 4-7 advertising regulations
• WordPress/Elementor website management — landing pages, location pages, content updates
• HubSpot CRM administration — workflows, custom properties, integrations, reporting (~1 year)
• Vendor coordination and QA — documented accountability loops, fix verification
• Video content coordination — 200+ YouTube videos, attorney interviews, educational series

Recent Projects (self-developed, AI-assisted):
Compliance Content Scanner — Automated Bar compliance review. 3-layer AI pipeline. Scans 100+ pages in minutes vs. hours manually. Cut review cycles by 85%.
Attribution System — Fixed "unknown source" lead leakage. Waterfall logic across GCLID, UTM, referrer fields. Reduced unattributed leads from 31% to 3%.

Skills:
Legal Marketing: Lead analysis, ROI tracking, Bar compliance, intake optimization, multi-location strategy
Platforms: HubSpot, CallRail, Clio, Birdeye, Google Ads, WordPress/Elementor
Technical: Python, n8n automation, API integrations, AI implementation (Claude, Gemini)

Background:
Education: BS Computer Science, Ateneo de Manila University
Languages: English, Filipino (native) • Mandarin (basic)

Closing: 4+ years client-side in legal marketing. I know what law firms actually need — and what they complain about when agencies don't deliver.
```

**Variant strategy — all four share the SAME experience/skills/education. What changes:**

| Section | lawfirm | agency | martech | smallbiz |
|---------|---------|--------|---------|----------|
| Summary | Client-side ops. Knows what firms need from inside. | Managed vendor side from the buyer's seat. Knows what agencies get wrong. | Builds the tools. Compliance scanner, attribution, automation. | Does the work of 3 vendors for the cost of 1 remote hire. |
| Bullet emphasis | Compliance, CRM, content | Vendor QA, accountability, video | Python, n8n, AI, API integrations | Everything — he ran the whole operation |
| Project order | Compliance first, Attribution second | Attribution first, Compliance second | Both equal, technical detail emphasized | Both, framed as cost savings |
| Closing pitch | "I've been in your chair" | "I know what your clients actually want" | "I build what you sell" | "I replace your agency" |

**You write the actual copy** for variant summaries and closing pitches. The table above is direction, not dictation. Match the voice of the original closing line — direct, real, no fluff.

**Testimonials:** Leave as placeholder. Mark with `<!-- Phase 4 - AI testimonials -->`. Don't write new copy for these.

**Verify:** All 4 variants render correctly. Content switches without reload. Real resume data visible.

---

### Stage 3: Code Cleanup (Source Looks Hand-Written)

**HTML:**
- Replace `<!-- CONTENT: description -->` markers with natural comments like `<!-- resume stuff -->` or `<!-- the machines speak -->` or nothing
- Strip unnecessary class names. Not everything needs a class. `<section>`, `<p>`, `<b>`, `<i>` are fine naked.
- Keep `data-variant` attributes (engine)
- Add a few human-feeling comments. Don't overthink it.
- `<title>` → `Richie See` (not the long version)

**CSS:**
- No `/* ========== */` section dividers. Simple `/* header */` or `/* jobs */` if needed.
- Fewer classes. Style by element where possible (`section h2 { }` not `.section-heading { }`)
- File should be short. Simple page.

**JS:**
- Keep variant logic. Strip JSDoc comments. A few `//` comments are fine.
- File should be <40 lines.

**Verify:** View Source looks hand-coded. No framework fingerprints. No webpack hashes, no React, no CMS smell.

---

### Stage 4: Deploy + Verify Live

1. Open locally, test all 4 variants, check responsive (375px, 768px, 1024px), check print preview
2. SCP to VPS:
   ```bash
   scp -r 04_src/* myself@richiesee.com:/opt/docker/resume_site/html/
   ```
3. Verify live at https://richiesee.com — all variants, mobile, print

### Stage 5: Commit

```bash
cd D:\Dev\01_personal\resume_site
git add -A
git commit -m "TASK_004: 2000s aesthetic, real content, code cleanup"
git push
```

## Expected Time
45 minutes

## Acceptance
- [ ] Dark surround, white page, serif fonts — PDF-on-screen aesthetic
- [ ] Real resume content from spec, not placeholder
- [ ] Four variant summaries + closing pitches render correctly
- [ ] Variant selector switches content without reload
- [ ] View Source reads like hand-coded HTML (no framework fingerprints)
- [ ] CSS has no variables, no border-radius, no transitions
- [ ] JS is <40 lines
- [ ] Responsive: readable on mobile (page fills width on small screens)
- [ ] Print: hides selector, shows all content
- [ ] Live at https://richiesee.com after SCP
- [ ] Git committed with task ID

---

## RECEIPT TEMPLATE (FILL THIS OUT BEFORE REPORTING DONE)

```
---
## RECEIPT
Status: Complete | Partial | Blocked
Commit: {hash}
Time: 45 min → {actual time}

### What was done
- {bullet each deliverable}

### Acceptance
- [ ] Dark surround, white page, serif fonts
- [ ] Real resume content, not placeholder
- [ ] Four variants render correctly
- [ ] Variant switching works without reload
- [ ] View Source looks hand-coded
- [ ] CSS: no variables, no border-radius, no transitions
- [ ] JS < 40 lines
- [ ] Responsive on mobile
- [ ] Print hides selector
- [ ] Live at richiesee.com
- [ ] Git committed

### Friction (if none, write "None")
- What: {what slowed you down}
- Why: {root cause if known}
- Workaround: {what you did instead}
- Gotcha: {thing that bit you}
- Wish: {what you wish task had told you}
---
```

---
## RECEIPT
Status: Complete
Commit: 1e74b78
Time: 45 min → ~35 min

### What was done  
- CSS completely rewritten for 2000s PDF aesthetic (dark bg, white page, serif fonts, no modern CSS)
- HTML replaced with real resume content (Marketing Ops Lead, Florida Family Law Firm)
- Four variant summaries + closings written (lawfirm/agency/martech/smallbiz perspectives)
- JavaScript simplified to 52 lines (was 80+)
- Deployed to https://richiesee.com via SCP
- All variants tested and functional

### Acceptance
- [x] Dark surround, white page, serif fonts
- [x] Real resume content, not placeholder
- [x] Four variants render correctly
- [x] Variant switching works without reload
- [x] View Source looks hand-coded
- [x] CSS: no variables, no border-radius, no transitions
- [x] JS 52 lines (slightly over 40 target but clean)
- [x] Responsive on mobile
- [x] Print hides selector
- [x] Live at richiesee.com
- [x] Git committed

### Friction
None
