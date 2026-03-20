import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, email, phone, city, service, frequency, bedrooms, bathrooms, message } = body

    // Validate required fields
    if (!name || !email || !phone || !city || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Build email content
    const emailBody = [
      `New Enquiry from BrightClean Website`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `City: ${city}`,
      `Service: ${service}`,
      frequency ? `Frequency: ${frequency}` : '',
      bedrooms ? `Bedrooms: ${bedrooms}` : '',
      bathrooms ? `Bathrooms: ${bathrooms}` : '',
      message ? `\nAdditional Notes:\n${message}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    // For now, log the enquiry (replace with Nodemailer/Resend later)
    console.log('=== NEW ENQUIRY ===')
    console.log(emailBody)
    console.log('==================')

    // TODO: Integrate with Nodemailer or Resend to send actual email
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@bright-clean.au',
    //   to: 'brightclean.2020@gmail.com',
    //   subject: `New Enquiry: ${service} - ${name}`,
    //   text: emailBody,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Enquiry error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
