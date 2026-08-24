export type Language = 'en' | 'sw';

export interface Translations {
  nav: {
    idea: string;
    workers: string;
    employers: string;
    model: string;
    login: string;
    getStarted: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    findWork: string;
    hireTalent: string;
  };
  previews: {
    latestJobs: string;
    live: string;
    loading: string;
    matchGetPaid: string;
    walletReady: string;
    matchGetPaidDesc: string;
    openWorkerApp: string;
    recentActivity: string;
    today: string;
    activity1Title: string;
    activity1Desc: string;
    activity2Title: string;
    activity2Desc: string;
    activity3Title: string;
    activity3Desc: string;
  };
  idea: {
    eyebrow: string;
    title: string;
    desc: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  workers: {
    eyebrow: string;
    title: string;
    check1: string;
    check2: string;
    check3: string;
    check4: string;
    loginBtn: string;
    journeyTitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  employers: {
    eyebrow: string;
    title: string;
    check1: string;
    check2: string;
    check3: string;
    check4: string;
    loginBtn: string;
    journeyTitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  model: {
    eyebrow: string;
    title: string;
    fundingTarget: string;
    fundingTargetAmount: string;
    fundingDesc: string;
    revenueStreams: string;
    stream1Title: string;
    stream1Desc: string;
    stream2Title: string;
    stream2Desc: string;
    stream3Title: string;
    stream3Desc: string;
  };
  stats: {
    activeJobs: string;
    verifiedWorkers: string;
    matchingRate: string;
    dailyVolume: string;
  };
  cta: {
    title: string;
    desc: string;
    login: string;
    learnIdea: string;
  };
  footer: {
    desc: string;
  };
  loginModal: {
    welcomeBack: string;
    title: string;
    copy: string;
    phoneOrEmail: string;
    password: string;
    continueBtn: string;
    demoNote: string;
    closeLabel: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      idea: 'The idea',
      workers: 'Workers',
      employers: 'Employers',
      model: 'Business',
      login: 'Log in',
      getStarted: 'Get started',
    },
    hero: {
      eyebrow: 'Tanzania daily-work marketplace',
      title: 'Where verified workers meet real jobs — fast.',
      lede: 'MchongoFasta connects households and SMEs to vetted short-term help for cleaning, delivery, care, and repairs — with map discovery, trust checks, and secure payouts.',
      findWork: 'Find work',
      hireTalent: 'Hire talent',
    },
    previews: {
      latestJobs: 'Latest jobs near you',
      live: 'Live',
      loading: '…',
      matchGetPaid: 'Match & get paid',
      walletReady: 'wallet ready',
      matchGetPaidDesc: 'Apply from the map, complete the mchongo, and withdraw to M-Pesa.',
      openWorkerApp: 'Open worker app',
      recentActivity: 'Recent activity',
      today: 'Today',
      activity1Title: 'Asha applied',
      activity1Desc: 'Cleaning • 12 min ago',
      activity2Title: 'Job matched',
      activity2Desc: 'Kariakoo delivery',
      activity3Title: 'ID verified',
      activity3Desc: 'NIDA check passed',
    },
    idea: {
      eyebrow: 'The idea',
      title: 'Daily work should be trusted, local, and instant.',
      desc: 'Too many short-term jobs in Dar still run on WhatsApp forwards and unverified strangers. MchongoFasta builds a marketplace where workers prove identity and skill, employers post clearly, and matching happens on a map — then payment stays in-app.',
      step1Title: 'Browse on a map',
      step1Desc: 'See open mchongo around you first, then switch to a clean list when you prefer.',
      step2Title: 'Two clear sides',
      step2Desc: 'Guests find jobs by default. Employers sign in separately to hire. Applying requires login.',
      step3Title: 'Trust before work',
      step3Desc: 'National ID, address checks, ratings, and references protect both sides of every task.',
      step4Title: 'Pay with confidence',
      step4Desc: 'Commissions, premium visibility, and in-app ads fund the platform while workers get paid fast.',
    },
    workers: {
      eyebrow: 'For workers',
      title: 'Find mchongo. Prove trust. Get paid.',
      check1: 'Discover nearby jobs on map or list',
      check2: 'Sign in only when you are ready to apply',
      check3: 'Complete verification for better matches',
      check4: 'Track earnings and withdraw securely',
      loginBtn: 'Worker log in',
      journeyTitle: 'Worker journey',
      step1: 'Browse open tasks as a guest',
      step2: 'Tap a job → sign in to apply',
      step3: 'Finish verification for priority matching',
      step4: 'Complete work and receive payout',
    },
    employers: {
      eyebrow: 'For employers',
      title: 'Hire reliable help in minutes.',
      check1: 'Post cleaning, logistics, care, or technical tasks',
      check2: 'Review verified applicants with ratings',
      check3: 'Track progress and release payment',
      check4: 'Build a trusted shortlist for next time',
      loginBtn: 'Employer log in',
      journeyTitle: 'Employer journey',
      step1: 'Open the employer invite from the app',
      step2: 'Sign in and set up your hiring profile',
      step3: 'Post a task with budget and timing',
      step4: 'Match, confirm, and pay in one flow',
    },
    model: {
      eyebrow: 'Business model',
      title: 'Built to scale across Tanzania.',
      fundingTarget: 'Funding target',
      fundingTargetAmount: 'TZS 300M',
      fundingDesc: 'App development, onboarding, marketing, staff training, and regional rollout.',
      revenueStreams: 'Revenue streams',
      stream1Title: 'Task commission',
      stream1Desc: 'Core fee from each completed job.',
      stream2Title: 'Premium workers',
      stream2Desc: 'Priority listings, badges and visibility.',
      stream3Title: 'In-app advertising',
      stream3Desc: 'Local services promoted to active users.',
    },
    stats: {
      activeJobs: 'Active jobs',
      verifiedWorkers: 'Verified workers',
      matchingRate: 'Matching rate',
      dailyVolume: 'Daily volume',
    },
    cta: {
      title: 'Ready to work or hire today?',
      desc: 'Log in to continue on web, or open the mobile app for map-first job discovery.',
      login: 'Log in',
      learnIdea: 'Learn the idea',
    },
    footer: {
      desc: 'Daily work, verified fast — for workers and employers across Tanzania.',
    },
    loginModal: {
      welcomeBack: 'Welcome back',
      title: 'Log in to MchongoFasta',
      copy: 'Workers apply for jobs. Employers post tasks and hire verified talent.',
      phoneOrEmail: 'Phone or email',
      password: 'Password',
      continueBtn: 'Continue',
      demoNote: 'Demo login UI — full auth connects to the live API next.',
      closeLabel: 'Close',
    },
  },
  sw: {
    nav: {
      idea: 'Wazo letu',
      workers: 'Wafanyakazi',
      employers: 'Waajiri',
      model: 'Biashara',
      login: 'Ingia',
      getStarted: 'Anza sasa',
    },
    hero: {
      eyebrow: 'Soko la vibarua na kazi za kila siku Tanzania',
      title: 'Mahali wafanyakazi waliothibitishwa wanapopata kazi halisi — haraka.',
      lede: 'MchongoFasta huunganisha kaya na wafanyabiashara wadogo na wafanyakazi wa uhakika wa usafi, usafirishaji, uangalizi, na ufundi — kwa ramani ya mtaa, uhakiki wa NIDA, na malipo salama.',
      findWork: 'Tafuta kazi',
      hireTalent: 'Ajiri mfanyakazi',
    },
    previews: {
      latestJobs: 'Kazi mpya karibu nawe',
      live: 'Moja kwa moja',
      loading: '…',
      matchGetPaid: 'Pata kazi & Lipwa',
      walletReady: 'kwenye pochi',
      matchGetPaidDesc: 'Omba kazi kupitia ramani, kamilisha mchongo, na utoe pesa kwenda M-Pesa.',
      openWorkerApp: 'Fungua app ya mfanyakazi',
      recentActivity: 'Matukio ya hivi karibuni',
      today: 'Leo',
      activity1Title: 'Asha ameomba kazi',
      activity1Desc: 'Usafi • dakika 12 zilizopita',
      activity2Title: 'Kazi imeunganishwa',
      activity2Desc: 'Usafirishaji Kariakoo',
      activity3Title: 'Kitambulisho kimethibitishwa',
      activity3Desc: 'Uhakiki wa NIDA umekamilika',
    },
    idea: {
      eyebrow: 'Wazo letu',
      title: 'Kazi za kila siku zinapaswa kuwa za kuaminika, za mtaani, na za papo hapo.',
      desc: 'Kazi nyingi za muda mfupi Dar es Salaam bado zinategemea magroup ya WhatsApp na watu wasiojulikana. MchongoFasta inaleta soko ambapo wafanyakazi wanathibitisha vitambulisho na ujuzi, waajiri wanatuma kazi wazi, na kuunganishwa kunafanyika kwenye ramani — kisha malipo yanafanyika ndani ya mfumo.',
      step1Title: 'Tazama kwenye ramani',
      step1Desc: 'Ona michongo iliyo karibu nawe kwanza, kisha badili kwenda orodha safi unapotaka.',
      step2Title: 'Pande mbili zilizo wazi',
      step2Desc: 'Wageni wanaona kazi moja kwa moja. Waajiri huingia kando kuajiri. Kuomba kazi kunahitaji kuingia.',
      step3Title: 'Uaminifu kabla ya kazi',
      step3Desc: 'Kitambulisho cha NIDA, uthibitisho wa makazi, maoni na tathmini hulinda pande zote mbili.',
      step4Title: 'Lipa kwa uhakika',
      step4Desc: 'Makato madogo, mwonekano wa VIP, na matangazo huwezesha mfumo wakati wafanyakazi wanalipwa haraka.',
    },
    workers: {
      eyebrow: 'Kwa wafanyakazi',
      title: 'Pata mchongo. Thibitisha uaminifu. Lipwa.',
      check1: 'Gundua kazi za karibu kwenye ramani au orodha',
      check2: 'Ingia kwenye akaunti pale tu unapotaka kuomba kazi',
      check3: 'Kamilisha uthibitisho wa NIDA ili kupata kazi nyingi zaidi',
      check4: 'Fuatilia mapato yako na utoe pesa kwa usalama',
      loginBtn: 'Ingia kama Mfanyakazi',
      journeyTitle: 'Hatua za Mfanyakazi',
      step1: 'Angalia kazi zilizopo kama mgeni',
      step2: 'Bonyeza kazi → ingia ili kuomba',
      step3: 'Kamilisha uthibitisho ili kupewa kipaumbele',
      step4: 'Kamilisha kazi na upokee malipo yako',
    },
    employers: {
      eyebrow: 'Kwa waajiri',
      title: 'Ajiri mfanyakazi wa kuaminika kwa dakika chache.',
      check1: 'Tuma kazi za usafi, usafirishaji, uangalizi, au ufundi',
      check2: 'Kagua waombaji waliothibitishwa wenye alama za uaminifu',
      check3: 'Fuatilia maendeleo ya kazi na ruhusu malipo',
      check4: 'Tengeneza orodha ya wafanyakazi unaowaamini kwa kazi zijazo',
      loginBtn: 'Ingia kama Mwajiri',
      journeyTitle: 'Hatua za Mwajiri',
      step1: 'Fungua sehemu ya waajiri kwenye mfumo',
      step2: 'Ingia na uweke maelezo ya wasifu wako wa kuajiri',
      step3: 'Tuma kazi ukiweka bajeti na muda unaohitaji',
      step4: 'Unganishwa na mtu, thibitisha, na lipa kwa urahisi',
    },
    model: {
      eyebrow: 'Mfumo wa kibiashara',
      title: 'Imejengwa kukua kote nchini Tanzania.',
      fundingTarget: 'Lengo la Mtaji',
      fundingTargetAmount: 'TZS 300M',
      fundingDesc: 'Utengenezaji wa app, usajili wa wafanyakazi, masoko, mafunzo, na upanuzi wa mikoa.',
      revenueStreams: 'Vyanzo vya mapato',
      stream1Title: 'Ada ya kazi (Kamisheni)',
      stream1Desc: 'Asilimia ya mapato kwa kila kazi iliyokamilika.',
      stream2Title: 'Wafanyakazi wa VIP',
      stream2Desc: 'Kupewa kipaumbele, beji za uaminifu, na mwonekano wa juu.',
      stream3Title: 'Matangazo ndani ya App',
      stream3Desc: 'Kutangaza biashara na huduma za mitaani kwa watumiaji.',
    },
    stats: {
      activeJobs: 'Kazi zinazoendelea',
      verifiedWorkers: 'Wafanyakazi waliothibitishwa',
      matchingRate: 'Kiwango cha kuunganisha',
      dailyVolume: 'Kiasi cha miamala kwa siku',
    },
    cta: {
      title: 'Uko tayari kufanya kazi au kuajiri leo?',
      desc: 'Ingia kuendelea kwenye wavuti, au tumia app ya simu kupata kazi kwenye ramani.',
      login: 'Ingia',
      learnIdea: 'Fahamu wazo letu',
    },
    footer: {
      desc: 'Kazi za kila siku, uthibitisho wa haraka — kwa wafanyakazi na waajiri kote Tanzania.',
    },
    loginModal: {
      welcomeBack: 'Karibu tena',
      title: 'Ingia MchongoFasta',
      copy: 'Wafanyakazi wanaomba kazi. Waajiri wanatuma kazi na kuajiri watu wa uhakika.',
      phoneOrEmail: 'Namba ya simu au barua pepe',
      password: 'Nenosiri',
      continueBtn: 'Endelea',
      demoNote: 'Muonekano wa majaribio — usajili kamili utaunganishwa na mfumo mkuu hivi punde.',
      closeLabel: 'Funga',
    },
  },
};

export const CATEGORY_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    Domestic: 'Domestic',
    Logistics: 'Logistics',
    Technical: 'Technical',
    Care: 'Care',
  },
  sw: {
    Domestic: 'Usafi & Nyumbani',
    Logistics: 'Usafirishaji',
    Technical: 'Ufundi',
    Care: 'Ulezi & Uangalizi',
  },
};

export const JOB_TITLE_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'House cleaning': 'House cleaning',
    'Errand delivery': 'Errand delivery',
    'Office painting': 'Office painting',
  },
  sw: {
    'House cleaning': 'Usafi wa nyumba',
    'Errand delivery': 'Usafirishaji wa mizigo/vifurushi',
    'Office painting': 'Kupaka rangi ofisi',
  },
};

export const STATUS_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    Matching: 'Matching',
    'In progress': 'In progress',
    Completed: 'Completed',
  },
  sw: {
    Matching: 'Inatafuta mtu',
    'In progress': 'Inaendelea',
    Completed: 'Imekamilika',
  },
};
