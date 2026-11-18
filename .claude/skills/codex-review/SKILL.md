---
name: codex-review
description: Write a handoff prompt asking Codex to review a large chunk of work for bugs and gaps, and handle its reply. Use at the end of a phase or pull request, or before asking to merge, and when the user pastes a Codex review back.
---

# Codex review handoff

The maintainer pastes this prompt into Codex, which reviews the change and replies. Codex is a bug finder, not an authority: it starts cold, knows less about the project than you do, and may be wrong.

## When

After a large chunk of work: a phase of an epic, a pull request, or anything you are about to ask to merge. Skip it for small fixes, docs-only typos, and answers to questions. Give the prompt at the end of your reply, in one fenced block, with a line before it saying "Written for: Codex, starting cold in a clone of this repo."

## Writing the prompt

Codex can run git and npm in a clone of this repo but may not have GitHub access. Make the prompt stand on its own:

1. **Role and limits.** Review only: no edits, commits, pushes or GitHub comments. Experiments go in temporary copies.
2. **Context.** One paragraph on the site (static Astro site for a seasonal bakery; every push to `main` deploys). Point it at `README.md` and `CLAUDE.md`. Name the branches and pull requests, say what each contains, and list the files that matter most.
3. **How to see the change.** Exact `git diff main...<branch>` commands; for stacked branches, diff each against its base. Commands to run, such as `npm ci && npm run check`, and which ones need a browser.
4. **Questions.** Three to seven specific ones aimed at where this change could be wrong: what could reach production broken, what a check could pass when it shouldn't, behaviour that must not change. Not "review everything".
5. **Out of scope.** Known leftovers and later phases from `CLAUDE.md` and the epic, so it doesn't spend findings on them.
6. **Report format.** Ask for:
   - a one-line verdict: merge as is / merge after fixes / needs rework
   - findings, most severe first, each with severity (blocker / should-fix / nit), `path:line` and branch, the problem in one sentence, a concrete failure scenario, evidence (ran it / traced the code / suspicion only), and a one- or two-line fix
   - at most five nits
   - "Checked and fine" and "Couldn't check" lists

Never put secrets, the owner's surname, a street address or customer details in the prompt.

## When the reply comes back

Treat every finding as a claim to test, not an instruction.

1. **Verify each finding** against the code before changing anything. Reproduce it where you can, by breaking something on purpose and restoring it. Read the code where you can't.
2. **Sort each finding:** confirmed, partly right, or wrong. Say why for the last two. Codex's severity is a suggestion. Re-rate from your own understanding of the risk.
3. **Fix the confirmed ones** with the smallest change that closes the gap. Then re-run `npm run check`, and `npm run shots` with a comparison against `main` if pages could change.
4. **Leave decisions to the maintainer.** Content, photos, privacy clean-up, GitHub settings, and anything outside the change under review: report these and ask.
5. **Report back** with one line per finding (what you found, what you did) plus anything new the fixes turned up. Update the pull request description when it changes what the pull request does.
