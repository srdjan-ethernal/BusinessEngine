'use strict';

window.BusinessViews = (() => {
  const phaseLabels = ['Product Market Fit', 'Go-To-Market', 'Marketing', 'Sales'];
  const profiles = {
    robot: {
      label: 'ROBOTIKA & AUTOMATIZACIJA', icon: 'robot', color: 'robot',
      unit: 'Porudžbine', customers: 'B2B kupci', channel: 'Direktna B2B prodaja',
      summary: 'Modularne robotske ćelije za paletizaciju i automatizaciju proizvodnje, uz integraciju, obuku i servis.',
      phases: [
        'Potreba za fleksibilnim robotskim ćelijama potvrđena je razgovorima sa proizvodnim kompanijama. Odabrane su ideje sa servisnim prihodom i jasnom uštedom rada.',
        'Ciljni kupci su male i srednje fabrike u Srbiji i DACH regionu. Ponudu čine pilot ćelija, integracija i godišnji servis.',
        'Pripremljeni su sajt sa studijama slučaja, LinkedIn kampanje i email sekvence. Upoređeni su troškovi kvalifikovanih upita.',
        'Završene su demo ponude, prednarudžbine i finansijski model. Najviše interesovanja dobila je cobot paletizacija.'
      ],
      assets: [
        { title: 'Robot factory · prodajni sajt', type: 'SAJT', description: 'Katalog robotskih ćelija, ušteda po smeni, reference i zahtev za demonstraciju.' },
        { title: 'Katalog i servisni paketi', type: 'PONUDA', description: 'Pilot ćelija, kompletna integracija i ugovor za održavanje.' },
        { title: 'Prodajni tok za fabrike', type: 'PRODAJA', description: 'Upit → procena proizvodne linije → pilot → ugovor → instalacija.' }
      ],
      channels: [ ['Direktna prodaja', 'Pozivi i demo sastanci', '46 kvalifikovanih upita'], ['LinkedIn', 'Studije slučaja i poruke', '1.840 poseta'], ['Preporuke partnera', 'Integratori i postojeći kupci', '8 novih kontakata'] ]
    },
    dropshipping: {
      label: 'E-COMMERCE & DROPSHIPPING', icon: 'cart', color: 'dropshipping',
      unit: 'Porudžbine', customers: 'Kupci', channel: 'Online prodavnica',
      summary: 'Online prodavnica funkcionalnih dodataka za dom, sa isporukom od odabranih dobavljača i fokusom na ponovnu kupovinu.',
      phases: [
        'Izabrana je niša organizacije doma. Ideje su poređene po potražnji, marži, pouzdanosti dobavljača i vremenu isporuke.',
        'Definisani su ciljna publika, ponuda, cene i početni katalog. Dobavljači su procenjeni prema kvalitetu i uslovima povrata.',
        'Testirani su oglasi, stranice proizvoda i email dobrodošlice. Izabrani su proizvodi sa najboljim odnosom troška i interesovanja.',
        'Demo porudžbine potvrdile su najtraženije proizvode. Prodavnica je spremna za redovno praćenje porudžbina i marže.'
      ],
      assets: [
        { title: 'Dropshipping · prodavnica', type: 'SAJT', description: 'Katalog, stranice proizvoda, korpa i demo evidencija porudžbina.' },
        { title: 'Katalog dobavljača', type: 'NABAVKA', description: 'Nabavne cene, planirane marže, rokovi isporuke i uslovi povrata.' },
        { title: 'Email tok za kupce', type: 'MARKETING', description: 'Dobrodošlica, napuštena korpa i preporuke za ponovnu kupovinu.' }
      ],
      channels: [ ['Meta oglasi', 'Proizvodi za organizaciju doma', '5.420 poseta'], ['Google Shopping', 'Pretrage sa namerom kupovine', '2.180 poseta'], ['Email', 'Ponovna kupovina', '124 povratna kupca'] ]
    },
    affiliate: {
      label: 'CONTENT & AFFILIATE', icon: 'link', color: 'affiliate',
      unit: 'Prodaje preko linkova', customers: 'Aktivni sadržaji', channel: 'Preporuke i partnerski linkovi',
      summary: 'Sadržaj sa vodičima i poređenjima proizvoda za kućnu kancelariju. Plan prihoda zasniva se na provizijama od partnerskih preporuka.',
      phases: [
        'Istražuju se teme, potrebe čitalaca i konkurencija u opremanju kućne kancelarije. Cilj je izbor niše sa korisnim poređenjima i jasnom namerom kupovine.',
        'Pripremaju se publika, izbor proizvoda i sadržajni katalog. Definišu se struktura sajta i način označavanja partnerskih linkova.',
        'Planirani su SEO vodiči, poređenja i newsletter. Test treba da pokaže koji sadržaji donose čitaoce i klikove ka proizvodima.',
        'Predstoji provera klikova, evidentiranih partnerskih prodaja i očekivanih provizija pre početka redovnog rada.'
      ],
      assets: [
        { title: 'Amazon referrals · koncept sajta', type: 'NACRT', description: 'Vodiči za kućnu kancelariju, poređenja i jasno označeni partnerski linkovi.' },
        { title: 'Plan prvih 20 članaka', type: 'SADRŽAJ', description: 'Teme, ključne pretrage, odabrani proizvodi i redosled objavljivanja.' },
        { title: 'Model provizija', type: 'FINANSIJE', description: 'Scenariji broja poseta, klikova, partnerskih prodaja i prihoda.' }
      ],
      channels: [ ['Organska pretraga', 'Vodiči i poređenja proizvoda', 'Planirano'], ['Newsletter', 'Preporuke za pretplatnike', 'Planirano'], ['Partnerski linkovi', 'Praćenje klikova i provizija', 'Planirano'] ]
    },
    custom: {
      label: 'NOVI POSLOVNI PODUHVAT', icon: 'spark', color: 'custom',
      unit: 'Porudžbine', customers: 'Kupci', channel: 'Kanali iz poslovnog plana',
      summary: 'Poslovni projekat razvija se od ulaznih parametara do provere tržišta, marketinga i prodaje.',
      phases: [
        'Agenti istražuju problem, tržište i moguće poslovne modele, a zatim rangiraju poslovne ideje.',
        'Za odabrane ideje pripremaju se ciljna publika, region, cenovnik, katalog i prodajni kanali.',
        'Jednak test budžet omogućava poređenje poseta, email odgovora i pretplata po ideji.',
        'Pripremaju se ponude i demo prednarudžbine, uz finansijski model i očekivani rok povrata.'
      ],
      assets: [],
      channels: [ ['Sajt', 'Prezentacija odabrane ponude', 'U pripremi'], ['Marketing', 'Testiranje prodajnih kanala', 'U pripremi'], ['Prodaja', 'Validacija interesovanja', 'U pripremi'] ]
    }
  };

  const profile = record => profiles[record.meta?.kind] || profiles.custom;
  const values = record => ({ earned: 0, profit: 0, orders: 0, customers: 0, monthlyRevenue: [], activity: [], assets: [], ...record.meta });
  const phaseCount = record => (record.phases || []).filter(p => p.status === 'complete').length;
  const isOperating = record => Boolean(record.meta?.startedOn);
  const dateLabel = value => {
    if (!value) return 'Još nije počeo';
    const parts = String(value).slice(0, 10).split('-').map(Number);
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return Number.isNaN(date.getTime()) ? esc(value) : new Intl.DateTimeFormat('sr-Latn-RS', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
  };
  const status = record => isOperating(record) ? ['U radu', 'complete'] : record.meta?.status === 'validation' ? ['Validacija', ''] : ['Nije počeo', ''];
  const phaseStatus = value => ({ complete: 'Završeno', running: 'U toku', paused: 'Pauzirano', idle: 'Čeka početak' })[value] || 'Čeka početak';
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
    return `<svg class="business-sparkline" viewBox="0 0 148 48" fill="none" role="img" aria-label="${isOperating(record) ? 'Trend mesečnog demo prihoda' : 'Prihod još nije ostvaren'}"><path d="M6 43H142" stroke="currentColor" opacity=".12"/><polyline points="${points}" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  }

  function card(record) {
    const p = profile(record), m = values(record), [label, kind] = status(record);
    const lastMonth = m.monthlyRevenue[m.monthlyRevenue.length - 1];
    return `<article class="business-card" data-business-card="${esc(record.id)}" data-business-status="${isOperating(record) ? 'active' : 'planning'}" data-business-search="${esc(`${record.params.name} ${p.label} ${record.params.industry}`.toLocaleLowerCase())}">
      <div class="business-card-head">${mark(record)}${statusPill(label, kind)}</div>
      <div class="business-kind">${p.label}</div><h2 class="business-name">${esc(record.params.name)}</h2>
      <p class="business-description">${esc(m.description || p.summary)}</p>
      <dl class="business-card-metrics"><div><dt>Početak rada</dt><dd class="business-date ${isOperating(record) ? '' : 'business-not-started'}">${dateLabel(m.startedOn)}</dd></div><div><dt>Prihod od početka</dt><dd>${safeMoney(m.earned)}</dd></div><div><dt>Profit do sada</dt><dd>${safeMoney(m.profit)}</dd></div></dl>
      <div class="business-trend"><div class="business-trend-label"><small>${isOperating(record) ? 'POSLEDNJI MESEC' : 'SLEDEĆI KORAK'}</small><strong>${isOperating(record) ? safeMoney(lastMonth?.value) : !record.created ? 'Ulazni parametri' : phaseCount(record) === 4 ? 'Početak poslovanja' : phaseLabels[Math.min(3, phaseCount(record))]}</strong></div>${sparkline(record)}</div>
      <div class="business-card-foot"><span class="business-stage-mini">${ico(phaseCount(record) === 4 ? 'check' : 'clock')} ${phaseCount(record)} / 4 faze pripreme</span><button class="button ghost business-card-action" data-open-business="${esc(record.id)}">Svi detalji ${ico('arrow')}</button></div>
    </article>`;
  }

  function home(portfolio) {
    const records = portfolio.businesses || [];
    const earned = records.reduce((sum, r) => sum + Number(values(r).earned || 0), 0);
    const profit = records.reduce((sum, r) => sum + Number(values(r).profit || 0), 0);
    const active = records.filter(isOperating).length;
    return `<div class="portfolio-home">
      ${heading('VAŠ PORTFOLIO. VAŠ SLEDEĆI KORAK.', 'My business', 'Od prve ideje do svakodnevnog poslovanja. Svi vaši biznisi na jednom mestu.', `<div class="portfolio-header-actions"><button class="button primary portfolio-new" id="new-business">${ico('spark')}New business ${ico('arrow')}</button></div>`)}
      <div class="portfolio-stats result-stats"><div class="stat-card highlight"><small>Ukupan prihod do sada</small><strong>${safeMoney(earned)}</strong><p>Od početka rada svih biznisa</p></div><div class="stat-card"><small>Ukupan profit</small><strong>${safeMoney(profit)}</strong><p>Posle operativnih troškova</p></div><div class="stat-card"><small>Biznisi u radu</small><strong>${active}<span class="business-stat-suffix"> / ${records.length}</span></strong><p>Pokrenuti poslovni poduhvati</p></div><div class="stat-card"><small>U pripremi</small><strong>${records.length - active}</strong><p>Od parametara do prve prodaje</p></div></div>
      <div class="portfolio-toolbar"><div class="portfolio-filters filter-tabs" aria-label="Filtriraj biznise"><button class="filter-tab active" data-business-filter="all" aria-pressed="true">Svi biznisi <span>${records.length}</span></button><button class="filter-tab" data-business-filter="active" aria-pressed="false">U radu <span>${active}</span></button><button class="filter-tab" data-business-filter="planning" aria-pressed="false">U pripremi <span>${records.length - active}</span></button></div><label class="portfolio-search search-box">${ico('search')}<input id="business-search" aria-label="Pretraži moje biznise" placeholder="Pronađite biznis…" autocomplete="off"></label></div>
      <div class="portfolio-list" id="business-list">${records.map(card).join('')}</div>
      <div class="portfolio-empty empty-state" id="business-empty" ${records.length ? 'hidden' : ''}>${ico('search')}<h2>Nema biznisa za ovaj prikaz.</h2><p>Promenite filter ili kreirajte novi biznis.</p><button class="button secondary" id="empty-new-business">New business ${ico('arrow')}</button></div>
      <div class="business-note">${ico('circle')}<p>Demo portfolio · Prihod i profit su ilustrativni podaci. Novi biznis krećete kroz ulazne parametre i četiri faze pripreme.</p></div>
    </div>`;
  }

  function stat(label, value, description, highlight = false) {
    return `<div class="stat-card ${highlight ? 'highlight' : ''}"><small>${label}</small><strong>${value}</strong><p>${description}</p></div>`;
  }

  function revenueChart(record) {
    const m = values(record), data = m.monthlyRevenue || [];
    const maximum = Math.max(1, ...data.map(x => Number(x.value) || 0));
    return `<section class="panel business-revenue-panel"><div class="business-panel-heading"><div><div class="eyebrow">POSLOVANJE U BROJEVIMA</div><h2>Mesečni prihod</h2><p>${isOperating(record) ? 'Poslednjih šest meseci · demo evidencija' : 'Prihod će se pratiti od početka rada'}</p></div>${statusPill(isOperating(record) ? 'U radu' : 'Još nije počeo', isOperating(record) ? 'complete' : '')}</div><div class="business-chart" aria-label="Demo prihod po mesecima">${data.length && data.some(x => Number(x.value) > 0) ? `<div class="business-chart-bars">${data.map(x => `<div class="business-chart-column"><span class="business-chart-value">${safeMoney(x.value)}</span><div class="business-chart-bar" style="--bar-height:${Math.max(0, Number(x.value) || 0) / maximum * 100}%"></div><span class="business-chart-label">${esc(x.month)}</span></div>`).join('')}</div>` : `<div class="business-chart-empty">${ico('chart')}<strong>Prva zarada tek dolazi.</strong><p>Završite pripremu i pokrenite poslovanje. Trenutni prihod je ${safeMoney(0)}.</p></div>`}</div><p class="business-chart-note">${isOperating(record) ? 'Ukupan prihod obuhvata ceo period poslovanja; grafikon prikazuje poslednje evidentirane mesece.' : 'Planirane prednarudžbine iz čarobnjaka prikazuju se u rezultatima pripreme.'}</p></section>`;
  }

  function lifecycle(record) {
    const stages = [{ title: 'Parametri', desc: 'Ulazni brief', done: record.created, step: 0 }, ...(record.phases || []).map((p, i) => ({ title: phaseLabels[i], desc: phaseStatus(p.status), done: p.status === 'complete', step: i + 1, status: p.status })), { title: 'Poslovanje', desc: isOperating(record) ? 'U radu' : 'Još nije počeo', done: isOperating(record), operation: true }];
    return `<div class="business-lifecycle" aria-label="Put od pripreme do poslovanja">${stages.map((s, i) => {
      const enabled = s.operation || s.step === 0 || record.created && (s.step === 1 || record.phases[s.step - 2]?.status === 'complete');
      const current = !s.done && enabled;
      return `<button class="business-lifecycle-step ${s.done ? 'complete' : current ? 'current' : 'upcoming'}" ${s.operation ? 'data-business-operation' : `data-business-step="${s.step}"`} ${enabled ? '' : 'disabled'}><span class="business-life-dot">${s.done ? ico('check') : String(i + 1).padStart(2, '0')}</span><span><strong>${s.title}</strong><small>${s.desc}</small></span>${enabled ? ico('arrow') : ico('lock')}</button>`;
    }).join('')}</div>`;
  }

  function activities(record) {
    const m = values(record), activity = m.activity || [];
    return `<section class="panel business-activity-panel"><div class="business-panel-heading"><div><div class="eyebrow">EVIDENCIJA BIZNISA</div><h2>Poslednje aktivnosti</h2></div>${ico('clock')}</div><ol class="business-activity">${activity.length ? activity.map((a, i) => `<li class="business-activity-item"><span class="business-activity-dot ${i === 0 ? 'current' : ''}"></span><div><span class="business-activity-date">${dateLabel(a.date)}</span><h3>${esc(a.label)}</h3><p>${esc(a.description)}</p></div></li>`).join('') : `<li class="business-activity-item"><span class="business-activity-dot current"></span><div><span class="business-activity-date">${dateLabel(m.preparedOn)}</span><h3>Priprema projekta</h3><p>Ulazni parametri su spremni. Sledeći korak je Product Market Fit.</p></div></li>`}</ol></section>`;
  }

  function nextAction(record) {
    const m = values(record), completed = phaseCount(record);
    const description = m.nextAction || (completed < 4 ? `Nastavite pripremu kroz fazu ${phaseLabels[completed]}.` : 'Pregledajte rezultate pripreme i plan početka poslovanja.');
    const launchReady = completed === 4 && !isOperating(record);
    return `<section class="panel business-next-action"><span class="panel-icon">${ico('spark')}</span><div><div class="eyebrow">SLEDEĆI KORAK</div><h2>${isOperating(record) ? 'Razvijajte ono što već radi.' : completed === 4 ? 'Spremni za početak.' : 'Nastavite svoju pripremu.'}</h2><p>${esc(description)}</p></div><button class="button primary" ${completed < 4 ? `data-business-step="${record.created ? completed + 1 : 0}"` : launchReady ? 'data-business-launch' : 'data-business-results'}>${completed < 4 ? 'Nastavi pripremu' : launchReady ? 'Pokreni demo poslovanje' : 'Rezultati pripreme'}${ico('arrow')}</button></section>`;
  }

  function params(record) {
    const p = record.params, m = values(record);
    const entries = [['Naziv projekta', p.name], ['Industrija', p.industry], ['Ciljno tržište', p.region], ['Početni kapital', safeMoney(p.capital)], ['Ciljani rok povrata', `${p.roi} meseci`], ['Početak pripreme', dateLabel(m.preparedOn)], ['Prednosti osnivača', p.advantages], ['Dodatni kontekst', p.notes || 'Nije unet'], ['Postojeći sajt', p.website || 'Nije unet'], ['LinkedIn / društvena mreža', p.linkedin || 'Nije uneta']];
    return `<section class="panel business-parameters"><div class="business-panel-heading"><div><div class="eyebrow">01 / ULAZNI PARAMETRI</div><h2>Temelji ovog biznisa</h2><p>Brief korišćen kroz sve četiri faze pripreme.</p></div><button class="button secondary" data-business-step="0">${ico('edit')}Parametri</button></div><dl class="business-params-grid">${entries.map(([key, value]) => `<div class="${key === 'Prednosti osnivača' || key === 'Dodatni kontekst' ? 'business-param-wide' : ''}"><dt>${key}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl></section>`;
  }

  function phaseCards(record) {
    const p = profile(record);
    return `<div class="business-phase-cards">${(record.phases || []).map((phase, i) => {
      const enabled = i === 0 && record.created || i > 0 && record.phases[i - 1].status === 'complete';
      const done = phase.status === 'complete';
      return `<section class="panel business-phase-card"><div class="business-phase-label"><span>0${i + 2} / FAZA PRIPREME</span>${statusPill(phaseStatus(phase.status), done ? 'complete' : phase.status === 'running' ? 'running' : '')}</div><h2>${phaseLabels[i]}</h2><p class="business-phase-summary">${esc(p.phases[i])}</p><div class="business-phase-output"><small>${done ? 'SAČUVANI REZULTAT' : 'OČEKIVANI IZLAZ'}</small><strong>${['50 odabranih ideja i biznis planova', '30 strategija, ICP i katalog cena', '15 ideja sa marketinškim metrikama', 'Prednarudžbine i finansijski model'][i]}</strong></div><div class="business-phase-footer"><span>${ico('clock')}${PHASES[i].duration}</span><button class="button ghost" data-business-step="${i + 1}" ${enabled ? '' : 'disabled'}>${done ? 'Pogledaj detalje' : phase.status === 'running' || phase.status === 'paused' ? 'Otvori proces' : 'Otvori fazu'}${ico(enabled ? 'arrow' : 'lock')}</button></div></section>`;
    }).join('')}</div>`;
  }

  function assets(record) {
    const m = values(record), p = profile(record);
    const items = m.assets.length ? m.assets : p.assets;
    return `<section class="business-assets-section"><div class="business-panel-heading"><div><div class="eyebrow">OD PRIPREME DO UPOTREBE</div><h2>Sajt, ponuda i operativni materijali</h2><p>${isOperating(record) ? 'Pregled materijala koji se koriste u poslovanju.' : 'Planirani materijali za početak poslovanja.'}</p></div></div><div class="business-assets">${items.length ? items.map((a, index) => `<article class="panel business-asset-card"><div class="business-asset-top"><span class="panel-icon">${ico(String(a.type).toUpperCase() === 'SAJT' || String(a.type).toUpperCase() === 'NACRT' ? 'grid' : String(a.type).toUpperCase() === 'FINANSIJE' ? 'chart' : 'file')}</span><span class="business-kind">${esc(a.type)}</span></div><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p><span class="business-asset-status">${ico(isOperating(record) ? 'check' : 'clock')}${isOperating(record) ? 'U upotrebi · demo' : 'U pripremi · demo'}</span><button class="button ghost business-asset-action" data-business-asset="${index}">Opis materijala ${ico('arrow')}</button></article>`).join('') : '<div class="panel business-asset-card"><span class="panel-icon">' + ico('file') + '</span><h3>Materijali nastaju kroz faze</h3><p>Biznis planovi, katalog, marketinški koncept i prodajna ponuda biće dostupni u rezultatima završenih faza.</p></div>'}</div></section>`;
  }

  function operations(record) {
    const m = values(record), p = profile(record), operating = isOperating(record);
    const average = Number(m.orders) > 0 ? Number(m.earned) / Number(m.orders) : 0;
    const margin = Number(m.earned) > 0 ? Number(m.profit) / Number(m.earned) * 100 : 0;
    return `<div class="business-operation-grid"><section class="panel business-operation-panel"><div class="business-panel-heading"><div><div class="eyebrow">SVAKODNEVNI RAD</div><h2>${operating ? 'Prodaja i efikasnost' : 'Plan početka poslovanja'}</h2><p>${esc(p.channel)}</p></div>${statusPill(operating ? 'U radu' : 'Nije počeo', operating ? 'complete' : '')}</div><dl class="business-params-grid"><div><dt>${p.unit}</dt><dd>${number(m.orders)}</dd></div><div><dt>${p.customers}</dt><dd>${number(m.customers)}</dd></div><div><dt>Prosečan prihod po prodaji</dt><dd>${safeMoney(average)}</dd></div><div><dt>Profitna marža</dt><dd>${number(margin)}%</dd></div><div><dt>Početak rada</dt><dd>${dateLabel(m.startedOn)}</dd></div><div><dt>Operativni status</dt><dd>${operating ? 'Poslovanje je pokrenuto' : 'Priprema je u toku'}</dd></div></dl></section><section class="panel business-channels-panel"><div class="business-panel-heading"><div><div class="eyebrow">ODAKLE DOLAZE KUPCI</div><h2>${operating ? 'Kanali u upotrebi' : 'Planirani kanali'}</h2><p>Ilustrativni pregled kanala i aktivnosti.</p></div></div><div class="table-wrap"><table class="business-channel-table"><thead><tr><th>KANAL</th><th>AKTIVNOST</th><th>DEMO REZULTAT</th></tr></thead><tbody>${p.channels.map(row => `<tr>${row.map(value => `<td>${esc(operating ? value : value.match(/\d/) ? 'Čeka početak rada' : value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section></div>${assets(record)}`;
  }

  function detail(record) {
    const m = values(record), p = profile(record), [label, kind] = status(record);
    return `<div class="business-detail"><button class="button ghost business-back" id="back-businesses">← My business</button>
      ${heading(p.label, esc(record.params.name), esc(m.description || p.summary), `<div class="business-title-actions">${statusPill(label, kind)}<button class="button secondary" data-business-step="0">${ico('edit')}Parametri projekta</button></div>`)}
      <div class="result-stats business-detail-stats">${stat('Prihod od početka', safeMoney(m.earned), isOperating(record) ? `Posluje od ${dateLabel(m.startedOn)}` : 'Poslovanje još nije počelo', true)}${stat('Profit do sada', safeMoney(m.profit), 'Prihod umanjen za troškove')}${stat(p.unit, number(m.orders), isOperating(record) ? 'Evidentirano od početka rada' : 'Čeka početak poslovanja')}${stat('Priprema biznisa', `${phaseCount(record)} <span class="business-stat-suffix">/ 4</span>`, 'Završene faze čarobnjaka')}</div>
      ${lifecycle(record)}
      <div class="business-tabs filter-tabs" role="tablist" aria-label="Detalji biznisa"><button class="filter-tab active" role="tab" id="business-tab-overview" data-business-tab="overview" aria-selected="true" aria-pressed="true" aria-controls="business-pane-overview">Pregled</button><button class="filter-tab" role="tab" id="business-tab-preparation" data-business-tab="preparation" aria-selected="false" aria-pressed="false" aria-controls="business-pane-preparation" tabindex="-1">Priprema</button><button class="filter-tab" role="tab" id="business-tab-operations" data-business-tab="operations" aria-selected="false" aria-pressed="false" aria-controls="business-pane-operations" tabindex="-1">Poslovanje</button></div>
      <div class="business-tab-panel" role="tabpanel" id="business-pane-overview" aria-labelledby="business-tab-overview">${nextAction(record)}<div class="business-overview-grid">${revenueChart(record)}${activities(record)}</div>${assets(record)}</div>
      <div class="business-tab-panel" role="tabpanel" id="business-pane-preparation" aria-labelledby="business-tab-preparation" hidden>${params(record)}<div class="business-preparation-intro"><div><div class="eyebrow">ČETIRI FAZE. JEDAN POSLOVNI PRAVAC.</div><h2>Kompletna istorija pripreme</h2><p>Otvorite bilo koju dostupnu fazu za ulaze, tok agenata i detaljne rezultate.</p></div>${phaseCount(record) ? `<button class="button secondary" data-business-results">${ico('chart')}Svi rezultati pripreme</button>` : ''}</div>${phaseCards(record)}</div>
      <div class="business-tab-panel" role="tabpanel" id="business-pane-operations" aria-labelledby="business-tab-operations" hidden>${operations(record)}</div>
      <div class="business-note">${ico('circle')}<p>Svi prikazani prihodi, porudžbine, kanali i materijali su demo podaci. Priprema i operativni pokazatelji pripadaju samo ovom biznisu.</p></div>
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
      const stage = isOperating(record) ? 'U upotrebi' : 'U pripremi';
      showDialog(`<div class="dialog-kicker">${esc(asset.type)} · ${esc(record.params.name)} · DEMO</div><h2>${esc(asset.title)}</h2><p class="dialog-text">${esc(asset.description)}</p><div class="dialog-grid"><section><h3>Gde se koristi</h3><p>${esc(p.channel)} u okviru biznisa ${esc(record.params.name)}. Ciljno tržište: ${esc(record.params.region)}.</p></section><section><h3>Status</h3><p>${stage}. ${isOperating(record) ? 'Poslovanje je započelo ' + dateLabel(m.startedOn) + '.' : 'Materijal je deo pripreme pre početka poslovanja.'}</p></section><section><h3>Osnova ponude</h3><p>${esc(record.params.notes || p.summary)}</p></section><section><h3>Sledeća aktivnost</h3><p>${esc(m.nextAction || 'Nastavite čarobnjak i pregledajte rezultate pripreme.')}</p></section></div><p class="small-note">Ovo je opis demo materijala. Za poslovni plan, ocene agenata i finansije otvorite završene faze na kartici Priprema.</p>`);
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
