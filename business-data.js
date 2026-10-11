window.DEMO_BUSINESSES = [
  {
    id:'robot-factory',version:1,created:true,activeStep:4,savedAt:0,
    params:{name:'Robot factory',industry:'Robotika i automatizacija',capital:150000,roi:18,region:'Srbija i DACH',advantages:'10 godina iskustva u automatizaciji, tim od 3 inženjera i mreža 40 proizvodnih kompanija.',linkedin:'https://robot-factory.example/linkedin',website:'https://robot-factory.example',notes:'Modularne robotske ćelije, instalacija i godišnji servis za proizvodne kompanije.'},
    phases:[18000,20000,24000,22000].map(elapsed=>({status:'complete',started:0,elapsed})),
    meta:{kind:'robot',status:'active',startedOn:'2026-01-15',preparedOn:'2025-11-03',earned:184600,profit:42680,orders:46,customers:18,
      monthlyRevenue:[{month:'Maj',value:14800},{month:'Jun',value:16200},{month:'Jul',value:18500},{month:'Avg',value:21400},{month:'Sep',value:24600},{month:'Okt',value:25100}],
      description:'Projektovanje i prodaja modularnih robotskih ćelija, uz integraciju, obuku i servis.',nextAction:'Pripremiti sledeću ponudu za dve pilot ćelije.',
      activity:[{date:'2026-10-09',label:'Nova instalacija',description:'Isporučena robotska ćelija za paletizaciju. Demo prihod: 18.500 €.'},{date:'2026-10-06',label:'Servisni ugovor',description:'Potpisan demo godišnji servis za tri postojeće ćelije.'},{date:'2026-01-15',label:'Početak poslovanja',description:'Prva isporuka kupcu posle završene validacije.'},{date:'2025-12-22',label:'Sales validacija',description:'Finalisti su testirani kroz demo prednarudžbine.'}],
      assets:[{title:'Prodajni sajt',type:'Sajt',description:'Ponuda robotskih ćelija, zahtev za demonstraciju i kontakt sa prodajom.'},{title:'Katalog robotskih ćelija',type:'Katalog',description:'Paletizacija, kontrola kvaliteta, pakovanje i servisni paketi.'},{title:'B2B prodajni proces',type:'Prodaja',description:'Upit → razgovor sa kupcem → pilot → ponuda → instalacija.'},{title:'Operativni plan',type:'Operacije',description:'Founder odobrava ponude, inženjeri vode implementaciju, servisni tim pruža podršku.'}]}
  },
  {
    id:'dropshipping',version:1,created:true,activeStep:4,savedAt:0,
    params:{name:'Dropshipping',industry:'E-commerce i dropshipping',capital:12000,roi:12,region:'EU i Srbija',advantages:'Iskustvo sa online prodajom, dva dobavljača i Instagram publika od 12.000 pratilaca.',linkedin:'https://dropshipping-demo.example/instagram',website:'https://dropshipping-demo.example',notes:'Online prodavnica dodataka za dom i radni sto. Isporuka preko partnerskih dobavljača.'},
    phases:[18000,20000,24000,22000].map(elapsed=>({status:'complete',started:0,elapsed})),
    meta:{kind:'dropshipping',status:'active',startedOn:'2026-05-17',preparedOn:'2026-03-02',earned:32450,profit:6120,orders:487,customers:362,
      monthlyRevenue:[{month:'Maj',value:2200},{month:'Jun',value:3800},{month:'Jul',value:4900},{month:'Avg',value:5600},{month:'Sep',value:6500},{month:'Okt',value:9450}],
      description:'Online prodavnica pažljivo odabranih dodataka za dom, uz isporuku partnerskih dobavljača.',nextAction:'Uporediti profitabilnost tri najprodavanija proizvoda.',
      activity:[{date:'2026-10-10',label:'Prodajni rezultat',description:'32 demo porudžbine u jednoj nedelji; prihod 2.180 €.'},{date:'2026-10-07',label:'Katalog dopunjen',description:'Dodato šest novih proizvoda za organizaciju radnog stola.'},{date:'2026-05-17',label:'Prodavnica pokrenuta',description:'Početak prodaje nakon testiranja proizvoda i dobavljača.'},{date:'2026-04-28',label:'Potvrđena potražnja',description:'Demo kampanja je potvrdila interesovanje za prvu kolekciju.'}],
      assets:[{title:'Online prodavnica',type:'Sajt',description:'Kolekcije proizvoda, korpa i tok poručivanja — demo opis.'},{title:'Produkt katalog',type:'Katalog',description:'Dodaci za dom, organizacija stola i odabrani pokloni.'},{title:'Kampanje i email sekvence',type:'Marketing',description:'Instagram oglasi, dobrodošlica novom kupcu i poruka za napuštenu korpu.'},{title:'Plan isporuke i podrške',type:'Operacije',description:'Provera zaliha kod partnera, praćenje isporuke i odgovori kupcima.'}]}
  },
  {
    id:'amazon-referrals',version:1,created:true,activeStep:1,savedAt:0,
    params:{name:'Amazon referrals',industry:'Affiliate marketing',capital:2500,roi:6,region:'DACH',advantages:'Znanje o sadržaju i SEO, tehnički blog i email lista sa 800 pretplatnika.',linkedin:'https://affiliate-demo.example/social',website:'https://affiliate-demo.example',notes:'Sadržaj sa preporukama proizvoda za kućnu kancelariju. Demo affiliate model; nema aktivnog partnerskog naloga.'},
    phases:[{status:'idle',started:0,elapsed:0},{status:'idle',started:0,elapsed:0},{status:'idle',started:0,elapsed:0},{status:'idle',started:0,elapsed:0}],
    meta:{kind:'affiliate',status:'planning',startedOn:null,preparedOn:'2026-10-04',earned:0,profit:0,orders:0,customers:0,monthlyRevenue:[],
      description:'Plan za sadržaj sa preporukama proizvoda i zaradom od demo affiliate provizija.',nextAction:'Pokrenuti Product Market Fit i odabrati najperspektivnije niše.',
      activity:[{date:'2026-10-04',label:'Priprema započeta',description:'Sačuvani početni parametri, publika, budžet i rok povrata.'}],
      assets:[{title:'Plan sadržaja',type:'Priprema',description:'Vodiči za kupovinu, poređenja i recenzije proizvoda — još nije objavljeno.'},{title:'Planirani sajt',type:'Sajt',description:'Demo koncept bloga za kućnu kancelariju. Poslovanje još nije pokrenuto.'},{title:'Plan validacije',type:'Validacija',description:'Provera publike, saobraćaja i konverzija pre uključivanja partnerskih ponuda.'}]}
  }
];
