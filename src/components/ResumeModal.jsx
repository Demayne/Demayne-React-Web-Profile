import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FiDownload, FiExternalLink, FiX } from 'react-icons/fi'
import Dialog from './Dialog'
import ContactForm from './ContactForm'
import { profile } from '../data/content'

const OverlayContext = createContext({ openResume: () => {}, openContact: () => {} })

export const useOverlays = () => useContext(OverlayContext)

// Site-wide dialogs (résumé preview, contact form) that any component can open.
export function OverlayProvider({ children }) {
  const [open, setOpen] = useState(null) // 'resume' | 'contact' | null
  const close = useCallback(() => setOpen(null), [])
  const openResume = useCallback(() => setOpen('resume'), [])
  const openContact = useCallback(() => setOpen('contact'), [])

  return (
    <OverlayContext.Provider value={{ openResume, openContact }}>
      {children}
      <AnimatePresence>
        {open === 'resume' && (
          <Dialog key="resume" labelledBy="resume-title" onClose={close} className="flex h-[88vh] max-w-5xl flex-col">
            <DialogHeader id="resume-title" eyebrow="résumé.pdf" title={profile.name} onClose={close}>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost hidden min-h-[44px] px-4 sm:inline-flex">
                <FiExternalLink aria-hidden="true" /> Open
              </a>
              <a href={profile.resume} download className="btn-primary min-h-[44px] px-4">
                <FiDownload aria-hidden="true" /> Download
              </a>
            </DialogHeader>
            <div className="relative flex-1 bg-ink-700">
              <p className="meta absolute inset-0 grid place-items-center p-8 text-center">
                If the preview doesn’t load on your device, use Download above.
              </p>
              <iframe src={`${profile.resume}#view=FitH`} title="Résumé preview" className="relative h-full w-full border-0" />
            </div>
          </Dialog>
        )}
        {open === 'contact' && (
          <Dialog key="contact" labelledBy="contact-dialog-title" onClose={close} className="max-h-[92vh] max-w-2xl overflow-y-auto">
            <DialogHeader id="contact-dialog-title" eyebrow="new message" title="Send a message" onClose={close} />
            <div className="p-6 sm:p-8">
              <ContactForm />
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </OverlayContext.Provider>
  )
}

function DialogHeader({ id, eyebrow, title, onClose, children }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
      <div className="min-w-0">
        <p className="meta">{eyebrow}</p>
        <h2 id={id} className="truncate text-fs-1 font-semibold">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        {children}
        <button
          type="button"
          onClick={onClose}
          className="grid h-11 w-11 place-items-center border border-line-strong transition-colors hover:border-fg"
          aria-label="Close"
        >
          <FiX aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
