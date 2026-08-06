import { RegionalLocation } from "../regionalLocations";

export const TAMIL_NADU_LOCATIONS: RegionalLocation[] = [
  // ── Cluster 1: Chennai Capital Cluster ────────────────────────────────────
  {
    slug: "chennai",
    stateSlug: "tamil-nadu",
    name: "Chennai",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 7088000,
    cluster: "Capital Cluster — Chennai Metro",
    clusterSlug: "chennai-capital",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    railwayStation: "Chennai Central Railway Station",
    hubCity: "Chennai Speciality Medical Hub",
    transitTime: "Direct City Ambulatory & Metro Care Support",
    description: "Expert USFDA laser surgical care across Anna Nagar, Adyar, OMR IT Corridor, and Velachery with priority Insurance Eligible approval. Same-day discharge protocols with dedicated Tamil coordinators.",
    keyNeighbourhoods: [
      // Central Chennai
      "Anna Nagar", "T. Nagar", "Nungambakkam", "Mylapore", "Alwarpet", "Royapettah", "Gopalapuram", "Egmore", "Kilpauk", "Chetpet",
      // South Chennai & Coastal
      "Adyar", "Besant Nagar", "Thiruvanmiyur", "Velachery", "Guindy", "Little Mount", "Saidapet", "Kotturpuram", "RA Puram", "Mandaveli",
      // IT Corridor (OMR & ECR)
      "OMR", "Perungudi", "Thoraipakkam", "Karapakkam", "Sholinganallur", "Navalur", "Siruseri", "Kelambakkam", "Neelankarai", "Palavakkam",
      // West Chennai & Industrial
      "Porur", "Vadapalani", "K.K. Nagar", "Ashok Nagar", "Saligramam", "Virugambakkam", "Valasaravakkam", "Mogappair", "Ambattur", "Poonamallee",
      // North & Suburbs (GST Road)
      "Tambaram", "Chromepet", "Pallavaram", "Meenambakkam", "Nanganallur", "Madipakkam", "Keelkattalai", "Perumbakkam", "Medavakkam", "Selaiyur", "Kolathur", "Perambur"
    ],
    localHospitals: [
      "Apollo Hospitals Greams Road", "Fortis Malar Adyar", "MIOT International"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula Care", "Laparoscopic Hernia Repair",
      "Laser Circumcision", "Varicose Vein Laser Therapy", "Laser Fissure Relief"
    ],
    cityOffer: {
      badge: "Chennai Corporate Express",
      headline: "IT Professional Weekend Laser Surgery Package",
      subtext: "Designed for OMR and Sholinganallur IT corridor professionals",
      bundleItems: [
        "Free Insurance pre-authorisation (same day)",
        "Saturday/Sunday daycare surgical slots",
        "Corporate group policy accepted (TCS, Infosys, Wipro empanelled)",
        "Confidential records — unlabeled billing"
      ],
      urgency: "Limited weekend OT slots — 4 remaining this week"
    },
    procedureOffers: {
      "circumcision": {
        badge: "Privacy Shield Package — Chennai",
        headline: "Confidential Laser Circumcision for Chennai Professionals",
        subtext: "Unlabeled hospital records. WhatsApp triage only. No public registration.",
        bundleItems: ["Dedicated private OT room", "Unmarked discharge summary", "Corporate insurer direct billing"],
      }
    }
  },

  {
    slug: "kanchipuram",
    stateSlug: "tamil-nadu",
    name: "Kanchipuram",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 221749,
    cluster: "Capital Cluster — Chennai Metro",
    clusterSlug: "chennai-capital",
    coordinates: { lat: 12.8342, lng: 79.7036 },
    railwayStation: "Kanchipuram Railway Station",
    hubCity: "Kanchipuram & Silk City Medical Desk",
    transitTime: "60-min express cab to Chennai empanelled hospitals",
    description: "Fast-track surgical coordination for Kanchipuram, Orikkai, and Sevilimedu residents. Bypass Meenakshi Medical College queues — direct Insurance Eligible laser care via HealthFlo network.",
    keyNeighbourhoods: [
      "Gandhi Road", "Orikkai", "Sevilimedu", "Pillaiyar Palayam",
      "Military Road", "Kamatchi Amman Koil Street", "Thatchambattu"
    ],
    localHospitals: [
      "Meenakshi Medical College Hospital", "Kanchi Kamakoti Childs Trust"
    ],
    specializedProcedures: [
      "Laser Piles & Fissure Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein Laser"
    ],
    honeymoonSpot: {
      name: "East Coast Road (ECR) & Mahabalipuram",
      distance: "~60 km from Kanchipuram",
      description: "Discreet post-procedure recovery at Taj Fisherman's Cove or Radisson Blu Temple Bay, ECR."
    }
  },

  {
    slug: "hosur",
    stateSlug: "tamil-nadu",
    name: "Hosur",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 116821,
    cluster: "Capital Cluster — Chennai Metro",
    clusterSlug: "chennai-capital",
    coordinates: { lat: 12.7409, lng: 77.8253 },
    railwayStation: "Hosur Railway Station",
    hubCity: "Hosur Industrial & EV Corridor Hub",
    transitTime: "45-min highway cab to Bengaluru empanelled hospitals",
    description: "Surgical coordination for Hosur's booming EV and manufacturing workers (Tata Motors, Ola Electric corridor). Insurance Eligible laser care without travel to Bengaluru or Chennai.",
    keyNeighbourhoods: [
      "Thally Road", "Rayakottai Road", "Avalapalli", "Mathigiri",
      "HUDCO Colony", "Shoolagiri", "Denkanikottai Road"
    ],
    localHospitals: [
      "Sparsh Hospital Hosur", "Narayana Health partner clinics"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia Repair", "Laser Circumcision", "Varicose Vein Treatment"
    ],
    cityOffer: {
      badge: "Hosur Manufacturing Worker Bundle",
      headline: "Factory Shift-Friendly Daycare Surgery — No Extended Leave Needed",
      subtext: "For Tata, Ola, and Toyota belt workers covered under ESI & group insurance",
      bundleItems: ["ESI & group insurance accepted", "Morning slot available before shift", "Free cab from Hosur to facility"],
    }
  },

  // ── Cluster 2: Western Cluster — Kongu Nadu ───────────────────────────────
  {
    slug: "coimbatore",
    stateSlug: "tamil-nadu",
    name: "Coimbatore",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 1301438,
    cluster: "Western Cluster — Kongu Nadu",
    clusterSlug: "western-kongu-nadu",
    coordinates: { lat: 11.0168, lng: 76.9558 },
    railwayStation: "Coimbatore Junction Railway Station",
    hubCity: "Coimbatore & Western Tamil Nadu Hub",
    transitTime: "Express cab from Coimbatore Junction to empanelled facility",
    description: "Advanced laser surgical care for Coimbatore's R.S. Puram, Peelamedu, and Saravanampatti residents. Bypass KMCH and Ganga Hospital queues — same-day discharge with Insurance Eligible billing.",
    keyNeighbourhoods: [
      "R.S. Puram", "Race Course", "Peelamedu", "Saravanampatti", "Saibaba Colony", "Ramanathapuram", "Gandhipuram", "Singanallur", "Vadavalli",
      "Town Hall", "Ukkadam", "Kuniyamuthur", "Kovaipudur", "Thudiyalur", "Kalapatti", "Neelambur", "Ondipudur", "Sowripalayam", "Puliakulam",
      "Ramnagar", "Saibaba Koil", "Kurumbapalayam", "Sulur", "Podanur", "Chettipalayam"
    ],
    localHospitals: [
      "Kovai Medical Center (KMCH)", "Ganga Hospital Saibaba Colony", "PSG Hospitals"
    ],
    specializedProcedures: [
      "Laser Proctology (Piles/Fissure)", "Laparoscopic Hernia",
      "Laser Circumcision", "Kidney Stone Laser", "Varicose Vein EVLT"
    ],
    cityOffer: {
      badge: "Coimbatore Textile Hub Package",
      headline: "Zero-Day Leave Surgery for Coimbatore Mill & Business Owners",
      subtext: "All-inclusive daycare — insurance handled while you recover at home same evening",
      bundleItems: [
        "Free priority Insurance pre-auth",
        "Saturday surgical slot available",
        "Free AC cab from Gandhipuram / Ukkadam Bus Stand",
        "Tamil coordinator from consultation to discharge"
      ]
    },
    honeymoonSpot: {
      name: "Ooty & Coonoor — The Nilgiris",
      distance: "~85 km from Coimbatore",
      description: "Premium hill station recovery for discreet post-procedure recuperation at Savoy Ooty or Taj Savoy."
    }
  },

  {
    slug: "tiruppur",
    stateSlug: "tamil-nadu",
    name: "Tiruppur",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 877778,
    cluster: "Western Cluster — Kongu Nadu",
    clusterSlug: "western-kongu-nadu",
    coordinates: { lat: 11.1085, lng: 77.3411 },
    railwayStation: "Tiruppur Railway Station",
    hubCity: "Tiruppur Textile Belt Medical Desk",
    transitTime: "Free cab from Tiruppur Railway Station — 45-min to facility",
    description: "Insurance Eligible laser surgery for Tiruppur's knitwear industry workers and factory owners. Avinashi Road, Khaderpet, and Perumanallur patients get dedicated Tamil triage support.",
    keyNeighbourhoods: [
      "Avinashi Road", "Khaderpet", "Perumanallur Road", "Dharapuram Road",
      "Palladam Road", "Vellalore", "Kangeyam Road", "Annur"
    ],
    localHospitals: [
      "Revathi Medical Center", "Prime Medicals Tiruppur"
    ],
    specializedProcedures: [
      "Laser Piles & Fissure", "Laparoscopic Hernia Repair",
      "Laser Circumcision", "Varicose Vein Laser"
    ],
    cityOffer: {
      badge: "Tiruppur Knitwear Worker Package",
      headline: "Mill & Export Worker Laser Surgery — ESI & Group Insurance Accepted",
      subtext: "Same-day return to Tiruppur — no extended hospital stay",
      bundleItems: [
        "ESI scheme fully accepted", "Free Tiruppur Railway Station cab pickup",
        "Evening recovery — back to work next day", "Tamil coordinator (no language barrier)"
      ]
    },
    honeymoonSpot: {
      name: "Ooty & Coonoor — The Nilgiris",
      distance: "~100 km from Tiruppur",
      description: "Quiet hill recovery option for couples seeking private post-procedure comfort."
    }
  },

  {
    slug: "salem",
    stateSlug: "tamil-nadu",
    name: "Salem",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 829267,
    cluster: "Western Cluster — Kongu Nadu",
    clusterSlug: "western-kongu-nadu",
    coordinates: { lat: 11.6643, lng: 78.1460 },
    railwayStation: "Salem Junction Railway Station",
    hubCity: "Salem & Western TN Surgical Corridor",
    transitTime: "Free highway cab from Salem Junction to facility",
    description: "Laser surgical care for Salem's Fairlands, Alagapuram, and Hasthampatti areas. Insurance Eligible procedures with no room-rent cap surprises. Yercaud hill and Omalur village patients covered.",
    keyNeighbourhoods: [
      "Fairlands", "Alagapuram", "Hasthampatti", "Suramangalam",
      "Ammapet", "Meyyanur", "Shevapet", "Five Roads"
    ],
    localHospitals: [
      "Manipal Hospital Salem", "Royal Care Super Speciality Hospital"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein Care"
    ],
    honeymoonSpot: {
      name: "Yercaud Hill Station — Salem District",
      distance: "~30 km from Salem city",
      description: "Mist-covered mountains for discreet post-procedure recovery. Sterling Yercaud and GRT Regency available."
    }
  },

  {
    slug: "erode",
    stateSlug: "tamil-nadu",
    name: "Erode",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 498129,
    cluster: "Western Cluster — Kongu Nadu",
    clusterSlug: "western-kongu-nadu",
    coordinates: { lat: 11.3410, lng: 77.7172 },
    railwayStation: "Erode Junction Railway Station",
    hubCity: "Erode & Bhavani Basin Medical Desk",
    transitTime: "Free town & village cab transit from Erode Junction",
    description: "Specialized laser surgery for Erode, Thindal, Perundurai Road, and Bhavani farming communities. Zero upfront payment with direct Insurance Eligible billing across 30+ insurers.",
    keyNeighbourhoods: [
      "Thindal", "Perundurai Road", "Veerappanchatram", "Sampath Nagar",
      "Brough Road", "Bhavani", "Gobichettipalayam Road", "Sathy Road"
    ],
    localHospitals: [
      "Lotus Hospital Erode", "KMCH Erode Speciality Centre"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Fissure Relief", "Varicose Vein Laser"
    ]
  },

  // ── Cluster 3: Southern Cluster ───────────────────────────────────────────
  {
    slug: "madurai",
    stateSlug: "tamil-nadu",
    name: "Madurai",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 962420,
    cluster: "Southern Cluster — Temple City",
    clusterSlug: "southern-temple-city",
    coordinates: { lat: 9.9252, lng: 78.1198 },
    railwayStation: "Madurai Junction Railway Station",
    hubCity: "Madurai Southern Tamil Nadu Triage Desk",
    transitTime: "Free assisted cab from Madurai Junction & surrounding towns",
    description: "High-tech laser surgery for Madurai's K.K. Nagar, Anna Nagar, Iyer Bungalow, and Tallakulam residents. Insurance Eligible daycare procedures without Apollo Speciality queues and delays.",
    keyNeighbourhoods: [
      "K.K. Nagar", "Anna Nagar", "Iyer Bungalow", "Tallakulam",
      "Othakadai", "Pasumalai", "Villapuram", "Mattuthavani"
    ],
    localHospitals: [
      "Apollo Speciality Hospitals 80 Feet Road", "Meenakshi Mission Hospital & Research Centre"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula Surgery", "Laparoscopic Hernia",
      "Laser Circumcision", "Varicose Vein EVLT", "Laser Kidney Stone"
    ],
    honeymoonSpot: {
      name: "Kodaikanal Hill Station",
      distance: "~120 km from Madurai",
      description: "Lakeside mountain retreat in Dindigul District — ideal for quiet post-procedure couples recovery."
    }
  },

  {
    slug: "tirunelveli",
    stateSlug: "tamil-nadu",
    name: "Tirunelveli",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 497326,
    cluster: "Southern Cluster — Temple City",
    clusterSlug: "southern-temple-city",
    coordinates: { lat: 8.7139, lng: 77.7567 },
    railwayStation: "Tirunelveli Junction Railway Station",
    hubCity: "South Tamil Nadu Triage Desk",
    transitTime: "Free cab from Tirunelveli Junction & Palayamkottai",
    description: "Laser surgical care for Tirunelveli, Palayamkottai, and Vannarpettai residents. Connect to Insurance Eligible USFDA facilities without travelling to Chennai or Madurai.",
    keyNeighbourhoods: [
      "Palayamkottai", "Vannarpettai", "Perumalpuram", "Maharaja Nagar",
      "Junction area", "Melapalayam", "Krishnapuram", "Ambasamudram Road"
    ],
    localHospitals: [
      "Shifa Hospitals Tirunelveli", "Galaxy Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia & Gallbladder",
      "Laser Circumcision", "Varicose Vein Care"
    ],
    honeymoonSpot: {
      name: "Courtallam — The Spa of South India",
      distance: "~55 km from Tirunelveli",
      description: "Forest waterfalls & wellness resorts — perfect discreet post-procedure recovery destination."
    }
  },

  {
    slug: "thoothukkudi",
    stateSlug: "tamil-nadu",
    name: "Thoothukkudi (Tuticorin)",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 410760,
    cluster: "Southern Cluster — Temple City",
    clusterSlug: "southern-temple-city",
    coordinates: { lat: 8.7642, lng: 78.1348 },
    railwayStation: "Tuticorin Railway Station",
    hubCity: "Thoothukkudi Port City Medical Desk",
    transitTime: "Free cab from Tuticorin Railway Station to empanelled facility",
    description: "Insurance Eligible laser surgical care for Thoothukkudi's Bryant Nagar, Millerpuram, and Chidambaranagar communities. Port city and fishery workers' medical support.",
    keyNeighbourhoods: [
      "Bryant Nagar", "Millerpuram", "Chidambaranagar", "Toovipuram",
      "Ettayapuram Road", "Caldwell Colony", "Tharuvaikulam"
    ],
    localHospitals: [
      "Sacred Heart Hospital Tuticorin", "Government Medical College Tuticorin"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein Laser"
    ]
  },

  {
    slug: "nagercoil",
    stateSlug: "tamil-nadu",
    name: "Nagercoil",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 224329,
    cluster: "Southern Cluster — Temple City",
    clusterSlug: "southern-temple-city",
    coordinates: { lat: 8.1833, lng: 77.4119 },
    railwayStation: "Nagercoil Junction Railway Station",
    hubCity: "Kanyakumari District Medical Desk",
    transitTime: "Free assisted cab from Nagercoil to empanelled hospitals",
    description: "Laser surgical support for Nagercoil, Kottar, and Kanyakumari district patients. Insurance Eligible USFDA procedures — Chettikulam, Ozhuginasery, and coastal villages covered.",
    keyNeighbourhoods: [
      "Chettikulam", "Ozhuginasery", "Kottar", "Vadasery",
      "KP Road", "Colachel Road", "Marthandam", "Padmanabhapuram"
    ],
    localHospitals: [
      "Annai Arul Hospital Nagercoil", "Jeeva Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fissure", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein Laser"
    ],
    honeymoonSpot: {
      name: "Kanniyakumari Beach — Ocean Sunrise Point",
      distance: "~20 km from Nagercoil",
      description: "Iconic three-sea sunrise destination for quiet post-procedure couples retreats."
    }
  },

  {
    slug: "dindigul",
    stateSlug: "tamil-nadu",
    name: "Dindigul",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 207327,
    cluster: "Southern Cluster — Temple City",
    clusterSlug: "southern-temple-city",
    coordinates: { lat: 10.3624, lng: 77.9695 },
    railwayStation: "Dindigul Junction Railway Station",
    hubCity: "Dindigul & Palani Region Medical Desk",
    transitTime: "Free cab from Dindigul Junction — 90-min to Madurai facility",
    description: "Dedicated laser surgical outreach for Dindigul, Palani Road, and surrounding village zones. Insurance Eligible zero-pain procedures for tannery and lock-manufacturing community workers.",
    keyNeighbourhoods: [
      "Palani Road", "Round Road", "Spencer Compound", "GT Road",
      "Thiruvalluvar Street", "Begampur", "Collectorate Area"
    ],
    localHospitals: [
      "Sree Gokulam Medical College Trivandrum (transit)", "District Government Hospital Dindigul"
    ],
    specializedProcedures: [
      "Laser Piles Surgery", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ],
    honeymoonSpot: {
      name: "Kodaikanal — Princess of Hill Stations",
      distance: "~80 km from Dindigul",
      description: "Fog-covered lakeside retreat inside Dindigul district — Sterling Kodai Lake and Hotel Kodai Resort."
    }
  },

  {
    slug: "kovilpatti",
    stateSlug: "tamil-nadu",
    name: "Kovilpatti",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 178620,
    cluster: "Southern Cluster — Temple City",
    clusterSlug: "southern-temple-city",
    coordinates: { lat: 9.1741, lng: 77.8674 },
    railwayStation: "Kovilpatti Railway Station",
    hubCity: "Kovilpatti & Fireworks Belt Medical Desk",
    transitTime: "Free cab from Kovilpatti Railway Station to Madurai or Tirunelveli facility",
    description: "Insurance Eligible laser care for Kovilpatti, PACR Road, and fireworks industry workers. Zero upfront payment with Insurance Eligible billing. Courtallam and Rajapalayam patients also served.",
    keyNeighbourhoods: [
      "PACR Road", "Main Bazaar", "Loyil Mill Colony", "Ettayapuram Road",
      "Tuticorin Road", "Sankarankovil Road", "Virudhunagar Road"
    ],
    localHospitals: [
      "Radhakrishna Hospital Kovilpatti", "District Government Hospital"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ],
    honeymoonSpot: {
      name: "Courtallam (Tenkasi) Waterfalls",
      distance: "~60 km from Kovilpatti",
      description: "South India's spa waterfall resort zone — ideal for private post-procedure recovery."
    }
  },

  {
    slug: "rajapalayam",
    stateSlug: "tamil-nadu",
    name: "Rajapalayam",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 130119,
    cluster: "Southern Cluster — Temple City",
    clusterSlug: "southern-temple-city",
    coordinates: { lat: 9.4523, lng: 77.5579 },
    railwayStation: "Rajapalayam Railway Station",
    hubCity: "Rajapalayam & Virudhunagar District Desk",
    transitTime: "Free cab from Rajapalayam to Madurai empanelled hospitals",
    description: "Laser surgical care and Insurance Eligible support for Rajapalayam, Tenkasi Road, and Virudhunagar district patients.",
    keyNeighbourhoods: [
      "Tenkasi Road", "PACR Road", "Jawahar Grounds", "PSK Nagar",
      "Ayikudy", "Srivilliputtur Road", "Sankarankovil"
    ],
    localHospitals: [
      "Vijay Hospital Rajapalayam", "District Government Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Care"
    ]
  },

  // ── Cluster 4: Central & Coastal Cluster ─────────────────────────────────
  {
    slug: "tiruchirappalli",
    stateSlug: "tamil-nadu",
    name: "Tiruchirappalli (Trichy)",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 916857,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 10.7905, lng: 78.7047 },
    railwayStation: "Tiruchirappalli Junction Railway Station",
    hubCity: "Trichy Central Tamil Nadu Medical Desk",
    transitTime: "Free cab from Trichy Junction to empanelled hospital",
    description: "Connect with verified empanelled laser hospitals across Thillai Nagar, Cantonment, Srirangam, and BHEL Township. Choose your hospital room tier to fit your budget with zero compromise on USFDA surgical safety. Complete cashless insurance processing and financial assistance provided.",
    keyNeighbourhoods: [
      "Thillai Nagar", "Cantonment", "K.K. Nagar", "Srirangam",
      "BHEL Township", "Kailasapuram", "Woraiyur", "Kattur", "Puthur", "Ariyamangalam"
    ],
    localHospitals: [
      "Apollo Speciality Hospitals Chennai Bypass Road", "Kauvery Hospital Trichy", "Maruti Hospital"
    ],
    specializedProcedures: [
      "Laser Piles Treatment", "Laser Anal Fissure Care", "Laser Anal Fistula Sealing",
      "Painless Laser Circumcision", "Keyhole 3D Mesh Hernia Repair", "Laser Varicose Veins & Lipoma Removal"
    ],
    cityOffer: {
      badge: "Trichy Empanelled Surgical Network",
      headline: "Choose Your Hospital Tier to Match Your Exact Budget — Zero Surgical Compromise",
      subtext: "Our empanelled USFDA surgical centers across Central Tamil Nadu maintain gold-standard surgical safety. Price differences reflect room type and amenities only—never the medical quality.",
      bundleItems: [
        "Select Economy, Standard or Executive empanelled hospital tiers",
        "100% Cashless insurance processing & 0% EMI financial assistance",
        "Free cab pickup from Trichy Junction, Thillai Nagar & surrounding towns",
        "Dedicated Tamil-speaking care coordinator from consultation to recovery"
      ],
      urgency: "Priority cashless pre-approval check available today"
    },
    procedureOffers: {
      "piles": {
        badge: "Trichy Piles Triage Package",
        headline: "Painless Laser Piles Care — Choose Your Hospital Tier & Budget",
        subtext: "No hospital queues or opaque billing. Zero surgical compromise across all empanelled hospital tiers.",
        bundleItems: ["USFDA laser precision (0 stitches)", "Same-day walk home protocol", "Free hospital transit across Trichy & Delta districts"],
      },
      "hernia": {
        badge: "Trichy Hernia Support Package",
        headline: "Keyhole 3D Mesh Hernia Repair With Complete Financial Support",
        subtext: "Avoid overpriced open surgery quotes. Choose an empanelled tier that aligns with your health policy or budget.",
        bundleItems: ["3D structural mesh protection", "Complete insurance documentation handling", "Minimal discomfort & 48-hour routine recovery"],
      }
    }
  },

  {
    slug: "vellore",
    stateSlug: "tamil-nadu",
    name: "Vellore",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 484690,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 12.9165, lng: 79.1325 },
    railwayStation: "Katpadi Junction Railway Station",
    hubCity: "Vellore & Northern Corridor Medical Desk",
    transitTime: "Free cab from Katpadi Junction — 90-min to Chennai facility",
    description: "Advanced laser surgery for Vellore, Sathuvachari, Gandhi Nagar, and Katpadi residents. Insurance Eligible care for patients who want alternatives to CMC Vellore's long waitlists.",
    keyNeighbourhoods: [
      "Sathuvachari", "Gandhi Nagar", "Katpadi", "Salavanpet",
      "Arcot Road", "Bagayam", "Virudhampet", "Ranipet"
    ],
    localHospitals: [
      "Christian Medical College (CMC Vellore)", "MIOT Vellore unit"
    ],
    specializedProcedures: [
      "Laser Piles, Fissure & Fistula", "Laparoscopic Hernia",
      "Laser Circumcision", "Varicose Vein Laser"
    ],
    cityOffer: {
      badge: "CMC Alternative Package",
      headline: "Skip the CMC Vellore Waitlist — Same-Day Laser Surgery Available",
      subtext: "Insurance Eligible. No 6-month queue. Expert USFDA care via HealthFlo.",
      bundleItems: [
        "Priority same-week appointments", "Dedicated Insurance Eligible pre-auth",
        "Free Katpadi Junction cab pickup", "Tamil coordinator — end to end"
      ],
      urgency: "Next available slot: This week"
    },
    honeymoonSpot: {
      name: "Yelagiri Forest Hill",
      distance: "~90 km from Vellore",
      description: "Quiet, less-crowded hill station — ideal for discreet recovery weekends."
    }
  },

  {
    slug: "thanjavur",
    stateSlug: "tamil-nadu",
    name: "Thanjavur",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 222943,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 10.7870, lng: 79.1378 },
    railwayStation: "Thanjavur Railway Station",
    hubCity: "Thanjavur & Big Temple Medical Desk",
    transitTime: "Free cab from Thanjavur Railway Station to Trichy facility",
    description: "Insurance Eligible laser care for Thanjavur, Medical College Road, and Brihadeeswarar temple zone residents. Delta agricultural community laser surgery support.",
    keyNeighbourhoods: [
      "Medical College Road", "Srinivasapuram", "Yagappa Nagar",
      "New Housing Unit", "Srinivasa Nagar", "Kumbakonam Road"
    ],
    localHospitals: [
      "Thanjavur Medical College Hospital", "Specialty Hospital Thanjavur"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  {
    slug: "kumbakonam",
    stateSlug: "tamil-nadu",
    name: "Kumbakonam",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 140156,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 10.9602, lng: 79.3845 },
    railwayStation: "Kumbakonam Railway Station",
    hubCity: "Kumbakonam & Temple Town Medical Desk",
    transitTime: "60-min cab from Kumbakonam to Thanjavur or Trichy facility",
    description: "Laser surgical care for Kumbakonam, Saccaf High Street, and Palakkarai residents. Temple town patients get full Insurance Eligible support with same-day discharge.",
    keyNeighbourhoods: [
      "Saccaf High Street", "New Railway Road", "Palakkarai",
      "Dr. Besant Road", "Porayar Road", "Swamimalai"
    ],
    localHospitals: [
      "Kumbakonam Government Hospital", "Saradha Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  {
    slug: "cuddalore",
    stateSlug: "tamil-nadu",
    name: "Cuddalore",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 173361,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 11.7447, lng: 79.7689 },
    railwayStation: "Cuddalore Port Town Railway Station",
    hubCity: "Cuddalore & SIPCOT Industrial Hub",
    transitTime: "90-min express cab to Chennai empanelled hospitals",
    description: "Laser surgical support for Cuddalore, SIPCOT industrial zone, and coastal fishing communities. Insurance Eligible care with zero upfront payment for chemical and port workers.",
    keyNeighbourhoods: [
      "Manjakuppam", "Koothapakkam", "Semmandalam", "Old Town (OT)",
      "SIPCOT Colony", "Vandipalayam", "Periapettai"
    ],
    localHospitals: [
      "Govt. Medical College Cuddalore", "Parvathy Hospital"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein Laser"
    ],
    honeymoonSpot: {
      name: "Pondicherry (Puducherry)",
      distance: "~30 km from Cuddalore",
      description: "French colonial beach town — Le Pondy and Promenade Beach Hotel for quiet post-procedure recovery."
    }
  },

  {
    slug: "tiruvannamalai",
    stateSlug: "tamil-nadu",
    name: "Tiruvannamalai",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 145683,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 12.2253, lng: 79.0747 },
    railwayStation: "Tiruvannamalai Railway Station",
    hubCity: "Tiruvannamalai & Girivalam Medical Desk",
    transitTime: "90-min cab to Vellore or Chennai empanelled hospitals",
    description: "Insurance Eligible laser surgical care for Tiruvannamalai, Chengam Road, and Annamalaiyar temple zone residents. Spiritual town patients deserve modern pain-free surgical care.",
    keyNeighbourhoods: [
      "Chengam Road", "Avalurpet Road", "Polur Road",
      "Temple Giri layout", "Gandhi Nagar", "Chennai Salai"
    ],
    localHospitals: [
      "Govt. Medical College Tiruvannamalai", "Vinayaga Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fissure", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  {
    slug: "pudukottai",
    stateSlug: "tamil-nadu",
    name: "Pudukottai",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 117215,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 10.3833, lng: 78.8167 },
    railwayStation: "Pudukottai Railway Station",
    hubCity: "Pudukottai & Granite Town Medical Desk",
    transitTime: "Free cab from Pudukottai to Trichy facility — 60 min",
    description: "Laser surgical outreach for Pudukottai, Rajagopalapuram, and granite mining community. Insurance Eligible care for rural Tamil Nadu's underserved central district patients.",
    keyNeighbourhoods: [
      "Rajagopalapuram", "Nizam Colony", "Kalyanaramapuram",
      "Alangudi Road", "Illuppur Road", "Thirumayam Road"
    ],
    localHospitals: [
      "Govt. Medical College Pudukottai", "Rajam Hospital"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  {
    slug: "karaikkudi",
    stateSlug: "tamil-nadu",
    name: "Karaikkudi",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 106714,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 10.0731, lng: 78.7739 },
    railwayStation: "Karaikkudi Railway Station",
    hubCity: "Chettinad Heritage & Medical Desk",
    transitTime: "75-min express cab to Madurai empanelled facility",
    description: "Insurance Eligible laser surgical care for Karaikkudi, Chettinad, and surrounding heritage village communities. Nattukotai Chettiar community patients served with zero-pain daycare procedures.",
    keyNeighbourhoods: [
      "College Road", "Subramaniapuram", "Sekkalai",
      "New Bus Stand Area", "Devakottai Road", "Kanadukathan"
    ],
    localHospitals: [
      "Govt. Hospital Karaikkudi", "Chettinad Health City (nearby)"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  {
    slug: "neyveli",
    stateSlug: "tamil-nadu",
    name: "Neyveli",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 105731,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 11.5449, lng: 79.4937 },
    railwayStation: "Neyveli Railway Station",
    hubCity: "Neyveli Lignite Township Medical Desk",
    transitTime: "90-min cab to Chennai or 60-min to Cuddalore empanelled facility",
    description: "Laser surgical care for Neyveli Township Block residents. NLC India employee ESI & corporate insurance schemes accepted. Block 2, Block 10, and Block 24 patients are priority triage.",
    keyNeighbourhoods: [
      "Township Block 2", "Township Block 10", "Township Block 24",
      "Indira Nagar Neyveli", "Mandarakuppam", "Vadalur Road"
    ],
    localHospitals: [
      "NLC India Hospital Neyveli", "Govt. Hospital Virudhachalam"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ],
    cityOffer: {
      badge: "NLC Employee Corporate Package",
      headline: "NLC Neyveli Workers — Corporate Policy Laser Surgery Available",
      subtext: "ESI, NLC group insurance, and central government health schemes fully accepted",
      bundleItems: [
        "NLC health scheme pre-authorisation", "Same-week appointment",
        "Free cab from Neyveli Township to facility", "Tamil coordinator — no language barrier"
      ]
    }
  },

  {
    slug: "nagapattinam",
    stateSlug: "tamil-nadu",
    name: "Nagapattinam",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 102905,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 10.7672, lng: 79.8449 },
    railwayStation: "Nagapattinam Railway Station",
    hubCity: "Nagapattinam Coastal & Velankanni Medical Desk",
    transitTime: "90-min cab from Nagapattinam to Trichy or Thanjavur facility",
    description: "Laser surgical support for Nagapattinam, Velankanni pilgrimage town, and delta fishing communities. Insurance Eligible procedures with zero upfront cost for coastal and rural residents.",
    keyNeighbourhoods: [
      "Public Office Road", "Velankanni Road", "Velippalayam",
      "Perumal Sannithi Street", "Karaikal Road", "Keezhaiur"
    ],
    localHospitals: [
      "Govt. Medical College Nagapattinam", "Basilica Hospital Velankanni"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ],
    honeymoonSpot: {
      name: "Pondicherry (Puducherry)",
      distance: "~100 km from Nagapattinam",
      description: "French colonial coastal retreat — couples recovery at Maison Perumal or The Promenade."
    }
  },

  {
    slug: "ambur",
    stateSlug: "tamil-nadu",
    name: "Ambur",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    population: 114608,
    cluster: "Central Cluster — Kaveri Delta",
    clusterSlug: "central-kaveri-delta",
    coordinates: { lat: 12.7910, lng: 78.7130 },
    railwayStation: "Ambur Railway Station",
    hubCity: "Ambur Leather Corridor Medical Desk",
    transitTime: "90-min express cab to Vellore or Chennai facility",
    description: "Insurance Eligible laser surgical care for Ambur, Vaniyambadi, and leather tanning industry workers. NH48 Extension and Bethleghem area residents are priority triage.",
    keyNeighbourhoods: [
      "NH48 Extension", "Bethleghem", "Reddy Thoppu",
      "Kaspa", "Vaniyambadi Road", "Barracks"
    ],
    localHospitals: [
      "Ambur Govt. Hospital", "CMC Vellore (60 km)"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ],
    honeymoonSpot: {
      name: "Yelagiri Forest Hill",
      distance: "~60 km from Ambur",
      description: "Serene hill escape — Nature's Heights Resort and Green Magic for private recovery stays."
    }
  },
];
