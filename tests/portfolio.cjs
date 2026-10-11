const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');

const dist = path.join(__dirname, '..');
const STORAGE = 'forge-businesses-v2';
const LEGACY = 'forge-business-engine-v1';
const INITIAL_TIME = Date.UTC(2026, 9, 11, 10, 0);

function boot(initialStorage = {}) {
  let now = INITIAL_TIME;
  const stored = { ...initialStorage };
  class DemoClock extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  const nodes = new Map();
  const node = selector => {
    if (!nodes.has(selector)) nodes.set(selector, {
      innerHTML: '', textContent: '', dataset: {}, style: {},
      classList: { add() {}, remove() {}, toggle() {} },
      setAttribute() {}, removeAttribute() {}, addEventListener() {},
      querySelector: q => node(q), querySelectorAll: () => [],
    });
    return nodes.get(selector);
  };
  const document = { querySelector: node, querySelectorAll: () => [] };
  const context = vm.createContext({
    Date: DemoClock, Intl, JSON, Number, String, Math, Array, Object, Set, console,
    localStorage: {
      getItem: key => stored[key] || null,
      setItem: (key, value) => { stored[key] = value; },
    },
    document, window: { scrollTo() {} }, location: { hash: '#businesses' },
    setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0,
  });
  const run = code => vm.runInContext(code, context);
  const json = code => JSON.parse(run(`JSON.stringify(${code})`));
  for (const file of ['agents.js', 'business-data.js']) {
    vm.runInContext(fs.readFileSync(path.join(dist, file), 'utf8'), context, { filename: file });
  }
  const fullSource = fs.readFileSync(path.join(dist, 'app.js'), 'utf8');
  const bootMarker = "\n$('#help-button').onclick=help;";
  assert.ok(fullSource.includes(bootMarker), 'App boot boundary must remain identifiable');
  vm.runInContext(fullSource.split(bootMarker)[0], context, { filename: 'app.js' });
  run(`render=()=>{};
       toast=msg=>window.lastToast=msg;
       showDialog=html=>window.lastDialog=html;
       download=(content,name,type)=>window.lastDownload={content,name,type};`);
  return { run, json, stored, context, advance: ms => { now += ms; } };
}

const app = boot();
const { run, json } = app;
assert.deepEqual(json('portfolio.businesses.map(b=>b.params.name)'), [
  'Robot factory', 'Dropshipping', 'Amazon referrals',
]);
assert.equal(run('portfolio.businesses.length'), 3);
assert.equal(run('new Set(portfolio.businesses.map(b=>b.id)).size'), 3);
assert.equal(run('portfolio.businesses.filter(b=>b.meta.status==="active"&&b.meta.earned>0&&b.meta.startedOn).length'), 2);
assert.equal(run('portfolio.businesses.find(b=>b.id==="amazon-referrals").meta.status'), 'planning');
assert.equal(run('portfolio.businesses.find(b=>b.id==="amazon-referrals").meta.startedOn'), null);
assert.equal(run('portfolio.businesses.find(b=>b.id==="amazon-referrals").meta.earned'), 0);
assert.equal(run('portfolio.businesses.find(b=>b.id==="amazon-referrals").phases.every(p=>p.status==="idle")'), true);
assert.equal(run('window.AGENTS.length'), 24);
assert.equal(run('new Set(window.AGENTS.map(a=>a.id)).size'), 24);

// Starting a new business must keep every existing record and its money untouched.
run('selectBusiness("robot-factory")');
const originalRecords = json('portfolio.businesses');
run('newBusiness()');
assert.deepEqual(json('portfolio.businesses'), originalRecords);
assert.equal(run('portfolio.activeId'), null);
assert.equal(run('state.created'), false);
assert.equal(run('state.params.name'), '');
assert.equal(run('location.hash'), 'project');
assert.equal(run('available(1)'), false);
const newId = run('state.id');
assert.equal(run('portfolio.draft.id'), newId);

