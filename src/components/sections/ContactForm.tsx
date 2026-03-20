'use client'

import { useState } from 'react'
import { siteConfig } from '@/data'

const serviceOptions = [
  'House Cleaning',
  'End of Lease Cleaning',
  'Office Cleaning',
  'NDIS Cleaning',
  'Deep Cleaning',
  'Carpet Cleaning',
  'Other',
]

const frequencyOptions = [
  'One-off',
  'Weekly',
  'Fortnightly',
  'Monthly',
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    service: '',
    frequency: '',
    bedrooms: '',
    bathrooms: '',
    message: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const buildMessage = () => {
    return [
      `Hi Bright Clean!`,
      ``,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `City: ${formData.city}`,
      `Service: ${formData.service}`,
      `Frequency: ${formData.frequency}`,
      formData.bedrooms ? `Bedrooms: ${formData.bedrooms}` : '',
      formData.bathrooms ? `Bathrooms: ${formData.bathrooms}` : '',
      formData.message ? `\nMessage: ${formData.message}` : '',
    ]
      .filter(Boolean)
      .join('\n')
  }

  const handleWhatsApp = () => {
    const msg = buildMessage()
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  const handleMessenger = () => {
    const msg = buildMessage()
    navigator.clipboard.writeText(msg).then(() => {
      alert('Message copied to clipboard! Paste it in the Messenger chat.')
      window.open(`https://m.me/${siteConfig.messengerUsername}`, '_blank')
    })
  }

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSent(true)
      } else {
        alert('Failed to send. Please try WhatsApp or call us directly.')
      }
    } catch {
      alert('Failed to send. Please try WhatsApp or call us directly.')
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
              onClick={() => {
                setSent(false)
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  city: '',
                  service: '',
                  frequency: '',
                  bedrooms: '',
                  bathrooms: '',
                  message: '',
                })
              }}
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
  const selectClasses = "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all appearance-none cursor-pointer bg-white"

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 mb-4">
              Get Your Free Quote Today
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Fill out the form below and we&apos;ll get back to you within 2
              hours. Or contact us directly via WhatsApp or Messenger.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleEmail}
            className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg shadow-gray-200/60 border border-gray-100"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  placeholder="0400 000 000"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>City *</label>
                <select
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className={selectClasses}
                >
                  <option value="">Select city</option>
                  <option value="Adelaide">Adelaide</option>
                  <option value="Perth">Perth</option>
                  <option value="Sydney">Sydney</option>
                  <option value="Melbourne">Melbourne</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Service Required *</label>
                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className={selectClasses}
                >
                  <option value="">Select service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClasses}>Frequency</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className={selectClasses}
                >
                  <option value="">Select frequency</option>
                  {frequencyOptions.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClasses}>Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  min="1"
                  max="10"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  min="1"
                  max="10"
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Message */}
            <div className="mt-5">
              <label className={labelClasses}>Additional Notes</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Any special requirements or details..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-4 rounded-xl cursor-pointer border-none transition-all hover:scale-[1.02] text-sm"
              >
                💬 Send via WhatsApp
              </button>
              <button
                type="button"
                onClick={handleMessenger}
                className="flex-1 flex items-center justify-center gap-2 bg-[#0084FF] hover:bg-[#006acc] text-white font-semibold py-4 rounded-xl cursor-pointer border-none transition-all hover:scale-[1.02] text-sm"
              >
                💬 Send via Messenger
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl cursor-pointer border-none transition-all hover:scale-[1.02] text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? '⏳ Sending...' : '✉️ Send via Email'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
