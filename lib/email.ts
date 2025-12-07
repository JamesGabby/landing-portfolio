// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactSubmission {
  name: string;
  email: string;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
}

export async function sendNotificationEmail(data: ContactSubmission) {
  try {
    const { error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Replace with your verified domain
      to: ['jamesgabbitus@googlemail.com'], // Your email address
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #667eea; margin-top: 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Information</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                      <strong style="color: #495057; display: inline-block; width: 120px;">Name:</strong>
                      <span style="color: #212529;">${data.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                      <strong style="color: #495057; display: inline-block; width: 120px;">Email:</strong>
                      <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a>
                    </td>
                  </tr>
                  ${data.company ? `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                      <strong style="color: #495057; display: inline-block; width: 120px;">Company:</strong>
                      <span style="color: #212529;">${data.company}</span>
                    </td>
                  </tr>
                  ` : ''}
                  ${data.project_type ? `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                      <strong style="color: #495057; display: inline-block; width: 120px;">Project Type:</strong>
                      <span style="color: #212529; text-transform: capitalize;">${data.project_type.replace(/-/g, ' ')}</span>
                    </td>
                  </tr>
                  ` : ''}
                  ${data.budget ? `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                      <strong style="color: #495057; display: inline-block; width: 120px;">Budget:</strong>
                      <span style="color: #212529;">${data.budget}</span>
                    </td>
                  </tr>
                  ` : ''}
                  ${data.timeline ? `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                      <strong style="color: #495057; display: inline-block; width: 120px;">Timeline:</strong>
                      <span style="color: #212529;">${data.timeline.replace(/-/g, ' ')}</span>
                    </td>
                  </tr>
                  ` : ''}
                </table>

                <h3 style="color: #667eea; margin-top: 25px; margin-bottom: 15px; font-size: 18px;">Message</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea;">
                  <p style="margin: 0; white-space: pre-wrap; color: #212529;">${data.message}</p>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
                  <a href="mailto:${data.email}?subject=Re: Your inquiry" 
                     style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                    Reply to ${data.name}
                  </a>
                </div>
              </div>

              <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
                <p style="margin: 5px 0;">This email was sent from your website contact form</p>
                <p style="margin: 5px 0;">Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      // Don't throw - we don't want email failures to break the form submission
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Email notification error:', error);
    return { success: false, error };
  }
}