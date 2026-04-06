'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    notes: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setError('')

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: 'General Enquiry', // Default service type
          message: formData.notes,
        }),
      })

      const result = await res.json()

      if (res.ok) {
        setSent(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          postcode: '',
          notes: '',
        })
      } else {
        setError(result.error || 'Failed to send. Please try again.')
      }
    } catch {
      setError('Failed to send. Please try again or contact us via WhatsApp.')
    } finally {
      setIsSending(false)
    }
  }

  if (sent) {
    return (
      <section id="contact" className="py-20 bg-primary">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center text-white">
            <span className="text-6xl block mb-6">✅</span>
            <h2 className="text-3xl font-extrabold mb-4">
              Thank You!
            </h2>
            <p className="text-white/80 text-lg mb-8">
              We&apos;ve received your enquiry and will get back to you within 2
              hours during business hours.
            </p>
            <button
              onClick={() => setSent(false)}
              className="bg-white text-primary font-semibold px-6 py-3 rounded-full cursor-pointer border-none hover:bg-white/90 transition-all"
            >
              Send Another Enquiry
            </button>
          </div>
        </div>
      </section>
    )
  }

  const inputClasses = "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all bg-white"
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5"

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 mb-4">
              Contact Us Today
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Fill out the form below and we&apos;ll get back to you within 2
              hours during business hours.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg shadow-gray-200/60 border border-gray-100"
          >
            <div className="space-y-5">
              <div>
                <label className={labelClasses}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClasses}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="04XX XXX XXX"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Postcode *</label>
                <input
                  type="text"
                  name="postcode"
                  required
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  title="Please enter a 4-digit Australian postcode"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>Message (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your cleaning needs..."
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                By booking our services, you agree to these{' '}
                <a
                  href="https://bit.ly/TNCs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  T&Cs
                </a>
                . If you have any questions please let me know.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl cursor-pointer border-none transition-all hover:scale-[1.02] text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? '⏳ Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
