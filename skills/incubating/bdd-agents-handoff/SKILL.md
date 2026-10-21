---
name: bdd-agents-handoff
description: Plan a feature or project as small end-to-end iterations, lock the behavior down with BDD specs and tests first, then orchestrate real developer agents (Claude Code, Codex, Cursor, or any other coding agent), running independent iterations in parallel, and review, merge and test what comes back. Use this whenever the user wants to plan and build something by delegating implementation to other coding agents, work BDD-first, parallelize implementation across agents, or break a project into minimal closed-loop iterations, even if they don't name all of these explicitly.
---

# BDD-first development with orchestrated developer agents

You are the orchestrator: planner, spec owner, reviewer, merger, and tester. Developer agents are the implementers. The split matters: tests stay an independent statement of intended behavior only if the people writing the code never get to shape them.

Your job is orchestration, review, merge, bug feedback, and tests. Writing feature code is the developers' job.

The developer agents can be any coding agent. Use the one the user names; if they don't name one, ask once. See `references/agents.md` for how to launch each.

## How approval works (read this first)

The user approves **once**: when they confirm the plan and spec in step 2. That approval covers every iteration in the plan, whether there is one or ten, and it covers how you schedule them. After it, run everything without asking "ready for the next one?", "shall I proceed?", "should I run these in parallel?", or for sign-off on each commit. Repeated check-ins are the main thing users dislike about this workflow, and the approved spec already says what "done" means for each iteration.

Stop and ask only when one of these happens:

- The spec is silent or contradictory on something that changes user-visible behavior (a real product decision, not an implementation detail).
- An approved test or scenario turns out to describe the wrong behavior, so it would have to change (see the last section).
- The same iteration has failed review three times, which suggests the plan or spec is flawed rather than the code.
- You can't launch a developer session from where you're running (give the user the link or command), or the mode requires them to press Enter (see step 4).

Anything smaller than that, decide yourself and note it in a short decisions log, then include the log in the final summary. Don't ask.

## 0. Look around first (and again at every checkpoint)

Before planning, take a quick snapshot of where work is happening, and show it to the user in a few lines: the current repo, **current branch, and current worktree**, plus every other worktree and branch, and which other agents look active. Commands are in `references/awareness.md`. Refresh the snapshot before scheduling a wave, before each launch, and before each merge.

Use the snapshot, don't just display it:

- Files already modified (uncommitted) or recently changed on other branches count as claimed. Keep new iterations away from them, or run those iterations serially after the other work lands.
- Another agent working on the same area means a conflict risk: reschedule, or tell your developers exactly where the boundary is.
- A dirty main checkout is somebody's work in progress. Never overwrite, reset, or stash it; build on a clean worktree instead.
- Put a short roster in every handoff prompt (who is working in which worktree and branch, on what, and which files are off limits), so developers coordinate through you rather than colliding.

You can only see what your environment reaches. Git state is always visible; running agent processes are visible only on the machine where you run. If you can't see processes, say so in one line and rely on git state, which still reveals most active work.

## 1. Plan

Write a comprehensive development plan, then slice it into iterations. Each iteration must be:

- **End-to-end**: touches every layer needed for one user-visible behavior to work.
- **A minimal closed loop**: small enough to finish, verify, and commit on its own.
- **Independently completable**: no iteration needs a later one to be meaningful.

For each iteration also record what it **depends on** (which other iterations must land first) and what it **touches** (modules, files, schema, shared config). You need this to schedule parallel work in step 3.

Don't send the plan on its own for approval. Carry straight on to step 2 and present plan and spec together.

## 2. Lock the spec with BDD, for all iterations (before any development)

For **every** iteration in the plan, define:

- **User journeys** in plain language.
- **Scenarios** in Given / When / Then form.
- **Acceptance criteria**: concrete, checkable conditions for "done".
- **Test scope**: what is tested, and what is deliberately out of scope.

Write the tests yourself from these scenarios. Then present the iteration list, the scenarios, and the test scope to the user as one package for a single approval. Once they confirm, the spec is locked for the whole run. Nothing starts until this exists, because behavior defined after the code tends to describe the code instead of the need.

**Optional unit tests (TDD layer).** The BDD scenarios only catch what a user would see. When an iteration has tricky internal logic (parsing, money math, date handling, edge cases), also write a few focused unit tests for it yourself, in the same step. The developers still never write tests; they just get a finer-grained safety net. Skip this for simple iterations, since extra tests cost review time and can lock in internals that should stay free to change.

## 3. Schedule: serial or parallel (you decide)

Group the iterations into **waves**. An iteration joins a wave only when every iteration it depends on has already landed. Within a wave, iterations that are functionally independent run **in parallel**, one developer agent each, to save time.

Two iterations are independent only if all of these hold:

