import { Bot, CheckCircle, Zap, MessageSquare, BarChart2, Users, PhoneCall, TrendingUp } from 'lucide-react'

export const caseStudies = [
  {
    id: 'ai-lead-qualification',
    product: 'AI-Powered Lead Qualification & Sales Automation',
    category: 'EdTech / Sales Automation',
    tagline: 'Transforming Every Enquiry into a Qualified Opportunity',
    accent: '#7C3AED',
    accentRgb: '124,58,237',
    icon: Bot,
    industry: 'EdTech',
    client: 'EdTech Organizations & Sales Teams',
    overview: 'A leading EdTech organization was struggling to manage a growing volume of learner enquiries. Manual qualification processes, fragmented communication, and a lack of pipeline visibility were slowing down the sales team and causing high-intent prospects to slip through.',
    solution: 'We developed an AI-powered lead qualification platform that automates the first stage of every customer interaction.\n\nAn AI Agent engages every enquiry, qualifies prospects based on predefined criteria, and instantly shares the most relevant course information via WhatsApp. Only qualified leads are forwarded to counselors, enabling the sales team to spend their time on meaningful conversations rather than repetitive screening.\n\nThe platform centralizes every customer interaction, automatically records and transcribes calls, analyzes conversation sentiment, and generates AI-powered lead scores based on engagement and conversion potential. Counselors also have access to the complete interaction history before every call and can share brochures and follow-up documents directly through WhatsApp from within the platform.',
    whoItsFor: 'The result was a measurable reduction in manual effort, faster response times across every enquiry, and a sales team that could focus entirely on conversations that mattered.',
    problem: {
      heading: 'The Challenge',
      points: [
        'Manual lead qualification consuming counselor time on low-intent prospects',
        'Scattered conversations with no centralized communication history',
        'Limited visibility across the sales pipeline',
        'Slow response times leading to missed opportunities',
        'No data-driven way to prioritize leads by conversion potential',
      ],
    },
    features: [
      { icon: Bot,          title: 'AI Agent Engagement',            desc: 'Automatically engages every enquiry, qualifies prospects, and shares relevant course information via WhatsApp.' },
      { icon: CheckCircle,  title: 'Intelligent Lead Qualification',  desc: 'Filters leads based on predefined criteria so counselors only receive high-intent prospects.' },
      { icon: BarChart2,    title: 'AI-Powered Lead Scoring',         desc: 'Scores leads based on engagement and conversion potential for smarter prioritization.' },
      { icon: PhoneCall,    title: 'Call Recording & Transcription',  desc: 'Automatically records and transcribes every call for complete conversation history.' },
      { icon: MessageSquare,title: 'WhatsApp Integration',            desc: 'Share brochures, follow-ups, and documents directly through WhatsApp from within the platform.' },
      { icon: TrendingUp,   title: 'Pipeline Visibility',             desc: 'Centralized dashboard with complete visibility across the entire sales pipeline.' },
    ],
    impact: [
      { metric: 'Less',   label: 'Manual qualification effort' },
      { metric: 'More',   label: 'Counselor productivity' },
      { metric: 'Faster', label: 'Response time per enquiry' },
    ],
  },
]
