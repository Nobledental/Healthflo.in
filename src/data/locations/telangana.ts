import { RegionalLocation } from "../regionalLocations";

export const TELANGANA_LOCATIONS: RegionalLocation[] = [
  // 1. Hyderabad & Jubilee Hills Network
  {
    slug: "hyderabad",
    stateSlug: "telangana",
    name: "Hyderabad & Jubilee Hills Network",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 10534418,
    cluster: "Telangana Metro — City of Pearls",
    clusterSlug: "telangana-metro",
    coordinates: { lat: 17.3850, lng: 78.4867 },
    railwayStation: "Hyderabad Deccan (Nampally) / Secunderabad",
    hubCity: "Hyderabad Advanced Speciality Hub",
    transitTime: "City-wide ambulatory & metro transit support",
    description: "Premier USFDA robotic and laser surgical centers across Jubilee Hills, Kukatpally, Gachibowli, Nallagandla, and Secunderabad with dedicated Insurance Eligible billing.",
    keyNeighbourhoods: [
      // HITEC City & IT Corridor
      "Jubilee Hills", "Banjara Hills", "HITEC City", "Gachibowli", "Madhapur", "Kondapur", "Nallagandla", "Manikonda", "Financial District", "Nanakramguda",
      // Western Suburbs & Residential Hubs
      "Kukatpally", "Miyapur", "KPHB Colony", "Chandanagar", "Nizampet", "Pragathi Nagar", "Tellapur", "Kokapet", "Puppalaguda", "Attapur",
      // Central & Secunderabad
      "Secunderabad", "Begumpet", "Somajiguda", "Ameerpet", "Mehdipatnam", "Himayat Nagar", "Abids", "Basheerbagh", "Lakdi-ka-pul", "Khairatabad",
      // East & South Hyderabad
      "Dilsukhnagar", "LB Nagar", "Uppal", "Nagole", "Boduppal", "Habsiguda", "Tarnaka", "Kothapet", "Malakpet", "Santosh Nagar",
      // North & Airport Corridor
      "Malkajgiri", "Alwal", "Sainikpuri", "ECIL", "Kompally", "Medchal", "Bowenpally", "Trimulgherry", "Shamshabad", "Rajendranagar", "Tolichowki", "Yousufguda"
    ],
    localHospitals: [
      "Apollo Hospitals Jubilee Hills", "KIMS Hospital Secunderabad", "Care Hospitals Banjara Hills"
    ],
    specializedProcedures: [
      "Laser Proctology & Fistula", "Laparoscopic Hernia & Gallbladder",
      "Laser Circumcision", "Varicose Vein EVLT"
    ],
    cityOffer: {
      badge: "Cyberabad Executive Deck",
      headline: "HITEC City Day-Care Laser Surgical Package",
      subtext: "Specially engineered for corporate employees in Gachibowli, Madhapur & Nallagandla",
      bundleItems: [
        "Priority corporate group insurance pre-auth check",
        "Private chauffeur pickup & drop across Cyberabad",
        "Zero pain protocol with same-day evening discharge"
      ],
      urgency: "Exclusive corporate concierge slots reserved daily"
    },
    honeymoonSpot: {
      name: "Ananthagiri Forest Luxury Farmstays (Vikarabad)",
      distance: "~70 km from Hyderabad",
      description: "Private resort farmhouses amidst Ananthagiri Hills for discreet, peaceful recovery stays away from city noise."
    }
  },

  // 2. Warangal & Hanamkonda
  {
    slug: "warangal",
    stateSlug: "telangana",
    name: "Warangal & Hanamkonda",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 811844,
    cluster: "Telangana — Eastern Hub",
    clusterSlug: "telangana-east",
    coordinates: { lat: 17.9784, lng: 79.5941 },
    railwayStation: "Warangal Railway Station",
    hubCity: "Eastern Telangana Surgical Desk",
    transitTime: "Free highway & station transit coordination",
    description: "Serving Warangal, Hanamkonda, and rural Kakatiya heritage districts with state-of-the-art laser surgeries and Telugu coordinators.",
    keyNeighbourhoods: [
      "Hanamkonda", "Kazipet", "Warangal Fort area", "Subedari", "Shayampet", "Bheemaram", "Poosa Road", "Pochamma Maidan",
      "Giri Nagar", "Balasamudram", "Nakkalagutta", "Vidyaranyapuri", "Hunter Road", "Mulugu Road", "Chowrastha", "Matwada", "Kashibugga", "Deshaipet", "Waddepally", "Gopalpur"
    ],
    localHospitals: [
      "MGM Hospital Warangal", "Kakatiya Medical College Hospital", "Jaya Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fissure", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 3. Karimnagar
  {
    slug: "karimnagar",
    stateSlug: "telangana",
    name: "Karimnagar",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 297477,
    cluster: "Telangana — Northern Hub",
    clusterSlug: "telangana-north",
    coordinates: { lat: 18.4386, lng: 79.1288 },
    railwayStation: "Karimnagar Railway Station",
    hubCity: "Northern Telangana Surgical Corridor",
    transitTime: "Coordinated cab transit from surrounding towns",
    description: "Bringing advanced USFDA surgical protocols to Karimnagar and Ramagundam belt with zero upfront hospital deposit.",
    keyNeighbourhoods: [
      "Mukarampura", "Jyothinagar", "Godavarikhani Road",
      "Collectorate Area", "Ramgundam Road", "Elgandal", "Mankammakanicottage"
    ],
    localHospitals: [
      "Govt. General Hospital Karimnagar", "Prathima Institute of Medical Sciences"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 4. Nizamabad
  {
    slug: "nizamabad",
    stateSlug: "telangana",
    name: "Nizamabad",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 311152,
    cluster: "Telangana — Northern Hub",
    clusterSlug: "telangana-north",
    coordinates: { lat: 18.6725, lng: 78.0940 },
    railwayStation: "Nizamabad Railway Station",
    hubCity: "North-West Telangana Medical Desk",
    transitTime: "Free assisted cab from Nizamabad to Hyderabad facility",
    description: "Expert surgical triage and Insurance Eligible health coverage for Nizamabad, Kamareddy, and regional village communities.",
    keyNeighbourhoods: [
      "Dichpally Road", "Bodhan Road", "Armoor",
      "Nizamabad Bus Stand Area", "Kanteshwar", "Yellareddy", "Prashanth Nagar"
    ],
    localHospitals: [
      "Govt. District Hospital Nizamabad", "Surya Hospital Nizamabad"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 5. Khammam
  {
    slug: "khammam",
    stateSlug: "telangana",
    name: "Khammam",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 262111,
    cluster: "Telangana — South-East Hub",
    clusterSlug: "telangana-southeast",
    coordinates: { lat: 17.2473, lng: 80.1514 },
    railwayStation: "Khammam Railway Station",
    hubCity: "South-East Telangana Triage Desk",
    transitTime: "Direct bus terminus & station pickups available",
    description: "Transparent surgical packages and fluent Telugu medical guides for Khammam, Kothagudem, and surrounding farming towns.",
    keyNeighbourhoods: [
      "Wyra Road", "Kothagudem Road", "Suryarao Peta",
      "Krishnalanka", "Ashok Nagar Khammam", "Lakshminagar", "Rotary Nagar"
    ],
    localHospitals: [
      "Govt. General Hospital Khammam", "Mamata Medical College Hospital"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 6. Mahabubnagar
  {
    slug: "mahbubnagar",
    stateSlug: "telangana",
    name: "Mahbubnagar (Palamuru)",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 190773,
    cluster: "Telangana — Southern Hub",
    clusterSlug: "telangana-south",
    coordinates: { lat: 16.7488, lng: 77.9834 },
    railwayStation: "Mahbubnagar Railway Station",
    hubCity: "Southern Telangana Medical Corridor",
    transitTime: "Express highway cab — 90 min to Hyderabad hub",
    description: "Seamless hospital transit and world-class surgical care for Mahbubnagar, Jadcherla, and southern village clusters.",
    keyNeighbourhoods: [
      "Jadcherla Road", "Shadnagar", "Kollapur",
      "Mahabubnagar Town", "Atmakur", "Nagarkurnool Road", "Boyapally"
    ],
    localHospitals: [
      "Govt. Hospital Mahbubnagar", "SVS Medical College Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 7. Nalgonda & Miryalaguda
  {
    slug: "nalgonda",
    stateSlug: "telangana",
    name: "Nalgonda",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 183874,
    cluster: "Telangana — Central Hub",
    clusterSlug: "telangana-central",
    coordinates: { lat: 17.0575, lng: 79.2688 },
    railwayStation: "Nalgonda Railway Station",
    hubCity: "Nalgonda & Krishna Basin Medical Desk",
    transitTime: "Free town & village transit — 90 min to Hyderabad",
    description: "High-tech laser surgical care accessible to Nalgonda and surrounding Krishna basin communities with full Insurance Eligible pre-approval.",
    keyNeighbourhoods: [
      "Nalgonda Town Center", "Devarakonda Road", "Beatified City Area",
      "Panagal", "Miryalaguda Bypass", "HYD Expressway Junction"
    ],
    localHospitals: [
      "Govt. General Hospital Nalgonda", "Nikhil Hospital Nalgonda"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 8. Ramagundam & Godavarikhani
  {
    slug: "ramagundam",
    stateSlug: "telangana",
    name: "Ramagundam & Godavarikhani",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 252308,
    cluster: "Telangana — Northern Hub",
    clusterSlug: "telangana-north",
    coordinates: { lat: 18.7592, lng: 79.4746 },
    railwayStation: "Ramagundam Railway Station",
    hubCity: "Coal Belt Industrial Surgical Center",
    transitTime: "Direct transit connecting NTPC townships and Godavarikhani",
    description: "Specialized minimally invasive surgery protocols tailored for coal mining personnel, NTPC engineers, and surrounding industrial families.",
    keyNeighbourhoods: [
      "Godavarikhani Core", "NTPC Township", "Eight Incline Colony",
      "Five Incline", "Janmabhoomi Nagar", "Medipally"
    ],
    localHospitals: [
      "Singareni Collieries Area Hospital", "NTPC Hospital Ramagundam"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein EVLT"
    ]
  },

  // 9. Siddipet
  {
    slug: "siddipet",
    stateSlug: "telangana",
    name: "Siddipet",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 139506,
    cluster: "Telangana — Central Hub",
    clusterSlug: "telangana-central",
    coordinates: { lat: 18.1018, lng: 78.8521 },
    railwayStation: "Siddipet Railway Station",
    hubCity: "Central Irrigation & IT Medical Hub",
    transitTime: "75-min express ride to Hyderabad northern medical centers",
    description: "Modern surgical triage for Siddipet and Komatibotla regions, featuring same-day discharge and zero out-of-pocket billing guidance.",
    keyNeighbourhoods: [
      "Prashanth Nagar Siddipet", "Subash Road", "Medak Road Siddipet",
      "Hyderabad Road Area", "Ring Road Siddipet", "Old Bus Stand Area"
    ],
    localHospitals: [
      "Govt Medical College Siddipet Hospital", "Siddipet Area Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 10. Suryapet
  {
    slug: "suryapet",
    stateSlug: "telangana",
    name: "Suryapet",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 106805,
    cluster: "Telangana — Central Hub",
    clusterSlug: "telangana-central",
    coordinates: { lat: 17.1439, lng: 79.6239 },
    railwayStation: "Nalgonda (nearest major junction)",
    hubCity: "Gateway to South-East Telangana Triage",
    transitTime: "Express transport along Highway 65 to Hyderabad suites",
    description: "Providing Suryapet farmers, business owners, and families with transparent USFDA surgical packages and Telugu concierges.",
    keyNeighbourhoods: [
      "Suryapet Town Center", "Khammam Road Area", "Bollam, Suryapet",
      "MG Road Suryapet", "Koti Nagar", "New Market Area"
    ],
    localHospitals: [
      "Govt General Hospital Suryapet", "Sanjeevini Hospital Suryapet"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 11. Jagtial
  {
    slug: "jagtial",
    stateSlug: "telangana",
    name: "Jagtial",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 103930,
    cluster: "Telangana — Northern Hub",
    clusterSlug: "telangana-north",
    coordinates: { lat: 18.7958, lng: 78.9133 },
    railwayStation: "Jagtial Lingampet Railway Station",
    hubCity: "North Telangana Agro Surgical Desk",
    transitTime: "Coordinated cab to Karimnagar or Nizamabad medical centers",
    description: "Specialized laser surgical network for Jagtial and surrounding turmeric & agricultural market corridors.",
    keyNeighbourhoods: [
      "Fort Area Jagtial", "Karimnagar Road Area", "Korutla Road",
      "Vidyanarayan Nagar", "Old Bus Depot Area", "Hanuman Nagaram"
    ],
    localHospitals: [
      "Govt Area Hospital Jagtial", "Mother Teresa Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fissure", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 12. Adilabad
  {
    slug: "adilabad",
    stateSlug: "telangana",
    name: "Adilabad",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 117167,
    cluster: "Telangana — Northern Hub",
    clusterSlug: "telangana-north",
    coordinates: { lat: 19.6641, lng: 78.5320 },
    railwayStation: "Adilabad Railway Station",
    hubCity: "Northernmost Cotton & Forest Medical Desk",
    transitTime: "Assisted regional transit along NH44 corridor",
    description: "Reliable, high-standard surgical guidance and empanelled hospital access for Adilabad cotton producers and township families.",
    keyNeighbourhoods: [
      "Collectorate Colony Adilabad", "Titanium City", "NH44 Junction",
      "Old Town Adilabad", "Bokhlaguda", "Bhagath Singh Nagar"
    ],
    localHospitals: [
      "RIMS Hospital Adilabad", "District Civil Hospital Adilabad"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 13. Sangareddy
  {
    slug: "sangareddy",
    stateSlug: "telangana",
    name: "Sangareddy & Patancheru",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 105820,
    cluster: "Telangana — Western Pharma Belt",
    clusterSlug: "telangana-west",
    coordinates: { lat: 17.6294, lng: 78.0917 },
    railwayStation: "Sangareddy Town / Lingampalli",
    hubCity: "Western Pharma Corridor Surgical Hub",
    transitTime: "40-min expressway access to Gachibowli / Nallagandla suites",
    description: "Tailored surgical day-care protocols for pharmaceutical, industrial, and IT sector employees across Sangareddy and Patancheru.",
    keyNeighbourhoods: [
      "Patancheru Belt", "Ismailkhanpet", "Pothreddypalli",
      "Old Sangareddy", "Kandi (IIT Hyderabad Area)", "Outer Ring Road West"
    ],
    localHospitals: [
      "Govt District Hospital Sangareddy", "Maheshwara Medical College Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein EVLT"
    ]
  },

  // 14. Mancherial
  {
    slug: "mancherial",
    stateSlug: "telangana",
    name: "Mancherial",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 135805,
    cluster: "Telangana — Northern Hub",
    clusterSlug: "telangana-north",
    coordinates: { lat: 18.8710, lng: 79.4429 },
    railwayStation: "Mancherial Railway Station",
    hubCity: "Mancherial Cement & Coal Medical Triage",
    transitTime: "Direct highway transit to Ramagundam or Karimnagar suites",
    description: "Expert minimal access surgery treatments available to Mancherial residents with transparent Insurance Eligible billing and local coordinators.",
    keyNeighbourhoods: [
      "College Road Mancherial", "Bellampalli Road", "Naspur Area",
      "Reddy Colony", "Chakrapalio", "IB Chowk"
    ],
    localHospitals: [
      "Area Hospital Mancherial", "Singareni Collieries Hospital Naspur"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 15. Bodhan
  {
    slug: "bodhan",
    stateSlug: "telangana",
    name: "Bodhan",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 83526,
    cluster: "Telangana — Northern Hub",
    clusterSlug: "telangana-north",
    coordinates: { lat: 18.6672, lng: 77.8860 },
    railwayStation: "Bodhan Railway Station",
    hubCity: "Nizamabad Border Sugar Hub Triage",
    transitTime: "30-min connecting cab to Nizamabad surgical centers",
    description: "Accessible laser surgical treatments for Bodhan agro and sugar mill communities with full Telugu language assistance.",
    keyNeighbourhoods: [
      "Shakkaragar (Sugar Factory Area)", "Rakasaipet", "Old Bodhan",
      "Bus Stand Area Bodhan", "Nizamabad Road Area", "Bellal"
    ],
    localHospitals: [
      "Govt Area Hospital Bodhan", "Nizam Sugar Hospital (referral)"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 16. Kamareddy
  {
    slug: "kamareddy",
    stateSlug: "telangana",
    name: "Kamareddy",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 97893,
    cluster: "Telangana — Northern Hub",
    clusterSlug: "telangana-north",
    coordinates: { lat: 18.3195, lng: 78.3424 },
    railwayStation: "Kamareddy Railway Station",
    hubCity: "NH44 Highway Junction Medical Desk",
    transitTime: "60-min expressway drive to Hyderabad or Nizamabad hubs",
    description: "Swift highway medical transit and zero-pain laser surgical procedures for Kamareddy township and regional farmsteads.",
    keyNeighbourhoods: [
      "Nizamabad Road Kamareddy", "Sircilla Road", "Indra Nagar",
      "Vidyanagar Kamareddy", "Old Town Area", "Railway Station Road"
    ],
    localHospitals: [
      "Govt Area Hospital Kamareddy", "Jeevana Raga Hospital"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 17. Kothagudem (Palvancha)
  {
    slug: "kothagudem",
    stateSlug: "telangana",
    name: "Kothagudem & Palvancha",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 161883,
    cluster: "Telangana — South-East Hub",
    clusterSlug: "telangana-southeast",
    coordinates: { lat: 17.5516, lng: 80.6190 },
    railwayStation: "Bhadrachalam Road Railway Station (Kothagudem)",
    hubCity: "Singareni Coal & Power Surgical Hub",
    transitTime: "Direct shuttle service across Kothagudem, Palvancha & Khammam",
    description: "Dedicated surgical navigation for Singareni thermal and colliery personnel across Kothagudem and Palvancha.",
    keyNeighbourhoods: [
      "Palvancha Power Town", "Writer Basti", "Coolie Line",
      "Vidya Nagar Kothagudem", "Laxmidevipalli", "Chunchupally"
    ],
    localHospitals: [
      "Singareni Collieries Main Hospital Kothagudem", "Govt Area Hospital Palvancha"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 18. Vikarabad
  {
    slug: "vikarabad",
    stateSlug: "telangana",
    name: "Vikarabad",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 63102,
    cluster: "Telangana — Western Pharma Belt",
    clusterSlug: "telangana-west",
    coordinates: { lat: 17.3361, lng: 77.9048 },
    railwayStation: "Vikarabad Junction Railway Station",
    hubCity: "Ananthagiri Hills Western Medical Desk",
    transitTime: "60-min smooth transit to Hyderabad Gachibowli medical centers",
    description: "Connecting Vikarabad and Ananthagiri hill communities with high-precision laser surgery and complete insurance pre-approval.",
    keyNeighbourhoods: [
      "Shiva Nagar Vikarabad", "Alampally Road", "Ananthagiri Foot Area",
      "Vikarabad Bus Depot Area", "Tandur Road", "Hyderabad Road Vikarabad"
    ],
    localHospitals: [
      "Govt Area Hospital Vikarabad", "Mahaveer Medical College Hospital (referral)"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ],
    honeymoonSpot: {
      name: "Ananthagiri Hill Green Valley Stays",
      distance: "~8 km from town center",
      description: "Serene nature retreats and eco-resorts in Ananthagiri Hills for stress-free post-surgery rejuvenation."
    }
  },

  // 19. Medak
  {
    slug: "medak",
    stateSlug: "telangana",
    name: "Medak",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 54407,
    cluster: "Telangana — Central Hub",
    clusterSlug: "telangana-central",
    coordinates: { lat: 18.0463, lng: 78.2618 },
    railwayStation: "Medak Railway Station",
    hubCity: "Heritage Cathedral Medical Triage Desk",
    transitTime: "Assisted transit along Medak-Hyderabad highway",
    description: "Reliable, high-tech surgical solutions for Medak heritage district and agrarian communities with native Telugu coordinators.",
    keyNeighbourhoods: [
      "Medak Cathedral Area", "Fort Road Medak", "Azam Road",
      "Auto Nagar Medak", "Ramadi", "Gowlipura Medak"
    ],
    localHospitals: [
      "Govt District Hospital Medak", "St. Luke's Hospital Medak"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 20. Wanaparthy
  {
    slug: "wanaparthy",
    stateSlug: "telangana",
    name: "Wanaparthy",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 68677,
    cluster: "Telangana — Southern Hub",
    clusterSlug: "telangana-south",
    coordinates: { lat: 16.3637, lng: 78.0641 },
    railwayStation: "Kurumurthi / Mahbubnagar Railway Station",
    hubCity: "Southern Krishna Basin Medical Desk",
    transitTime: "Express cab connecting Wanaparthy to Mahabubnagar and Hyderabad",
    description: "Modern surgical procedures accessible to Wanaparthy farming families with complete financial guidance and Insurance Eligible billing.",
    keyNeighbourhoods: [
      "Wanaparthy Town Center", "Kollapur Road", "Pebair Road Area",
      "Nagaram", "Srinivasa Nagar Wanaparthy", "Old Market"
    ],
    localHospitals: [
      "Govt Area Hospital Wanaparthy", "District Civil Hospital"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 21. Gadwal (Jogulamba Gadwal)
  {
    slug: "gadwal",
    stateSlug: "telangana",
    name: "Jogulamba Gadwal",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 71926,
    cluster: "Telangana — Southern Hub",
    clusterSlug: "telangana-south",
    coordinates: { lat: 16.2307, lng: 77.8016 },
    railwayStation: "Gadwal Railway Station",
    hubCity: "Southern Silk Handloom Surgical Corridor",
    transitTime: "Direct highway and train transit support along Kurnool-Hyderabad route",
    description: "Expert surgical care tailored for Gadwal silk weaving communities, offering zero upfront deposit and native Telugu concierges.",
    keyNeighbourhoods: [
      "Gadwal Fort Area", "Handloom Nagar", "Raichur Road Gadag",
      "Alampur Junction Belt", "Railway Station Road Gadwal", "Vidyanagar"
    ],
    localHospitals: [
      "Govt District Hospital Gadwal", "Surya Care Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 22. Tandur
  {
    slug: "tandur",
    stateSlug: "telangana",
    name: "Tandur",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 71221,
    cluster: "Telangana — Western Pharma Belt",
    clusterSlug: "telangana-west",
    coordinates: { lat: 17.2562, lng: 77.5855 },
    railwayStation: "Tandur Railway Station",
    hubCity: "Stone & Mineral Industrial Medical Desk",
    transitTime: "Direct train and cab connection to Hyderabad western medical suites",
    description: "Advanced surgical care network for Tandur limestone & mineral industry workers with simplified corporate & group insurance claims.",
    keyNeighbourhoods: [
      "Stone Industrial Area", "Sedam Road Tandur", "Old Tandur Town",
      "Vikarabad Road", "Railway Station Area Tandur", "Shivanagar Tandur"
    ],
    localHospitals: [
      "Govt Area Hospital Tandur", "Mother & Child Hospital"
    ],
    specializedProcedures: [
      "Laser Proctology", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  },

  // 23. Sircilla (Rajanna Sircilla)
  {
    slug: "sircilla",
    stateSlug: "telangana",
    name: "Rajanna Sircilla",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 83186,
    cluster: "Telangana — Northern Hub",
    clusterSlug: "telangana-north",
    coordinates: { lat: 18.3887, lng: 78.8286 },
    railwayStation: "Karimnagar / Kamareddy Junction",
    hubCity: "Textile & Powerloom Medical Corridor",
    transitTime: "45-min connecting transport to Karimnagar advanced hospitals",
    description: "Tailored surgical health programs for Sircilla textile and powerloom sector workers with 100% Insurance Eligible cashless assistance.",
    keyNeighbourhoods: [
      "Textile Park Area", "Vemulawada Temple Corridor", "Old Sircilla Town",
      "Karimnagar Road Sircilla", "Siddipet Road", "Subhash Nagar Sircilla"
    ],
    localHospitals: [
      "Govt Area Hospital Sircilla", "Rajanna Trust Hospital"
    ],
    specializedProcedures: [
      "Laser Piles & Fissure", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein EVLT"
    ]
  },

  // 24. Bhongir (Yadadri Bhuvanagiri)
  {
    slug: "bhongir",
    stateSlug: "telangana",
    name: "Bhongir (Yadadri Bhuvanagiri)",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 58540,
    cluster: "Telangana — Central Hub",
    clusterSlug: "telangana-central",
    coordinates: { lat: 17.5113, lng: 78.8876 },
    railwayStation: "Bhongir Railway Station",
    hubCity: "Yadadri Temple Corridor Medical Desk",
    transitTime: "45-min expressway access to Secunderabad / Hyderabad suites",
    description: "Fast medical transit and zero-pain laser surgery for residents across Bhongir, Yadagirigutta, and Ghatkesar corridor.",
    keyNeighbourhoods: [
      "Bhongir Fort Area", "Yadagirigutta Temple Road", "Raigiri",
      "Hyderabad Road Bhongir", "Warangal Highway Junction", "Choutuppal Road"
    ],
    localHospitals: [
      "Govt Area Hospital Bhongir", "NIMS Medical Center (referral)"
    ],
    specializedProcedures: [
      "Laser Piles Care", "Laparoscopic Hernia", "Laser Circumcision", "Fissure Relief"
    ]
  },

  // 25. Peddapalli
  {
    slug: "peddapalli",
    stateSlug: "telangana",
    name: "Peddapalli",
    stateName: "Telangana",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    population: 51221,
    cluster: "Telangana — Northern Hub",
    clusterSlug: "telangana-north",
    coordinates: { lat: 18.6146, lng: 79.3800 },
    railwayStation: "Peddapalli Junction Railway Station",
    hubCity: "Railway Junction & NTPC Agricultural Corridor",
    transitTime: "Direct shuttle to Ramagundam or Karimnagar special facilities",
    description: "Seamless hospital triage and advanced laser surgery options for Peddapalli junction district with bilingual coordinators.",
    keyNeighbourhoods: [
      "Peddapalli Junction Area", "Sultanabad Road", "Karimnagar Bypass",
      "Ramagundam Highway", "Collectorate Colony Peddapalli", "Old Market"
    ],
    localHospitals: [
      "Govt Area Hospital Peddapalli", "Apollo Clinic (referral)"
    ],
    specializedProcedures: [
      "Laser Piles & Fistula", "Laparoscopic Hernia", "Laser Circumcision", "Varicose Vein"
    ]
  }
];
