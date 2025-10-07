import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { DemoSubmission } from '@/lib/types/form';

// Initialize SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const FROM_EMAIL = process.env.SES_FROM_EMAIL!;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL!;

export async function sendSubmissionNotification(data: DemoSubmission): Promise<void> {
  try {
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              New Demo Request - Tranzmit
            </h2>
            
            <p><strong>Submission ID:</strong> ${data.id}</p>
            <p><strong>Submitted At:</strong> ${new Date(data.submittedAt).toLocaleString()}</p>
            
            <h3 style="color: #374151; margin-top: 30px;">Contact Information</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;"><strong>Full Name:</strong> ${data.fullName}</li>
              <li style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
              ${data.phone ? `<li style="margin: 10px 0;"><strong>Phone:</strong> ${data.phone}</li>` : ''}
            </ul>
            
            <h3 style="color: #374151; margin-top: 30px;">Organization Details</h3>
            <ul style="list-style: none; padding: 0;">
              ${data.organization ? `<li style="margin: 10px 0;"><strong>Organization:</strong> ${data.organization}</li>` : ''}
              ${data.organizationType ? `<li style="margin: 10px 0;"><strong>Organization Type:</strong> ${data.organizationType}</li>` : ''}
            </ul>
            
            ${data.surveyNeeds ? `
              <h3 style="color: #374151; margin-top: 30px;">Survey Needs</h3>
              <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #2563eb; margin: 15px 0;">
                ${data.surveyNeeds.replace(/\n/g, '<br>')}
              </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding: 15px; background: #f0f9ff; border-radius: 5px;">
              <p style="margin: 0; font-size: 14px; color: #0369a1;">
                <strong>Next Steps:</strong> Contact the lead within 24 hours to schedule their personalized demo.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
New Demo Request - Tranzmit

Submission ID: ${data.id}
Submitted At: ${new Date(data.submittedAt).toLocaleString()}

Contact Information:
- Full Name: ${data.fullName}
- Email: ${data.email}
${data.phone ? `- Phone: ${data.phone}` : ''}

Organization Details:
${data.organization ? `- Organization: ${data.organization}` : ''}
${data.organizationType ? `- Organization Type: ${data.organizationType}` : ''}

${data.surveyNeeds ? `Survey Needs:\n${data.surveyNeeds}\n` : ''}

Next Steps: Contact the lead within 24 hours to schedule their personalized demo.
    `;

    const command = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [NOTIFICATION_EMAIL],
      },
      Message: {
        Subject: {
          Data: `New Demo Request from ${data.fullName} - Tranzmit`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlContent,
            Charset: 'UTF-8',
          },
          Text: {
            Data: textContent,
            Charset: 'UTF-8',
          },
        },
      },
    });

    await sesClient.send(command);
    console.log(`Email notification sent for submission: ${data.id}`);
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Don't throw error - email failure shouldn't block form submission
  }
}


