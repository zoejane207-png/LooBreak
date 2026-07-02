# Brag Plan: LooBreak

## What is this app?
LooBreak is a daily trivia quiz app built to be played during your bathroom break — 10 questions, a daily leaderboard, an icebreaker drawer, and a "Loo Tip of the Day" footer that literally flushes away when you tap it.

## The angle
Play it completely straight as a real daily-habit product (like Wordle), but let the bathroom framing and the actual flush micro-interaction be the punchline. The joke writes itself from the product — we don't need to oversell it. Center the video on the real user flow: open app → answer questions → get roasted by your score → check the leaderboard → catch the footer's tip literally swirl down the drain.

## Hook (first 2-3 seconds)
A single line on the app's warm off-white background: "Got 5 minutes on the loo?" — then the LooBreak logo and plunger icon snap in. Immediate, specific, no generic app-launch language.

## Key moments (the middle)
- The quiz question card (numbered icon + question text) with four answer buttons — one tapped, flashing teal-ring selected, then submit reveals green "✓ Correct" / red "✗ Incorrect" states exactly as the real QuizPage does.
- The Results card: giant score ("7/10") in accent orange, with one of the app's real deadpan roast lines ("You've clearly been paying attention.").
- The Leaderboard's medal podium (gold/silver/bronze rows) — real product visual, not a mockup.

## Outro / punchline
The footer's "Loo Tip of the Day" banner appears, the flush button is tapped, and the tip visibly spins/shrinks away (the app's real `lootipFlushDown` animation) before the LooBreak logo lands center-screen with the tagline. The flush *is* the logo sting.

## User flow worth showing
1. **Entry:** Home screen — "Welcome to LooBreak!" headline, Take the Quiz button, mini leaderboard preview.
2. **Key action:** Quiz flow — a question renders, an answer is tapped and submitted, correct/incorrect colors resolve.
3. **Result:** Score reveal with roast message, then a cut to the full leaderboard podium.

## Tone
- Preset: `default`
- Creative direction: played straight as a real daily-habit product; let the toilet-flush micro-interaction be the visual punchline instead of writing jokes on top of it.
- Interpretation: warm, clean, mixed-case type; comfortable 3-5s scene holds; crossfade/slide transitions; humor comes from showing the product's own gag (the flush animation), not from exaggerated editing.

## Format: landscape — 1920x1080
## Duration: 19.5s target

## Visual identity (from the project)
- Background: `#FAFAF9` (warm off-white, light mode) / `#0F1513` (teal-tinted dark) — use light mode as the primary video background
- Accent: `#F97316` (orange-500) for score/highlight moments; teal `#0D9488` (primary) for buttons and CTAs
- Text: `#1C1917` (near-black warm)
- Display font: Fredoka (rounded, playful — headings)
- Body font: Inter
- Strongest visual element: the footer's flush animation (`lootipFlushDown`/`lootipFlushUp` keyframes — 720° spin + scale + fade) on the navy `#0D3B66` banner with a yellow `#F4D35E` top border

## Share copy (draft)
"Made a Wordle for the bathroom. 10 daily trivia questions, a leaderboard, and a tip of the day you can literally flush away. 🚽🧠 LooBreak."

## Audio direction
- Role: warm, bright music bed with a handful of motion-matched SFX
- Music: `happy-beats-business-moves-vol-1-by-ende-dot-app.mp3` (120.19 BPM, most energetic — fits `default`)
- Music treatment: starts at 0 under the hook, volume 0.32, gentle build feel already baked into the track; short fade-out under the final logo hold
- Music cue guidance: preset read from `happy-beats-business-moves-vol-1-by-ende-dot-app.music-cues.md`. Strong cues at 16.02s/17.02s/17.52s/18.02s/18.52s fall inside the outro scene — target the flush-tap SFX near 17.02s and the logo landing near 18.52s. Beat grid from 3.02s (≈scene 1→2 transition) through the quiz scene (6.03-11s) available for minor entrance alignment (±0.10s), not required.
- Audio-reactive treatment: subtle; let the logo/card presence breathe slightly with RMS on the outro hold only. No waveform/equalizer visuals.
- SFX posture: moderate, 3-5 cues, tone `default` energy
- Audio-coupled moments:
  - Hook line: soft drop-in sound as logo/plunger snap in
  - Quiz: `interface/click_*` on the simulated answer tap, `impact/impactSoft_medium_*` or a light positive tone on the "✓ Correct" reveal
  - Results: `interface/bong_001` or `impact/impactBell_heavy_000` as the score number lands
  - Outro: a card-fanning/whoosh-style sound (from `casino/card-slide-*` or `interface/drop_*`, whichever best matches the flush spin) synced to the flush tap, near the 17.02s strong cue
