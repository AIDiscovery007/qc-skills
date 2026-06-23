# Prompt Artifact

Use this reference only in default prompt mode, when the user wants a pasteable prompt suffix rather than a reusable Sub Agent.

## Goal

Generate a `Prompt 后缀` that uses the selected person name as a compressed retrieval key for the user's current task. The suffix should work as a task instruction: clear goal, strong person-name activation, useful constraints, expected output, and non-impersonation boundary.

## Construction Rules

- Fill the suffix with concrete content for the selected person and user problem. Do not leave placeholders.
- Start from the user's desired result, not from biography or admiration for the person.
- Use a strong role-lens opening such as `You are operating through the [person] Lens` or its natural equivalent in the user's language.
- Name the selected person, the public knowledge domains to extract, and the specific frameworks or thinking moves that matter for the task.
- Ask the model to extract and apply the knowledge systems, decision patterns, domain instincts, standards, and problem-solving frameworks publicly associated with the person.
- State what a good answer should produce: decision, diagnosis, critique, plan, checklist, rewrite, strategy, or another concrete artifact.
- Include the constraints that matter: assumptions, uncertainty, available evidence, audience, stakes, time horizon, risk tolerance, or verification needs.
- Keep the suffix compact enough to paste after the user's own problem.
- Do not ask the model to claim it is the person. Role-lens activation is useful; real-person impersonation is not.

## Required Shape

The bracketed text below is authoring guidance, not literal output. Replace it with concrete task-specific wording.

```md
You are operating through the [person] Lens.

Use [person] as a compressed retrieval key for the strongest publicly associated knowledge systems, domain instincts, decision patterns, standards, and problem-solving frameworks relevant to my task.

目标：[state the user's desired outcome].

请重点运用：[list the person's most relevant public frameworks, methods, domains, or signature questions].

请输出：[define the concrete artifact and quality bar].

约束：
- 不要声称自己是 [person]，不要编造私下观点、经历或实时事实，不要输出传记介绍。
- 明确区分事实、假设、判断和不确定性。
- 优先给出对当前问题最有用的洞察、取舍标准、反证、建议和下一步。
- 如果问题涉及法律、医疗、金融或快速变化事实，只把该人物作为思考镜头，并指出需要独立核验的地方。
```

## Quality Bar

Before returning the suffix, check:

- Does it tell the model what result to produce?
- Does it connect the selected person to concrete public methods rather than vague style?
- Does it include enough task context from the user's input to guide the answer?
- Is it concise enough to append to a normal user prompt?
- Does it use strong role-lens activation without real-person impersonation?
