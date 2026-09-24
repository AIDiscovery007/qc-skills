# Source Priorities

Use this file when the analysis needs live facts, macro data, filings, holdings, prices, policy details, or instrument constraints.

## Principle

Prefer the nearest source to the event or data-generating institution.

Source hierarchy:

1. Official release or raw dataset from the data owner.
2. Regulatory filing, exchange announcement, or issuer disclosure.
3. Official exchange, central bank, statistics bureau, customs, treasury, or energy agency data.
4. Company investor relations material: filings, earnings releases, presentations, transcripts hosted by the company.
5. Fund issuer pages: holdings, prospectus, NAV, premium/discount, creation/redemption basket.
6. Transparent aggregators only as navigation aids; cite the original source when possible.
7. Media, sell-side reports, newsletters, blogs, and social posts are leads only, not evidence.

## Required Evidence Table

For important claims, include a compact source table:

```md
| Claim | Primary source | Date / period | Why this source | Freshness risk |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |
```

If no primary source is checked, write `Unverified primary source`.

## Macro And Policy

United States:

- Federal Reserve FOMC, balance sheet, speeches, and monetary policy releases: `https://www.federalreserve.gov/`
- U.S. Treasury yield curves, TIC, debt, refunding, sanctions: `https://home.treasury.gov/`
- BLS CPI, employment, wages, PPI: `https://www.bls.gov/`
- BEA GDP, PCE, income, corporate profits: `https://www.bea.gov/`
- Census retail sales, trade, housing, inventories: `https://www.census.gov/`
- EIA petroleum, natural gas, electricity, inventories: `https://www.eia.gov/`

China:

- National Bureau of Statistics data releases: `https://www.stats.gov.cn/`
- People's Bank of China monetary policy, credit, rates, FX reserves: `https://www.pbc.gov.cn/`
- SAFE balance of payments, FX, cross-border flows: `https://www.safe.gov.cn/`
- Ministry of Finance fiscal data and bond issuance: `https://www.mof.gov.cn/`
- General Administration of Customs trade data: `https://www.customs.gov.cn/`
- CSRC policy, approvals, market regulation: `https://www.csrc.gov.cn/`

Europe, Japan, Korea, India:

- ECB policy, rates, data portal: `https://www.ecb.europa.eu/`
- Eurostat macro and inflation: `https://ec.europa.eu/eurostat/`
- Bank of Japan policy, JGB operations, statistics: `https://www.boj.or.jp/en/`
- Japan Ministry of Finance fiscal, bond, FX intervention data: `https://www.mof.go.jp/english/`
- Bank of Korea policy and statistics: `https://www.bok.or.kr/eng/`
- Reserve Bank of India policy and statistics: `https://www.rbi.org.in/`
- India MOSPI macro statistics: `https://www.mospi.gov.in/`

## Company And Security Filings

United States:

- SEC EDGAR filings: `https://www.sec.gov/edgar/search/`
- Company investor relations pages for earnings releases, presentations, and guidance.

China A-shares:

- Shanghai Stock Exchange announcements and market data: `https://www.sse.com.cn/`
- Shenzhen Stock Exchange announcements and market data: `https://www.szse.cn/`
- CNINFO official disclosure hub: `https://www.cninfo.com.cn/`
- Beijing Stock Exchange disclosures: `https://www.bse.cn/`

Hong Kong:

- HKEXnews listed company filings, CCASS, disclosure of interests: `https://www.hkexnews.hk/`
- HKEX market data and rules: `https://www.hkex.com.hk/`

Japan, Korea, India:

- Japan Exchange Group / Tokyo Stock Exchange data and filings: `https://www.jpx.co.jp/english/`
- Korea DART corporate filings: `https://dart.fss.or.kr/`
- Korea Exchange market data and disclosures: `https://www.krx.co.kr/`
- NSE India market data and filings: `https://www.nseindia.com/`
- BSE India market data and filings: `https://www.bseindia.com/`

## Funds, ETFs, And Instrument Constraints

Use issuer or exchange pages before data vendors.

Check:

- Prospectus and KID/KIID where applicable.
- Daily holdings or latest portfolio disclosure.
- NAV, market price, premium/discount, AUM, volume, bid/ask spread.
- Distribution policy, options overlay, leverage, derivatives, currency hedge.
- Purchase limits, QDII quota limits, trading suspension, creation/redemption status.
- Fee, tax, tracking difference, and benchmark methodology.

Preferred sources:

- ETF/fund issuer official page.
- Exchange ETF product page.
- Fund manager announcement page.
- Regulatory filings for registered funds.

## Commodities, Energy, And Materials

Use official inventories, exchange warehouse stocks, agency production data, and company disclosures.

Sources:

- EIA energy data: `https://www.eia.gov/`
- U.S. Geological Survey minerals data: `https://www.usgs.gov/centers/national-minerals-information-center`
- CME contract specs and settlement data: `https://www.cmegroup.com/`
- ICE contract specs and market notices: `https://www.ice.com/`
- LME market data and warehouse stocks: `https://www.lme.com/`
- Shanghai Futures Exchange data and notices: `https://www.shfe.com.cn/`
- INE crude and commodity contracts: `https://www.ine.cn/`

## Sector Bottleneck Research

For industry theses, use primary operating evidence:

- Company capex, capacity, utilization, backlog, gross margin, customer concentration, risk factors.
- Supplier/customer disclosures across the value chain.
- Regulatory approvals, export controls, tariffs, sanctions, permits.
- Exchange import/export data and customs data.
- Official technology roadmaps or standards only when published by credible standards bodies.
- Industry associations only when methodology is public; label them as association data, not government data.

## Disallowed As Evidence

Do not treat these as evidence unless independently verified against primary sources:

- Sell-side or broker reports.
- Unattributed charts and screenshots.
- Social media posts, newsletters, self-media, podcasts, or forum claims.
- News articles summarizing a filing when the filing is available.
- Data vendor screenshots without source date and methodology.

They can be used only to discover what primary source to check next.

## Freshness Rules

- For live market price, quote, NAV, premium, inventory, or policy: verify current source in the same session.
- For company fundamentals: use the latest filing and latest earnings materials; note the reporting period.
- For macro releases: use the official release date and revision status.
- For policy: use the official statement, minutes, or notice; media interpretation is secondary.
- For cross-market validation: align timestamps before comparing moves.
