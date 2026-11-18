# Codex reviewer instructions

Codex is the reviewer in this repository. Claude owns implementation and the
delivery workflow. Read [CLAUDE.md](CLAUDE.md) first; it is the primary source of
project rules. Read [README.md](README.md) for the product and deployment model.
Keep this file focused on reviewing, rather than duplicating those documents.

## Role and scope

- Default to review only. Report problems and suggested fixes to the user;
  leave implementation to Claude unless the user explicitly asks otherwise.
  CLAUDE.md's "Carry work through" workflow does not turn a review request into
  authorization to edit code, commit, push, merge, deploy, or post GitHub comments.
- The user may authorize maintaining this reviewer guide separately from code.
  Preserve other agents' uncommitted work. Never reset, stash, switch branches,
  or clean the shared checkout to make a review easier. Put experiments and
  destructive validation in a temporary copy.
- For a handoff, follow the scope, questions, and report format supplied by
  Claude. The convention is in
  [.claude/skills/codex-review/SKILL.md](.claude/skills/codex-review/SKILL.md).
  A reviewer does not need to generate another review handoff to itself.

## Establish the evidence

- Record the branch, commit, working-tree status, and intended base before
  drawing conclusions. For a branch review, use `git diff <base>...<branch>`;
  inspect staged, unstaged, and relevant untracked files separately when they
  are in scope. A branch diff does not include uncommitted work.
- Read the relevant implementation, its callers, and checks, not just the diff.
  Compare a suspected regression with the base. For a repository-wide audit,
  label existing defects separately from regressions in a change.
- Use the handoff and available epic or PR requirements to establish intended
  behavior. During a migration, CLAUDE.md's map may describe the base; trace the
  reviewed code and distinguish a planned behavior change from a defect.
- Reproduce concrete failure scenarios where practical. Keep uncertain claims
  out of confirmed findings; state what evidence would resolve them. If the
  shared files change during review, recheck affected conclusions and identify
  the snapshot that was actually validated.

## Review priorities for this site

- **Season consistency:** trace menu data through the home page, `/holidays/`,
  menu pages, and order-page links. Check featured-menu selection, individual
  and whole-menu sold-out states, prices, badges, copy, and inquiry buttons
  against the intended season rules. Include the between-seasons case and
  year-round menus. Use the season model present in the reviewed branch.
- **Dates on a static site:** separate build-time output from browser updates.
  Check deadline boundaries, time zones, an old build viewed after its deadline,
  and a tab left open across the boundary. Verify what is actually rendered or
  hidden, and describe any JavaScript dependency accurately.
- **Inquiry flow:** follow item IDs and data from `MenuGrid` through
  `src/scripts/inquiry-store.ts`, badges, `/order/`, and `/thank-you/`. Look for
  lost selections, quantity or summary errors, unsafe rendering of stored data,
  and incorrect clearing or redirect behavior. This is an inquiry, not a
  checkout. Intercept form submissions in browser tests so tests do not send
  real inquiries or contact the owner.
- **Production output:** check route preservation, links, fragments, asset paths,
  and exact filename case, including `.JPG`. Windows file existence alone does
  not establish that a path works on GitHub Pages. For configuration changes,
  trace the build and deploy workflows, custom domain, and browser targets.
- Apply CLAUDE.md's privacy rules to findings, examples, and artifacts too. Its
  known leftovers and planned phases are not findings by themselves. Avoid CSS
  cleanup and unrelated refactors; never run `npm run optimize-images`.

## Validation

- Use the Node version in `.nvmrc` and the existing lockfile. Install dependencies
  with `npm ci` in an isolated review copy when needed; do not rewrite the
  lockfile to accommodate the review machine. On Windows PowerShell, use
  `npm.cmd` if execution policy blocks `npm.ps1`.
- Run `npm run check` for validation: it checks Astro types, builds the site
  (including configured data checks), and checks built internal references.
  Record toolchain differences, failures, and skipped checks honestly. A green
  build does not establish browser interactions or external form delivery.
- When pages can change, follow CLAUDE.md's screenshot requirement: capture the
  base and reviewed version at 390px and 1280px, then compare with
  `npm run shots:compare -- <base-label> <review-label>`. Use isolated copies
  and distinct labels so existing screenshots are preserved. Account for clock
  and browser differences, inspect mismatches, and add focused interaction
  checks when the affected behavior needs them.
- Keep validation proportional to the change. Do not add a test framework or
  permanent test files just to perform a review.

## Report

For a completed change review, give a one-line verdict: **merge as is**, **merge
after fixes**, or **needs rework**. Then list actionable findings by severity
(`blocker`, `should-fix`, `nit`; at most five nits). Each finding needs the branch
or snapshot, a precise `path:line`, the problem, a concrete failure scenario,
evidence (`ran it` or `traced the code`), and a brief suggested fix. Use clickable
file links when reporting local files.

Finish with concise **Checked and fine** and **Couldn't check** lists. Say when
there are no actionable findings; do not invent nits or imply unperformed checks
passed. A limited review should have an explicitly limited verdict.
