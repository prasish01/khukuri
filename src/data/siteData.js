// ─────────────────────────────────────────────────────────────
//  KHUKURI FC  ·  SITE DATA
// ─────────────────────────────────────────────────────────────

export const CLUB = {
  name: "Khukuri FC",
  tagline: "Khukuri Pride",
  subTagline: "Auckland's Oldest Nepali Football Club",
  foundedYear: "2003",
  city: "Auckland, New Zealand",
  ground: "Waikaraka Park, Auckland",
  email: "clubkhukuri@gmail.com",
  website: "khukurifc.nz",
  joinFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeyGlij0g0UuA4sIBaH35hFgFvCm3E8cpLShoxitkCU95bD1w/viewform",
  social: {
    facebook: "https://www.facebook.com/KhukuriFC/",
    instagram: "https://www.instagram.com/fckhukuri_nz/",
  },
};

// ── Navigation ────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Join Us", path: "/join" },
  { label: "Memories", path: "/memories" },
  { label: "Sponsors", path: "/sponsors" },
  { label: "Contact", path: "/contact" },
];

// ── Hero ──────────────────────────────────────────────────────
export const HERO = {
  backgroundImage: "./public/thc_all.jpg",
  eyebrow: "Auckland · New Zealand · Est. 2003",
  headlinePart1: "More Than",
  headlinePart2: "a Club.",
  headlinePart3: "A Family.",
  pullQuote: '"Play for the badge. Be our pride."',
  descriptor:
    "We are Auckland's oldest Nepali football club — a tight-knit community where retired legends and fresh faces share the same dressing room, the same pitch, and the same Sunday afternoon.",

  ctaPrimary: { label: "Join the Family", path: "/join" },
  ctaSecondary: { label: "Discover Our Story", path: "/about" },

  stats: [
    { value: "20+", label: "Years of history" },
    { value: "9", label: "Major honours" },
    { value: "800+", label: "Family members" },
    { value: "$0", label: "Cost for students" },
  ],
};

// ── Achievements ──────────────────────────────────────────────
export const ACHIEVEMENTS = [
  { year: "2015", title: "NANI Cup", result: "Winners" },
  { year: "2016", title: "NANI Cup", result: "Winners" },
  { year: "2017", title: "Tenzing Hillary Cup", result: "Champions" },
  { year: "2017", title: "EthKick 7-a-Side", result: "Runner-Up" },
  { year: "2018", title: "THC Christchurch", result: "Runner-Up" },
  { year: "2019", title: "THC Auckland", result: "Runner-Up" },
  { year: "2020", title: "THC Tauranga", result: "3rd Place" },
  { year: "2021", title: "THC Palmerston North", result: "3rd Place" },
  { year: "2023", title: "THC Hamilton", result: "3rd Place" },
  { year: "2026", title: "THC Hamilton", result: "Champions" },
];

// ── Membership / Join Us ──────────────────────────────────────
export const JOIN_PAGE = {
  eyebrow: "Get Involved",
  headline: ["Find your", "place with us."],
  intro:
    "There's no single way to be part of Khukuri FC. Whether you want to lace up, show up, or step up as a sponsor — every role matters and every person is welcome.",
};

export const MEMBERSHIP_TIERS = [
  {
    id: "play",
    icon: "seedling",
    title: "Play For Free",
    priceText: "$0",
    priceSub: "Always — no strings attached",
    note: "For students & those who need support",
    body: "We believe the beautiful game belongs to everyone. If you're a student or facing financial hardship, you play free — kit, training, matches, the lot. No questions asked. Just show up and give everything.",
    perks: [
      "Full squad access",
      "Training & match kit",
      "Subsidised tournament fees",
      "Community support network",
    ],
    cta: "Talk to Us",
    ctaHref: "mailto:clubkhukuri@gmail.com",
    featured: false,
  },
  {
    id: "member",
    icon: "handshake",
    title: "Club Member",
    priceText: "$50",
    priceSub: "per year",
    note: "The most popular way to belong",
    body: "Your $50 keeps the lights on — covering ground fees, kit contributions, and the community events that make Khukuri FC special. You get a vote, a voice, and a seat at every gathering.",
    perks: [
      "Official membership card",
      "Voting rights",
      "Priority squad selection",
      "All socials & picnics",
      "Retired member network",
    ],
    cta: "Join Now",
    ctaHref:
      "https://docs.google.com/forms/d/e/1FAIpQLSeyGlij0g0UuA4sIBaH35hFgFvCm3E8cpLShoxitkCU95bD1w/viewform",
    featured: true,
  },
  {
    id: "support",
    icon: "celebration",
    title: "Just Come Support",
    priceText: "Free",
    priceSub: "always welcome",
    note: "Every cheer matters",
    body: "Not ready to play? Come watch. Cheer from the sideline. Bring your family. Share our posts. Every supporter who shows up on a cold Sunday morning means the world to the players on that pitch.",
    perks: [
      "Match day access",
      "Community newsletter",
      "Social event invites",
      "Sponsor a player",
    ],
    cta: "Find Our Fixtures",
    ctaHref: "mailto:clubkhukuri@gmail.com",
    featured: false,
  },
];

