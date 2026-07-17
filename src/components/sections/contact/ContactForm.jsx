import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { formFields, validationRules } from '@data/contact'
import { useTheme } from '@hooks/useTheme'

const EASE = [0.16, 1, 0.3, 1]

const INITIAL = Object.fromEntries(formFields.map(f => [f.id, '']))

/* ── Validate a single field ────────────────────────────────────── */
function validateField(id, value) {
  const rule = validationRules[id]
  if (!rule) return null
  const trimmed = value.trim()
  if (!trimmed) return null // required check handled separately
  if (rule.pattern && !rule.pattern.test(trimmed)) return rule.message
  if (rule.minLength && trimmed.length < rule.minLength) return rule.message
  return null
}

/* ── Single input / textarea ────────────────────────────────────── */
function Field({ field, value, error, touched, onChange, onBlur }) {
  const uid = useId()
  const inputId = `${uid}-${field.id}`
  const hasError = touched && error
  const isValid  = touched && !error && value.trim().length > 0
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const baseStyle = {
    background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${hasError ? 'rgba(248,113,113,0.6)' : isValid ? 'rgba(52,211,153,0.4)' : 'var(--color-border-bright)'}`,
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 200ms, box-shadow 200ms',
    borderRadius: '0.625rem',
    width: '100%',
    padding: field.type === 'textarea' ? '0.75rem 1rem' : '0.65rem 1rem',
  }

  const focusStyle = {
    borderColor: hasError ? 'rgba(248,113,113,0.8)' : 'rgba(124,58,237,0.7)',
    boxShadow: hasError
      ? '0 0 0 3px rgba(248,113,113,0.1)'
      : '0 0 0 3px rgba(124,58,237,0.12)',
  }

  const sharedProps = {
    id: inputId,
    name: field.id,
    value,
    onChange: e => onChange(field.id, e.target.value),
    onBlur:   () => onBlur(field.id),
    onFocus:  e => Object.assign(e.target.style, focusStyle),
    onBlurCapture: e => Object.assign(e.target.style, { boxShadow: 'none' }),
    placeholder: field.placeholder,
    style: baseStyle,
    'aria-invalid': hasError ? 'true' : undefined,
    'aria-describedby': hasError ? `${inputId}-error` : undefined,
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-xs font-medium"
        style={{ color: 'var(--color-muted)' }}
      >
        {field.label}
        {field.required && (
          <span className="ml-0.5" style={{ color: 'rgba(168,85,247,0.8)' }}>*</span>
        )}
      </label>

      <div className="relative">
        {field.type === 'textarea' ? (
          <textarea {...sharedProps} rows={field.rows ?? 5} style={{ ...baseStyle, resize: 'none' }} />
        ) : (
          <input {...sharedProps} type={field.type} />
        )}

        {/* Valid checkmark */}
        <AnimatePresence>
          {isValid && field.type !== 'textarea' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <CheckCircle size={14} style={{ color: '#34D399' }} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {hasError && (
          <motion.p
            id={`${inputId}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs"
            style={{ color: '#F87171' }}
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Success state ──────────────────────────────────────────────── */
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center justify-center gap-5 py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: 'rgba(52,211,153,0.12)',
          border: '1px solid rgba(52,211,153,0.3)',
          boxShadow: '0 0 32px rgba(52,211,153,0.2)',
        }}
      >
        <CheckCircle size={32} style={{ color: '#34D399' }} />
      </motion.div>
      <div className="flex flex-col gap-2">
        <h3
          className="text-xl font-semibold"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          Message Sent!
        </h3>
        <p className="text-sm max-w-xs" style={{ color: 'var(--color-muted)' }}>
          Thank you for reaching out. We'll get back to you within one business day.
        </p>
      </div>
    </motion.div>
  )
}

/* ── Main form ──────────────────────────────────────────────────── */
export default function ContactForm() {
  const [values,   setValues]   = useState(INITIAL)
  const [errors,   setErrors]   = useState({})
  const [touched,  setTouched]  = useState({})
  const [loading,  setLoading]  = useState(false)
  const [success,  setSuccess]  = useState(false)

  function handleChange(id, value) {
    setValues(v => ({ ...v, [id]: value }))
    if (touched[id]) {
      const field = formFields.find(f => f.id === id)
      const err = field?.required && !value.trim()
        ? `${field.label} is required.`
        : validateField(id, value)
      setErrors(e => ({ ...e, [id]: err }))
    }
  }

  function handleBlur(id) {
    setTouched(t => ({ ...t, [id]: true }))
    const field = formFields.find(f => f.id === id)
    const err = field?.required && !values[id].trim()
      ? `${field.label} is required.`
      : validateField(id, values[id])
    setErrors(e => ({ ...e, [id]: err }))
  }

  function validate() {
    const newErrors = {}
    const newTouched = {}
    formFields.forEach(f => {
      newTouched[f.id] = true
      if (f.required && !values[f.id].trim()) {
        newErrors[f.id] = `${f.label} is required.`
      } else {
        const err = validateField(f.id, values[f.id])
        if (err) newErrors[f.id] = err
      }
    })
    setTouched(newTouched)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Simulate async submission — replace with real API call
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setSuccess(true)
  }

  if (success) return <SuccessState />

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Field grid — half-width fields sit side by side */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {formFields.map(field => (
          <div key={field.id} className={field.half ? '' : 'sm:col-span-2'}>
            <Field
              field={field}
              value={values[field.id]}
              error={errors[field.id]}
              touched={touched[field.id]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        ))}
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        transition={{ duration: 0.2 }}
        className="relative mt-2 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white"
        style={{
          background: loading
            ? 'rgba(124,58,237,0.5)'
            : 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
          boxShadow: loading ? 'none' : '0 0 32px rgba(124,58,237,0.4), 0 4px 16px rgba(0,0,0,0.3)',
          cursor: loading ? 'not-allowed' : 'pointer',
          border: 'none',
          fontFamily: 'var(--font-body)',
          transition: 'background 300ms, box-shadow 300ms',
        }}
      >
        {/* Shimmer sweep on hover */}
        {!loading && (
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Send size={15} />
              Send Message
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="text-center text-xs" style={{ color: 'var(--color-subtle)' }}>
        We respect your privacy. Your information will never be shared.
      </p>
    </form>
  )
}
