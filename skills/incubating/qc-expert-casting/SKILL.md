---
name: qc-expert-casting
description: Recommends the single best public expert, thinker, operator, or creator to reason through a user's problem and produces either a prompt suffix or a Sub Agent agent.md/system prompt for that expert lens. Use when the user asks for celebrity casting, expert casting, a famous person to solve a problem, a named-person thinking framework, or a subagent/persona/system prompt based on a public figure.
---

# QC Expert Casting

Cast one public figure as the sharpest thinking lens for the user's actual problem.

## Purpose

Use this skill when the user wants a person name that can unlock a useful knowledge system, thinking style, domain judgment, or practical problem-solving frame from the model. The core job is not to name a famous person; it is to infer the user's real problem structure and choose the public figure whose known methods best fit it.

Treat the person as a public-work-informed lens, not as the real person, private consciousness, hidden parameters, or guaranteed faithful replica.

## Output Modes

- Default mode: output one person, a brief recommendation reason, and a pasteable `Prompt 后缀`.
- Sub Agent mode: when the user mentions Sub Agent, `agent.md`, system prompt, persona, or agent workflow, output one person, a brief recommendation reason, and a complete `Agent.md`.
- In default mode, read [references/prompt.md](references/prompt.md) before writing the suffix.
- In Sub Agent mode, read [references/agent-md.md](references/agent-md.md) before writing the agent instruction.

## Casting Workflow

1. Mine the user's input before thinking of names. Extract:
   - surface keywords: explicit domain terms, objects, industries, tools, people, constraints
   - action keywords: judge, design, sell, invest, negotiate, write, diagnose, decide, critique, build
   - hidden bottleneck: uncertainty, taste, strategy, incentives, distribution, science, operations, psychology, capital, narrative, execution
   - desired artifact: decision, plan, critique, framework, strategy, memo, prompt, `agent.md`, or other output
   - stakes and audience: who will use the answer, how costly a wrong answer is, and what standard it must meet
2. Compress those findings into a silent capability signature: `domain + task verb + bottleneck + success standard + needed thinking style`.
3. Generate 5-8 silent candidates from public figures. Include obvious domain authorities and cross-domain thinkers only when their method, not their fame, matches the capability signature.
4. Reject candidates whose fit is only topical. Prefer the person whose public work would change the questions asked, tradeoffs considered, or answer shape.
5. Score silently on:
   - problem-fit: matches the real bottleneck, not just surface keywords
   - method depth: has identifiable public frameworks, methods, or standards
   - generativity: can produce useful analysis across the user's whole situation
   - actionability: can drive a decision, artifact, or next step
   - distinctiveness: would produce a sharper lens than a generic expert
   - imitation risk: low risk of biography filler, catchphrases, or shallow persona play
6. Choose exactly one person. Do not hedge with a panel unless the user explicitly asks for multiple names.
7. Choose output mode from the user's wording, load the matching reference, and output the selected artifact with all placeholders replaced by concrete content.

## Candidate Rules

- Prefer people with a clear public body of work, not just fame.
- Prefer the person whose methods match the problem, not the person whose domain label merely matches the topic.
- If the problem needs practical execution, prefer operators and builders over commentators.
- If the problem needs conceptual compression, prefer thinkers with strong frameworks.
- If the problem needs taste, craft, or positioning, prefer people with visible output standards, not only abstract theory.
- If the problem is current, legal, medical, or financial, recommend a lens for reasoning only and avoid implying professional advice or current factual certainty.
- Do not invent credentials, private beliefs, or unavailable works.

## Artifact Rules

Both artifact types should follow GPT-5.5-style prompt design: outcome-first, explicit constraints, clear evidence/uncertainty rules, and a concrete output shape. Avoid process-heavy prompt stacks unless the exact process is the product.

Do not add implementation notes outside the requested output shape. Use the user's language. In default prompt mode, output exactly:

```md
人名：...

推荐理由：...

Prompt 后缀：
...
```

In Sub Agent mode, output these three outer sections, with complete generated `Agent.md` content under the final label:

```md
人名：...

推荐理由：...

Agent.md：
# ...
```

Adapt the chosen artifact to the selected person and the user's problem. Keep it concise enough to use directly.

## Mini Examples

Prompt mode: "我想判断一个 AI 产品创业方向有没有机会。" -> choose `Clayton Christensen`; output `Prompt 后缀`. Agent mode: "帮我 cast 一个 subagent 写 agent.md，专门帮我判断 AI 产品创业方向。" -> choose `Clayton Christensen`; output `Agent.md`.

## Final Check

Before answering, ask silently: did I extract the real keywords and bottleneck from the user's input, choose one person whose public methods fit that capability signature, explain why briefly, load the right reference, and produce a pasteable artifact that is useful without impersonation?
