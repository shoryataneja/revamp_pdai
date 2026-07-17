export const productsHeading = {
  title: 'Intelligent Software, Built to Scale',
  subtitle:
    'A suite of AI-powered products engineered for enterprise performance, reliability, and growth.',
}

/**
 * `tags`       — pill chips shown on the card (matches screenshot layout)
 * `accent`     — card background tint + hover glow colour
 * `accentRgb`  — raw RGB for rgba() usage
 * `logoPath`   — SVG path for the inline logo mark
 */
export const products = [
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    tagline: 'All-in-One Call Center Software',
    description:
      'All-in-One Call Center Software to Track, Monitor & Optimize Calls.',
    tags: ['Sales Team', 'Support Team', 'Call Centers'],
    accent: '#7C3AED',
    accentRgb: '124, 58, 237',
    href: '#contact',
    logoPath: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  },
  {
    id: 'ai-crm',
    name: 'AI CRM',
    tagline: 'AI-Powered CRM for Automotive',
    description:
      'AI makes the call. AI listens to your calls. Nothing gets lost.',
    tags: ['Service Centers', 'Auto Workshops', 'Garages'],
    accent: '#0EA5E9',
    accentRgb: '14, 165, 233',
    href: '#contact',
    logoPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  },
  {
    id: 'servicemetrik',
    name: 'ServiceMetrik',
    tagline: 'All-in-One Service Centre Software',
    description:
      'All-in-One Service Centre Software Value Added Services, AI-powered, Fully Customized.',
    tags: ['Service Centers', 'Auto Workshops', 'Garages'],
    accent: '#A855F7',
    accentRgb: '168, 85, 247',
    href: '#contact',
    logoPath: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  },
  {
    id: 'carmetrik',
    name: 'CarMetrik',
    tagline: 'AI-Powered Car Valuation & Sales',
    description:
      'Simplifying Used Car Valuation & Sales with CarMetrik\'s AI-powered Car Value Calculator Capabilities.',
    tags: ['Service Centers', 'Auto Workshops', 'Garages'],
    accent: '#10B981',
    accentRgb: '16, 185, 129',
    href: '#contact',
    logoPath: 'M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3 M9 17l2 2 4-4 M13 21H7a2 2 0 0 1-2-2v-4 M21 21v-6a2 2 0 0 0-2-2h-6',
  },
  {
    id: 'carauditor',
    name: 'CarAuditor',
    tagline: 'AI-Powered Fleet Inspection & Audit',
    description:
      'Transforming Fleet Management with AI-powered Inspection and Audit Capabilities.',
    tags: ['Service Centers', 'Auto Workshops', 'Garages'],
    accent: '#F59E0B',
    accentRgb: '245, 158, 11',
    href: '#contact',
    logoPath: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  },
  {
    id: 'your-next-project',
    name: 'Your Next Project',
    tagline: 'Built Around Your Business',
    description:
      "Have a problem that off-the-shelf software can't solve? We design and build custom AI products from scratch — tailored to your workflows, your data, and your goals.",
    tags: ['Custom Build', 'Enterprise', 'Any Industry'],
    accent: '#EC4899',
    accentRgb: '236, 72, 153',
    href: '#contact',
    logoPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    isCTA: true,
  },
]
