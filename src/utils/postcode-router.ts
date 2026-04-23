/**
 * Australian Postcode Email Router
 * Routes enquiries to correct regional email based on postcode
 */

export type Region = 'adelaide' | 'perth' | 'sydney' | 'melbourne' | 'unknown'

export interface EmailConfig {
  region: Region
  email: string
  cityName: string
}

// Email configuration per region (from environment variables, with fallback defaults)
const REGION_EMAILS: Record<'adelaide' | 'perth' | 'sydney' | 'melbourne', string> = {
  adelaide: process.env.EMAIL_ADELAIDE || 'adelaide@brightcleaning.com',
  perth: process.env.EMAIL_PERTH || 'perth@brightcleaning.com',
  sydney: process.env.EMAIL_SYDNEY || 'sydney@brightcleaning.com',
  melbourne: process.env.EMAIL_MELBOURNE || 'melbourne@brightcleaning.com',
}

// Australian postcode ranges
const POSTCODE_RANGES = {
  adelaide: { min: 5000, max: 5999 }, // South Australia
  perth: { min: 6000, max: 6999 }, // Western Australia
  sydney: { min: 2000, max: 2999 }, // New South Wales
  melbourne: { min: 3000, max: 3999 }, // Victoria
}

/**
 * Determines region based on Australian postcode
 * @param postcode - 4-digit Australian postcode (string or number)
 * @returns Email configuration object
 */
export function getEmailByPostcode(postcode: string | number): EmailConfig {
  // Convert to string and trim
  const postcodeStr = String(postcode).trim()

  // Validate postcode format (4 digits)
  if (!/^\d{4}$/.test(postcodeStr)) {
    return {
      region: 'unknown',
      email: REGION_EMAILS.adelaide, // Default to Adelaide
      cityName: 'Unknown',
    }
  }

  const postcodeNum = parseInt(postcodeStr, 10)

  // Check Sydney (NSW: 2000-2999)
  if (postcodeNum >= POSTCODE_RANGES.sydney.min && postcodeNum <= POSTCODE_RANGES.sydney.max) {
    return {
      region: 'sydney',
      email: REGION_EMAILS.sydney,
      cityName: 'Sydney',
    }
  }

  // Check Melbourne (VIC: 3000-3999)
  if (postcodeNum >= POSTCODE_RANGES.melbourne.min && postcodeNum <= POSTCODE_RANGES.melbourne.max) {
    return {
      region: 'melbourne',
      email: REGION_EMAILS.melbourne,
      cityName: 'Melbourne',
    }
  }

  // Check Adelaide (SA: 5000-5999)
  if (postcodeNum >= POSTCODE_RANGES.adelaide.min && postcodeNum <= POSTCODE_RANGES.adelaide.max) {
    return {
      region: 'adelaide',
      email: REGION_EMAILS.adelaide,
      cityName: 'Adelaide',
    }
  }

  // Check Perth (WA: 6000-6999)
  if (postcodeNum >= POSTCODE_RANGES.perth.min && postcodeNum <= POSTCODE_RANGES.perth.max) {
    return {
      region: 'perth',
      email: REGION_EMAILS.perth,
      cityName: 'Perth',
    }
  }

  // Fallback for other regions (default to Adelaide)
  return {
    region: 'unknown',
    email: REGION_EMAILS.adelaide,
    cityName: 'Other',
  }
}

/**
 * Validates if postcode is within serviceable areas (all major Australian cities)
 * @param postcode - 4-digit Australian postcode
 * @returns true if valid format (all postcodes accepted, default to Adelaide)
 */
export function isServiceablePostcode(postcode: string | number): boolean {
  const postcodeStr = String(postcode).trim()

  // Just validate format - all valid postcodes are accepted (default to Adelaide)
  return /^\d{4}$/.test(postcodeStr)
}

/**
 * Get state abbreviation from postcode
 * @param postcode - 4-digit Australian postcode
 * @returns State abbreviation (NSW, VIC, SA, WA, or Unknown)
 */
export function getStateFromPostcode(postcode: string | number): string {
  const postcodeStr = String(postcode).trim()

  if (!/^\d{4}$/.test(postcodeStr)) {
    return 'Unknown'
  }

  const postcodeNum = parseInt(postcodeStr, 10)

  if (postcodeNum >= 2000 && postcodeNum <= 2999) return 'NSW'
  if (postcodeNum >= 3000 && postcodeNum <= 3999) return 'VIC'
  if (postcodeNum >= 5000 && postcodeNum <= 5999) return 'SA'
  if (postcodeNum >= 6000 && postcodeNum <= 6999) return 'WA'

  return 'Unknown'
}
