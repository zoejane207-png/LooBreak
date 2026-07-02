# Hyperframes Composition Brief: LooBreak

## Objective
Create a short launch-style brag video for LooBreak — a daily trivia quiz app designed to be played on your loo break.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: ~19.5 seconds (15-25s range)

## Source Material
- Project root: `/Users/christophercross/Desktop/MAKERS ACADEMY/Modules/JavaScript/Project3-week-12/LooBreak`
- Primary files read: `README.md`, `frontend/index.html`, `frontend/src/index.css`, `frontend/src/pages/Home/HomePage.jsx`, `frontend/src/pages/Quiz/QuizPage.jsx`, `frontend/src/components/Results.jsx`, `frontend/src/components/Leaderboard.jsx`, `frontend/src/components/Footer.jsx` + `Footer.module.css`, `frontend/src/components/ScoreBadge.jsx`
- Product name: LooBreak
- Tagline / strongest claim: "a daily trivia quiz app designed to be played on your loo break"
- Key UI or visual moment to recreate: the footer's "Loo Tip of the Day" banner and its real `lootipFlushDown`/`lootipFlushUp` flush animation (720° rotate + scale to 0.15 + fade, on a navy `#0D3B66` banner with a yellow `#F4D35E` top border)
- Copy that must appear verbatim:
  - "Welcome to LooBreak!"
  - "Take the Quiz"
  - "Game Over!"
  - "You've clearly been paying attention." (one of the real `Results.jsx` roast lines, for a score of 7)
  - "💡 Loo tip of the day:"

## Creative Direction
- Tone preset: default
- Creative direction: played straight as a real daily-habit product; the toilet-flush micro-interaction is the visual punchline, not exaggerated editing
- Interpretation: warm, clean, mixed-case type; comfortable 3-5s scene holds; crossfade/slide transitions; humor comes from showing the product's own gag
- Angle: LooBreak looks and behaves like a normal daily quiz habit app (Wordle-adjacent) until the footer's own flush animation reveals the bathroom framing was real the whole time.
- Hook: "Got 5 minutes on the loo?" on the warm off-white background, LooBreak logo + plunger icon snapping in beneath it.
- Outro / punchline: the Loo Tip banner's flush button is tapped, the tip spins away down the drain using the real animation, and the LooBreak logo + tagline land as it clears.
- Avoid:
  - Generic SaaS language ("streamline your workflow", etc.)
  - Abstract filler visuals — every scene must show real product UI or its real copy
  - Unrelated visual redesign — use the project's actual teal/orange palette and Fredoka/Inter fonts, not invented ones

## Visual Identity
- Background: `#FAFAF9` (warm off-white, light mode `--background`)
- Text: `#1C1917` (`--foreground`)
- Accent: `#F97316` (`--accent`, orange-500) for score/highlight moments; `#0D9488` (`--primary`, teal-600) for buttons/CTAs
- Display font: Fredoka (headings) — fallback to a rounded/geometric sans if unavailable
- Body font: Inter — fallback `system-ui`
- Visual references from the project:
  - Teal primary buttons with white text, `0.75rem` border radius
  - Score/answer states: success uses a blue-leaning teal (`--success: hsl(172 66% 50%)`), destructive/incorrect uses orange (`--destructive: hsl(24 95% 53%)`) — not red/green, this is intentional in the source app
  - Medal podium rows on the leaderboard: amber/slate/orange tinted backgrounds for 1st/2nd/3rd
  - Footer banner: navy `#0D3B66` background, white text, yellow `#F4D35E` top border, italic tip text

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 2.5s — "Got 5 minutes on the loo?" + logo/plunger icon snap in
2. Reveal (Home) — 3.5s — "Welcome to LooBreak!" headline, "Take the Quiz" button, mini leaderboard rows arriving one by one
3. Quiz flow — 5s — question card with numbered icon, simulated answer tap, submit resolves to real green ✓ / orange ✗ button states
4. Results — 3.5s — "Game Over!", "7/10" in orange, roast line "You've clearly been paying attention."
5. Leaderboard + flush outro — 5s — medal podium beat, then the Loo Tip banner's flush button tapped, tip spins away (real flush animation), LooBreak logo + tagline land

