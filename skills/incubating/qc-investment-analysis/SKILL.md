---
name: qc-investment-analysis
description: Applies a constraint-first investment analysis framework to markets, sectors, assets, and portfolio theses. Use when analyzing investment logic, market macro drivers, asset allocation, sector bottlenecks, trade theses, 投研, 宏观, 调仓, or 市场分析.
---

# Constraint-First Investment Analysis

Use this skill to analyze markets by finding the dominant constraint, verifying it across assets, locating the real bottleneck, expressing the view as a portfolio structure, then revising through outcomes.

This is an analytical framework, not financial advice. For live market calls, verify current prices, news, policy, liquidity, and instrument constraints before drawing conclusions.

## Core Model

The core logic is not "predict the market"; it is "identify what the market is forced to trade now."

1. 主导约束：what scarcity, shock, policy, liquidity condition, or balance-sheet pressure is setting the market's agenda?
2. 传导链条：how does that constraint move through rates, FX, commodities, earnings, risk appetite, and capital flows?
3. 跨资产验证：do equities, bonds, gold, oil, commodities, regions, and ETFs confirm or contradict the thesis?
4. 产业瓶颈：within a theme, where is the binding bottleneck: material, process, capacity, regulation, energy, capital expenditure, or listing/instrument access?
5. 组合表达：what would the thesis imply for weights, hedges, cash, stop-loss, take-profit, and replacement assets?
6. 复盘纠错：what would prove the thesis wrong, and what did realized NAV, drawdown, and attribution teach?

## Workflow

1. Define the market question in one sentence.
2. Name the current dominant constraint.
   - Examples: war inflation, rate shock, liquidity drain, AI capex skepticism, QDII purchase limits, energy shortage, local demand weakness.
   - If the constraint is liquidity, use [LIQUIDITY_EXTENSION.md](LIQUIDITY_EXTENSION.md) before forming the thesis.
3. Build the transmission chain.
   - Use the shape: `constraint -> macro variable -> asset behavior -> portfolio implication`.
4. Cross-check at least three asset surfaces.
   - Typical surfaces: US equities, A-shares, Hong Kong equities, Japan/Korea, India/Vietnam, US Treasuries, gold, oil/gas, coal, copper/aluminum, USD/CNY, QDII premiums.
5. Locate the bottleneck if the topic is sector or industry research.
   - Ask: which node captures scarcity, pricing power, or geopolitical leverage?
6. Convert the thesis into portfolio language.
   - Include long/short bias, position sizing, defensive assets, cash buffer, hedge, and what to reduce.
   - If the user did not ask for trade implementation, keep this as implication, not recommendation.
7. State invalidation and review signals.
   - Include the event, price, data, policy change, or cross-asset divergence that would force a rethink.

## Source Discipline

Use the most direct, official, and transparent sources available. Before relying on media, broker reports, newsletters, blogs, screenshots, or social posts, try primary releases, filings, exchange data, regulator notices, company investor relations, fund issuer pages, and official statistics. See [SOURCE_PRIORITIES.md](SOURCE_PRIORITIES.md).

For liquidity-driven market analysis, use the dedicated liquidity framework and source map in [LIQUIDITY_EXTENSION.md](LIQUIDITY_EXTENSION.md).

## Output Shape

Use Chinese by default when the user writes Chinese:

```md
核心判断：...

主导约束：...

传导链条：
- ...

跨资产验证：
- 支持：...
- 冲突：...

产业/资产瓶颈：
- ...

组合含义：
- 增配/受益：...
- 减配/回避：...
- 对冲/现金：...

失效条件：
- ...

复盘问题：
- ...
```

## Style Rules

- Prefer causal chains over labels such as "bullish" or "bearish".
- Treat instruments as constrained objects: liquidity, premium, access, options overlay, QDII limits, and tax/friction can change the answer.
- Separate thesis from implementation; a good idea can still be a bad trade because of crowding, valuation, drawdown, or unavailable instruments.
- Do not imitate specific historical holdings mechanically. Rebuild the logic from today's constraint set.
- Do not use this to fabricate prices, dates, holdings, or article content. If data is missing or stale, say so.
- When a claim depends on current data, include source name and data date; if no primary source was checked, mark the claim as unverified.

## Quick Example

Question: `AI产业链现在应该看什么？`

Analysis shape:

- 主导约束：AI compute demand is moving from model narrative to infrastructure and packaging capacity.
- 传导链条：capex -> advanced packaging/materials demand -> bottleneck suppliers -> regional equity baskets.
- 跨资产验证：cloud capex guidance, semiconductor equipment/material names, power/energy inputs, Japan/Korea/China supply chain moves.
- 组合含义：prefer bottleneck nodes over broad concept exposure; keep position sizing tied to capex confirmation and valuation risk.
