import { MapPin, Mail, Phone } from 'lucide-react'

export const contactHeading = {
  title: "Let's Build Something Intelligent",
  subtitle:
    "Have a project in mind or want to explore how our AI products can transform your business? We'd love to hear from you.",
}

export const contactInfo = [
  {
    id: 'address',
    icon: MapPin,
    label: 'Our Office',
    lines: [
      '46/3A, Hosur Rd, Kudlu Gate',
      'Krishna Reddy Industrial Area, Hosapalaya',
      'Bengaluru, Karnataka 560068',
    ],
    href: 'https://share.google/cE0o62gFdvCZSJ8n4',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email Us',
    lines: ['business_pdai@populardigital.ai'],
    href: 'mailto:business_pdai@populardigital.ai',
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Call Us',
    lines: ['+91 8951732099'],
    href: 'tel:+918951732099',
  },
]


export const formFields = [
  { id: 'name',    label: 'Full Name',      type: 'text',     placeholder: 'John Smith',              required: true,  half: true  },
  { id: 'company', label: 'Company',        type: 'text',     placeholder: 'Acme Corp',               required: false, half: true  },
  { id: 'email',   label: 'Email Address',  type: 'email',    placeholder: 'john@acmecorp.com',       required: true,  half: true  },
  { id: 'phone',   label: 'Phone Number',   type: 'tel',      placeholder: '+44 000 000 0000',        required: false, half: true  },
  { id: 'subject', label: 'Subject',        type: 'text',     placeholder: 'How can we help you?',   required: true,  half: false },
  { id: 'message', label: 'Message',        type: 'textarea', placeholder: 'Tell us about your project, goals, and timeline...', required: true, half: false, rows: 5 },
]

export const validationRules = {
  name:    { minLength: 2,  message: 'Please enter your full name.' },
  email:   { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address.' },
  subject: { minLength: 3,  message: 'Please enter a subject.' },
  message: { minLength: 20, message: 'Message must be at least 20 characters.' },
}