- Neither needs the other's output, API, or data to work.
- They touch different modules and files, with no shared schema, config, or lockfile edits.
- Their tests can pass without the other present.

When unsure, run them serially. A wrong "independent" call costs merge conflicts and rework, which is slower than waiting. Cap a wave at about four developers unless the user said otherwise, because you must review and merge everything that comes back.

Give each parallel developer its own **git worktree and branch** (for example `git worktree add ../wt-<iteration> -b iter/<iteration>`) so their edits never collide. A single iteration can run in the main checkout.

Decide the schedule yourself and log it. Do not ask the user whether to parallelize.

## 4. Hand off to real developer agents (one per iteration in the wave)

Before building a handoff, check whether a handoff skill is available to you (look for names or descriptions about handoff, delegation, or briefing another agent). If one exists, use it to shape the handoff, because it encodes the user's own conventions. The steps below still apply on top of it. If none exists, follow this section as written.

Launch an actual session of the chosen agent for each iteration in the wave, at **high reasoning effort**, working in that iteration's worktree. A task description pasted somewhere, or a simulated delegation, does not count.

Two launch modes exist; `references/agents.md` has the exact commands per agent.

- **Deep link / app launch**: opens the session inside the agent's own app (or terminal) with the prompt pre-filled, so the user can watch and steer it. Deep links do not auto-run, so the user presses Enter.
- **Headless command**: runs the agent from the shell with no manual step and a settable effort, but the session is not shown in the agent's app. Several can run in the background at once.

**Choosing the mode: if the user works in the agent's macOS app (or any desktop app), use the deep link or app launch, so the sessions appear in the app.** A headless run there would finish invisibly, and the user couldn't follow it or take over. Use headless only when there is no app, the user asks for it, or the run is unattended. If you're unsure which the user uses, ask once.

An app launch means one Enter press per developer session, which is a click, not an approval. Don't turn it into a question; give all the links for the wave together and say they're ready. If the plan has many iterations, offer once to give a developer several sequential iterations in one session, committing per iteration, so there are fewer launches.

**Reasoning effort.** Aim for high effort in every case. Headless commands take it as a flag. For app launches, no public docs list an effort link parameter, so don't assume one: put the high-effort instruction in the prompt, and tell the user to confirm the app's effort setting is High before pressing Enter. If the user tells you a working way to set it for their app, use that.

If you can't launch from here (for example you're in a cloud sandbox and the agent lives on the user's machine), give the user the ready-to-run links or commands and say clearly that they still need launching. Never claim a handoff happened when it didn't.

Each prompt must contain: the iteration goal, the locked scenarios and acceptance criteria for that iteration only, the relevant repo context, the worktree and branch to use, the roster from step 0, the high-effort instruction, and these rules for the developer:

- Implement only. **Do not write or modify tests.**
- Before editing, run `git status`, `git branch --show-current`, and `git worktree list`, and confirm you are in your assigned worktree and branch.
- Stay inside this iteration's scope; other developers are working on other iterations in parallel. If you find changes from someone else in files you need, stop and ask instead of editing around them.
- If anything is unclear or blocked, **stop and ask**. Do not assume or guess.
- When done, commit to your branch.
- Then report back: what changed, the commit hash, and any open questions.
- If the developer agent has its own handoff or report-back skill, use it for that report.

## 5. Review, merge, and test

As each developer reports back (in any order), review that branch:

1. Review the commit against its acceptance criteria and run its locked tests. If a code-review skill is available to you, use it rather than improvising, and still check against the acceptance criteria yourself.
2. On pass, merge the branch into the integration branch, one at a time. Resolve purely mechanical conflicts yourself; anything that touches behavior goes back to a developer.
3. After every merge, run the **full** locked test suite for everything merged so far. Iterations that pass alone can still break each other.

Outcomes:

- **Pass**: accept it yourself. Don't ask the user. When a wave is fully merged, start the next wave (step 3). After the last wave, give one final summary: what was built, the commits, the schedule you chose, and the decisions log.
- **Fail, or the integration run finds a bug**: send specific feedback to the responsible developer, naming the failing test and the cause you found. Fix the implementation, never the tests. Count attempts per iteration; after three failures, stop and ask.
- **Question or ambiguity from a developer**: if the approved spec answers it, or it's an implementation detail, answer it yourself and log it. If the spec is silent on a user-visible behavior, that's a product decision: ask the user, then add the answer to the spec before any code changes.

## The rule that protects everything else

Never change a test just to get a passing result. A test adjusted to fit the implementation proves nothing and gives false confidence. An approved test may change only when the *intended behavior* was wrong, and then it changes as a deliberate spec decision, stated with the reason and confirmed with the user, independent of the implementation. Adding new tests for gaps the spec missed is fine without asking, as long as they don't contradict what was approved.