// Same names are allowed; record identity must be separate from the name.
run('applyParams({...state.params,name:"Robot factory",industry:"E-commerce and dropshipping",capital:8000,roi:9,advantages:"Online audience",notes:"Independent store"},true,false)');
assert.equal(run('portfolio.businesses.length'), 4);
assert.equal(run('portfolio.businesses.filter(b=>b.params.name==="Robot factory").length'), 2);
assert.equal(run('portfolio.activeId'), newId);
assert.equal(run('portfolio.draft'), null);
assert.equal(run('state.created'), true);
assert.equal(run('available(1)'), true);
assert.equal(run('available(2)'), false);
assert.equal(run('state.meta.earned'), 0);
assert.equal(run('state.meta.startedOn'), null);
assert.equal(run('state.phases===portfolio.businesses.find(b=>b.id==="robot-factory").phases'), false);
assert.equal(run('state.meta===portfolio.businesses.find(b=>b.id==="robot-factory").meta'), false);
const newIdeas = json('allIdeas()');
run('selectBusiness("robot-factory")');
assert.notDeepEqual(json('allIdeas()'), newIdeas, 'Each business generates its own metrics from its own parameters');
assert.deepEqual(json('state.params'), originalRecords[0].params);
assert.equal(run('state.meta.earned'), originalRecords[0].meta.earned);

// Explicit ID routing opens the record requested, even when names are equal.
run(`openBusiness(${JSON.stringify(newId)})`);
assert.equal(run('state.id'), newId);
assert.equal(run('location.hash'), 'business/' + encodeURIComponent(newId));
run('openBusiness("dropshipping")');
assert.equal(run('state.id'), 'dropshipping');
assert.equal(run('location.hash'), 'business/dropshipping');
run('location.hash="#results/robot-factory";changeRoute()');
assert.equal(run('state.id'), 'robot-factory');
assert.equal(run('route'), 'results');
run('location.hash="#project/amazon-referrals";changeRoute()');
assert.equal(run('state.id'), 'amazon-referrals');
assert.equal(run('route'), 'project');
run('location.hash="#business/%ZZ";changeRoute()');
assert.equal(run('route'), 'businesses');
run('location.hash="#business/nonexistent";changeRoute()');
assert.equal(run('route'), 'businesses');
assert.equal(run('state.id'), 'amazon-referrals');
run('selectBusiness("dropshipping");businessHandlers().results()');
assert.equal(run('location.hash'), 'results/dropshipping');
run('route="business";businessHandlers().openStep(3)');
assert.equal(run('state.activeStep'), 3);
assert.equal(run('location.hash'), 'project/dropshipping');

// A paused job stays paused while other businesses are selected and completed.
run('selectBusiness("amazon-referrals");runPhase(0)');
app.advance(6000);
const pausedAt = run('progress(0)');
run('pausePhase(0);selectBusiness("robot-factory")');
app.advance(3600000);
run('tick();selectBusiness("amazon-referrals")');
assert.equal(run('progress(0)'), pausedAt);
assert.equal(run('state.phases[0].status'), 'paused');
run('runPhase(0);selectBusiness("robot-factory")');
app.advance(13000);
run('tick()');
assert.equal(run('portfolio.businesses.find(b=>b.id==="amazon-referrals").phases[0].status'), 'complete', 'Running jobs complete in the background');
assert.equal(run('state.id'), 'robot-factory');
assert.deepEqual(json('state.phases'), originalRecords[0].phases);

// Concurrent businesses keep independent progress, phase unlocking and metrics.
run(`selectBusiness(${JSON.stringify(newId)});runPhase(0)`);
app.advance(4000);
const firstProgress = run('progress(0)');
run('selectBusiness("amazon-referrals");runPhase(1)');
app.advance(5000);
assert.equal(run('progress(1)'), 25);
run(`selectBusiness(${JSON.stringify(newId)})`);
assert.ok(run('progress(0)') > firstProgress);
assert.equal(run('state.phases[1].status'), 'idle');
app.advance(16000);
run('selectBusiness("dropshipping");tick()');
assert.equal(run(`portfolio.businesses.find(b=>b.id===${JSON.stringify(newId)}).phases[0].status`), 'complete');
assert.equal(run('portfolio.businesses.find(b=>b.id==="amazon-referrals").phases[1].status'), 'complete');
assert.equal(run('state.meta.earned'), originalRecords[1].meta.earned);

// Launch is locked until all four stages finish and adds no unearned preorder money.
run(`selectBusiness(${JSON.stringify(newId)});launchBusiness()`);
assert.equal(run('state.meta.startedOn'), null);
assert.equal(run('state.meta.status'), 'planning');
assert.match(run('window.lastToast'), /four validation stages/);
for (let i = 1; i < 4; i++) {
  run(`runPhase(${i})`);
  app.advance(25000);
  run('tick()');
  assert.equal(run(`state.phases[${i}].status`), 'complete');
}
assert.equal(run('state.meta.status'), 'validation');
assert.equal(run('state.meta.earned'), 0);
assert.equal(run('rankedIdeas(4).some(x=>financial(x).revenue>0)'), true);
run('launchBusiness()');
assert.equal(run('state.meta.status'), 'active');
assert.equal(run('state.meta.startedOn'), '2026-10-11');
assert.equal(run('state.meta.earned'), 0);
assert.equal(run('state.meta.profit'), 0);
assert.equal(run('state.meta.orders'), 0);
const launchActivity = run('state.meta.activity.length');
run('launchBusiness()');
assert.equal(run('state.meta.activity.length'), launchActivity, 'Launching again must not duplicate the launch activity');

