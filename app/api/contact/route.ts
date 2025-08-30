import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { firstName, email, message } = await req.json()

    const data = await resend.emails.send({
      from: 'Rocketly Portfolio <onboarding@resend.dev>',
      to: ['contact.rocketly@gmail.com'],
      subject: `Nuevo mensaje de ${firstName}`,
      html: `
        <div>
          <h2>Nuevo mensaje desde el portfolio</h2>
          <p><strong>Nombre:</strong> ${firstName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('Error enviando email:', err)
    return NextResponse.json({ error: 'Error enviando mail' }, { status: 500 })
  }
}
