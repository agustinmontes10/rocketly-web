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
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo mensaje desde Rocketly Portfolio</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0d1117; color: #c9d1d9;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #161b22 0%, #0d1117 100%); border-radius: 12px; overflow: hidden; border: 1px solid #30363d; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);">

            <!-- Header -->
            <div style="background: linear-gradient(90deg, #00c6ff, #0072ff); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                🚀 Rocketly Portfolio
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
                Nuevo mensaje de contacto
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              <div style="background: rgba(88, 166, 255, 0.1); border-left: 4px solid #00c6ff; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 20px 0; color: #58a6ff; font-size: 20px; font-weight: 600;">
                  📧 Detalles del mensaje
                </h2>

                <div style="margin-bottom: 16px;">
                  <strong style="color: #00c6ff; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Nombre:</strong>
                  <p style="margin: 4px 0 0 0; color: #c9d1d9; font-size: 16px; line-height: 1.5;">${firstName}</p>
                </div>

                <div style="margin-bottom: 16px;">
                  <strong style="color: #00c6ff; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</strong>
                  <p style="margin: 4px 0 0 0; color: #58a6ff; font-size: 16px; line-height: 1.5;">
                    <a href="mailto:${email}" style="color: #58a6ff; text-decoration: none;">${email}</a>
                  </p>
                </div>

                <div>
                  <strong style="color: #00c6ff; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje:</strong>
                  <div style="margin: 12px 0 0 0; padding: 16px; background: rgba(13, 17, 23, 0.6); border-radius: 8px; border: 1px solid #30363d;">
                    <p style="margin: 0; color: #c9d1d9; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #30363d;">
                <p style="margin: 0; color: #8b949e; font-size: 14px;">
                  Enviado desde <strong style="color: #00c6ff;">Rocketly Portfolio</strong> • ${new Date().toLocaleString('es-AR')}
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('Error enviando email:', err)
    return NextResponse.json({ error: 'Error enviando mail' }, { status: 500 })
  }
}
