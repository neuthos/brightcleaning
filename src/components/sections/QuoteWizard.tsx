'use client'

import { useState } from 'react'
import { siteConfig } from '@/data'

// Step definitions
type StepId = 'service' | 'details' | 'frequency' | 'contact'

interface QuoteData {
  service: string
  bedrooms: number
  bathrooms: number
  hours: number
  frequency: string
  name: string
  phone: string
  email: string
  postcode: string
  city: string
}

const serviceOptions = [
  { id: 'house', label: 'House Cleaning', icon: '🏠', description: 'Regular home cleaning' },
  { id: 'endoflease', label: 'End of Lease', icon: '🔑', description: 'Bond-back guarantee' },
  { id: 'office', label: 'Office Cleaning', icon: '🏢', description: 'Commercial spaces' },
  { id: 'ndis', label: 'NDIS Cleaning', icon: '♿', description: 'NDIS registered' },
  { id: 'deep', label: 'Deep Cleaning', icon: '✨', description: 'One-off deep clean' },
  { id: 'carpet', label: 'Carpet Cleaning', icon: '🧹', description: 'Steam & dry cleaning' },
]

const frequencyOptions = [
  { id: 'weekly', label: 'Every Week', discount: '10% Off' },
  { id: 'fortnightly', label: 'Every 2 Weeks', discount: '10% Off' },
  { id: 'monthly', label: 'Every 4 Weeks', discount: '5% Off' },
  { id: 'onetime', label: '1 Time Service', discount: '' },
]

interface QuoteWizardProps {
  defaultCity?: string
}

