import { RegionalLocation } from "../regionalLocations";

export const KARNATAKA_LOCATIONS: RegionalLocation[] = [
  // 1. Bengaluru (Bangalore)
  {
    slug: "bengaluru",
    stateSlug: "karnataka",
    name: "Bengaluru (Bangalore)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 13193000,
    cluster: "Karnataka Metro — Silicon Valley of India",
    clusterSlug: "karnataka-metro",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    railwayStation: "Bengaluru City Junction (KSR)",
    hubCity: "Bengaluru Advanced Speciality Centers",
    transitTime: "City-wide metro & ambulatory support",
    description: "Premier USFDA robotic and laser surgical centers across Indiranagar, HSR Layout, Whitefield, and Hebbal with instant Insurance Eligible billing.",
    keyNeighbourhoods: [
      "Indiranagar", "HSR Layout", "Whitefield", "Hebbal",
      "Koramangala", "Electronic City", "Marathahalli", "JP Nagar", "Malleshwaram", "Jayanagar"
    ],
    localHospitals: [
      "Apollo Hospitals Bannerghatta", "Manipal Hospitals Old Airport Road", "Fortis Cunningham Road"
    ],
    specializedProcedures: [
      "Laser Proctology & Fistula", "Laparoscopic Hernia & Gallbladder",
      "Laser Circumcision", "Varicose Vein EVLT"
    ],
    cityOffer: {
      badge: "Tech Center Express",
      headline: "Weekend Executive Laser Surgical Deck",
      subtext: "Designed for Whitefield & Electronic City tech professionals requiring same-day discharge",
      bundleItems: [
        "Zero upfront deposit with empanelled insurers",
        "Free pickup & drop across Oakhill & E-City corridors",
        "Complimentary post-op wound care kit & tele-consults"
      ],
      urgency: "Priority booking slots open for weekend admissions"
    }
  },

  // 2. Mysuru (Mysore)
  {
    slug: "mysuru",
    stateSlug: "karnataka",
    name: "Mysuru (Mysore)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 920550,
    cluster: "Karnataka — Southern Heritage",
    clusterSlug: "karnataka-south",
    coordinates: { lat: 12.2958, lng: 76.6394 },
    railwayStation: "Mysuru Railway Station",
    hubCity: "Mysuru & Southern Karnataka Hub",
    transitTime: "Express Expressway cab — 90 min to Bengaluru facility or direct local triage",
    description: "Trusted laser surgery network for Mysuru, Mandya, and heritage countryside villages with native Kannada speaking coordinators.",
    keyNeighbourhoods: [
      "Vijayanagar", "Hebbal Mysore", "Kuvempunagar", "Saraswathipuram",
      "Jayalakshmipuram", "Bogadi", "Dattagalli", "Gokulam"
    ],
    localHospitals: [
      "JSS Hospital Mysore", "Manipal Hospital Mysore"
    ],
    specializedProcedures: [
      "Laser Piles & Fissure", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ],
    honeymoonSpot: {
      name: "Coorg Plantation Retreats (Madikeri)",
      distance: "~115 km from Mysuru",
      description: "Discreet luxury coffee plantation stays in Coorg for complete private surgical recovery."
    }
  },

  // 3. Hubballi-Dharwad
  {
    slug: "hubballi-dharwad",
    stateSlug: "karnataka",
    name: "Hubballi-Dharwad",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 943857,
    cluster: "Karnataka — North Hub",
    clusterSlug: "karnataka-north",
    coordinates: { lat: 15.3647, lng: 75.1240 },
    railwayStation: "Hubballi Railway Station",
    hubCity: "North Karnataka Surgical Center",
    transitTime: "Direct railway station & town transit support",
    description: "Serving North Karnataka with advanced minimally invasive surgical treatments, eliminating the need to travel to metro cities.",
    keyNeighbourhoods: [
      "Vidyanagar", "Keshwapur", "Gokul Road", "Club Road",
      "Unkal", "Navanagar", "PB Road Dharwad", "Saptapur"
    ],
    localHospitals: [
      "KIMS Hospital Hubballi", "SDM Medical College Dharwad"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 4. Mangaluru (Mangalore)
  {
    slug: "mangaluru",
    stateSlug: "karnataka",
    name: "Mangaluru (Mangalore)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 623841,
    cluster: "Karnataka — Coastal Hub",
    clusterSlug: "karnataka-coastal",
    coordinates: { lat: 12.8698, lng: 74.8431 },
    railwayStation: "Mangaluru Junction Railway Station",
    hubCity: "Coastal Karnataka Medical Hub",
    transitTime: "Coordinated cab pickups along coastal corridor",
    description: "Zero-pain surgical treatments and expert surgical triage for Mangaluru, Udupi, and Dakshina Kannada coastal villages.",
    keyNeighbourhoods: [
      "Hampankatta", "Bejai", "Kadri", "Balmatta",
      "Kankanady", "Urwa", "Attavar", "Bunts Hostel Road"
    ],
    localHospitals: [
      "KMC Hospital Mangalore", "Father Muller Medical College Hospital", "AJ Hospital"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 5. Belagavi (Belgaum)
  {
    slug: "belagavi",
    stateSlug: "karnataka",
    name: "Belagavi (Belgaum)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 610350,
    cluster: "Karnataka — North Hub",
    clusterSlug: "karnataka-north",
    coordinates: { lat: 15.8497, lng: 74.4977 },
    railwayStation: "Belagavi Railway Station",
    hubCity: "North-West Karnataka Surgical Corridor",
    transitTime: "Free rural & town travel assistance available",
    description: "Empowering Belagavi and border village patients with transparent surgery costs and 100% Insurance Eligible approval.",
    keyNeighbourhoods: [
      "Tilakwadi", "Shivaji Nagar Belgaum", "Camp Area", "Goaves",
      "Shahapur", "Shahpur Road", "Khanapur Road", "Sadashiv Nagar"
    ],
    localHospitals: [
      "KLE Dr. Prabhakar Kore Hospital", "Belgaum Institute of Medical Sciences"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 6. Kalaburagi (Gulbarga)
  {
    slug: "kalaburagi",
    stateSlug: "karnataka",
    name: "Kalaburagi (Gulbarga)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 533587,
    cluster: "Karnataka — North Hub",
    clusterSlug: "karnataka-north",
    coordinates: { lat: 17.3297, lng: 76.8343 },
    railwayStation: "Kalaburagi Railway Station",
    hubCity: "North-East Karnataka Medical Desk",
    transitTime: "Direct bus terminus & station transit support",
    description: "Specialized hospital surgical navigation for Kalaburagi region, featuring native Kannada support and zero upfront hospital deposit.",
    keyNeighbourhoods: [
      "Mahaveer Nagar", "Super Market Area", "Kalburgi Circle",
      "Station Road", "Osmanabad Road", "Yadgir Road", "Sedam Road"
    ],
    localHospitals: [
      "Gulbarga Institute of Medical Sciences (GIMS)", "District Hospital Kalaburagi"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 7. Tumakuru (Tumkur)
  {
    slug: "tumakuru",
    stateSlug: "karnataka",
    name: "Tumakuru (Tumkur)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 305821,
    cluster: "Karnataka — Bengaluru Corridor",
    clusterSlug: "karnataka-blr-corridor",
    coordinates: { lat: 13.3409, lng: 77.1010 },
    railwayStation: "Tumkur Railway Station",
    hubCity: "Bengaluru–Tumakuru Surgical Corridor",
    transitTime: "Free highway cab to Bengaluru facility — 70 min",
    description: "Fast highway surgical transit and localized triage for Tumakuru town and surrounding coconut farming villages.",
    keyNeighbourhoods: [
      "SS Layout", "B.H. Road", "Tumkur City Bus Stand Area",
      "Vidyanagar Tumkur", "Keb Colony", "Tiptur Road", "Saraswathipuram Tumkur"
    ],
    localHospitals: [
      "Siddartha Medical College Hospital", "District Hospital Tumkur"
    ],
    specializedProcedures: [
      "Laser Piles & Fissure", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 8. Davangere
  {
    slug: "davangere",
    stateSlug: "karnataka",
    name: "Davangere",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 435128,
    cluster: "Karnataka — Central Hub",
    clusterSlug: "karnataka-central",
    coordinates: { lat: 14.4644, lng: 75.9218 },
    railwayStation: "Davangere Railway Station",
    hubCity: "Central Karnataka Medical Desk",
    transitTime: "Express highway transit coordination",
    description: "High-tech laser surgical care for Davangere and Central Karnataka agricultural heartland with complete insurance guidance.",
    keyNeighbourhoods: [
      "PJ Extension", "Vinobanagar", "Anagodu Road",
      "MCC B Block", "Nittuvalli", "Hadadi Road", "Lenin Nagar"
    ],
    localHospitals: [
      "JJM Medical College Hospital", "District Hospital Davangere", "Bapuji Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 9. Ballari (Bellary)
  {
    slug: "ballari",
    stateSlug: "karnataka",
    name: "Ballari (Bellary)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 410445,
    cluster: "Karnataka — Central Hub",
    clusterSlug: "karnataka-central",
    coordinates: { lat: 15.1485, lng: 76.9213 },
    railwayStation: "Bellary Junction Railway Station",
    hubCity: "Bellary Mining Corridor Surgical Desk",
    transitTime: "Coordinated express transit from mining & industrial townships",
    description: "Specialized USFDA surgical protocols tailored for mining executives and industrial workers across Ballari and Toranagallu.",
    keyNeighbourhoods: [
      "Cowl Bazaar", "Gandhinagar Bellary", "Infantry Road",
      "Miller Pet", "Satyanarayanapet", "Sudha Cross", "Toranagallu Belt"
    ],
    localHospitals: [
      "VIMS Hospital Bellary", "Jindal Sanjeevani Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein EVLT"
    ]
  },

  // 10. Vijayapura (Bijapur)
  {
    slug: "vijayapura",
    stateSlug: "karnataka",
    name: "Vijayapura (Bijapur)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 326360,
    cluster: "Karnataka — North Hub",
    clusterSlug: "karnataka-north",
    coordinates: { lat: 16.8302, lng: 75.7100 },
    railwayStation: "Vijayapura Railway Station",
    hubCity: "North Karnataka Heritage Medical Desk",
    transitTime: "Direct town and highway transit assistance",
    description: "Modern laser proctology and laparoscopic surgery network serving Vijayapura and northern Deccan heritage towns.",
    keyNeighbourhoods: [
      "Gol Gumbaz Area", "Adarsh Nagar Vijayapura", "Station Road Bijapur",
      "Ibrahimpur", "Bagalkot Road", "Shivaji Circle"
    ],
    localHospitals: [
      "BLDE University Medical College Hospital", "District Civil Hospital Vijayapura"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 11. Shivamogga (Shimoga)
  {
    slug: "shivamogga",
    stateSlug: "karnataka",
    name: "Shivamogga (Shimoga)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 322428,
    cluster: "Karnataka — Malnad Gateway",
    clusterSlug: "karnataka-malnad",
    coordinates: { lat: 13.9299, lng: 75.5681 },
    railwayStation: "Shivamogga Town Railway Station",
    hubCity: "Malnad Gateway Surgical Desk",
    transitTime: "Express transport from Bhadravathi & Western Ghats belt",
    description: "Expert surgical triage and zero-pain laser procedures for Shivamogga, Bhadravati, and surrounding plantation regions.",
    keyNeighbourhoods: [
      "Vinobha Nagar Shimoga", "Jayanagar Shimoga", "Tilak Nagar",
      "Mission Compound", "Alka, Shimoga", "B.H. Road Shimoga"
    ],
    localHospitals: [
      "McGAN District Hospital", "Narayana Hrudayalaya Shimoga (referral)"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 12. Raichur
  {
    slug: "raichur",
    stateSlug: "karnataka",
    name: "Raichur",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 232456,
    cluster: "Karnataka — North Hub",
    clusterSlug: "karnataka-north",
    coordinates: { lat: 16.2076, lng: 77.3463 },
    railwayStation: "Raichur Junction Railway Station",
    hubCity: "Doab Agricultural Surgical Hub",
    transitTime: "Assisted highway cab along Raichur-Mantralayam corridor",
    description: "Bringing advanced laser proctology and hernia surgery to Raichur Doab region with complete Insurance Eligible financial guidance.",
    keyNeighbourhoods: [
      "Station Area Raichur", "Naya Killa", "Siddhartha Colony",
      "Basaveshwara Circle", "Mantralayam Road", "Ambedkar Nagar Raichur"
    ],
    localHospitals: [
      "Raichur Institute of Medical Sciences (RIMS)", "Navodaya Medical College Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 13. Bidar
  {
    slug: "bidar",
    stateSlug: "karnataka",
    name: "Bidar",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 216020,
    cluster: "Karnataka — North Hub",
    clusterSlug: "karnataka-north",
    coordinates: { lat: 17.9104, lng: 77.5199 },
    railwayStation: "Bidar Railway Station",
    hubCity: "Northernmost Karnataka Triage Desk",
    transitTime: "Coordinated transport across Bidar, Bhalki, and Humnabad",
    description: "Accessible laser surgery and day-care procedures for Bidar and northern border towns, with Kannada and multi-lingual coordinators.",
    keyNeighbourhoods: [
      "Old City Bidar", "Mailoor Road", "Gandhi Chowk Bidar",
      "Chidri Road", "Shivanagar Bidar", "Airforce Station Area"
    ],
    localHospitals: [
      "Bidar Institute of Medical Sciences (BRIMS)", "Gurudatta Hospital"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 14. Hospet (Hosapete)
  {
    slug: "hospet",
    stateSlug: "karnataka",
    name: "Hosapete (Hospet)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 206167,
    cluster: "Karnataka — Central Hub",
    clusterSlug: "karnataka-central",
    coordinates: { lat: 15.2689, lng: 76.3909 },
    railwayStation: "Hosapete Junction Railway Station",
    hubCity: "Tungabhadra Heritage & Steel Desk",
    transitTime: "Rapid transport connecting Hampi, Hospet town & Toranagallu",
    description: "Trusted surgical solutions for Hosapete residents, visitors, and regional industrial workers with end-to-end hospital empanelment support.",
    keyNeighbourhoods: [
      "College Road Hospet", "Patel Nagar", "Amaravathi",
      "Station Road Hospet", "Hampi Road Area", "Chittawadigi"
    ],
    localHospitals: [
      "Govt Hospital Hosapete", "St. Mary's Hospital"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 15. Gadag-Betagheri
  {
    slug: "gadag-betagheri",
    stateSlug: "karnataka",
    name: "Gadag-Betagheri",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 172612,
    cluster: "Karnataka — North Hub",
    clusterSlug: "karnataka-north",
    coordinates: { lat: 15.4312, lng: 75.6329 },
    railwayStation: "Gadag Junction Railway Station",
    hubCity: "Central North Cultural Hub",
    transitTime: "40-min connection to Hubballi advanced surgical centers",
    description: "Seamless surgical coordination between Gadag-Betagheri and advanced laser surgical suites in Hubballi with zero transit friction.",
    keyNeighbourhoods: [
      "Mulund, Gadag", "Betagheri Town", "Station Road Gadag",
      "Veera Narayana Temple Area", "Kanakadasa Nagar", "Mulund West"
    ],
    localHospitals: [
      "Gadag Institute of Medical Sciences (GIMS)", "CSI Hospital Gadag"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 16. Robertsonpet (KGF)
  {
    slug: "robertsonpet",
    stateSlug: "karnataka",
    name: "Robertsonpet (KGF)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 162230,
    cluster: "Karnataka — Bengaluru Corridor",
    clusterSlug: "karnataka-blr-corridor",
    coordinates: { lat: 12.9602, lng: 78.2747 },
    railwayStation: "Bangarapet / Oorgaum Railway Station",
    hubCity: "Eastern Gold Fields Medical Corridor",
    transitTime: "60-min expressway cab to Bengaluru Whitefield hospitals",
    description: "Direct patient navigation from Robertsonpet and KGF townships to empanelled super-speciality centers in Whitefield Bengaluru.",
    keyNeighbourhoods: [
      "Robertsonpet Core", "Oorgaum", "Champion Reef",
      "Andersonpet", "Bangarapet Road", "Swarnakumar Nagar"
    ],
    localHospitals: [
      "BGM Hospital KGF", "Govt Hospital Robertsonpet"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein EVLT"
    ]
  },

  // 17. Hassan
  {
    slug: "hassan",
    stateSlug: "karnataka",
    name: "Hassan",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 155006,
    cluster: "Karnataka — Malnad Gateway",
    clusterSlug: "karnataka-malnad",
    coordinates: { lat: 13.0033, lng: 76.1004 },
    railwayStation: "Hassan Junction Railway Station",
    hubCity: "Hassan Malnad Medical Desk",
    transitTime: "Express NH75 cab connection to Bengaluru or Mysuru hubs",
    description: "Reliable laser surgery packages for Hassan plantation districts, offering same-day discharge and native Kannada assistance.",
    keyNeighbourhoods: [
      "Kuvempunagar Hassan", "NR Mohalla Hassan", "Station Road Hassan",
      "Santhepet", "Hemavathi Nagar", "Dairy Circle"
    ],
    localHospitals: [
      "Hassan Institute of Medical Sciences (HIMS)", "Mangala Hospital Hassan"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ],
    honeymoonSpot: {
      name: "Sakleshpur Valley Stays",
      distance: "~38 km from Hassan",
      description: "Tranquil mist-wrapped boutique resorts in Sakleshpur for couples and private surgical recovery."
    }
  },

  // 18. Bhadravati
  {
    slug: "bhadravathi",
    stateSlug: "karnataka",
    name: "Bhadravathi",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 151102,
    cluster: "Karnataka — Malnad Gateway",
    clusterSlug: "karnataka-malnad",
    coordinates: { lat: 13.8400, lng: 75.7020 },
    railwayStation: "Bhadravathi Railway Station",
    hubCity: "Steel City Medical Triage Desk",
    transitTime: "20 min transit to Shivamogga specialized surgical centers",
    description: "Dedicated surgical care support for steel and paper mill employees across Bhadravathi, with streamlined insurance processing.",
    keyNeighbourhoods: [
      "New Town Bhadravathi", "Old Town Area", "Paper Town (MPM)",
      "Steel Town (VISL)", "Hutha Colony", "Singanamane"
    ],
    localHospitals: [
      "VISL Hospital", "MPM Hospital", "Govt Hospital Bhadravathi"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 19. Chitradurga
  {
    slug: "chitradurga",
    stateSlug: "karnataka",
    name: "Chitradurga",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 145852,
    cluster: "Karnataka — Central Hub",
    clusterSlug: "karnataka-central",
    coordinates: { lat: 14.2251, lng: 76.3980 },
    railwayStation: "Chitradurga Railway Station",
    hubCity: "Fortress Corridor Surgical Hub",
    transitTime: "Express NH48 transport to Davangere or Bengaluru hubs",
    description: "High-tech laser surgeries accessible to Chitradurga residents with zero pain, transparent billing, and insurance pre-verification.",
    keyNeighbourhoods: [
      "JCR Extension", "Fort Area Chitradurga", "Vp Extension",
      "Kelagote", "Holalkere Road", "Turuvnur Road"
    ],
    localHospitals: [
      "District Hospital Chitradurga", "Basaveshwara Medical College Hospital"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 20. Udupi
  {
    slug: "udupi",
    stateSlug: "karnataka",
    name: "Udupi & Manipal",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 144960,
    cluster: "Karnataka — Coastal Hub",
    clusterSlug: "karnataka-coastal",
    coordinates: { lat: 13.3409, lng: 74.7421 },
    railwayStation: "Udupi Railway Station",
    hubCity: "Udupi–Manipal Advanced Healthcare Deck",
    transitTime: "Immediate ambulatory coordination across Udupi & Manipal",
    description: "World-class minimal access surgery and laser proctology for Udupi, Manipal university belt, and surrounding coastal districts.",
    keyNeighbourhoods: [
      "Manipal University Town", "Udupi Car Street", "Brahmagiri",
      "Ambalpadi", "Malpe Road", "Kunjibettu"
    ],
    localHospitals: [
      "Kasturba Hospital Manipal", "Adarsha Hospital Udupi", "Dr. TMA Pai Hospital"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 21. Kolar
  {
    slug: "kolar",
    stateSlug: "karnataka",
    name: "Kolar",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 138462,
    cluster: "Karnataka — Bengaluru Corridor",
    clusterSlug: "karnataka-blr-corridor",
    coordinates: { lat: 13.1367, lng: 78.1292 },
    railwayStation: "Kolar Railway Station",
    hubCity: "Kolar Silk & Dairy Medical Corridor",
    transitTime: "50-min drive to Bengaluru eastern medical centers",
    description: "Personalized surgical triage and fast hospital admissions for Kolar dairy & silk belt farmers and urban families.",
    keyNeighbourhoods: [
      "Gulpet", "Tekal Road", "Doom Light Circle",
      "Kolar Bus Stand Area", "Tamaka", "Ammaji Nagar"
    ],
    localHospitals: [
      "R L Jalappa Medical College Hospital Tamaka", "SNR District Hospital Kolar"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 22. Mandya
  {
    slug: "mandya",
    stateSlug: "karnataka",
    name: "Mandya",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 137358,
    cluster: "Karnataka — Southern Heritage",
    clusterSlug: "karnataka-south",
    coordinates: { lat: 12.5222, lng: 76.8973 },
    railwayStation: "Mandya Railway Station",
    hubCity: "Mandya Sugar Valley Surgical Desk",
    transitTime: "35-min expressway run to Mysuru advanced hospitals",
    description: "Expert laser surgical packages for Mandya sugar belt families, guaranteed with Insurance Eligible processing and zero hidden charges.",
    keyNeighbourhoods: [
      "Subhash Nagar Mandya", "Guttalu Colony", "Bannur Road Area",
      "V.V. Nagar", "Station Road Mandya", "Sugar Factory Area"
    ],
    localHospitals: [
      "Mandya Institute of Medical Sciences (MIMS)", "Sanjivini Hospital Mandya"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 23. Chikmagalur (Chikkamagaluru)
  {
    slug: "chikmagalur",
    stateSlug: "karnataka",
    name: "Chikkamagaluru (Chikmagalur)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 118401,
    cluster: "Karnataka — Malnad Gateway",
    clusterSlug: "karnataka-malnad",
    coordinates: { lat: 13.3153, lng: 75.7754 },
    railwayStation: "Chikkamagaluru Railway Station",
    hubCity: "Malnad Coffee Valley Triage Desk",
    transitTime: "Assisted mountain & town cab to Hassan or Shivamogga suites",
    description: "Gentle, precision laser surgical care designed for coffee estate owners, plantation families, and Chikkamagaluru town residents.",
    keyNeighbourhoods: [
      "Kalyan Nagar Chikmagalur", "Vijayapura Chikmagalur", "KM Road",
      "Basavanahalli", "RG Road", "Uppalli"
    ],
    localHospitals: [
      "District Hospital Chikkamagaluru", "Holy Cross Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fissure", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ],
    honeymoonSpot: {
      name: "Mullayanagiri Coffee Hill Estates",
      distance: "~20 km from town center",
      description: "Secluded plantation hill retreats offering calm weather, privacy, and rejuvenating ambiance after minor day-care surgeries."
    }
  },

  // 24. Karwar
  {
    slug: "karwar",
    stateSlug: "karnataka",
    name: "Karwar",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 77139,
    cluster: "Karnataka — Coastal Hub",
    clusterSlug: "karnataka-coastal",
    coordinates: { lat: 14.8055, lng: 74.1302 },
    railwayStation: "Karwar Railway Station",
    hubCity: "Northern Coastal Harbor Medical Desk",
    transitTime: "Coastal transport to Mangaluru or Manipal specialized facilities",
    description: "Advanced surgical triage and insurance navigation for Karwar naval port and coastal Uttara Kannada communities.",
    keyNeighbourhoods: [
      "Kodi Bagh", "Habbuwada", "Kajubag",
      "Baad", "Binaga", "Seaside Road"
    ],
    localHospitals: [
      "Karwar Institute of Medical Sciences (KRIMS)", "Civil Hospital Karwar"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 25. Bagalkoted (Bagalkot)
  {
    slug: "bagalkot",
    stateSlug: "karnataka",
    name: "Bagalkote (Bagalkot)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    population: 111933,
    cluster: "Karnataka — North Hub",
    clusterSlug: "karnataka-north",
    coordinates: { lat: 16.1691, lng: 75.6615 },
    railwayStation: "Bagalkote Railway Station",
    hubCity: "Ghataprabha & Navanagar Medical Hub",
    transitTime: "Direct transit connecting Old Bagalkote & Navanagar sectors",
    description: "Accessible laser surgical solutions and dedicated patient guidance for Bagalkote, Badami, and surrounding heritage centers.",
    keyNeighbourhoods: [
      "Navanagar Bagalkot", "Vidyagiri", "Old Bagalkote",
      "Gaddanakeri", "Sector 3 Navanagar", "Belagavi Road Bagalkot"
    ],
    localHospitals: [
      "S. Nijalingappa Medical College Hospital", "District Civil Hospital Bagalkote"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  }
];