export const JOIN_FAQ = [
  {
    q: "Do I need to be Nepali to join?",
    a: "Absolutely not. We are a Nepali-founded club, but we welcome players of all backgrounds and nationalities. Football is our common language.",
  },
  {
    q: "What level do I need to be to play?",
    a: "All skill levels are welcome. We have players who grew up playing competitively and others who are picking up the game for the first time. Come as you are.",
  },
  {
    q: "When and where do you train and play?",
    a: "We play in the ASFA Sunday League at our Auckland ground. Training schedules vary by season — get in touch and we'll give you all the details.",
  },
  {
    q: "I'm a student. Is the free membership really free?",
    a: "Yes. No hidden costs, no awkward conversations. We genuinely subsidise students because we believe cost should never be the reason someone misses out on football and community.",
  },
  {
    q: "Can retired players still be involved?",
    a: "Always. Retired members are the backbone of our club. They mentor players, attend events, and are full members of the family — on the pitch or off it.",
  },
];

// ── Sponsors ──────────────────────────────────────────────────
export const SPONSORS_PAGE = {
  eyebrow: "Our Partners",
  headline: ["Backed by those", "who believe in us."],
  intro:
    "Khukuri FC runs on community spirit — and on the generous support of partners who share our belief in football, culture, and bringing people together.",
  sponsorCTA: {
    heading: "Become a Sponsor",
    body: "Sponsoring Khukuri FC puts your brand at the heart of Auckland's Nepali community — at tournaments, events, and on the kits of players who wear the badge with pride. Get in touch and let's talk.",
    email: "clubkhukuri@gmail.com",
  },
  perks: [
    {
      icon: "mountain",
      title: "Community Reach",
      desc: "Direct exposure to Auckland's growing Nepali community and wider multicultural football audience.",
    },
    {
      icon: "celebration",
      title: "Tournament Presence",
      desc: "Your brand on kits and banners at national Nepali tournaments across New Zealand.",
    },
    {
      icon: "seedling",
      title: "Social Media",
      desc: "Featured across our Instagram and Facebook channels with regular match and event content.",
    },
    {
      icon: "handshake",
      title: "Club Events",
      desc: "Invited to sponsor and attend our annual community picnics, dinners, and end-of-season celebrations.",
    },
  ],
};

export const SPONSORS = [
  {
    tier: "Title Sponsor",
    name: "Buddha Travel & Tours",
    description:
      "Our title sponsor and long-time supporter of the club and community.",
    logo: "/buddhaTravel.jpg",
    url: "https://buddhatravel.co.nz/",
  },
  {
    tier: "Associate Sponsor",
    name: "Access Education Network",
    description:
      "Supporting our commitment to making football accessible to students.",
    logo: "/access.png",
    url: "https://accessedu.net/office-location/new-zealand",
  },
];

// ── Footer ────────────────────────────────────────────────────
export const FOOTER = {
  tagline: "Play for the badge. Be our pride.",
  columns: [
    {
      heading: "Club",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Join Us", path: "/join" },
        { label: "Memories", path: "/memories" },
        { label: "Sponsors", path: "/sponsors" },
        { label: "Contact", path: "/contact" },
      ],
    },
    {
      heading: "Competitions",
      links: [
        { label: "Tenzing Hillary Cup", path: "/about" },
        { label: "ASFA Sunday League", path: "/about" },
        { label: "Everest Cup", path: "/about" },
        { label: "EthKick Tournament", path: "/about" },
      ],
    },
    {
      heading: "Get Involved",
      links: [
        { label: "Play For Free", path: "/join" },
        { label: "Become a Member", path: "/join" },
        { label: "Sponsor the Club", path: "/sponsors" },
        { label: "Contact Us", path: "/contact" },
      ],
    },
  ],
};

