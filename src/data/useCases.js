import { Users, Zap, Repeat, PhoneCall, BarChart2 } from 'lucide-react'

export const useCasesHeading = {
  title: 'Automate the conversations your team repeats every day.',
  subtitle:
    'Prism360 removes the manual layer from the conversations that already happen in your business — automatically.',
}

export const useCases = [
  {
    id: 'new-lead-qualification',
    icon: Users,
    title: 'New Lead Qualification',
    description: 'Determine if leads are worth a sales call.',
  },
  {
    id: 'speed-to-lead',
    icon: Zap,
    title: 'Speed-to-Lead',
    description: 'Act on enquiries instantly.',
  },
  {
    id: 'follow-up',
    icon: Repeat,
    title: 'Follow-Up',
    description: 'Reduce manual chasing.',
  },
  {
    id: 'high-volume-outreach',
    icon: PhoneCall,
    title: 'High-Volume Outreach',
    description: 'Automated first-layer engagement.',
  },
  {
    id: 'crm-workflow-execution',
    icon: BarChart2,
    title: 'CRM Workflow Execution',
    description: 'Turn events into actions.',
  },
]
