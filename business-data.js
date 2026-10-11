window.DEMO_BUSINESSES = [
  {
    id:'robot-factory',version:1,created:true,activeStep:4,savedAt:0,
    params:{name:'Robot factory',industry:'Robotics and automation',capital:150000,roi:18,region:'Serbia and DACH',advantages:'10 years of automation experience, a team of 3 engineers and a network of 40 manufacturing companies.',linkedin:'https://robot-factory.example/linkedin',website:'https://robot-factory.example',notes:'Modular robotic cells, installation and annual service for manufacturing companies.'},
    phases:[18000,20000,24000,22000].map(elapsed=>({status:'complete',started:0,elapsed})),
    meta:{kind:'robot',status:'active',startedOn:'2026-01-15',preparedOn:'2025-11-03',earned:184600,profit:42680,orders:46,customers:18,
      monthlyRevenue:[{month:'May',value:14800},{month:'Jun',value:16200},{month:'Jul',value:18500},{month:'Aug',value:21400},{month:'Sep',value:24600},{month:'Oct',value:25100}],
      description:'Design and sale of modular robotic cells, including integration, training and service.',nextAction:'Prepare the next proposal for two pilot cells.',
      activity:[{date:'2026-10-09',label:'New installation',description:'Delivered a robotic palletizing cell. Demo revenue: €18,500.'},{date:'2026-10-06',label:'Service contract',description:'Signed a demo annual service agreement for three existing cells.'},{date:'2026-01-15',label:'Business launched',description:'First customer delivery after completing validation.'},{date:'2025-12-22',label:'Sales validation',description:'Finalists were tested through demo preorders.'}],
      assets:[{title:'Sales website',type:'Website',description:'Robotic cell offerings, demo requests and sales contact.'},{title:'Robotic cell catalog',type:'Catalog',description:'Palletizing, quality control, packaging and service packages.'},{title:'B2B sales process',type:'Sales',description:'Inquiry → customer conversation → pilot → proposal → installation.'},{title:'Operations plan',type:'Operations',description:'The founder approves proposals, engineers lead implementation and the service team provides support.'}]}
  },
  {
    id:'dropshipping',version:1,created:true,activeStep:4,savedAt:0,
    params:{name:'Dropshipping',industry:'E-commerce and dropshipping',capital:12000,roi:12,region:'EU and Serbia',advantages:'Online sales experience, two suppliers and an Instagram audience of 12,000 followers.',linkedin:'https://dropshipping-demo.example/instagram',website:'https://dropshipping-demo.example',notes:'Online store for home and desk accessories. Fulfillment through partner suppliers.'},
    phases:[18000,20000,24000,22000].map(elapsed=>({status:'complete',started:0,elapsed})),
    meta:{kind:'dropshipping',status:'active',startedOn:'2026-05-17',preparedOn:'2026-03-02',earned:32450,profit:6120,orders:487,customers:362,
      monthlyRevenue:[{month:'May',value:2200},{month:'Jun',value:3800},{month:'Jul',value:4900},{month:'Aug',value:5600},{month:'Sep',value:6500},{month:'Oct',value:9450}],
      description:'Online store with carefully selected home accessories, fulfilled by partner suppliers.',nextAction:'Compare the profitability of the three best-selling products.',
      activity:[{date:'2026-10-10',label:'Sales performance',description:'32 demo orders in one week; revenue of €2,180.'},{date:'2026-10-07',label:'Catalog updated',description:'Added six new products for desk organization.'},{date:'2026-05-17',label:'Store launched',description:'Sales began after product and supplier testing.'},{date:'2026-04-28',label:'Demand confirmed',description:'A demo campaign confirmed interest in the first collection.'}],
      assets:[{title:'Online store',type:'Website',description:'Product collections, shopping cart and checkout flow — demo description.'},{title:'Product catalog',type:'Catalog',description:'Home accessories, desk organization and selected gifts.'},{title:'Campaigns and email sequences',type:'Marketing',description:'Instagram ads, new customer welcome emails and abandoned cart messages.'},{title:'Fulfillment and support plan',type:'Operations',description:'Checking partner stock, tracking deliveries and responding to customers.'}]}
  },
  {
    id:'amazon-referrals',version:1,created:true,activeStep:1,savedAt:0,
    params:{name:'Amazon referrals',industry:'Affiliate marketing',capital:2500,roi:6,region:'DACH',advantages:'Content and SEO knowledge, a technology blog and an email list of 800 subscribers.',linkedin:'https://affiliate-demo.example/social',website:'https://affiliate-demo.example',notes:'Content recommending home office products. Demo affiliate model; no active partner account.'},
    phases:[{status:'idle',started:0,elapsed:0},{status:'idle',started:0,elapsed:0},{status:'idle',started:0,elapsed:0},{status:'idle',started:0,elapsed:0}],
    meta:{kind:'affiliate',status:'planning',startedOn:null,preparedOn:'2026-10-04',earned:0,profit:0,orders:0,customers:0,monthlyRevenue:[],
      description:'A plan for product recommendation content with revenue from demo affiliate commissions.',nextAction:'Start Product Market Fit and select the most promising niches.',
      activity:[{date:'2026-10-04',label:'Preparation started',description:'Saved initial parameters, audience, budget and target payback period.'}],
      assets:[{title:'Content plan',type:'Content',description:'Buying guides, comparisons and product reviews — not published yet.'},{title:'Planned website',type:'Website',description:'Demo concept for a home office blog. The business has not launched yet.'},{title:'Validation plan',type:'Draft',description:'Check the audience, traffic and conversions before adding affiliate offers.'}]}
  }
];
