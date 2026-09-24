# Liquidity Extension

Use this extension when the market question involves liquidity tightening, high-valuation drawdowns, forced selling, carry-trade unwind, funding stress, margin hikes, credit spreads, or sudden cross-asset volatility.

## Core View

High valuation does not by itself imply a crash. It raises market fragility: when liquidity tightens, large unrealized gains, leverage, and crowded positions make the same shock produce larger price moves.

Analyze liquidity as a transmission system:

```text
funding source tightens -> leverage/carry becomes less attractive -> investors reduce risk or sell assets -> volatility rises -> credit/funding stress confirms or fades
```

## Three Tightening Channels

1. Japan rate shock and carry unwind
   - Japan is a major global creditor, and long low-rate conditions supported yen-funded carry trades.
   - A fast rise in JGB yields or a narrowing U.S.-Japan rate spread can reduce carry returns.
   - If JPY strengthens at the same time, overseas assets can face forced selling as investors repay yen funding.

2. TGA and reserve drain
   - When the U.S. Treasury General Account rises through issuance or tax receipts, cash is pulled from the financial system.
   - This can lower bank reserves and tighten liquidity available for risk assets.
   - The direction of net liquidity matters more than a single balance snapshot.

3. Exchange margin-driven deleveraging
   - In extreme commodity or precious-metal volatility, exchange margin hikes can force leveraged traders to reduce positions.
   - Margin hikes can become a mechanical deleveraging trigger, especially after sharp speculative rallies.
   - Treat this as a position-structure shock, not a macro growth shock.

## Indicator Stack

Use the indicators as a dashboard, not as isolated signals.

### Settlement-layer liquidity

- Net liquidity proxy: `Federal Reserve total assets - Treasury General Account - ON RRP`
- Interpretation: falling net liquidity means cash available to markets is tightening.
- Primary sources:
  - Fed H.4.1 balance sheet: `https://www.federalreserve.gov/releases/h41/`
  - Treasury Daily Treasury Statement / operating cash balance: `https://fiscaldata.treasury.gov/datasets/daily-treasury-statement/`
  - New York Fed reverse repo operations: `https://www.newyorkfed.org/markets/desk-operations/reverse-repo`

### Short-end funding price

- SOFR.
- Interpretation: abnormal SOFR rise means short-term funding is becoming expensive, which can trigger asset sales to repay funding.
- Primary source:
  - New York Fed SOFR: `https://www.newyorkfed.org/markets/reference-rates/sofr`

### Rate volatility and dealer balance-sheet stress

- MOVE or another transparent Treasury-rate volatility measure.
- Interpretation: rising rate volatility can reduce market-making capacity, force leverage reduction, and hurt risk assets.
- Source discipline:
  - Prefer the index owner or exchange/vendor methodology page if available.
  - If using FRED or another data portal for convenience, label it as a republished vendor-derived series, not a government raw statistic.

### Global deleveraging trigger

- USDJPY.
- U.S.-Japan 2-year yield spread.
- Interpretation: `JPY strengthening + spread narrowing` is a carry-unwind warning signal.
- Primary sources:
  - U.S. Treasury daily rates: `https://home.treasury.gov/resource-center/data-chart-center/interest-rates/`
  - Federal Reserve H.10 FX rates: `https://www.federalreserve.gov/releases/h10/`
  - Bank of Japan statistics and time-series data: `https://www.boj.or.jp/en/statistics/`
  - Japan Ministry of Finance JGB and fiscal data: `https://www.mof.go.jp/english/`

### Credit confirmation

- High-yield credit spreads or OAS.
- Interpretation: widening spreads confirm that liquidity stress is entering financing conditions, making risk-asset declines easier to propagate.
- Source discipline:
  - Prefer the index owner or official methodology source.
  - If using ICE BofA series via FRED, mark it as vendor-derived but transparent enough for monitoring.
  - For underlying bond-market evidence, check FINRA TRACE where available: `https://www.finra.org/finra-data/fixed-income`

### Margin and forced deleveraging

- CME/ICE/SHFE/INE margin notices, contract specs, and clearing advisories.
- Interpretation: rising margins increase cash requirements and can force position cuts in crowded futures trades.
- Primary sources:
  - CME performance bonds and margins: `https://www.cmegroup.com/solutions/risk-management/performance-bonds-margins.html`
  - ICE contract and clearing notices: `https://www.ice.com/`
  - Shanghai Futures Exchange: `https://www.shfe.com.cn/`
  - Shanghai International Energy Exchange: `https://www.ine.cn/`

## Workflow

1. Decide whether the selloff is valuation-only, liquidity-driven, or fundamental.
2. Check settlement liquidity first: Fed assets, TGA, ON RRP, and reserve direction.
3. Check funding price: SOFR and short-end stress.
4. Check rate volatility and carry: MOVE/rate volatility, USDJPY, U.S.-Japan 2-year spread.
5. Check forced-deleveraging mechanics: exchange margin hikes, futures positioning if official source is available, and commodity volatility.
6. Check credit confirmation: HY spread/OAS and bond-market liquidity.
7. Map the result into portfolio implications:
   - Liquidity tightening without credit stress: reduce crowded/high-duration/high-valuation exposure first.
   - Liquidity tightening with credit stress: prioritize cash, hedges, lower leverage, and defensive liquidity.
   - Carry unwind confirmed: watch overseas assets funded by cheap currency borrowing and cross-asset contagion.
   - Margin-driven commodity deleveraging: distinguish forced liquidation from changed supply-demand fundamentals.

## Output Add-on

When liquidity is central, add this block to the normal output:

```md
流动性判断：宽松 / 中性 / 边际收紧 / 明显收紧

证据链：
- 结算层资金：...
- 短端资金价格：...
- 利率波动与做市压力：...
- 套息去杠杆：...
- 信用确认：...
- 保证金/强平机制：...

最可能传导路径：
- ...

组合影响：
- 最脆弱资产：...
- 相对抗压资产：...
- 需要观察的反转信号：...
```

## Guardrails

- Do not call a market move "liquidity tightening" just because prices fell. Require at least two independent liquidity signals.
- Align data timestamps before comparing cross-market moves.
- Separate a liquidity shock from an earnings or fundamental shock; they can coexist but imply different follow-up checks.
- Mark vendor-derived indicators clearly when no direct official public source exists.
- Treat high valuation as an amplifier, not a sufficient cause.
