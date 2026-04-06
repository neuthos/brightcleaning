import { NextResponse } from 'next/server'
import { getEmailByPostcode, isServiceablePostcode } from '@/utils/postcode-router'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, email, phone, postcode, city, service, frequency, bedrooms, bathrooms, message } = body

    // Validate required fields
    if (!name || !email || !phone || !postcode || !service) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, phone, postcode, service)' },
        { status: 400 }
      )
    }

    // Validate postcode format
    if (!isServiceablePostcode(postcode)) {
      return NextResponse.json(
        {
          error: 'Please provide a valid 4-digit Australian postcode.',
          postcode,
        },
        { status: 400 }
      )
    }

    // Get email routing based on postcode (defaults to Adelaide for non-matching postcodes)
    const emailConfig = getEmailByPostcode(postcode)

    // Build email content
    const emailBody = [
      `New Enquiry from BrightClean Website`,
      ``,
      `Region: ${emailConfig.cityName} (${emailConfig.region.toUpperCase()})`,
      ``,
      `Customer Details:`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      postcode ? `Postcode: ${postcode}` : '',
      city ? `City: ${city}` : '',
      ``,
      `Service Details:`,
      `Service: ${service}`,
      frequency ? `Frequency: ${frequency}` : '',
      bedrooms ? `Bedrooms: ${bedrooms}` : '',
      bathrooms ? `Bathrooms: ${bathrooms}` : '',
      message ? `\nAdditional Notes:\n${message}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    // Log the enquiry with routing info
    console.log('=== NEW ENQUIRY ===')
    console.log(`Routing to: ${emailConfig.email} (${emailConfig.region})`)
    console.log(emailBody)
    console.log('==================')

    // TODO: Integrate with Nodemailer or Resend to send actual email
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@bright-clean.au',
    //   to: emailConfig.email,  // Dynamic email based on postcode
    //   subject: `New Enquiry: ${service} - ${name} (${emailConfig.cityName})`,
    //   text: emailBody,
    // })

    return NextResponse.json({
      success: true,
      region: emailConfig.region,
      routedTo: emailConfig.email,
    })
  } catch (error) {
    console.error('Enquiry error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
