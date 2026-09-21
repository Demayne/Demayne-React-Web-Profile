import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom'
import { profile } from '../data/content'

const MAX_MESSAGE = 2000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY = { name: '', email: '', subject: '', message: '' }

const env = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
const isConfigured = Boolean(env.serviceId && env.templateId && env.publicKey)

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please tell me your name.'
  if (!values.email.trim()) errors.email = 'An email address is required so I can reply.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email address doesn’t look quite right.'
  if (!values.subject.trim()) errors.subject = 'Add a short subject.'
  if (!values.message.trim()) errors.message = 'Your message is empty.'
  else if (values.message.length > MAX_MESSAGE) errors.message = `Please keep it under ${MAX_MESSAGE} characters.`
  return errors
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [serverError, setServerError] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    if (isConfigured) emailjs.init({ publicKey: env.publicKey })
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const found = validate(values)
    setErrors(found)
    const firstInvalid = Object.keys(EMPTY).find((k) => found[k])
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    setServerError('')
    try {
      await emailjs.send(env.serviceId, env.templateId, {
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
        timestamp: new Date().toISOString(),
      })
      setValues(EMPTY)
      setStatus('sent')
    } catch (err) {
      const text = String(err?.text || '')
      setServerError(
        /quota|rate limit/i.test(text)
          ? 'The form has hit its daily limit. Please email me directly instead.'
          : 'Something went wrong sending your message. Please try again, or email me directly.',
      )
      setStatus('error')
    }
  }

  if (!isConfigured) {
    return (
      <div className="border border-line bg-ink-800 p-8">
        <p className="meta mb-3">form offline</p>
        <p className="text-fg-soft">
          The contact form isn’t available right now. Email me at{' '}
          <a className="text-fg underline decoration-accent underline-offset-4" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative">
      <div className="grid gap-x-8 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" value={values.name} error={errors.name} onChange={onChange} />
        <Field label="Email" name="email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={onChange} />
      </div>
      <Field label="Subject" name="subject" value={values.subject} error={errors.subject} onChange={onChange} />
      <Field
        label="Message"
        name="message"
        as="textarea"
        rows={5}
        value={values.message}
        error={errors.message}
        onChange={onChange}
        hint={`${values.message.length} / ${MAX_MESSAGE}`}
        maxLength={MAX_MESSAGE}
      />

      <div className="mt-10 flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="meta max-w-xs">
          Your details are only used to reply to you. See the{' '}
          <Link to="/privacy" className="text-fg-soft underline underline-offset-4 hover:text-fg">
            privacy policy
          </Link>
          .
        </p>
        <button type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'} className="btn-primary group min-w-[11rem] disabled:opacity-60">
          {status === 'sending' ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <FiArrowRight aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>

      <div aria-live="polite" role="status" className="mt-6 min-h-[1.5rem]">
        <AnimatePresence mode="wait">
          {status === 'sent' && (
            <motion.p key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-accent">
              <FiCheck aria-hidden="true" /> Thanks, your message is on its way. I’ll reply soon.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p key="err" role="alert" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[#FF8F8F]">
              {serverError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

function Field({ label, name, as = 'input', error, hint, ...props }) {
  const Tag = as
  const errorId = `${name}-error`
  return (
    <div className="group relative mt-8 first:mt-0 sm:[&:nth-child(2)]:mt-0">
      <div className="flex items-baseline justify-between">
        <label htmlFor={name} className="label text-fg-soft">
          {label}
        </label>
        {hint && <span className="meta">{hint}</span>}
      </div>
      <Tag
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        required
        className={`mt-2 block w-full resize-none border-0 border-b bg-transparent px-0 py-3 text-lg text-fg outline-none transition-colors duration-300 placeholder:text-fg-faint focus-visible:outline-none ${
          error ? 'border-[#FF8F8F]' : 'border-line-strong focus:border-accent'
        }`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-[#FF8F8F]">
          {error}
        </p>
      )}
    </div>
  )
}
