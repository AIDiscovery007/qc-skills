---
name: qc-expert-casting
description: Recommends the single best public expert, thinker, operator, or creator to reason through a user's problem and produces either a prompt suffix or a Sub Agent agent.md/system prompt for that expert lens. Use when the user asks for celebrity casting, expert casting, a famous person to solve a problem, a named-person thinking framework, or a subagent/persona/system prompt based on a public figure.
---

# QC Expert Casting

Cast one public figure as the sharpest thinking lens for the user's real problem.

## Purpose

Use this skill when the user wants a person name that can unlock a useful knowledge system, thinking style, domain judgment, or practical problem-solving frame from the model.

Treat the person as a public-work-informed lens, not as the real person, private consciousness, hidden parameters, or guaranteed faithful replica.

## Output Modes

- Default mode: output one person, a brief recommendation reason, and a pasteable `Prompt 后缀`.
- Sub Agent mode: when the user mentions Sub Agent, `agent.md`, system prompt, persona, or agent workflow, output one person, a brief recommendation reason, and a complete `Agent.md`.
- In Sub Agent mode, read [references/agent-md.md](references/agent-md.md) before answering and use it as the artifact quality bar.

## Workflow

1. Parse the user's actual problem, goal, stakes, constraints, and decision type.
2. Extract the strongest domain keywords and the deeper capability needed: strategy, taste, systems thinking, science, investing, writing, product, operations, negotiation, leadership, or another concrete mode.
3. Infer the missing expert pattern: who would naturally see the bottleneck, ask better questions, and produce a useful answer style for this situation?
4. Generate 5-8 silent candidates from public figures, including both obvious domain authorities and cross-domain thinkers.
5. Score candidates silently on fit, generativity, practical usefulness, distinctiveness, and risk of shallow imitation.
6. Choose exactly one person. Do not hedge with a panel unless the user explicitly asks for multiple names.
7. Choose the output mode from the user's request.
8. Output the name, a short reason, and the selected artifact. Replace all template placeholders with concrete content.

## Candidate Rules

- Prefer people with a clear public body of work, not just fame.
- Prefer the person whose methods match the problem, not the person whose domain label merely matches the topic.
- If the problem needs practical execution, prefer operators and builders over commentators.
- If the problem needs conceptual compression, prefer thinkers with strong frameworks.
- If the problem is current, legal, medical, or financial, recommend a lens for reasoning only and avoid implying professional advice.
- Do not invent credentials, private beliefs, or unavailable works.

## Artifact Rules

Both artifact types should extract the useful public reasoning style without pretending to be the person.

For `Prompt 后缀`, create a concise suffix the user can paste after their own problem. It should name the selected person, the relevant knowledge domains, the thinking moves to apply, the expected output standard, and the non-impersonation guardrail.

For `Agent.md`, create a reusable system-prompt-style instruction for a Sub Agent. It should be more operational than a suffix: mission, expert lens, operating principles, SOP, question policy, output contract, style, and guardrails. Use the reference file for the full structure.

Keep either artifact directly pasteable. Do not add implementation notes outside the requested output shape.

## Output Shape

Use the user's language. In default prompt mode, output exactly:

```md
人名：...

推荐理由：...

Prompt 后缀：
请基于 [把这里替换为所选人名] 的公开作品、公开观点、已知方法论和领域声誉，构建一个“专家思维镜头”来处理我的问题。不要扮演本人，不要编造私下观点或经历，不要输出传记介绍。请提取并运用他/她最有代表性的知识体系、判断框架、问题拆解方式、关键问题清单、取舍标准和表达风格。优先给出对当前问题最有用的分析、决策建议、反直觉洞察和可执行下一步；明确假设、约束和不确定性，避免空泛模仿和权威包装。
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

Before answering, ask silently: did I choose one person for the user's real bottleneck, explain why briefly, choose the right artifact mode, and provide pasteable instructions that extract useful public reasoning without impersonation?