// ── About Page ────────────────────────────────────────────────
export const ABOUT = {
  // Page header
  eyebrow: "Our Story",
  headline: ["Built on", "Community.", "Driven by Pride."],
  intro:
    "Khukuri FC isn't just a football club. It's a living, breathing community — one that has kept Nepali footballers in Auckland connected, supported, and on the pitch for over two decades.",

  // Origin story
  origin: {
    label: "How it began",
    heading: "A Khukuri is more than a blade.",
    body: [
      "The khukuri — Nepal's iconic curved knife — is a symbol of courage, identity, and pride. When a group of Nepali footballers in Auckland came together in the early 2000s, they chose that name deliberately. Not just to play, but to stand for something.",
      "We are New Zealand's oldest Nepali football club. What started as a handful of players kicking a ball on a Sunday has grown into one of Auckland's most beloved community clubs — welcoming players of all ages, abilities, and backgrounds under one badge.",
    ],
    image: "/thc_win.jpg",
    imageCaption: "Early days — Khukuri FC in its founding years",
  },

  // Family values section
  family: {
    label: "The Khukuri family",
    heading: "Retired legends. Rising stars. One dressing room.",
    body: "What makes us different isn't just the football. It's what happens before and after the final whistle. Retired members don't disappear — they stay, mentor, and celebrate alongside the current squad. We host regular get-togethers, picnics, and community events because the relationships forged here outlast any season.",
    values: [
      {
        icon: "handshake",
        title: "Everyone belongs",
        desc: "Students, working professionals, retirees, newcomers to New Zealand — all are welcome. If finances are a barrier, we'll make it work.",
      },
      {
        icon: "mountain",
        title: "Rooted in culture",
        desc: "We carry Nepali identity proudly on the pitch. Our badge, our name, our community — it's a connection to home for many of our players.",
      },
      {
        icon: "seedling",
        title: "We invest in youth",
        desc: "Students play for free. Always. Because today's newcomer is tomorrow's captain, and we never want cost to be the reason someone misses out.",
      },
      {
        icon: "celebration",
        title: "Community off the pitch",
        desc: "Picnics, dinners, Dashain celebrations, end-of-season gatherings — this is a community, not just a club.",
      },
    ],
    image: "/communityPhoto.jpg",
  },

  // Where we play
  ground: {
    label: "Where we play",
    heading: "Waikaraka Park, Auckland",
    body: "Our home is the Waikaraka Park ground, where we compete in the weekly ASFA Sunday League. Beyond our regular season, we travel across New Zealand for national Nepali tournaments — from Christchurch to Hamilton, Tauranga — always representing Auckland, always chasing trophies.",
    image: "/match1.jpg",
  },

  // Ambition
  ambition: {
    label: "Our ambition",
    quote: "We don't just enter tournaments. We enter to win them.",
    body: "The Tenzing Hillary Cup — the biggest Nepali football tournament in New Zealand — is our annual goal. We've stood on that podium multiple times, and we're hungry for more. Every training session, every Sunday match, every new member who joins adds to that pursuit.",
  },
};

// ── Tournaments ───────────────────────────────────────────────
export const TOURNAMENTS = [
  {
    name: "Tenzing Hillary Cup",
    short: "THC",
    desc: "The biggest Nepali football tournament in NZ — contested across cities. Our primary target every year.",
    tier: "Main Goal",
  },
  {
    name: "ASFA Sunday League",
    short: "ASFA",
    desc: "Our weekly competitive home — Auckland Sunday Football Association, where we build fitness and form.",
    tier: "Weekly",
  },
  {
    name: "Everest Cup",
    short: "EC",
    desc: "Local Auckland Nepali community cup. Always a lively occasion with the whole community watching.",
    tier: "Regular",
  },
  {
    name: "EthKick Tournament",
    short: "ETHK",
    desc: "Multicultural summer tournament celebrating Auckland's diverse football community.",
    tier: "Summer",
  },
];