// Existing financial exports and multi-stage selection remain available per business.
assert.equal(run('allIdeas().length'), 100);
for (const [stage, count] of [[1, 50], [2, 30], [3, 15], [4, 15]]) {
  assert.equal(run(`rankedIdeas(${stage}).length`), count);
}
assert.equal(run('rankedIdeas(2).every(x=>rankedIdeas(1).some(a=>a.id===x.id))'), true);
assert.equal(run('rankedIdeas(3).every(x=>rankedIdeas(2).some(a=>a.id===x.id))'), true);
assert.equal(run('rankedIdeas(4).every(x=>Number.isFinite(financial(x).roi)&&Number.isFinite(financial(x).payback)&&financial(x).revenue===x.preorders*x.price)'), true);
run('showIdea(rankedIdeas(1)[0].id,1)');
assert.equal(run('window.lastDialog.includes(" · GTM ")'), false);
assert.equal(run('window.lastDialog.includes("Expected ROI")'), true);
assert.equal(run('window.lastDialog.includes("demo preorders")'), false);
run('exportProject()');
const exported = JSON.parse(run('window.lastDownload.content'));
assert.equal(exported.project.id, newId);
assert.equal(exported.results.length, 4);
assert.equal(exported.results[3].ideas.length, 15);
assert.equal(typeof exported.results[3].ideas[0].financialModel.roi, 'number');
assert.equal(typeof exported.results[3].ideas[0].financialModel.revenue, 'number');
run('exportCSV(4)');
const csv = run('window.lastDownload.content');
assert.equal(csv.split('\r\n').length, 16);
assert.equal(csv.includes('DEMO SIMULATION'), true);
assert.equal(run("esc('<img onerror=1>')"), '&lt;img onerror=1&gt;');

// The entire portfolio and selected record survive a new JS session.
const persisted = JSON.parse(app.stored[STORAGE]);
assert.equal(persisted.businesses.length, 4);
assert.equal(persisted.activeId, newId);
const reloaded = boot(app.stored);
assert.equal(reloaded.run('state.id'), newId);
assert.deepEqual(reloaded.json('portfolio.businesses'), json('portfolio.businesses'));
assert.equal(reloaded.run('state.phases.every(p=>p.status==="complete")'), true);
assert.equal(reloaded.run('state.meta.earned'), 0);

// A draft can be saved and revisited without overwriting another business.
reloaded.run('newBusiness()');
const secondDraftId = reloaded.run('state.id');
reloaded.run('state.params.name="Nedovršeni koncept";persist()');
const draftReload = boot(reloaded.stored);
assert.equal(draftReload.run('state.id'), secondDraftId);
assert.equal(draftReload.run('state.params.name'), 'Nedovršeni koncept');
assert.equal(draftReload.run('state.created'), false);
assert.equal(draftReload.run('portfolio.businesses.length'), 4);

// Upgrade preserves a user's prior project alongside the three new demo examples.
const legacy = {
  version: 1, created: true, activeStep: 2, savedAt: INITIAL_TIME,
  params: { ...originalRecords[0].params, name: 'Moj raniji projekat', capital: 40000 },
  phases: [{ status: 'complete', started: 0, elapsed: 18000 },
    { status: 'paused', started: 0, elapsed: 5000 },
    { status: 'idle', started: 0, elapsed: 0 },
    { status: 'idle', started: 0, elapsed: 0 }],
};
const migrated = boot({ [LEGACY]: JSON.stringify(legacy) });
assert.equal(migrated.run('portfolio.businesses.length'), 4);
assert.equal(migrated.run('selectBusiness("previous-project")'), true);
assert.equal(migrated.run('state.params.name'), legacy.params.name);
assert.equal(migrated.run('state.params.capital'), legacy.params.capital);
assert.deepEqual(migrated.json('state.phases'), legacy.phases);
assert.equal(migrated.run('state.meta.startedOn'), null);
assert.equal(migrated.run('state.meta.earned'), 0);
assert.equal(boot(migrated.stored).run('portfolio.businesses.length'), 4, 'Reload must not repeat migration');

