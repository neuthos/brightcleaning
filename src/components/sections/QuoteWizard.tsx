'use client'

import { useState } from 'react'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type ServiceType = 'regular' | 'endoflease' | 'office'
type TimeSlot = 'morning' | 'afternoon' | 'evening'

interface QuoteFormData {
  // Step 1: Service Type
  serviceType: ServiceType | ''

  // Regular/EOL: Property Details
  bedrooms: number
  bathrooms: number
  customClean: boolean
  customCleanDetails: string

  // EOL only: Property
  storeys: number

  // EOL only: Deep Clean Options
  deepCleanOven: boolean
  deepCleanCarpet: boolean
  deepCleanWalls: boolean
  deepCleanWindows: boolean
  images: File[]

  // EOL only: Add-ons
  addonGarage: boolean
  addonBalcony: boolean
  addonCupboard: boolean
  addonFridge: boolean
  addonGarden: boolean
  addonRubbish: boolean

  // Office only: Space Details
  roomsSmall: number
  roomsMedium: number
  roomsLarge: number
  desks: number
  officeBathrooms: number
  kitchens: number

  // Scheduling (Regular/EOL/Office)
  frequency: string
  flexibleTiming: boolean
  preferredDays: string[]
  preferredTime: TimeSlot | ''

  // EOL: Date range
  dateFrom: string
  dateTo: string

  // Office: Time preferences
  duringOfficeHours: boolean
  afterOfficeHours: boolean

  // Contact Info
  name: string
  businessName: string
  contactPerson: string
  email: string
  phone: string
  postcode: string
  notes: string
}

