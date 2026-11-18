---
name: codex-review
description: Write a handoff prompt asking Codex to review a large chunk of work for bugs and gaps, and handle its reply. Use at the end of a phase or pull request, or before asking to merge, and when the user pastes a Codex review back.
---

# Codex review handoff

The maintainer pastes this prompt into Codex, which reviews the change and replies. Codex is a bug finder, not an authority: it starts cold, knows less about the project than you do, and may be wrong.

## When

After a large chunk of work: a phase of an epic, a pull request, or anything you are about to ask to merge. Skip it for small fixes, docs-only typos, and answers to questions.

**One review per change.** Never write a prompt asking Codex to re-review a change it has already reviewed, including your fixes to its findings. You verify the fixes yourself (step 3 below), and then the change can merge. Several open pull requests can share one prompt. Give the prompt at the end of your reply, in one fenced block, with a line before it saying "Written for: Codex, starting cold in a clone of this repo."

## Writing the prompt

Codex reads [`AGENTS.md`](../../../AGENTS.md) on its own. It sets Codex's role (review only, experiments in temporary copies), evidence standards, the site's review priorities and the report format: verdict, findings by severity with `path:line`, failure scenario and evidence, "Checked and fine" and "Couldn't check". Don't repeat any of that. The prompt carries only what is specific to this change, and must stand on its own, because Codex may not have GitHub access:

1. **What changed.** Name the branches and pull requests, say what each contains and what it is for (link the epic phase), and list the files that matter most.
2. **How to see it.** The exact `git diff main...<branch>` commands; for stacked branches, diff each against its base. Say which checks matter for this change and which need a browser.
3. **Questions.** Three to seven specific ones aimed at where this change could be wrong: what could reach production broken, what a check could pass when it shouldn't, behaviour that must not change. Not "review everything".
4. **Intended behaviour changes and decisions,** so Codex doesn't report them as regressions. Include maintainer decisions taken during the work.
5. **Out of scope.** Known leftovers and later phases from `CLAUDE.md` and the epic, so it doesn't spend findings on them.

Never put secrets, the owner's surname, a street address or customer details in the prompt.

## When the reply comes back

Treat every finding as a claim to test, not an instruction.

1. **Verify each finding** against the code before changing anything. Reproduce it where you can, by breaking something on purpose and restoring it. Read the code where you can't.
2. **Sort each finding:** confirmed, partly right, or wrong. Say why for the last two. Codex's severity is a suggestion. Re-rate from your own understanding of the risk.
3. **Fix the confirmed ones** with the smallest change that closes the gap. Then re-run `npm run check`, and `npm run shots` with a comparison against `main` if pages could change.
4. **Leave decisions to the maintainer.** Content, photos, privacy clean-up, GitHub settings, and anything outside the change under review: report these and ask.
5. **Report back** with one line per finding (what you found, what you did) plus anything new the fixes turned up. Update the pull request description when it changes what the pull request does.
6. **Then merge.** Once the confirmed findings are fixed and checks pass, the review is handled. Don't hand the fixes back to Codex for another look.