// Translate exact old v2 demo copy while preserving business identity and runtime data.
const oldDemoRecords = json('LEGACY_DEMO_BUSINESSES');
const englishDemoRecords = json('window.DEMO_BUSINESSES');
const oldV2 = {
  version: 2,
  businesses: structuredClone(oldDemoRecords),
  activeId: 'robot-factory',
  draft: null,
};
oldV2.businesses[0].activeStep = 2;
oldV2.businesses[0].savedAt = INITIAL_TIME - 40000;
oldV2.businesses[0].phases = structuredClone(legacy.phases);
oldV2.businesses[0].meta.earned = 196700;
oldV2.businesses[0].meta.profit = 48000;
oldV2.businesses[0].meta.orders = 52;
oldV2.businesses[0].meta.customers = 21;
oldV2.businesses[0].meta.monthlyRevenue[0].value = 15555;
oldV2.businesses[0].meta.activity[0].date = '2026-10-10';
const localized = boot({ [STORAGE]: JSON.stringify(oldV2) });
assert.equal(localized.run('portfolio.activeId'), oldV2.activeId);
assert.equal(localized.run('state.id'), oldV2.activeId);
assert.equal(localized.run('portfolio.businesses.length'), 3);
for (let i = 0; i < oldV2.businesses.length; i++) {
  const before = oldV2.businesses[i];
  const after = localized.json(`portfolio.businesses[${i}]`);
  const english = englishDemoRecords[i];
  assert.equal(after.id, before.id);
  assert.equal(after.created, before.created);
  assert.equal(after.activeStep, before.activeStep);
  assert.equal(after.savedAt, before.savedAt);
  assert.deepEqual(after.phases, before.phases, 'Copy migration must retain job status and elapsed time');
  assert.deepEqual(after.params, english.params, 'Untouched demo parameters become English');
  for (const field of ['kind', 'status', 'startedOn', 'preparedOn', 'earned', 'profit', 'orders', 'customers']) {
    assert.equal(after.meta[field], before.meta[field], `Migration must preserve ${field}`);
  }
  assert.equal(after.meta.description, english.meta.description);
  assert.equal(after.meta.nextAction, english.meta.nextAction);
  assert.deepEqual(after.meta.assets, english.meta.assets, 'Untouched asset descriptions become English');
  assert.deepEqual(after.meta.monthlyRevenue.map(row => row.month), english.meta.monthlyRevenue.map(row => row.month));
  assert.deepEqual(after.meta.monthlyRevenue.map(row => row.value), before.meta.monthlyRevenue.map(row => row.value));
  for (let j = 0; j < after.meta.activity.length; j++) {
    assert.equal(after.meta.activity[j].date, before.meta.activity[j].date);
    assert.equal(after.meta.activity[j].label, english.meta.activity[j].label);
    assert.equal(after.meta.activity[j].description, english.meta.activity[j].description);
  }
}
localized.run('persist()');
assert.deepEqual(boot(localized.stored).json('portfolio.businesses'), localized.json('portfolio.businesses'), 'Translation must be stable after saving and reloading');