export const MEMORIES = {
  eyebrow: "Through the years",
  headline: ["Every goal.", "Every laugh.", "Every memory."],
  intro:
    "Twenty years of Sundays, tournaments across New Zealand, picnics in the park, and moments that never fade. This is Khukuri FC — not just a highlight reel, but a family album.",

  filters: [
    "All",
    "Match Day",
    "Tournament",
    "Community",
    "Training",
    "Celebration",
  ],

  items: [
    {
      id: 1,
      category: "Tournament",
      year: "2026",
      caption: "Tenzing Hillary Cup — Champions. The night we brought it home.",
      image: "/thc_win.jpg",
      size: "wide",
    },
    {
      id: 2,
      category: "Match Day",
      year: "2026",
      caption: "THC Match Day.",
      image: "/memories/matchDay.jpg",
      size: "tall",
    },
    {
      id: 3,
      category: "Community",
      year: "2025",
      caption: "Annual Tihar — families, food, and football.",
      image: "/memories/tihar.jpg",
      size: "normal",
    },
    {
      id: 4,
      category: "Kids",
      year: "2023",
      caption: "Kids Training.",
      image: "/memories/kids.jpg",
      size: "normal",
    },
    {
      id: 5,
      category: "Community",
      year: "2024",
      caption: "Annual Khukuri Night 2024.",
      image: "/memories/khukuriNight.jpg",
      size: "wide",
    },
    {
      id: 6,
      category: "Match Day",
      year: "2021",
      caption: "Our Club Supporters.",
      image: "/memories/spectators.jpg",
      size: "normal",
    },
    {
      id: 7,
      category: "Tournament",
      year: "2025",
      caption: "Everest Cup 2025.",
      image: "/memories/everestCup.jpg",
      size: "tall",
    },
    {
      id: 8,
      category: "Community",
      year: "2025",
      caption: "Dashain celebrations — club and family together.",
      image: "/memories/dashain.jpg",
      size: "normal",
    },
    {
      id: 9,
      category: "Match Day",
      year: "2021",
      caption: "THC 2021 — the squad gave everything.",
      image: "/memories/thc2021.jpg",
      size: "normal",
    },
    {
      id: 10,
      category: "Community",
      year: "2025",
      caption: "End-of-season dinner — players past and present, one table.",
      image: "/memories/dinner.jpg",
      size: "normal",
    },
    {
      id: 11,
      category: "Training",
      year: "2024",
      caption: "Pre-season drills — putting in the work before the tournament.",
      image: "/memories/training.jpg",
      size: "normal",
    },
    {
      id: 12,
      category: "Celebration",
      year: "2026",
      caption: "Our THC Cup — the trophy that proved  it all.",
      image: "/memories/cup.jpg",
      size: "normal",
    },
  ],
};

// ── Contact ───────────────────────────────────────────────────
export const CONTACT = {
  eyebrow: "Get in Touch",
  headline: ["We'd love to", "hear from you."],
  intro:
    "Whether you want to join the squad, ask about membership, explore a sponsorship, or simply find out when our next match is — just reach out. We're a community club, so a real person will actually reply.",

  details: [
    {
      icon: "mail",
      label: "Email us",
      value: "clubkhukuri@gmail.com",
      href: "mailto:clubkhukuri@gmail.com",
      note: "We aim to reply within 48 hours",
    },
    {
      icon: "instagram",
      label: "Instagram",
      value: "@fckhukuri_nz",
      href: "https://www.instagram.com/fckhukuri_nz/",
      note: "Match updates & club moments",
    },
    {
      icon: "facebook",
      label: "Facebook",
      value: "KhukuriFC",
      href: "https://www.facebook.com/KhukuriFC/",
      note: "Events, news & community",
    },
    {
      icon: "pin",
      label: "Home ground",
      value: "Waikaraka Park, Auckland",
      href: "https://maps.google.com/?q=Waikaraka+Park+Auckland",
      note: "Sundays during the season",
    },
  ],

  reasons: [
    {
      label: "I want to play",
      desc: "Join the squad — free for students, $50/yr membership for others.",
    },
    {
      label: "I want to watch",
      desc: "Come to a match day — all are welcome, no ticket required.",
    },
    {
      label: "I want to sponsor",
      desc: "Support the club and get your brand in front of our community.",
    },
    {
      label: "General enquiry",
      desc: "Anything else — we love hearing from people.",
    },
  ],
};
