import { cn } from '@utils/cn'

/** Gradient horizontal rule — fades at both edges */
export default function Divider({ className }) {
  return <div className={cn('divider', className)} />
}
