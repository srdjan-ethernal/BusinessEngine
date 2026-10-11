# Business Engine

A static demo website for managing and preparing businesses. The **My business** home page shows three examples: **Robot factory**, **Dropshipping**, and **Amazon referrals**. The first two have demo start dates and earnings, while Amazon referrals has not launched yet.

**New business** opens a wizard with input parameters and four stages: Product Market Fit, Go-To-Market, Marketing, and Sales. Each business has its own details, from preparation to operation. The agents page introduces 24 expert agents. Stages are accelerated simulations that can be paused and resumed.

Data is saved locally in the browser (`localStorage`).

The [product marketing page](https://srdjan-ethernal.github.io/BusinessEngine/marketing.html) explains the BusinessEngine workflow and links to the demo. The [investment brief](https://srdjan-ethernal.github.io/BusinessEngine/investment.html) describes the product thesis, business model hypotheses, milestones, and an illustrative development budget. Both are accessible from the workspace navigation. All investment figures are planning examples, not commercial traction or an active fundraising offer.

Select an average agent score in any wizard stage, result table, or business plan to open the individual evaluations. Each idea and completed stage has 24 simulated agent scores, an explanation, evidence, and a suggested next step. Marketing shows the agent average separately from its combined score (40% agents and 60% market metrics).

## Verification

If you have Node.js, run `node tests/portfolio.cjs`. The checks cover independent projects, background stages, pause and resume, persistence, and financial exports.

## Running locally

Open `index.html` in a browser, or start a local server from this directory:

```sh
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

This is a demo without a backend or connections to real AI agents, sales, or payments. All financial data, results, and preorders are illustrative.