- Restraint rule: never let SFX outnumber or overpower the real UI sounds being depicted (clicks/taps should feel like the actual app, not a hype reel)

## Storyboard

### Scene 1 — Hook — 2.5s
Warm off-white background. "Got 5 minutes on the loo?" in Fredoka, dark near-black text, centered. The LooBreak logo and plunger icon (`loobreak-plunger.svg`) snap in beneath it.
Sequential/interaction: none
Audio intent: sets a playful, confident opening beat
Audio-coupled idea: soft drop sound as the logo/plunger snap in
Music: upbeat bed starting at 0
Transition mood: clean → Scene 2

### Scene 2 — Reveal (Home) — 3.5s
Recreate the real HomePage: "Welcome to LooBreak!" headline, teal "Take the Quiz" button, and the mini leaderboard (top 3 players) sliding into view beneath it.
Sequential/interaction: yes — the mini leaderboard's 3 rows arrive one by one
Audio intent: friendly, inviting — this is the product's front door
Audio-coupled idea: light card-place sound on each of the 3 leaderboard rows (accent the first and last)
Transition mood: clean slide → Scene 3

### Scene 3 — Quiz flow — 5s
Recreate the real QuizPage question card: numbered question icon, question text, four answer buttons. Simulate a tap on one answer (teal ring highlight), then Submit — the tapped answer resolves to the real green "✓ Correct" / red "✗ Incorrect" button states exactly as `getButtonStyle` renders them.
Sequential/interaction: yes — simulate cursor tap on an answer, then a tap on Submit
Audio intent: focused, satisfying resolution on the correct/incorrect reveal
Audio-coupled idea: `interface/click` on the answer tap; a short positive tone when "✓ Correct" resolves
Transition mood: clean → Scene 4

### Scene 4 — Results — 3.5s
Recreate the Results card: "Game Over!" header, giant "7/10" in accent orange, and one real roast line ("You've clearly been paying attention.") in muted italic beneath it.
Sequential/interaction: none (single settled card, held long enough to read both lines)
Audio intent: a clean, earned payoff — not oversized
Audio-coupled idea: soft bell/positive tone as the score number lands
Transition mood: crossfade → Scene 5

### Scene 5 — Leaderboard + flush outro — 5s
Quick beat on the Leaderboard's medal podium (gold/silver/bronze rows), then cut to the footer's "Loo Tip of the Day" banner. The flush button is tapped and the tip visibly spins/shrinks away using the real `lootipFlushDown` motion (720° rotate, scale to 0.15, fade). As it clears, the LooBreak logo and tagline land center-screen.
Sequential/interaction: yes — simulate a tap on the flush button, triggering the real flush-away animation
Audio intent: the punchline beat — satisfying "swirl away" whoosh into a confident logo landing
Audio-coupled idea: whoosh/card-slide sound synced to the flush spin (target ~17.02s strong cue), then the logo lands near the 18.52s strong cue
Transition mood: soft crossfade into podium, hard-ish cut into the flush punchline

**Music mood for this video:** upbeat, bright, playful (vol-1, 120 BPM)
**Audio summary:** A warm upbeat bed carries the whole video at low-moderate volume; a handful of UI-matched SFX (tap, correct-answer chime, score bell) track the real interactions, and the outro's flush whoosh + logo land are nudged toward the track's strongest beats around 17-18.5s before a short fade-out.