// User edits to demo projects and arbitrary custom projects must survive translation.
const editedDemo = structuredClone(oldDemoRecords[1]);
editedDemo.params.name = 'Moja prodavnica — lični naziv';
editedDemo.params.notes = 'Moje napomene: isporuka samo za Niš.';
editedDemo.params.advantages = 'Moj tim i moja iskustva';
editedDemo.params.region = 'Niš i okolna mesta';
editedDemo.params.capital = 19800;
editedDemo.meta.description = 'Moj opis prodavnice';
editedDemo.meta.activity[0].description = 'Moja izmenjena evidencija prihoda';
editedDemo.meta.activity.push({ date: '2026-10-11', label: 'Lična aktivnost', description: 'Sačuvaj moj tekst.' });
editedDemo.meta.assets[0].description = 'Moja struktura sajta';
editedDemo.meta.assets.push({ title: 'Moj dokument', type: 'Lično', description: 'Moja dokumentacija' });
const custom = {
  version: 1, id: 'user-business-42', created: true, activeStep: 2, savedAt: INITIAL_TIME - 2000,
  params: {
    ...json('LEGACY_DEFAULT_PARAMS'),
    name: 'Moj potpuno novi biznis',
    notes: 'Ne prevoditi moje ručno napisane beleške.',
    advantages: 'Moje prednosti osnivača',
    region: 'Niš', capital: 9000,
  },
  phases: structuredClone(legacy.phases),
  meta: {
    kind: 'robot', status: 'planning', startedOn: null, preparedOn: '2026-10-01',
    earned: 125, profit: 40, orders: 2, customers: 2,
    monthlyRevenue: [{ month: 'Maj', value: 125 }],
    description: 'Novi biznis u pripremi.', nextAction: 'Unesite parametre i pokrenite evaluaciju.',
    activity: [{ date: '2026-10-10', label: 'Moja ručna aktivnost', description: 'Moj privatni tekst projekta.' }],
    assets: [{ title: 'Moj plan', type: 'Lični dokument', description: 'Ručni opis plana.' }],
  },
};
const oldDraft = {
  ...structuredClone(custom), id: 'draft-42', created: false, activeStep: 0,
  params: { ...custom.params, name: 'Moj nedovršeni nacrt' },
  phases: oldDemoRecords[2].phases,
};
const editedPortfolio = boot({ [STORAGE]: JSON.stringify({
  version: 2, businesses: [editedDemo, custom], activeId: custom.id, draft: oldDraft,
}) });
const editedAfter = editedPortfolio.json('portfolio.businesses[0]');
for (const field of ['name', 'notes', 'advantages', 'region', 'capital']) {
  assert.equal(editedAfter.params[field], editedDemo.params[field], `Demo user edit ${field} must be preserved`);
}
assert.equal(editedAfter.params.industry, 'E-commerce and dropshipping');
assert.equal(editedAfter.meta.description, editedDemo.meta.description);
assert.equal(editedAfter.meta.nextAction, englishDemoRecords[1].meta.nextAction);
assert.equal(editedAfter.meta.activity[0].label, englishDemoRecords[1].meta.activity[0].label);
assert.equal(editedAfter.meta.activity[0].description, editedDemo.meta.activity[0].description);
assert.deepEqual(editedAfter.meta.activity.at(-1), editedDemo.meta.activity.at(-1));
assert.equal(editedAfter.meta.assets[0].title, englishDemoRecords[1].meta.assets[0].title);
assert.equal(editedAfter.meta.assets[0].description, editedDemo.meta.assets[0].description);
assert.deepEqual(editedAfter.meta.assets.at(-1), editedDemo.meta.assets.at(-1));
const customAfter = editedPortfolio.json('state');
assert.equal(customAfter.id, custom.id);
for (const field of ['name', 'notes', 'advantages', 'region', 'capital']) assert.equal(customAfter.params[field], custom.params[field]);
assert.equal(customAfter.params.industry, 'Robotics and automation');
assert.deepEqual(customAfter.phases, custom.phases);
assert.deepEqual(customAfter.meta.activity, custom.meta.activity);
assert.deepEqual(customAfter.meta.assets, custom.meta.assets);
assert.equal(customAfter.meta.description, 'New business in preparation.');
assert.equal(customAfter.meta.nextAction, 'Enter your parameters and start the evaluation.');
assert.equal(customAfter.meta.earned, 125);
assert.equal(customAfter.meta.monthlyRevenue[0].month, 'May');
assert.equal(customAfter.meta.monthlyRevenue[0].value, 125);
assert.equal(editedPortfolio.run('portfolio.draft.id'), oldDraft.id);
assert.equal(editedPortfolio.run('portfolio.draft.params.name'), oldDraft.params.name);
assert.equal(editedPortfolio.run('portfolio.draft.params.notes'), oldDraft.params.notes);
assert.equal(editedPortfolio.run('portfolio.draft.params.industry'), 'Robotics and automation');
assert.deepEqual(editedPortfolio.json('portfolio.draft.phases'), oldDraft.phases);

// The older v1 format also upgrades canonical copy and keeps the custom project.
const oldV1 = { ...structuredClone(custom), meta: undefined };
const localizedV1 = boot({ [LEGACY]: JSON.stringify(oldV1) });
assert.equal(localizedV1.run('selectBusiness("previous-project")'), true);
assert.equal(localizedV1.run('state.params.name'), oldV1.params.name);
assert.equal(localizedV1.run('state.params.notes'), oldV1.params.notes);
assert.equal(localizedV1.run('state.params.industry'), 'Robotics and automation');
assert.equal(localizedV1.run('state.meta.description'), 'Saved project from the previous version.');
assert.deepEqual(localizedV1.json('state.phases'), oldV1.phases);

console.log('PASS: three demo businesses, independent records and metrics, ID routing, background/concurrent jobs, pause/resume, four-stage launch, zero unearned revenue, selection, English financial exports, portfolio/draft reload, v1/v2 copy migration and preserved user edits');