export default function QuoteWizard({ defaultCity = '' }: QuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState<StepId>('service')
  const [data, setData] = useState<QuoteData>({
    service: '',
    bedrooms: 2,
    bathrooms: 1,
    hours: 3,
    frequency: 'fortnightly',
    name: '',
    phone: '',
    email: '',
    postcode: '',
    city: defaultCity,
  })
  const [submitted, setSubmitted] = useState(false)

  // Define step flow based on service type
  const getSteps = (): StepId[] => {
    if (['house', 'endoflease', 'deep'].includes(data.service)) {
      return ['service', 'details', 'frequency', 'contact']
    }
    if (['office'].includes(data.service)) {
      return ['service', 'frequency', 'contact'] // skip bedrooms/bathrooms
    }
    // ndis, carpet — straight to contact
    return ['service', 'contact']
  }

  const steps = getSteps()
  const stepIndex = steps.indexOf(currentStep)
  const totalSteps = steps.length
  const isLast = stepIndex === totalSteps - 1

  const goNext = () => {
    if (isLast) return
    setCurrentStep(steps[stepIndex + 1])
  }

  const goBack = () => {
    if (stepIndex === 0) return
    setCurrentStep(steps[stepIndex - 1])
  }

  const handleSubmit = () => {
    // Build WhatsApp message
    const lines = [
      `Hi Bright Clean! I'd like a quote.`,
      ``,
      `Service: ${serviceOptions.find((s) => s.id === data.service)?.label || data.service}`,
    ]

    if (['house', 'endoflease', 'deep'].includes(data.service)) {
      lines.push(`Bedrooms: ${data.bedrooms}`)
      lines.push(`Bathrooms: ${data.bathrooms}`)
    }

    if (['house', 'endoflease', 'deep', 'office'].includes(data.service)) {
      lines.push(`Frequency: ${frequencyOptions.find((f) => f.id === data.frequency)?.label || data.frequency}`)
    }

    lines.push(``)
    lines.push(`Name: ${data.name}`)
    lines.push(`Phone: ${data.phone}`)
    lines.push(`Email: ${data.email}`)
    if (data.postcode) lines.push(`Postcode: ${data.postcode}`)
    if (data.city) lines.push(`City: ${data.city}`)

    const msg = lines.join('\n')
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-4">✅</span>
        <h3 className="text-xl font-bold text-dark mb-2">Quote Request Sent!</h3>
        <p className="text-gray-500 text-sm mb-4">
          We&apos;ll get back to you within 2 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setCurrentStep('service')
            setData({
              service: '',
              bedrooms: 2,
              bathrooms: 1,
              hours: 3,
              frequency: 'fortnightly',
              name: '',
              phone: '',
              email: '',
              postcode: '',
              city: defaultCity,
            })
          }}
          className="text-primary text-sm font-medium hover:underline bg-transparent border-none cursor-pointer"
        >
          Request another quote
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        {steps.map((step, i) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < stepIndex
                ? 'bg-primary text-white'
                : i === stepIndex
                  ? 'bg-primary text-white ring-4 ring-primary/20'
                  : 'bg-gray-100 text-gray-400'
            }`}
          >
            {i < stepIndex ? '✓' : i + 1}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="min-h-[280px]">
        {currentStep === 'service' && (
          <StepService
            selected={data.service}
            onSelect={(service) => {
              setData({ ...data, service })
              // Auto-advance after selection
              setTimeout(() => {
                const newSteps = ['house', 'endoflease', 'deep'].includes(service)
                  ? ['service', 'details', 'frequency', 'contact']
                  : ['office'].includes(service)
                    ? ['service', 'frequency', 'contact']
                    : ['service', 'contact']
                setCurrentStep(newSteps[1] as StepId)
              }, 300)
            }}
          />
        )}

        {currentStep === 'details' && (
          <StepDetails
            bedrooms={data.bedrooms}
            bathrooms={data.bathrooms}
            onBedrooms={(bedrooms) => setData({ ...data, bedrooms })}
            onBathrooms={(bathrooms) => setData({ ...data, bathrooms })}
          />
        )}

        {currentStep === 'frequency' && (
          <StepFrequency
            selected={data.frequency}
            onSelect={(frequency) => setData({ ...data, frequency })}
          />
        )}

        {currentStep === 'contact' && (
          <StepContact
            data={data}
            onChange={(field, value) => setData({ ...data, [field]: value })}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {stepIndex > 0 && (
          <button
            onClick={goBack}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl cursor-pointer border-none transition-all text-sm"
          >
            ← Back
          </button>
        )}
        {currentStep !== 'service' && (
          <button
            onClick={isLast ? handleSubmit : goNext}
            disabled={isLast && (!data.name || !data.phone || !data.email)}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl cursor-pointer border-none transition-all hover:shadow-lg hover:shadow-primary/30 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLast ? 'Get My Quote →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  )
}

// --- Step Components ---

function StepService({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (service: string) => void
}) {
  return (
    <div>
      <h3 className="text-lg font-bold text-dark text-center mb-1">
        What service do you need?
      </h3>
      <p className="text-gray-400 text-sm text-center mb-5">Select one to continue</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {serviceOptions.map((svc) => (
          <button
            key={svc.id}
            onClick={() => onSelect(svc.id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-all text-center bg-white ${
              selected === svc.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-primary/40 hover:shadow-sm'
            }`}
          >
            <span className="text-2xl">{svc.icon}</span>
            <span className="text-xs font-semibold text-dark leading-tight">{svc.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepDetails({
  bedrooms,
  bathrooms,
  onBedrooms,
  onBathrooms,
}: {
  bedrooms: number
  bathrooms: number
  onBedrooms: (n: number) => void
  onBathrooms: (n: number) => void
}) {
  return (
    <div>
      <h3 className="text-lg font-bold text-dark text-center mb-5">
        How many bedrooms & bathrooms?
      </h3>

      {/* Bedrooms */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">🛏️</span>
          <span className="text-sm font-medium text-gray-600">Bedrooms</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => onBedrooms(n)}
              className={`flex-1 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-2 transition-all ${
                bedrooms === n
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">🚿</span>
          <span className="text-sm font-medium text-gray-600">Bathrooms</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => onBathrooms(n)}
              className={`flex-1 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-2 transition-all ${
                bathrooms === n
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepFrequency({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (freq: string) => void
}) {
  return (
    <div>
      <h3 className="text-lg font-bold text-dark text-center mb-5">
        How often do you need cleaning?
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {frequencyOptions.map((freq) => (
          <button
            key={freq.id}
            onClick={() => onSelect(freq.id)}
            className={`py-4 px-3 rounded-xl border-2 cursor-pointer transition-all text-center bg-white ${
              selected === freq.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-primary/40'
            }`}
          >
            <span className="block text-sm font-semibold text-dark">{freq.label}</span>
            {freq.discount && (
              <span className="block text-xs text-primary font-semibold mt-1">
                {freq.discount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepContact({
  data,
  onChange,
}: {
  data: QuoteData
  onChange: (field: string, value: string) => void
}) {
  const inputClasses =
    'w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all bg-white text-sm'

  return (
    <div>
      <h3 className="text-lg font-bold text-dark text-center mb-1">
        Where should we send your quote?
      </h3>
      <p className="text-gray-400 text-xs text-center mb-5">We&apos;ll reply within 2 hours</p>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your Name *"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          required
          className={inputClasses}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="tel"
            placeholder="Phone *"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            required
            className={inputClasses}
          />
          <input
            type="text"
            placeholder="Postcode"
            value={data.postcode}
            onChange={(e) => onChange('postcode', e.target.value)}
            className={inputClasses}
          />
        </div>
        <input
          type="email"
          placeholder="Your Email *"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          required
          className={inputClasses}
        />
      </div>
    </div>
  )
}
