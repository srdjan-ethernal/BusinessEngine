(function () {
  'use strict';

  const STAGES = ['Product Market Fit', 'Go-To-Market', 'Marketing', 'Sales'];
  const CATEGORIES = ['Product', 'Capital', 'Growth', 'Operations'];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]));
  const numeric = value => Number.isFinite(Number(value)) ? Number(value) : 0;
  const number = value => numeric(value).toLocaleString('en-GB', {maximumFractionDigits: 1});
  const scoreLabel = value => numeric(value).toLocaleString('en-GB', {minimumFractionDigits: 1, maximumFractionDigits: 1});
  const money = value => numeric(value).toLocaleString('en-GB', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0});
  const excerpt = value => { const text = String(value || '').trim(); return text.length > 180 ? text.slice(0, 177) + '…' : text; };
  const route = value => typeof value === 'string' && value.startsWith('#') ? value : '#businesses';

  function hash(value) {
    let result = 0;
    for (const character of value) result = (result * 31 + character.charCodeAt(0)) >>> 0;
    return result;
  }

  function scores(params, ideaId, stage, agents = window.AGENTS || []) {
    const seed = hash(JSON.stringify(params));
    const index = Number(ideaId) - 1;
    return agents.map((agent, agentIndex) => ({
      ...agent,
      score: 62 + (hash(seed + '|' + index + '|' + stage + '|' + agentIndex) % 370) / 10
    }));
  }

  function average(ratings) {
    if (!ratings.length) return 0;
    return Math.round(ratings.reduce((total, rating) => total + rating.score, 0) / ratings.length * 10) / 10;
  }

  function evaluationContext(payload) {
    const params = payload.business?.params || {};
    const idea = payload.idea || {};
    const context = payload.context || {};
    const stage = Math.max(1, Math.min(4, numeric(payload.stage) || 1));
    const kind = context.kind || 'robot';
    const offer = kind === 'dropshipping' ? 'a curated store and supplier delivery' : kind === 'affiliate' ? 'comparison content and affiliate recommendations' : 'a robotic pilot, integration and service';
    const channels = kind === 'dropshipping' ? 'Instagram, search, content and email' : kind === 'affiliate' ? 'organic search, a newsletter and social media' : 'direct B2B outreach, LinkedIn and email';
    const stageEvidence = stage === 1 ? `Saved problem statement: ${excerpt(context.problem) || 'Customer problem still needs validation.'}`
      : stage === 2 ? `Proposed channels: ${channels}.`
      : stage === 3 ? `Demo campaign: ${number(idea.visits)} visits, ${number(idea.replies)} email replies and ${number(idea.subscribers)} subscriptions.`
      : `Simulated preorders: ${number(idea.preorders)}; order value: ${money(numeric(idea.preorders) * numeric(idea.price))}.`;
    const stageNext = stage === 1 ? 'Validate the customer problem before selecting the offer.'
      : stage === 2 ? 'Test the proposed offer and channel with a small customer sample.'
      : stage === 3 ? 'Connect campaign responses to qualified buyers and acquisition costs.'
      : 'Confirm order terms and delivery capacity before accepting a real payment.';
    return {params, idea, context, stage, kind, offer, channels, stageEvidence, stageNext};
  }

  function assessment(agent, view) {
    const {params: p, idea: x, context, stage, kind, offer, channels, stageEvidence, stageNext} = view;
    const icp = x.icp || 'Target customer';
    const region = p.region || 'the target market';
    const model = context.model || 'The proposed business model';
    const roi = numeric(x.investment) > 0 ? Math.round((numeric(x.monthlyCash) * numeric(p.roi) / numeric(x.investment) - 1) * 100) : 0;
    const payback = numeric(x.monthlyCash) > 0 ? number(numeric(x.investment) / numeric(x.monthlyCash)) + ' months' : 'not yet established';
    const financialEvidence = `Demo investment: ${money(x.investment)}; assumed net cash flow: ${money(x.monthlyCash)} per month.`;
    const priceEvidence = `Demo offer price: ${money(x.price)}; model: ${model}.`;
    const audienceEvidence = `Target customer: ${icp}; market: ${region}.`;
    const briefing = {
      technical: {
        reasoning: `The idea proposes ${offer}, giving it a concrete implementation path. Technical readiness still depends on validating integrations and the scope of the first release.`,
        evidence: [`Solution in the brief: ${excerpt(context.solution) || offer + '.'}`, financialEvidence],
        next: kind === 'robot' ? 'Define the pilot interface, safety constraints and one measurable acceptance test.' : 'Prototype the core customer flow and check the supplier or content integrations.'
      },
      robotics: {
        reasoning: kind === 'robot' ? `For “${x.name}”, the key question is whether the robotic application fits the customer's existing workflow. The brief proposes a pilot, but cycle time and integration performance have not been measured.` : `Robotics is not central to “${x.name}”. This demo review instead considers whether automation could simplify ${kind === 'affiliate' ? 'content operations without reducing editorial quality' : 'order handling without introducing delivery errors'}.`,
        evidence: [`Industry: ${p.industry || 'Not provided'}.`, audienceEvidence],
        next: kind === 'robot' ? 'Observe the customer process and record throughput, operating conditions and integration requirements.' : 'Map one repetitive workflow and test whether automation improves accuracy or time.'
      },
      research: {
        reasoning: `The brief describes a problem for the target customer (${icp}), but a clear description alone does not establish demand. This review prioritizes the frequency and cost of the problem over general interest.`,
        evidence: [audienceEvidence, stageEvidence],
        next: 'Interview five target customers about their current workaround and the last time this problem occurred.'
      },
      pmf: {
        reasoning: `“${x.name}” connects a target customer to ${offer}. Its product–market fit still depends on whether the benefit is valuable enough to trigger a purchase or repeated use.`,
        evidence: [audienceEvidence, priceEvidence],
        next: stage >= 3 ? 'Ask qualified respondents to choose the offer at the stated price and record objections.' : 'Test the problem, value proposition and willingness to pay in one focused customer experiment.'
      },
      product: {
        reasoning: `The initial offer can be framed around ${offer}. Keeping the first version narrow helps distinguish the core customer benefit from features that add cost without validating demand.`,
        evidence: [priceEvidence, `Delivery assumptions: ${excerpt(context.plan) || 'Not yet specified.'}`],
        next: 'Define the minimum offer, exclusions and acceptance criteria that a first customer can understand.'
      },
      market: {
        reasoning: `The specified market, ${region}, gives the idea a starting segment. The demo audience estimate is useful for comparison, but reachable accounts and competitor alternatives still need verification.`,
        evidence: [audienceEvidence, `Illustrative addressable audience: ${number(1000 + numeric(x.id) * 87)} potential customers.`],
        next: 'Build a small list of reachable customers and compare three existing alternatives in this segment.'
      },
      finance: {
        reasoning: `The model compares the initial investment with assumed monthly net cash flow. Its ${roi}% illustrative ROI over ${number(p.roi)} months is sensitive to sales volume and delivery costs.`,
        evidence: [financialEvidence, `Available capital: ${money(p.capital)}; modeled payback: ${payback}.`],
        next: 'Recalculate cash flow with lower sales, higher costs and a delayed launch.'
      },
      economics: {
        reasoning: `The “${model}” model needs a positive contribution after acquisition, delivery and support costs. The demo price and cash flow do not yet establish an observed margin per customer.`,
        evidence: [priceEvidence, financialEvidence],
        next: 'Itemize one transaction and set the maximum affordable acquisition cost before scaling.'
      },
      vc: {
        reasoning: `The idea has a defined customer and revenue model, which makes its growth assumptions testable. Repeatable acquisition and expansion beyond ${region} remain unproven in this demo.`,
        evidence: [audienceEvidence, `Initial capital constraint: ${money(p.capital)}.`],
        next: 'Define a repeatable sales channel and the evidence required before seeking growth capital.'
      },
      angel: {
        reasoning: `Founder strengths can reduce the cost and time of the first experiment for “${x.name}”. This review looks for a small pilot that tests a decisive assumption before committing more capital.`,
        evidence: [`Founder strengths: ${excerpt(p.advantages) || 'Not provided.'}`, `Planned investment: ${money(x.investment)}.`],
        next: 'Choose one founder advantage to use in a low-cost pilot and define a clear success threshold.'
      },
      government: {
        reasoning: `The project's industry and market provide a starting point for checking public support. This score does not confirm eligibility, an open funding call or an award.`,
        evidence: [`Industry and location: ${p.industry || 'Not provided'} · ${region}.`, `Capital requirement: ${money(x.investment)}.`],
        next: 'Verify current program requirements, eligible costs and documentation with the relevant funding body.'
      },
      exit: {
        reasoning: `Long-term value would come from repeatable revenue, customer relationships and ownership of useful assets. The “${model}” model needs evidence that value can persist beyond the founder's daily work.`,
        evidence: [priceEvidence, `Proposed offer: ${offer}.`],
        next: 'Record ownership of key assets and identify which customer or delivery processes are transferable.'
      },
      gtm: {
        reasoning: `The route to the target customer (${icp}) combines ${channels}. A channel list is a useful starting point; prioritization depends on where this specific audience can be reached economically.`,
        evidence: [audienceEvidence, stageEvidence],
        next: 'Pick one primary channel, a specific offer and a measurable goal for the first customer test.'
      },
      marketing: {
        reasoning: stage >= 3 ? `The simulated responses show activity around “${x.name}”, but visits and subscriptions are weaker evidence than qualified buying intent. Compare channels by cost and lead quality before expanding the budget.` : `The proposed ${channels} can expose the offer to the target audience. Campaign performance is not available at this stage, so the review focuses on test design and measurable goals.`,
        evidence: [stageEvidence, stage >= 3 ? `Illustrative budget per idea: ${money(numeric(p.capital) * (stage === 3 ? 0.1 / 30 : 0.2 / 15))}.` : priceEvidence],
        next: 'Run one controlled campaign with consistent budgets and track qualified responses alongside traffic.'
      },
      sales: {
        reasoning: stage === 4 ? `The ${number(x.preorders)} simulated preorders are stronger demo signals than traffic alone. They still require confirmed terms, customer identity and a delivery commitment to become real orders.` : `The ${money(x.price)} offer gives sales a concrete proposal to test. This stage has no confirmed real orders, so objections and qualified conversations matter more than a large contact list.`,
        evidence: [priceEvidence, stageEvidence],
        next: 'Define qualification criteria and record one clear next commitment for each prospect.'
      },
      pricing: {
        reasoning: `The price of ${money(x.price)} must be credible relative to the benefit for the target customer (${icp}). The model supplies a starting price, while willingness to pay and package preferences remain assumptions.`,
        evidence: [priceEvidence, financialEvidence],
        next: 'Compare two clearly described packages and ask customers to choose at the stated prices.'
      },
      content: {
        reasoning: `The message for “${x.name}” should explain who it helps, what changes and what to do next. Content credibility depends on clear claims and supporting evidence rather than broad promises.`,
        evidence: [`Proposed content channels: ${channels}.`, `Existing website: ${p.website || 'Not provided.'}`],
        next: 'Write one landing-page headline, one concrete benefit and one call to action for the target customer.'
      },
      partnerships: {
        reasoning: `Partners could improve access to ${region} or support delivery of ${offer}. Their value depends on incentives, responsibilities and whether the customer relationship stays clear.`,
        evidence: [`Founder network and strengths: ${excerpt(p.advantages) || 'Not provided.'}`, audienceEvidence],
        next: 'List three relevant partners and propose a specific customer benefit and commercial arrangement.'
      },
      legal: {
        reasoning: `The “${model}” offer needs clear responsibilities, sales terms and appropriate handling of customer data. This demo identifies review topics; it does not establish legal compliance.`,
        evidence: [`Target jurisdiction and audience: ${region} · ${icp}.`, priceEvidence],
        next: 'Have an appropriate expert review sales terms, data flows and any product-specific obligations.'
      },
      operations: {
        reasoning: `Delivering ${offer} requires clear ownership across the founder, suppliers and support. Capacity must be checked against promised demand before the idea becomes an operating business.`,
        evidence: [`Operating plan: ${excerpt(context.plan) || 'Not yet specified.'}`, stageEvidence],
        next: 'Map the delivery workflow, assign owners and calculate capacity for the first customer batch.'
      },
      delivery: {
        reasoning: `The proposed timeline gives “${x.name}” milestones, but dependencies can delay customer delivery. A useful pilot needs an acceptance test and explicit responsibility for each prerequisite.`,
        evidence: [`Demo milestones: ${excerpt(context.plan) || 'Not yet specified.'}`, financialEvidence],
        next: 'Define the first delivery milestone, its dependencies and the customer acceptance criteria.'
      },
      support: {
        reasoning: `The “${model}” offer needs an onboarding and support approach that customers can rely on. Service effort and repeat usage affect the economics as well as retention.`,
        evidence: [priceEvidence, `Target user: ${icp}.`],
        next: 'Document onboarding, the main support requests and a realistic response commitment.'
      },
      data: {
        reasoning: `The review separates saved assumptions from simulated outcomes. ${stage === 1 ? 'An idea score compares concepts; it does not measure customer demand.' : stage === 2 ? 'An offer and channel plan do not establish conversion performance.' : stage === 3 ? 'Visits, replies and subscriptions measure different levels of interest.' : 'Preorders and their value do not establish collected revenue.'}`,
        evidence: [stageEvidence, `Evaluation cohort: the same saved brief and idea ID ${number(x.id)}.`],
        next: 'Define each metric, its source and the condition under which it counts as a qualified signal.'
      },
      risk: {
        reasoning: `“${x.name}” depends on customer demand, delivery capacity and the stated cash-flow assumptions. This independent review looks for an assumption that could reverse the selection decision.`,
        evidence: [financialEvidence, `Desired payback: ${number(p.roi)} months; modeled payback: ${payback}.`],
        next: 'List the three biggest assumptions and test the one with the greatest downside first.'
      }
    };
    const details = briefing[agent.id] || {
      reasoning: `This review considers ${agent.role || 'the assigned expertise'} for “${x.name}” using the saved brief and the ${STAGES[stage - 1]} context.`,
      evidence: [audienceEvidence, stageEvidence],
      next: stageNext
    };
    const verdict = agent.score >= 85 ? 'The simulated score indicates a strong starting point with assumptions still to verify.'
      : agent.score >= 75 ? 'The simulated score indicates a workable starting point that needs more evidence.'
      : 'The simulated score indicates that important gaps need attention before progressing.';
    const phaseFocus = [
      {
        Product: 'the product review prioritizes the customer problem and whether this solution deserves a pilot',
        Capital: 'the capital review prioritizes whether the concept fits the available budget and desired payback',
        Growth: 'the growth review prioritizes a specific audience and an initial test of demand',
        Operations: 'the operations review prioritizes constraints that could make the concept impractical'
      },
      {
        Product: 'the product review prioritizes a clearly scoped offer and acceptance criteria for the first customer',
        Capital: 'the capital review prioritizes launch costs, pricing assumptions and funding the first customer deliveries',
        Growth: 'the growth review prioritizes the ideal customer, offer, pricing and route to first customers',
        Operations: 'the operations review prioritizes assigned owners, delivery dependencies and the requirements to launch'
      },
      {
        Product: `the product review treats ${number(x.replies)} demo replies as provisional feedback on the offer, rather than proof of product–market fit`,
        Capital: `the capital review compares the campaign's ${number(x.visits)} demo visits with the assumed spending; actual acquisition costs remain unverified`,
        Growth: `the growth review compares ${number(x.replies)} demo replies and ${number(x.subscribers)} subscriptions with the audience reached`,
        Operations: `the operations review checks how ${number(x.visits)} demo visits become replies and subscriptions, and whether those signals are consistently defined`
      },
      {
        Product: `the product review prioritizes whether the promised scope can satisfy the ${number(x.preorders)} simulated preorder commitments`,
        Capital: `the capital review separates the value of ${number(x.preorders)} simulated preorders from collected cash and tests downside assumptions`,
        Growth: `the growth review prioritizes buyer qualification and confirmed terms behind the ${number(x.preorders)} simulated preorders`,
        Operations: `the operations review prioritizes delivery capacity, responsibilities and the risks behind ${number(x.preorders)} simulated preorders`
      }
    ];
    const focus = phaseFocus[stage - 1][agent.category] || 'the review prioritizes the available evidence and the next validation decision';
    const stageFocus = `At ${STAGES[stage - 1]}, ${focus}.`;
    return {...details, reasoning: `${details.reasoning} ${stageFocus} ${verdict}`};
  }

  function card(agent, view) {
    const details = assessment(agent, view);
    const value = Math.max(0, Math.min(100, numeric(agent.score)));
    return `<article class="evaluation-card" data-agent-id="${esc(agent.id)}">
      <header class="evaluation-card-header"><span class="evaluation-agent-code">${esc(agent.code)}</span><div><h3>${esc(agent.name)}</h3><span class="evaluation-agent-role">${esc(agent.role)}</span></div><strong class="evaluation-score">${scoreLabel(value)}<small>/ 100</small></strong></header>
      <div class="evaluation-score-label"><span>Independent agent score</span><span>${scoreLabel(value)} / 100</span></div>
      <div class="evaluation-score-track" role="meter" aria-label="${esc(agent.name)} score" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div>
      <div class="evaluation-copy"><span class="evaluation-copy-label">Reasoning</span><p>${esc(details.reasoning)}</p></div>
      <div class="evaluation-copy"><span class="evaluation-copy-label">Evidence</span><ul class="evaluation-evidence">${details.evidence.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>
      <div class="evaluation-copy"><span class="evaluation-copy-label">Next step</span><p>${esc(details.next)}</p></div>
    </article>`;
  }

  function render(payload) {
    const view = evaluationContext(payload);
    const ratings = payload.ratings || scores(view.params, view.idea.id, view.stage);
    const mean = Number.isFinite(Number(payload.average)) ? Number(payload.average) : average(ratings);
    const range = ratings.length ? `${scoreLabel(Math.min(...ratings.map(agent => agent.score)))}–${scoreLabel(Math.max(...ratings.map(agent => agent.score)))}` : '—';
    const categories = [...new Set([...CATEGORIES, ...ratings.map(agent => agent.category)])].filter(category => ratings.some(agent => agent.category === category));
    const name = view.params.name || 'Business project';
    const heading = STAGES[view.stage - 1];
    const links = payload.stageLinks || [];
    const formula = view.stage === 3 ? `<div class="evaluation-formula"><strong>Marketing ranking score: ${scoreLabel(payload.combinedScore ?? view.idea.marketingScore)} / 100</strong><p>40% agent average (${scoreLabel(mean)}) + 60% metric score (${scoreLabel(payload.metricScore ?? view.idea.metricScore)}) = ${scoreLabel(payload.combinedScore ?? view.idea.marketingScore)}. The agent average and the combined ranking score are different measures.</p></div>`
      : view.stage === 4 ? '<div class="evaluation-formula"><strong>Sales evaluation</strong><p>The average summarizes agent readiness and risk assessments. Preorders, revenue estimates, ROI and payback are separate business metrics.</p></div>'
      : '<div class="evaluation-formula"><strong>How the average is calculated</strong><p>All agents have equal weight. The average is the sum of their scores divided by the number of agents, rounded to one decimal place.</p></div>';
    return `<div class="evaluation-page">
      <a class="evaluation-back" href="${esc(route(payload.returnUrl))}">← Back to ${payload.returnUrl?.startsWith('#results') ? 'results' : 'wizard'}</a>
      <header class="evaluation-heading"><div class="evaluation-kicker">${esc(heading.toUpperCase())} · IDEA ${esc(String(view.idea.id || '').padStart(3, '0'))}</div><h1>Agent evaluation details</h1><p><strong>${esc(name)}</strong> · ${esc(view.idea.name || 'Business idea')}</p></header>
      ${links.length ? `<nav class="evaluation-stage-links" aria-label="Evaluation stages for this idea">${links.map(link => `<a class="evaluation-stage-link${link.active ? ' is-active' : ''}" href="${esc(route(link.url))}"${link.active ? ' aria-current="page"' : ''}>${esc(link.label || STAGES[numeric(link.stage) - 1])}</a>`).join('')}</nav>` : ''}
      <section class="evaluation-summary" aria-label="Agent score summary">
        <div class="evaluation-summary-primary"><span>Agent average</span><strong>${scoreLabel(mean)} <small>/ 100</small></strong><p>${esc(heading)} · equally weighted scores</p></div>
        <div class="evaluation-summary-metric"><span>Completed evaluations</span><strong>${ratings.length} / ${ratings.length}</strong><small>Independent agent perspectives</small></div>
        <div class="evaluation-summary-metric"><span>Score range</span><strong>${range}</strong><small>Lowest to highest · out of 100</small></div>
      </section>
      ${formula}
      <p class="evaluation-demo-note">Scores and reasoning are simulated demo evaluation summaries based on the saved project brief and demo metrics. No external agents have run these evaluations.</p>
      ${categories.map(category => { const agents = ratings.filter(agent => agent.category === category); return `<section class="evaluation-category" aria-label="${esc(category)} agent evaluations"><div class="evaluation-category-heading"><h2>${esc(category)}</h2><span>${agents.length} agents · average ${scoreLabel(average(agents))} / 100</span></div><div class="evaluation-grid">${agents.map(agent => card(agent, view)).join('')}</div></section>`; }).join('')}
    </div>`;
  }

  window.AgentEvaluations = {scores, average, render};
})();
