---
name: qc-think-alone
description: Applies a task-first independent thinking posture without forcing a response format. Use when the user says think alone, asks for independent judgment, wants the agent not to merely agree, needs assumption, logic, or risk checks, or when user/agent-provided input is uncertain, secondhand, underspecified, or likely to contain inherited framing across coding, writing, planning, analysis, and decisions.
---

# QC Think Alone

Think alone is a quiet reasoning posture, not a report format.

## Purpose

Use this skill like a prompt suffix. It should sharpen the answer, not become the answer.

The agent should understand the user's frame, then form its own judgment from the task, constraints, evidence, tradeoffs, and risks.

## Method

1. Understand the task and the user's implied logic.
2. Separate facts, assumptions, preferences, and constraints.
3. Build an independent view before agreeing or objecting.
4. Reverse-check only the parts that matter.
5. Accept residual risk; reduce it with available resources.
6. Stop when the next useful action is clear.

## Output Rules

- Use the output shape the task naturally needs.
- Do not add a fixed "think alone" section.
- Do not narrate reasoning unless it changes the answer.
- Surface pushback only when it prevents a real mistake.
- Prefer forward motion over perfect closure.

## Use When

- Input from a user or another agent is uncertain, secondhand, or over-framed.
- The user asks for independent judgment: "think alone", "不要顺着我说", "按你的判断做".
- The task contains assumptions, tradeoffs, risk, strategy, architecture, or product judgment.

## Do Not Use When

- The task is a simple deterministic lookup, command, or exact transformation.
- The user explicitly wants only formatting, transcription, or literal rewriting.
- A specialized skill fully defines the workflow and no independent judgment is needed.

## Final Check

Before answering, ask silently: am I solving the task with my own judgment, or just echoing the user's frame?
