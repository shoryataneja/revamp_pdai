import { Car, Wrench, BarChart2, Bell, Users, Zap, Shield, Clock, TrendingUp, FileText, Calendar, Star } from 'lucide-react'

export const showcases = [
  {
    id: 'carmetrik',
    eyebrow: 'Product 01',
    name: 'CarMetrik',
    tagline: 'Automotive Intelligence Platform',
    description:
      'CarMetrik transforms raw vehicle and dealership data into real-time intelligence. From inventory forecasting to customer lifetime value modelling, it gives automotive businesses the clarity to act faster and sell smarter.',
    accent: '#7C3AED',
    accentRgb: '124, 58, 237',
    cta: { label: 'Explore CarMetrik', href: '#contact' },
    features: [
      { icon: BarChart2, text: 'Real-time inventory analytics and demand forecasting' },
      { icon: TrendingUp, text: 'Vehicle lifecycle tracking from acquisition to sale' },
      { icon: Users,     text: 'Customer behaviour scoring and retention insights' },
      { icon: Bell,      text: 'Automated alerts for pricing anomalies and market shifts' },
      { icon: Shield,    text: 'Compliance-ready reporting for multi-franchise groups' },
      { icon: Zap,       text: 'Sub-second query engine across millions of records' },
    ],
    /* Mock UI data for the visual panel */
    mock: {
      title: 'CarMetrik Dashboard',
      kpis: [
        { label: 'Vehicles Sold',   value: '1,284', delta: '+12%', up: true  },
        { label: 'Avg Days on Lot', value: '18.4',  delta: '-3.2', up: true  },
        { label: 'Revenue MTD',     value: '$4.2M', delta: '+8%',  up: true  },
        { label: 'Lead Conv. Rate', value: '34.7%', delta: '+5%',  up: true  },
      ],
      bars: [62, 78, 55, 90, 70, 85, 95, 68, 80, 74, 88, 92],
      barLabel: 'Monthly Sales Volume',
      rows: [
        { name: 'Toyota Camry',   stock: 24, status: 'In Stock'  },
        { name: 'Honda CR-V',     stock: 11, status: 'Low Stock' },
        { name: 'Ford F-150',     stock: 38, status: 'In Stock'  },
        { name: 'Tesla Model 3',  stock: 6,  status: 'Critical'  },
      ],
    },
  },
  {
    id: 'servicemetrik',
    eyebrow: 'Product 02',
    name: 'ServiceMetrik',
    tagline: 'Field Service Operations AI',
    description:
      'ServiceMetrik brings AI-driven scheduling, job tracking, and technician performance analytics to field service teams. Reduce downtime, eliminate manual dispatching, and deliver measurable SLA improvements from day one.',
    accent: '#0EA5E9',
    accentRgb: '14, 165, 233',
    cta: { label: 'Explore ServiceMetrik', href: '#contact' },
    features: [
      { icon: Calendar,   text: 'AI-optimised job scheduling and route planning' },
      { icon: Clock,      text: 'Live technician tracking with ETA predictions' },
      { icon: FileText,   text: 'Automated work order generation and closure' },
      { icon: Star,       text: 'Customer satisfaction scoring after every job' },
      { icon: TrendingUp, text: 'First-time fix rate analytics and trend reporting' },
      { icon: Wrench,     text: 'Predictive maintenance alerts from asset telemetry' },
    ],
    mock: {
      title: 'ServiceMetrik Dashboard',
      kpis: [
        { label: 'Jobs Today',      value: '142',   delta: '+9%',  up: true  },
        { label: 'First-Fix Rate',  value: '91.3%', delta: '+4%',  up: true  },
        { label: 'Avg Response',    value: '38 min',delta: '-6m',  up: true  },
        { label: 'CSAT Score',      value: '4.8/5', delta: '+0.3', up: true  },
      ],
      bars: [55, 70, 80, 65, 88, 72, 91, 78, 85, 69, 94, 87],
      barLabel: 'Daily Jobs Completed',
      rows: [
        { name: 'HVAC Inspection',   stock: 18, status: 'In Progress' },
        { name: 'Boiler Service',    stock: 7,  status: 'Scheduled'   },
        { name: 'Electrical Audit',  stock: 23, status: 'Completed'   },
        { name: 'Plumbing Repair',   stock: 4,  status: 'Urgent'      },
      ],
    },
  },
]