## Audio
- Audio role: warm upbeat bed with a handful of UI-matched SFX
- Audio arc: bed enters under the hook at moderate volume throughout, small motion-matched accents track the quiz tap/correct-reveal and the score reveal, then the outro's flush whoosh and logo landing are nudged toward the track's strongest beats before a short fade-out
- Music: `assets/music/happy-beats-business-moves-vol-1-by-ende-dot-app.mp3` (already copied into composition assets)
- Music treatment: start at 0, volume ~0.32, short fade-out under the final logo hold (last ~1s)
- Music cue guidance: bundled preset at `assets/music/cues/happy-beats-business-moves-vol-1-by-ende-dot-app.music-cues.json` (also `.md`). Tempo 120.19 BPM. Strong cues at 16.02s/17.02s/17.52s/18.02s/18.52s land inside the outro scene (14.5-19.5s) — target the flush-tap SFX near 17.02s and the logo landing near 18.52s (±0.15s). Beat grid from 3.02s onward is available for minor entrance alignment in scenes 2-3 (±0.10s) if useful, but not required.
- Audio-reactive treatment: subtle — let the outro logo/card presence breathe slightly with RMS on the final hold only. No waveform/equalizer visuals, no strobing.
- Audio-coupled moments:
  - Scene 1 (hook) — soft drop/pop sound as the logo + plunger snap in
  - Scene 2 (reveal) — light card-place sound on each of the 3 mini-leaderboard rows arriving (accent first and last row, not necessarily the middle one)
  - Scene 3 (quiz) — click/tap sound on the simulated answer selection; a short positive tone when the "✓ Correct" state resolves
  - Scene 4 (results) — soft bell/positive tone as the "7/10" score lands
  - Scene 5 (outro) — whoosh/swirl-style sound synced to the flush tap (target ~17.02s strong cue), then a confident landing sound as the logo settles (target ~18.52s strong cue)
- SFX selection guidance: match the real interaction being shown — tap sounds for the simulated answer/flush taps, a short announcement-style cue for the score payoff and logo landing. Keep the palette coherent (don't grab unrelated one-off sounds per scene).
- SFX analysis guidance: read `sfx-analysis.md`/`.json` next to the SFX library (see the hyperframes/brag audio reference) and prefer low/medium high-frequency-risk files since these are repeated, polished moments, not chaotic accents.
- Exact SFX choice: Hyperframes should choose filenames, timestamps, density, and volume based on the implemented animation.
- Audio files: music is already copied into `brag-output/composition/assets/music/` (with cue presets in `assets/music/cues/`). Hyperframes should copy any SFX it selects into `brag-output/composition/assets/sfx/`.

## Hyperframes Instructions
Use the current `hyperframes` skill and CLI workflow. Prefer native Hyperframes conventions over anything in `/brag`.

Requirements:
- Show at least one real UI, copy, or visual element from the source project (multiple scenes do — quiz card, results card, leaderboard, footer flush banner).
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds.
- Include the planned music/SFX layer — audio was not disabled by the user.
- Treat `/brag` audio notes as guidance, not a fixed cue sheet. Choose SFX after the visual animation exists.
- Treat music cue metadata as optional timing hints. Ignore cues that hurt readability, scene pacing, or the product story.
- Major reveals may move toward nearby strong cues within about 0.15s. Smaller entrances may align to nearby beat points within about 0.10s. Use only 1-3 strong cue locks in this 19.5s video.
- Use SFX to support motion and interaction: card sounds for the leaderboard row reveals, short announcement cues for the score/logo payoffs, click sounds for the simulated quiz tap and flush tap.
- Honor the planned music treatment: fade-out under the final logo hold.
- Consider the Hyperframes audio-reactive workflow for the subtle outro breathing effect described above. If extraction is unavailable, skip it and note why — do not block the render.
- Use local assets for audio and any required runtime/media dependencies when possible.
- Run Hyperframes lint and validate before render.