const INITIAL_DATA: QuoteFormData = {
  serviceType: '',
  bedrooms: 2,
  bathrooms: 1,
  customClean: false,
  customCleanDetails: '',
  storeys: 1,
  deepCleanOven: false,
  deepCleanCarpet: false,
  deepCleanWalls: false,
  deepCleanWindows: false,
  images: [],
  addonGarage: false,
  addonBalcony: false,
  addonCupboard: false,
  addonFridge: false,
  addonGarden: false,
  addonRubbish: false,
  roomsSmall: 0,
  roomsMedium: 0,
  roomsLarge: 0,
  desks: 0,
  officeBathrooms: 0,
  kitchens: 0,
  frequency: '',
  flexibleTiming: false,
  preferredDays: [],
  preferredTime: '',
  dateFrom: '',
  dateTo: '',
  duringOfficeHours: false,
  afterOfficeHours: false,
  name: '',
  businessName: '',
  contactPerson: '',
  email: '',
  phone: '',
  postcode: '',
  notes: '',
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const OFFICE_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<QuoteFormData>(INITIAL_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Step flow logic based on service type
  const getTotalSteps = (): number => {
    if (data.serviceType === 'regular') return 4 // service, property, schedule, contact
    if (data.serviceType === 'endoflease') return 6 // service, property, schedule, deep-clean, addons, contact
    if (data.serviceType === 'office') return 4 // service, space, schedule, contact
    return 1
  }

  const totalSteps = getTotalSteps()

  const updateData = (updates: Partial<QuoteFormData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const goNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetWizard = () => {
    setCurrentStep(1)
    setData(INITIAL_DATA)
    setSubmitted(false)
    setError('')
  }

  // Validation
  const canProceed = (): boolean => {
    if (currentStep === 1) return !!data.serviceType
    if (currentStep === totalSteps) {
      // Final step (contact)
      if (data.serviceType === 'office') {
        return !!(
          data.businessName.trim() &&
          data.contactPerson.trim() &&
          data.email.trim() &&
          data.phone.trim() &&
          data.postcode.trim()
        )
      }
      return !!(data.name.trim() && data.email.trim() && data.phone.trim() && data.postcode.trim())
    }
    return true // Other steps have no hard requirements
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      // Build API payload
      const payload: any = {
        service: data.serviceType,
        name: data.serviceType === 'office' ? data.contactPerson : data.name,
        email: data.email,
        phone: data.phone,
        postcode: data.postcode,
        message: data.notes,
      }

      if (data.serviceType === 'office') {
        payload.businessName = data.businessName
      }

      if (data.serviceType === 'regular' || data.serviceType === 'endoflease') {
        payload.bedrooms = data.bedrooms
        payload.bathrooms = data.bathrooms
      }

      if (data.serviceType === 'endoflease') {
        payload.storeys = data.storeys
        payload.dateFrom = data.dateFrom
        payload.dateTo = data.dateTo
      }

      if (data.serviceType === 'office') {
        payload.roomsSmall = data.roomsSmall
        payload.roomsMedium = data.roomsMedium
        payload.roomsLarge = data.roomsLarge
        payload.desks = data.desks
        payload.officeBathrooms = data.officeBathrooms
        payload.kitchens = data.kitchens
      }

      // TODO: Handle image uploads (convert to base64 or FormData)

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit quote request')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success screen
  if (submitted) {
    return (
      <div className="text-center py-12">
        <span className="text-6xl block mb-6">✅</span>
        <h3 className="text-2xl font-bold text-dark mb-3">Quote Request Received!</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Thank you! We&apos;ve received your request and will get back to you within 2 hours during
          business hours.
        </p>
        <button
          onClick={resetWizard}
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl cursor-pointer border-none transition-all"
        >
          Request Another Quote
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      {data.serviceType && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-xs font-medium text-primary">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 min-h-[400px]">
        {currentStep === 1 && <Step1ServiceSelection data={data} updateData={updateData} />}

        {/* REGULAR CLEANING FLOW */}
        {data.serviceType === 'regular' && currentStep === 2 && (
          <Step2APropertyDetails data={data} updateData={updateData} />
        )}
        {data.serviceType === 'regular' && currentStep === 3 && (
          <Step3AScheduling data={data} updateData={updateData} />
        )}
        {data.serviceType === 'regular' && currentStep === 4 && (
          <Step4AContact data={data} updateData={updateData} />
        )}

        {/* END OF LEASE FLOW */}
        {data.serviceType === 'endoflease' && currentStep === 2 && (
          <Step2BPropertyEOL data={data} updateData={updateData} />
        )}
        {data.serviceType === 'endoflease' && currentStep === 3 && (
          <Step3BSchedulingEOL data={data} updateData={updateData} />
        )}
        {data.serviceType === 'endoflease' && currentStep === 4 && (
          <Step4BDeepClean data={data} updateData={updateData} />
        )}
        {data.serviceType === 'endoflease' && currentStep === 5 && (
          <Step5BAddons data={data} updateData={updateData} />
        )}
        {data.serviceType === 'endoflease' && currentStep === 6 && (
          <Step6BContact data={data} updateData={updateData} />
        )}

        {/* OFFICE CLEANING FLOW */}
        {data.serviceType === 'office' && currentStep === 2 && (
          <Step2CSpaceDetails data={data} updateData={updateData} />
        )}
        {data.serviceType === 'office' && currentStep === 3 && (
          <Step3CSchedulingOffice data={data} updateData={updateData} />
        )}
        {data.serviceType === 'office' && currentStep === 4 && (
          <Step4CContact data={data} updateData={updateData} />
        )}

        {/* Error message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {data.serviceType && (
        <div className="flex gap-3 mt-6">
          {currentStep > 1 && (
            <button
              onClick={goBack}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl cursor-pointer border-none transition-all"
            >
              ← Back
            </button>
          )}
          <button
            onClick={currentStep === totalSteps ? handleSubmit : goNext}
            disabled={!canProceed() || isSubmitting}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl cursor-pointer border-none transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? '⏳ Submitting...'
              : currentStep === totalSteps
                ? 'Submit Quote Request →'
                : 'Next →'}
          </button>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// STEP COMPONENTS
// ============================================================================

// --- STEP 1: Service Selection ---
function Step1ServiceSelection({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  const services = [
    {
      id: 'regular' as ServiceType,
      icon: '🏠',
      title: 'Regular Cleaning',
      description: 'House, NDIS, or Spring cleaning',
    },
    {
      id: 'endoflease' as ServiceType,
      icon: '🔑',
      title: 'End of Lease',
      description: 'Bond-back guarantee cleaning',
    },
    {
      id: 'office' as ServiceType,
      icon: '🏢',
      title: 'Office Cleaning',
      description: 'Commercial space cleaning',
    },
  ]

  return (
    <div>
      <h3 className="text-2xl font-bold text-dark text-center mb-2">What service do you need?</h3>
      <p className="text-gray-500 text-center mb-8">Select the type of cleaning service</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {services.map((svc) => (
          <button
            key={svc.id}
            onClick={() => updateData({ serviceType: svc.id })}
            className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all text-center ${
              data.serviceType === svc.id
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-gray-200 hover:border-primary/40 hover:shadow-md'
            }`}
          >
            <span className="text-4xl">{svc.icon}</span>
            <div>
              <div className="text-base font-bold text-dark mb-1">{svc.title}</div>
              <div className="text-xs text-gray-500">{svc.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// --- STEP 2A: Property Details (Regular) ---
function Step2APropertyDetails({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-6">Property Details</h3>

      {/* Bedrooms */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          🛏️ Number of Bedrooms
        </label>
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => updateData({ bedrooms: n })}
              className={`py-3 rounded-lg font-semibold text-sm border-2 cursor-pointer transition-all ${
                data.bedrooms === n
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
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          🚿 Number of Bathrooms
        </label>
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => updateData({ bathrooms: n })}
              className={`py-3 rounded-lg font-semibold text-sm border-2 cursor-pointer transition-all ${
                data.bathrooms === n
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Clean */}
      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.customClean}
            onChange={(e) => updateData({ customClean: e.target.checked })}
            className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
          />
          <div>
            <span className="text-sm font-semibold text-gray-700">Custom cleaning needs?</span>
            <p className="text-xs text-gray-500">Tell us if you need specific areas cleaned</p>
          </div>
        </label>

        {data.customClean && (
          <textarea
            value={data.customCleanDetails}
            onChange={(e) => updateData({ customCleanDetails: e.target.value })}
            placeholder="Describe your custom cleaning requirements..."
            rows={3}
            className="mt-3 w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
          />
        )}
      </div>
    </div>
  )
}

// --- STEP 3A: Scheduling (Regular) ---
function Step3AScheduling({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  const toggleDay = (day: string) => {
    const days = data.preferredDays.includes(day)
      ? data.preferredDays.filter((d) => d !== day)
      : [...data.preferredDays, day]
    updateData({ preferredDays: days })
  }

  const frequencyOptions = [
    { id: 'weekly', label: 'Every Week', discount: true },
    { id: 'fortnightly', label: 'Every 2 Weeks', discount: true },
    { id: 'monthly', label: 'Every 4 Weeks', discount: false },
    { id: 'onetime', label: 'One-Time Service', discount: false },
  ]

  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-6">Schedule Your Cleaning</h3>

      {/* Frequency Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          How often do you need cleaning?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {frequencyOptions.map((freq) => (
            <button
              key={freq.id}
              onClick={() => updateData({ frequency: freq.id })}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                data.frequency === freq.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-gray-200 hover:border-primary/40'
              }`}
            >
              {freq.discount && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  10% OFF
                </span>
              )}
              <span className="block text-sm font-semibold text-dark">{freq.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Flexible timing */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.flexibleTiming}
            onChange={(e) => updateData({ flexibleTiming: e.target.checked })}
            className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
          />
          <div>
            <span className="text-sm font-semibold text-gray-700">Flexible with timing?</span>
            <p className="text-xs text-gray-500">We&apos;ll find the best time for you</p>
          </div>
        </label>
      </div>

      {!data.flexibleTiming && (
        <>
          {/* Preferred Days */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Day</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {DAYS.slice(0, 6).map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`py-3 rounded-lg font-semibold text-sm border-2 cursor-pointer transition-all ${
                    data.preferredDays.includes(day)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Preferred Time Slot
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'morning', label: 'Morning', time: '8AM - 12PM', icon: '🌅' },
                { id: 'afternoon', label: 'Afternoon', time: '12PM - 4PM', icon: '☀️' },
                { id: 'evening', label: 'Evening', time: '4PM - 8PM', icon: '🌆' },
              ].map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => updateData({ preferredTime: slot.id as TimeSlot })}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                    data.preferredTime === slot.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/40'
                  }`}
                >
                  <div className="text-2xl mb-1">{slot.icon}</div>
                  <div className="text-sm font-semibold text-dark">{slot.label}</div>
                  <div className="text-xs text-gray-500">{slot.time}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// --- STEP 4A: Contact (Regular) ---
function Step4AContact({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  const inputClasses =
    'w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none'

  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-2">Contact Information</h3>
      <p className="text-gray-500 text-sm mb-6">We&apos;ll send your quote within 2 hours</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Your name"
            required
            className={inputClasses}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder="your@email.com"
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder="04XX XXX XXX"
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Postcode *</label>
          <input
            type="text"
            value={data.postcode}
            onChange={(e) => updateData({ postcode: e.target.value })}
            placeholder="e.g. 5000"
            maxLength={4}
            pattern="[0-9]{4}"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Additional Notes (Optional)
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => updateData({ notes: e.target.value })}
            placeholder="Any special requirements..."
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        </div>
      </div>

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
    </div>
  )
}

// --- STEP 2B: Property (End of Lease) ---
function Step2BPropertyEOL({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-6">Property Details</h3>

      {/* Storeys */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          🏢 Number of Storeys
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => updateData({ storeys: n })}
              className={`py-3 rounded-lg font-semibold text-sm border-2 cursor-pointer transition-all ${
                data.storeys === n
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          🛏️ Number of Bedrooms
        </label>
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => updateData({ bedrooms: n })}
              className={`py-3 rounded-lg font-semibold text-sm border-2 cursor-pointer transition-all ${
                data.bedrooms === n
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
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          🚿 Number of Bathrooms
        </label>
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => updateData({ bathrooms: n })}
              className={`py-3 rounded-lg font-semibold text-sm border-2 cursor-pointer transition-all ${
                data.bathrooms === n
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

// --- STEP 3B: Scheduling EOL ---
function Step3BSchedulingEOL({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-6">When do you need cleaning?</h3>

      <div className="space-y-5">
        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              value={data.dateFrom}
              onChange={(e) => updateData({ dateFrom: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              value={data.dateTo}
              onChange={(e) => updateData({ dateTo: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Time Slot */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Preferred Time Slot
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'morning', label: 'Morning', time: '8-12', icon: '🌅' },
              { id: 'afternoon', label: 'Afternoon', time: '12-4', icon: '☀️' },
              { id: 'evening', label: 'Evening', time: '4-8', icon: '🌆' },
            ].map((slot) => (
              <button
                key={slot.id}
                onClick={() => updateData({ preferredTime: slot.id as TimeSlot })}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                  data.preferredTime === slot.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/40'
                }`}
              >
                <div className="text-2xl mb-1">{slot.icon}</div>
                <div className="text-sm font-semibold text-dark">{slot.label}</div>
                <div className="text-xs text-gray-500">{slot.time}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Flexible */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.flexibleTiming}
            onChange={(e) => updateData({ flexibleTiming: e.target.checked })}
            className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
          />
          <div>
            <span className="text-sm font-semibold text-gray-700">Flexible with time?</span>
            <p className="text-xs text-gray-500">We&apos;ll work around your schedule</p>
          </div>
        </label>
      </div>
    </div>
  )
}

// --- STEP 4B: Deep Clean Options ---
function Step4BDeepClean({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      updateData({ images: [...data.images, ...Array.from(files)] })
    }
  }

  const removeImage = (index: number) => {
    updateData({ images: data.images.filter((_, i) => i !== index) })
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-2">Deep Clean Requirements</h3>
      <p className="text-gray-500 text-sm mb-6">Select areas that need deep cleaning</p>

      <div className="space-y-3 mb-6">
        {[
          { key: 'deepCleanOven', label: '🔥 Oven cleaning', desc: 'Professional oven deep clean' },
          {
            key: 'deepCleanCarpet',
            label: '🧹 Carpet steam cleaning',
            desc: 'Steam clean all carpets',
          },
          { key: 'deepCleanWalls', label: '🧽 Wall marks removal', desc: 'Remove scuffs and marks' },
          { key: 'deepCleanWindows', label: '🪟 Window cleaning', desc: 'Inside & outside windows' },
        ].map((option) => (
          <label key={option.key} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary/40 transition-all">
            <input
              type="checkbox"
              checked={data[option.key as keyof QuoteFormData] as boolean}
              onChange={(e) => updateData({ [option.key]: e.target.checked })}
              className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
            />
            <div className="flex-1">
              <div className="text-sm font-semibold text-dark">{option.label}</div>
              <div className="text-xs text-gray-500">{option.desc}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          📷 Upload Photos (Optional)
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Help us give you an accurate quote by uploading photos of areas that need cleaning
        </p>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer"
        />

        {data.images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {data.images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Upload ${i + 1}`}
                  className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// --- STEP 5B: Add-ons ---
function Step5BAddons({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-2">Additional Services</h3>
      <p className="text-gray-500 text-sm mb-6">Select any extra services you need</p>

      <div className="space-y-3">
        {[
          { key: 'addonGarage', label: '🚗 Garage cleaning', desc: 'Clean and organize garage' },
          {
            key: 'addonBalcony',
            label: '🌿 Balcony/Patio cleaning',
            desc: 'Outdoor area cleaning',
          },
          {
            key: 'addonCupboard',
            label: '🗄️ Cupboard inside cleaning',
            desc: 'Deep clean inside cupboards',
          },
          { key: 'addonFridge', label: '❄️ Fridge inside cleaning', desc: 'Deep clean fridge' },
          { key: 'addonGarden', label: '🌱 Garden maintenance', desc: 'Basic garden tidying' },
          { key: 'addonRubbish', label: '🗑️ Rubbish removal', desc: 'Remove unwanted items' },
        ].map((option) => (
          <label key={option.key} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary/40 transition-all">
            <input
              type="checkbox"
              checked={data[option.key as keyof QuoteFormData] as boolean}
              onChange={(e) => updateData({ [option.key]: e.target.checked })}
              className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
            />
            <div className="flex-1">
              <div className="text-sm font-semibold text-dark">{option.label}</div>
              <div className="text-xs text-gray-500">{option.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

// --- STEP 6B: Contact EOL ---
function Step6BContact({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  const inputClasses =
    'w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none'

  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-2">Contact Information</h3>
      <p className="text-gray-500 text-sm mb-6">We&apos;ll send your quote within 2 hours</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Your name"
            required
            className={inputClasses}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder="your@email.com"
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder="04XX XXX XXX"
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Postcode *</label>
          <input
            type="text"
            value={data.postcode}
            onChange={(e) => updateData({ postcode: e.target.value })}
            placeholder="e.g. 5000"
            maxLength={4}
            pattern="[0-9]{4}"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Additional Notes (Optional)
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => updateData({ notes: e.target.value })}
            placeholder="Any special requirements..."
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        </div>
      </div>

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
    </div>
  )
}

// --- STEP 2C: Office Space Details ---
function Step2CSpaceDetails({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  const inputClasses =
    'w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none'

  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-6">Office Space Details</h3>

      <div className="space-y-5">
        {/* Rooms by size */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Number of Rooms</label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Small Rooms</label>
              <input
                type="number"
                min="0"
                max="20"
                value={data.roomsSmall}
                onChange={(e) => updateData({ roomsSmall: parseInt(e.target.value) || 0 })}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Medium Rooms</label>
              <input
                type="number"
                min="0"
                max="20"
                value={data.roomsMedium}
                onChange={(e) => updateData({ roomsMedium: parseInt(e.target.value) || 0 })}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Large Rooms</label>
              <input
                type="number"
                min="0"
                max="20"
                value={data.roomsLarge}
                onChange={(e) => updateData({ roomsLarge: parseInt(e.target.value) || 0 })}
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        {/* Other counts */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">🪑 Desks</label>
            <input
              type="number"
              min="0"
              max="100"
              value={data.desks}
              onChange={(e) => updateData({ desks: parseInt(e.target.value) || 0 })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">🚿 Bathrooms</label>
            <input
              type="number"
              min="0"
              max="10"
              value={data.officeBathrooms}
              onChange={(e) => updateData({ officeBathrooms: parseInt(e.target.value) || 0 })}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">🍽️ Kitchens</label>
            <input
              type="number"
              min="0"
              max="5"
              value={data.kitchens}
              onChange={(e) => updateData({ kitchens: parseInt(e.target.value) || 0 })}
              className={inputClasses}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// --- STEP 3C: Office Scheduling ---
function Step3CSchedulingOffice({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  const toggleDay = (day: string) => {
    const days = data.preferredDays.includes(day)
      ? data.preferredDays.filter((d) => d !== day)
      : [...data.preferredDays, day]
    updateData({ preferredDays: days })
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-6">Cleaning Schedule</h3>

      {/* Flexible timing */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.flexibleTiming}
            onChange={(e) => updateData({ flexibleTiming: e.target.checked })}
            className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
          />
          <div>
            <span className="text-sm font-semibold text-gray-700">Flexible with timing?</span>
            <p className="text-xs text-gray-500">We&apos;ll find the best schedule for you</p>
          </div>
        </label>
      </div>

      {!data.flexibleTiming && (
        <>
          {/* Preferred Days */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Preferred Days (Select all that apply)
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {OFFICE_DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`py-3 rounded-lg font-semibold text-sm border-2 cursor-pointer transition-all ${
                    data.preferredDays.includes(day)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary/40'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time preferences */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary/40 transition-all">
              <input
                type="checkbox"
                checked={data.duringOfficeHours}
                onChange={(e) => updateData({ duringOfficeHours: e.target.checked })}
                className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <div>
                <span className="text-sm font-semibold text-dark">
                  🌅 During office hours (9AM - 5PM)
                </span>
                <p className="text-xs text-gray-500">Clean while your team is working</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary/40 transition-all">
              <input
                type="checkbox"
                checked={data.afterOfficeHours}
                onChange={(e) => updateData({ afterOfficeHours: e.target.checked })}
                className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <div>
                <span className="text-sm font-semibold text-dark">
                  🌆 After office hours (5PM - 9PM)
                </span>
                <p className="text-xs text-gray-500">Clean when the office is empty</p>
              </div>
            </label>
          </div>
        </>
      )}
    </div>
  )
}

// --- STEP 4C: Office Contact ---
function Step4CContact({
  data,
  updateData,
}: {
  data: QuoteFormData
  updateData: (d: Partial<QuoteFormData>) => void
}) {
  const inputClasses =
    'w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none'

  return (
    <div>
      <h3 className="text-xl font-bold text-dark mb-2">Business Contact Information</h3>
      <p className="text-gray-500 text-sm mb-6">We&apos;ll send your quote within 2 hours</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Name *</label>
          <input
            type="text"
            value={data.businessName}
            onChange={(e) => updateData({ businessName: e.target.value })}
            placeholder="Your company name"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Contact Person *
          </label>
          <input
            type="text"
            value={data.contactPerson}
            onChange={(e) => updateData({ contactPerson: e.target.value })}
            placeholder="Your name"
            required
            className={inputClasses}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder="your@company.com"
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder="04XX XXX XXX"
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Postcode *</label>
          <input
            type="text"
            value={data.postcode}
            onChange={(e) => updateData({ postcode: e.target.value })}
            placeholder="e.g. 5000"
            maxLength={4}
            pattern="[0-9]{4}"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Additional Notes (Optional)
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => updateData({ notes: e.target.value })}
            placeholder="Any special requirements..."
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        </div>
      </div>

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
    </div>
  )
}
