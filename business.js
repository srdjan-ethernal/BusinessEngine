'use strict';

window.BusinessViews = (() => {
  const phaseLabels = ['Product Market Fit', 'Go-To-Market', 'Marketing', 'Sales'];
  const profiles = {
    robot: {
      label: 'ROBOTICS & AUTOMATION', icon: 'robot', color: 'robot',
      unit: 'Orders', customers: 'B2B customers', channel: 'Direct B2B sales',
      summary: 'Modular robotic cells for palletising and production automation, with integration, training and servicing.',
      phases: [
        'Interviews with manufacturers confirmed demand for flexible robotic cells. The selected ideas offer service revenue and clear labour savings.',
        'Target customers are small and medium-sized factories in Serbia and the DACH region. The offer includes a pilot cell, integration and annual servicing.',
        'A website with case studies, LinkedIn campaigns and email sequences was prepared. The cost of qualified enquiries was compared across ideas.',
        'Demo offers, preorders and a financial model are complete. Cobot palletising attracted the most interest.'
      ],
      assets: [
        { title: 'Robot factory · sales website', type: 'WEBSITE', description: 'Robotic cell catalogue, savings per shift, case studies and demo requests.' },
        { title: 'Catalogue and service packages', type: 'OFFER', description: 'Pilot cell, full integration and a maintenance contract.' },
        { title: 'Sales process for factories', type: 'SALES', description: 'Enquiry → production line assessment → pilot → contract → installation.' }
      ],
      channels: [ ['Direct sales', 'Calls and demo meetings', '46 qualified enquiries'], ['LinkedIn', 'Case studies and outreach', '1,840 visits'], ['Partner referrals', 'Integrators and existing customers', '8 new contacts'] ]
    },
    dropshipping: {
      label: 'E-COMMERCE & DROPSHIPPING', icon: 'cart', color: 'dropshipping',
      unit: 'Orders', customers: 'Customers', channel: 'Online store',
      summary: 'An online store for practical home accessories, fulfilled by selected suppliers and focused on repeat purchases.',
      phases: [
        'Home organisation was selected as the niche. Ideas were compared by demand, margin, supplier reliability and delivery time.',
        'The target audience, offer, pricing and initial catalogue are defined. Suppliers were assessed for quality and return policies.',
        'Ads, product pages and welcome emails were tested. Products offering the best balance of cost and customer interest were selected.',
        'Demo orders confirmed the most popular products. The store is ready for ongoing order and margin tracking.'
      ],
      assets: [
        { title: 'Dropshipping · online store', type: 'WEBSITE', description: 'Catalogue, product pages, basket and demo order records.' },
        { title: 'Supplier catalogue', type: 'PROCUREMENT', description: 'Purchase prices, planned margins, delivery times and return policies.' },
        { title: 'Customer email journey', type: 'MARKETING', description: 'Welcome messages, abandoned basket reminders and repeat purchase recommendations.' }
      ],
      channels: [ ['Meta ads', 'Home organisation products', '5,420 visits'], ['Google Shopping', 'Searches with purchase intent', '2,180 visits'], ['Email', 'Repeat purchases', '124 returning customers'] ]
    },
    affiliate: {
      label: 'CONTENT & AFFILIATE', icon: 'link', color: 'affiliate',
      unit: 'Affiliate sales', customers: 'Published articles', channel: 'Recommendations and affiliate links',
      summary: 'Buying guides and product comparisons for the home office. Planned revenue comes from affiliate referral commissions.',
      phases: [
        'Topics, reader needs and competition in home office equipment are being researched. The goal is a niche with useful comparisons and clear purchase intent.',
        'The audience, product selection and content catalogue are being prepared. Website structure and affiliate link disclosures are being defined.',
        'SEO guides, comparisons and a newsletter are planned. Testing will show which content attracts readers and product clicks.',
        'Clicks, tracked affiliate sales and expected commissions will be reviewed before regular operations begin.'
      ],
      assets: [
        { title: 'Amazon referrals · website concept', type: 'DRAFT', description: 'Home office guides, comparisons and clearly disclosed affiliate links.' },
        { title: 'Plan for the first 20 articles', type: 'CONTENT', description: 'Topics, search keywords, selected products and a publishing schedule.' },
        { title: 'Commission model', type: 'FINANCE', description: 'Scenarios for visits, clicks, affiliate sales and revenue.' }
      ],
      channels: [ ['Organic search', 'Guides and product comparisons', 'Planned'], ['Newsletter', 'Subscriber recommendations', 'Planned'], ['Affiliate links', 'Click and commission tracking', 'Planned'] ]
    },
    custom: {
      label: 'NEW BUSINESS VENTURE', icon: 'spark', color: 'custom',
      unit: 'Orders', customers: 'Customers', channel: 'Channels from the business plan',
      summary: 'The business project moves from initial parameters through market validation, marketing and sales.',
      phases: [
        'Agents research the problem, market and potential business models, then rank the business ideas.',
        'The target audience, region, pricing, catalogue and sales channels are prepared for the selected ideas.',
        'Equal test budgets allow visits, email replies and subscriptions to be compared across ideas.',
        'Offers and demo preorders are prepared alongside a financial model and expected payback period.'
      ],
      assets: [],
      channels: [ ['Website', 'Presenting the selected offer', 'In preparation'], ['Marketing', 'Testing sales channels', 'In preparation'], ['Sales', 'Validating customer interest', 'In preparation'] ]
    }
  };

  const profile = record => profiles[record.meta?.kind] || profiles.custom;
  const values = record => ({ earned: 0, profit: 0, orders: 0, customers: 0, monthlyRevenue: [], activity: [], assets: [], ...record.meta });
  const phaseCount = record => (record.phases || []).filter(p => p.status === 'complete').length;
  const isOperating = record => Boolean(record.meta?.startedOn);
  const dateLabel = value => {
    if (!value) return 'Not started yet';
    const parts = String(value).slice(0, 10).split('-').map(Number);
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return Number.isNaN(date.getTime()) ? esc(value) : new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
  };
  const status = record => isOperating(record) ? ['Operating', 'complete'] : record.meta?.status === 'validation' ? ['Validated', ''] : ['Not started', ''];
  const phaseStatus = value => ({ complete: 'Complete', running: 'In progress', paused: 'Paused', idle: 'Not started' })[value] || 'Not started';
  const safeMoney = value => money(Number(value) || 0);

  function mark(record) {
    const p = profile(record);
    const drawing = p.icon === 'robot' ? '<rect x="6" y="7" width="12" height="11" rx="3"/><path d="M12 3v4M3 11v4M21 11v4M9 21v-3M15 21v-3M9 14h6"/><circle cx="9" cy="11" r=".8"/><circle cx="15" cy="11" r=".8"/>' : p.icon === 'cart' ? '<path d="M3 4h2l2.5 12h11l2-8H6M8 20h.01M18 20h.01"/><path d="M11 8V5h5v3"/>' : p.icon === 'link' ? '<path d="m10 13 4-4m-7 3-2 2a4 4 0 0 0 6 6l3-3m-4-10 3-3a4 4 0 0 1 6 6l-2 2"/>' : '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>';
    return `<span class="business-mark ${p.color}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawing}</svg></span>`;
  }

  function sparkline(record) {
    const data = values(record).monthlyRevenue;
    const amounts = data.map(x => Math.max(0, Number(x.value) || 0));
    if (!amounts.length) amounts.push(0, 0, 0, 0, 0, 0);
    const maximum = Math.max(1, ...amounts);
    const points = amounts.map((x, i) => `${6 + i * 136 / Math.max(1, amounts.length - 1)},${42 - x / maximum * 31}`).join(' ');
    return `<svg class="business-sparkline" viewBox="0 0 148 48" fill="none" role="img" aria-label="${isOperating(record) ? 'Monthly demo revenue trend' : 'No revenue earned yet'}"><path d="M6 43H142" stroke="currentColor" opacity=".12"/><polyline points="${points}" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  }

  function card(record) {
    const p = profile(record), m = values(record), [label, kind] = status(record);
    const lastMonth = m.monthlyRevenue[m.monthlyRevenue.length - 1];
    return `<article class="business-card" data-business-card="${esc(record.id)}" data-business-status="${isOperating(record) ? 'active' : 'planning'}" data-business-search="${esc(`${record.params.name} ${p.label} ${record.params.industry}`.toLocaleLowerCase())}">
      <div class="business-card-head">${mark(record)}${statusPill(label, kind)}</div>
      <div class="business-kind">${p.label}</div><h2 class="business-name">${esc(record.params.name)}</h2>
      <p class="business-description">${esc(m.description || p.summary)}</p>
      <dl class="business-card-metrics"><div><dt>Started operating</dt><dd class="business-date ${isOperating(record) ? '' : 'business-not-started'}">${dateLabel(m.startedOn)}</dd></div><div><dt>Revenue to date</dt><dd>${safeMoney(m.earned)}</dd></div><div><dt>Profit to date</dt><dd>${safeMoney(m.profit)}</dd></div></dl>
      <div class="business-trend"><div class="business-trend-label"><small>${isOperating(record) ? 'LATEST MONTH' : 'NEXT STEP'}</small><strong>${isOperating(record) ? safeMoney(lastMonth?.value) : !record.created ? 'Input parameters' : phaseCount(record) === 4 ? 'Start operating' : phaseLabels[Math.min(3, phaseCount(record))]}</strong></div>${sparkline(record)}</div>
      <div class="business-card-foot"><span class="business-stage-mini">${ico(phaseCount(record) === 4 ? 'check' : 'clock')} ${phaseCount(record)} / 4 preparation phases</span><button class="button ghost business-card-action" data-open-business="${esc(record.id)}">View details ${ico('arrow')}</button></div>
    </article>`;
  }

  function home(portfolio) {
    const records = portfolio.businesses || [];
    const earned = records.reduce((sum, r) => sum + Number(values(r).earned || 0), 0);
    const profit = records.reduce((sum, r) => sum + Number(values(r).profit || 0), 0);
    const active = records.filter(isOperating).length;
    return `<div class="portfolio-home">
      ${heading('YOUR PORTFOLIO. YOUR NEXT STEP.', 'My business', 'From the first idea to daily operations. All your businesses in one place.', `<div class="portfolio-header-actions"><button class="button primary portfolio-new" id="new-business">${ico('spark')}New business ${ico('arrow')}</button></div>`)}
      <div class="portfolio-stats result-stats"><div class="stat-card highlight"><small>Total revenue to date</small><strong>${safeMoney(earned)}</strong><p>Across all businesses since launch</p></div><div class="stat-card"><small>Total profit</small><strong>${safeMoney(profit)}</strong><p>After operating costs</p></div><div class="stat-card"><small>Operating businesses</small><strong>${active}<span class="business-stat-suffix"> / ${records.length}</span></strong><p>Businesses that have launched</p></div><div class="stat-card"><small>In preparation</small><strong>${records.length - active}</strong><p>From parameters to the first sale</p></div></div>
      <div class="portfolio-toolbar"><div class="portfolio-filters filter-tabs" aria-label="Filter businesses"><button class="filter-tab active" data-business-filter="all" aria-pressed="true">All businesses <span>${records.length}</span></button><button class="filter-tab" data-business-filter="active" aria-pressed="false">Operating <span>${active}</span></button><button class="filter-tab" data-business-filter="planning" aria-pressed="false">In preparation <span>${records.length - active}</span></button></div><label class="portfolio-search search-box">${ico('search')}<input id="business-search" aria-label="Search my businesses" placeholder="Find a business…" autocomplete="off"></label></div>
      <div class="portfolio-list" id="business-list">${records.map(card).join('')}</div>
      <div class="portfolio-empty empty-state" id="business-empty" ${records.length ? 'hidden' : ''}>${ico('search')}<h2>No businesses match this view.</h2><p>Change the filter or create a new business.</p><button class="button secondary" id="empty-new-business">New business ${ico('arrow')}</button></div>
      <div class="business-note">${ico('circle')}<p>Demo portfolio · Revenue and profit are illustrative. Each new business starts with input parameters and four preparation phases.</p></div>
    </div>`;
  }

  function stat(label, value, description, highlight = false) {
    return `<div class="stat-card ${highlight ? 'highlight' : ''}"><small>${label}</small><strong>${value}</strong><p>${description}</p></div>`;
  }

  function revenueChart(record) {
    const m = values(record), data = m.monthlyRevenue || [];
    const maximum = Math.max(1, ...data.map(x => Number(x.value) || 0));
    return `<section class="panel business-revenue-panel"><div class="business-panel-heading"><div><div class="eyebrow">YOUR BUSINESS IN NUMBERS</div><h2>Monthly revenue</h2><p>${isOperating(record) ? 'Last six months · demo records' : 'Revenue tracking starts when the business launches'}</p></div>${statusPill(isOperating(record) ? 'Operating' : 'Not started yet', isOperating(record) ? 'complete' : '')}</div><div class="business-chart" aria-label="Demo monthly revenue">${data.length && data.some(x => Number(x.value) > 0) ? `<div class="business-chart-bars">${data.map(x => `<div class="business-chart-column"><span class="business-chart-value">${safeMoney(x.value)}</span><div class="business-chart-bar" style="--bar-height:${Math.max(0, Number(x.value) || 0) / maximum * 100}%"></div><span class="business-chart-label">${esc(x.month)}</span></div>`).join('')}</div>` : `<div class="business-chart-empty">${ico('chart')}<strong>Your first revenue is still ahead.</strong><p>Complete preparation and launch your business. Current revenue is ${safeMoney(0)}.</p></div>`}</div><p class="business-chart-note">${isOperating(record) ? 'Total revenue covers the entire operating period; the chart shows the latest recorded months.' : 'Planned preorders from the wizard appear in the preparation results.'}</p></section>`;
  }

  function lifecycle(record) {
    const stages = [{ title: 'Parameters', desc: 'Initial brief', done: record.created, step: 0 }, ...(record.phases || []).map((p, i) => ({ title: phaseLabels[i], desc: phaseStatus(p.status), done: p.status === 'complete', step: i + 1, status: p.status })), { title: 'Operations', desc: isOperating(record) ? 'Operating' : 'Not started yet', done: isOperating(record), operation: true }];
    return `<div class="business-lifecycle" aria-label="Journey from preparation to operations">${stages.map((s, i) => {
      const enabled = s.operation || s.step === 0 || record.created && (s.step === 1 || record.phases[s.step - 2]?.status === 'complete');
      const current = !s.done && enabled;
      return `<button class="business-lifecycle-step ${s.done ? 'complete' : current ? 'current' : 'upcoming'}" ${s.operation ? 'data-business-operation' : `data-business-step="${s.step}"`} ${enabled ? '' : 'disabled'}><span class="business-life-dot">${s.done ? ico('check') : String(i + 1).padStart(2, '0')}</span><span><strong>${s.title}</strong><small>${s.desc}</small></span>${enabled ? ico('arrow') : ico('lock')}</button>`;
    }).join('')}</div>`;
  }

  function activities(record) {
    const m = values(record), activity = m.activity || [];
    return `<section class="panel business-activity-panel"><div class="business-panel-heading"><div><div class="eyebrow">BUSINESS ACTIVITY LOG</div><h2>Recent activity</h2></div>${ico('clock')}</div><ol class="business-activity">${activity.length ? activity.map((a, i) => `<li class="business-activity-item"><span class="business-activity-dot ${i === 0 ? 'current' : ''}"></span><div><span class="business-activity-date">${dateLabel(a.date)}</span><h3>${esc(a.label)}</h3><p>${esc(a.description)}</p></div></li>`).join('') : `<li class="business-activity-item"><span class="business-activity-dot current"></span><div><span class="business-activity-date">${dateLabel(m.preparedOn)}</span><h3>Project preparation</h3><p>Input parameters are ready. Product Market Fit is the next step.</p></div></li>`}</ol></section>`;
  }

  function nextAction(record) {
    const m = values(record), completed = phaseCount(record);
    const description = m.nextAction || (completed < 4 ? `Continue preparation with the ${phaseLabels[completed]} phase.` : 'Review the preparation results and launch plan.');
    const launchReady = completed === 4 && !isOperating(record);
    return `<section class="panel business-next-action"><span class="panel-icon">${ico('spark')}</span><div><div class="eyebrow">NEXT STEP</div><h2>${isOperating(record) ? 'Grow what is already working.' : completed === 4 ? 'Ready to launch.' : 'Continue preparing your business.'}</h2><p>${esc(description)}</p></div><button class="button primary" ${completed < 4 ? `data-business-step="${record.created ? completed + 1 : 0}"` : launchReady ? 'data-business-launch' : 'data-business-results'}>${completed < 4 ? 'Continue preparation' : launchReady ? 'Launch demo business' : 'Preparation results'}${ico('arrow')}</button></section>`;
  }

  function params(record) {
    const p = record.params, m = values(record);
    const entries = [['Project name', p.name], ['Industry', p.industry], ['Target market', p.region], ['Starting capital', safeMoney(p.capital)], ['Target payback period', `${p.roi} months`], ['Preparation started', dateLabel(m.preparedOn)], ['Founder advantages', p.advantages], ['Additional context', p.notes || 'Not provided'], ['Existing website', p.website || 'Not provided'], ['LinkedIn / social profile', p.linkedin || 'Not provided']];
    return `<section class="panel business-parameters"><div class="business-panel-heading"><div><div class="eyebrow">01 / INPUT PARAMETERS</div><h2>Business foundations</h2><p>The brief used throughout all four preparation phases.</p></div><button class="button secondary" data-business-step="0">${ico('edit')}Parameters</button></div><dl class="business-params-grid">${entries.map(([key, value]) => `<div class="${key === 'Founder advantages' || key === 'Additional context' ? 'business-param-wide' : ''}"><dt>${key}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl></section>`;
  }

  function phaseCards(record) {
    const p = profile(record);
    return `<div class="business-phase-cards">${(record.phases || []).map((phase, i) => {
      const enabled = i === 0 && record.created || i > 0 && record.phases[i - 1].status === 'complete';
      const done = phase.status === 'complete';
      return `<section class="panel business-phase-card"><div class="business-phase-label"><span>0${i + 2} / PREPARATION PHASE</span>${statusPill(phaseStatus(phase.status), done ? 'complete' : phase.status === 'running' ? 'running' : '')}</div><h2>${phaseLabels[i]}</h2><p class="business-phase-summary">${esc(p.phases[i])}</p><div class="business-phase-output"><small>${done ? 'SAVED RESULT' : 'EXPECTED OUTPUT'}</small><strong>${['50 selected ideas and business plans', '30 strategies, ideal customer profiles and a pricing catalogue', '15 ideas with marketing metrics', 'Preorders and a financial model'][i]}</strong></div><div class="business-phase-footer"><span>${ico('clock')}${PHASES[i].duration}</span><button class="button ghost" data-business-step="${i + 1}" ${enabled ? '' : 'disabled'}>${done ? 'View details' : phase.status === 'running' || phase.status === 'paused' ? 'Open process' : 'Open phase'}${ico(enabled ? 'arrow' : 'lock')}</button></div></section>`;
    }).join('')}</div>`;
  }

  function assets(record) {
    const m = values(record), p = profile(record);
    const items = m.assets.length ? m.assets : p.assets;
    return `<section class="business-assets-section"><div class="business-panel-heading"><div><div class="eyebrow">FROM PREPARATION TO DAILY USE</div><h2>Website, offer and operational materials</h2><p>${isOperating(record) ? 'Materials used in day-to-day operations.' : 'Planned materials for launching the business.'}</p></div></div><div class="business-assets">${items.length ? items.map((a, index) => `<article class="panel business-asset-card"><div class="business-asset-top"><span class="panel-icon">${ico(String(a.type).toUpperCase() === 'WEBSITE' || String(a.type).toUpperCase() === 'DRAFT' ? 'grid' : String(a.type).toUpperCase() === 'FINANCE' ? 'chart' : 'file')}</span><span class="business-kind">${esc(a.type)}</span></div><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p><span class="business-asset-status">${ico(isOperating(record) ? 'check' : 'clock')}${isOperating(record) ? 'In use · demo' : 'In preparation · demo'}</span><button class="button ghost business-asset-action" data-business-asset="${index}">View description ${ico('arrow')}</button></article>`).join('') : '<div class="panel business-asset-card"><span class="panel-icon">' + ico('file') + '</span><h3>Materials are created during each phase</h3><p>Business plans, a catalogue, a marketing concept and a sales offer will be available in the results of completed phases.</p></div>'}</div></section>`;
  }

  function operations(record) {
    const m = values(record), p = profile(record), operating = isOperating(record);
    const average = Number(m.orders) > 0 ? Number(m.earned) / Number(m.orders) : 0;
    const margin = Number(m.earned) > 0 ? Number(m.profit) / Number(m.earned) * 100 : 0;
    return `<div class="business-operation-grid"><section class="panel business-operation-panel"><div class="business-panel-heading"><div><div class="eyebrow">DAILY OPERATIONS</div><h2>${operating ? 'Sales and efficiency' : 'Business launch plan'}</h2><p>${esc(p.channel)}</p></div>${statusPill(operating ? 'Operating' : 'Not started', operating ? 'complete' : '')}</div><dl class="business-params-grid"><div><dt>${p.unit}</dt><dd>${number(m.orders)}</dd></div><div><dt>${p.customers}</dt><dd>${number(m.customers)}</dd></div><div><dt>Average revenue per sale</dt><dd>${safeMoney(average)}</dd></div><div><dt>Profit margin</dt><dd>${number(margin)}%</dd></div><div><dt>Started operating</dt><dd>${dateLabel(m.startedOn)}</dd></div><div><dt>Operating status</dt><dd>${operating ? 'Business is operating' : 'Preparation is in progress'}</dd></div></dl></section><section class="panel business-channels-panel"><div class="business-panel-heading"><div><div class="eyebrow">WHERE CUSTOMERS COME FROM</div><h2>${operating ? 'Active channels' : 'Planned channels'}</h2><p>An illustrative view of channels and activities.</p></div></div><div class="table-wrap"><table class="business-channel-table"><thead><tr><th>CHANNEL</th><th>ACTIVITY</th><th>DEMO RESULT</th></tr></thead><tbody>${p.channels.map(row => `<tr>${row.map(value => `<td>${esc(operating ? value : value.match(/\d/) ? 'Awaiting launch' : value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section></div>${assets(record)}`;
  }

  function detail(record) {
    const m = values(record), p = profile(record), [label, kind] = status(record);
    return `<div class="business-detail"><button class="button ghost business-back" id="back-businesses">← My business</button>
      ${heading(p.label, esc(record.params.name), esc(m.description || p.summary), `<div class="business-title-actions">${statusPill(label, kind)}<button class="button secondary" data-business-step="0">${ico('edit')}Project parameters</button></div>`)}
      <div class="result-stats business-detail-stats">${stat('Revenue to date', safeMoney(m.earned), isOperating(record) ? `Operating since ${dateLabel(m.startedOn)}` : 'The business has not launched yet', true)}${stat('Profit to date', safeMoney(m.profit), 'Revenue after costs')}${stat(p.unit, number(m.orders), isOperating(record) ? 'Recorded since launch' : 'Awaiting business launch')}${stat('Business preparation', `${phaseCount(record)} <span class="business-stat-suffix">/ 4</span>`, 'Completed wizard phases')}</div>
      ${lifecycle(record)}
      <div class="business-tabs filter-tabs" role="tablist" aria-label="Business details"><button class="filter-tab active" role="tab" id="business-tab-overview" data-business-tab="overview" aria-selected="true" aria-pressed="true" aria-controls="business-pane-overview">Overview</button><button class="filter-tab" role="tab" id="business-tab-preparation" data-business-tab="preparation" aria-selected="false" aria-pressed="false" aria-controls="business-pane-preparation" tabindex="-1">Preparation</button><button class="filter-tab" role="tab" id="business-tab-operations" data-business-tab="operations" aria-selected="false" aria-pressed="false" aria-controls="business-pane-operations" tabindex="-1">Operations</button></div>
      <div class="business-tab-panel" role="tabpanel" id="business-pane-overview" aria-labelledby="business-tab-overview">${nextAction(record)}<div class="business-overview-grid">${revenueChart(record)}${activities(record)}</div>${assets(record)}</div>
      <div class="business-tab-panel" role="tabpanel" id="business-pane-preparation" aria-labelledby="business-tab-preparation" hidden>${params(record)}<div class="business-preparation-intro"><div><div class="eyebrow">FOUR PHASES. ONE BUSINESS DIRECTION.</div><h2>Complete preparation history</h2><p>Open any available phase to view its inputs, agent workflow and detailed results.</p></div>${phaseCount(record) ? `<button class="button secondary" data-business-results">${ico('chart')}All preparation results</button>` : ''}</div>${phaseCards(record)}</div>
      <div class="business-tab-panel" role="tabpanel" id="business-pane-operations" aria-labelledby="business-tab-operations" hidden>${operations(record)}</div>
      <div class="business-note">${ico('circle')}<p>All displayed revenue, orders, channels and materials are demo data. Preparation and operational metrics belong to this business.</p></div>
    </div>`;
  }

  function bindHome(portfolio, handlers) {
    const root = document.querySelector('.portfolio-home');
    if (!root) return;
    root.querySelectorAll('[data-open-business]').forEach(button => button.onclick = () => handlers.openBusiness(button.dataset.openBusiness));
    root.querySelector('#new-business').onclick = handlers.newBusiness;
    root.querySelector('#empty-new-business').onclick = handlers.newBusiness;
    let filter = 'all';
    const search = root.querySelector('#business-search');
    const applyFilter = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let count = 0;
      root.querySelectorAll('[data-business-card]').forEach(item => {
        const visible = (filter === 'all' || item.dataset.businessStatus === filter) && item.dataset.businessSearch.includes(query);
        item.hidden = !visible;
        if (visible) count++;
      });
      root.querySelector('#business-empty').hidden = count > 0;
    };
    root.querySelectorAll('[data-business-filter]').forEach(button => button.onclick = () => {
      filter = button.dataset.businessFilter;
      root.querySelectorAll('[data-business-filter]').forEach(tab => { tab.classList.toggle('active', tab === button); tab.setAttribute('aria-pressed', String(tab === button)); });
      applyFilter();
    });
    search.oninput = applyFilter;
  }

  function bindDetail(record, handlers) {
    const root = document.querySelector('.business-detail');
    if (!root) return;
    root.querySelector('#back-businesses').onclick = handlers.back;
    root.querySelectorAll('[data-business-step]').forEach(button => button.onclick = () => handlers.openStep(Number(button.dataset.businessStep)));
    root.querySelectorAll('[data-business-results]').forEach(button => button.onclick = handlers.results);
    root.querySelectorAll('[data-business-launch]').forEach(button => button.onclick = handlers.launch);
    root.querySelectorAll('[data-business-asset]').forEach(button => button.onclick = () => {
      const m = values(record), p = profile(record);
      const asset = (m.assets.length ? m.assets : p.assets)[Number(button.dataset.businessAsset)];
      if (!asset) return;
      const stage = isOperating(record) ? 'In use' : 'In preparation';
      showDialog(`<div class="dialog-kicker">${esc(asset.type)} · ${esc(record.params.name)} · DEMO</div><h2>${esc(asset.title)}</h2><p class="dialog-text">${esc(asset.description)}</p><div class="dialog-grid"><section><h3>Where it is used</h3><p>${esc(p.channel)} for ${esc(record.params.name)}. Target market: ${esc(record.params.region)}.</p></section><section><h3>Status</h3><p>${stage}. ${isOperating(record) ? 'Operations started on ' + dateLabel(m.startedOn) + '.' : 'This material is part of preparation before launch.'}</p></section><section><h3>Offer foundations</h3><p>${esc(record.params.notes || p.summary)}</p></section><section><h3>Next activity</h3><p>${esc(m.nextAction || 'Continue the wizard and review the preparation results.')}</p></section></div><p class="small-note">This is a demo material description. For the business plan, agent scores and finances, open completed phases in the Preparation tab.</p>`);
    });
    const tabs = [...root.querySelectorAll('[data-business-tab]')];
    const activate = (tabName, focus = false) => {
      tabs.forEach(button => {
        const selected = button.dataset.businessTab === tabName;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-selected', String(selected));
        button.setAttribute('aria-pressed', String(selected));
        button.tabIndex = selected ? 0 : -1;
        root.querySelector(`#business-pane-${button.dataset.businessTab}`).hidden = !selected;
        if (selected && focus) button.focus();
      });
    };
    tabs.forEach((button, index) => {
      button.onclick = () => activate(button.dataset.businessTab);
      button.onkeydown = event => {
        let target = -1;
        if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') target = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = tabs.length - 1;
        if (target >= 0) { event.preventDefault(); activate(tabs[target].dataset.businessTab, true); }
      };
    });
    root.querySelectorAll('[data-business-operation]').forEach(button => button.onclick = () => activate('operations', true));
  }

  return { home, detail, bindHome, bindDetail };
})();
