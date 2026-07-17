import { cn } from '@utils/cn'

const variantClass = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  outline:   'btn-outline',
  ghost:     'btn-ghost',
}

const sizeClass = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

/**
 * Polymorphic Button using the CSS design system.
 * @param {'primary'|'secondary'|'outline'|'ghost'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {string} as - element to render (default: 'button')
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  className,
  ...props
}) {
  return (
    <Tag
      className={cn('btn', variantClass[variant], sizeClass[size], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
