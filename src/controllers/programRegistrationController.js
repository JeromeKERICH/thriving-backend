const ProgramRegistration = require('../models/ProgramRegistration');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.registerProgram = async (req, res) => {
  try {
    const { name, email, phone, program, message } = req.body;

    // Save to DB
    const newRegistration = new ProgramRegistration({
      name, email, phone, program, message
    });
    await newRegistration.save();

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Thriving Moms\' Space <no-reply@updates.thrivingmomspace.com>',
      to: email,
      subject: `Welcome to ${program}! - Registration Confirmed`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Program Registration Confirmation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            color: #334155;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        .header {
            background: linear-gradient(135deg, #5F9EA0 0%, #7fb2b4 100%);
            padding: 40px 30px;
            text-align: center;
            border-radius: 0 0 20px 20px;
        }
        
        .logo {
            color: white;
            font-size: 24px;
            font-weight: 700;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 15px;
        }
        
        .header-title {
            color: white;
            font-size: 28px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            font-weight: 400;
            margin: 0;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 25px;
        }
        
        .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 25px;
        }
        
        .highlight {
            color: #5F9EA0;
            font-weight: 600;
        }
        
        .program-card {
            background: linear-gradient(135deg, #fef6e6 0%, #fef9e7 100%);
            border-left: 4px solid #FFA500;
            padding: 25px;
            border-radius: 12px;
            margin: 30px 0;
        }
        
        .program-title {
            font-size: 20px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 10px;
        }
        
        .program-description {
            color: #475569;
            margin-bottom: 15px;
        }
        
        .next-steps {
            background-color: #f1f5f9;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .next-steps-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 15px;
        }
        
        .step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
        }
        
        .step-number {
            
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 600;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .step-text {
            font-size: 15px;
            color: #475569;
        }
        
        .contact-info {
            background-color: #f8fafc;
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
        }
        
        .contact-text {
            font-size: 14px;
            color: #64748b;
            margin: 5px 0;
        }
        
        .contact-link {
            color: #5F9EA0;
            text-decoration: none;
            font-weight: 500;
        }
        
        .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-radius: 20px 20px 0 0;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
        }
        
        .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-color: #e2e8f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #5F9EA0;
            text-decoration: none;
            font-weight: 600;
        }
        
        .footer-text {
            font-size: 14px;
            color: #64748b;
            margin: 5px 0;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            
            .header-title {
                font-size: 24px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .program-card, .next-steps {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
       
        
        <div class="content">
            <p class="greeting">Hello ${name},</p>
            
            <p class="message">Thank you for registering for the <span class="highlight">${program}</span> at Thriving Moms' Space! We're absolutely thrilled to welcome you to our community of empowered mothers.</p>
            
            <div class="program-card">
                <h3 class="program-title">${program}</h3>
                <p class="program-description">You've taken an important step toward building a flexible career that works with your family life. Get ready for an incredible journey of growth and transformation!</p>
            </div>
            
            <div class="next-steps">
                <h3 class="next-steps-title">What Happens Next?</h3>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <p class="step-text">Our team will contact you within <strong>24 hours</strong> to welcome you personally</p>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <p class="step-text">You'll receive program details and onboarding information</p>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <p class="step-text">Get access to our community platform and resources</p>
                </div>
                
                <div class="step">
                    <div class="step-number">4</div>
                    <p class="step-text">Begin your journey toward a flexible, fulfilling career</p>
                </div>
            </div>
            
            <div class="contact-info">
                <p class="contact-text"><strong>Need immediate assistance?</strong></p>
                <p class="contact-text">Email us at <a href="mailto:support@thrivingmomspace.com" class="contact-link">support@thrivingmomspace.com</a></p>
                <p class="contact-text">We're here to support you every step of the way!</p>
            </div>
            
            <p class="message">We're honored to be part of your journey and can't wait to see you thrive as both a mom and a professional.</p>
            
            <p class="message">With excitement,<br><strong>The Thriving Moms' Space Team</strong></p>
        </div>
        
        <div class="footer">
           
            
            <p class="footer-text">Thriving Moms' Space - Empowering Mothers to Balance Career and Family</p>
            <p class="footer-text">© ${new Date().getFullYear()} Thriving Moms' Space. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
      `,
    });

    // Notify admin
    await resend.emails.send({
      from: 'Thriving Moms\' Space <no-reply@updates.thrivingmomspace.com>',
      to: process.env.ADMIN_EMAIL,
      subject: `New Program Registration: ${program}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Program Registration</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            color: #334155;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        .header {
            background: linear-gradient(135deg, #5F9EA0 0%, #7fb2b4 100%);
            padding: 30px;
            text-align: center;
            color: white;
        }
        
        .header-title {
            font-size: 24px;
            font-weight: 700;
            margin: 0;
        }
        
        .content {
            padding: 30px;
        }
        
        .alert {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
        }
        
        .alert-title {
            font-size: 18px;
            font-weight: 600;
            color: #92400e;
            margin: 0 0 10px 0;
        }
        
        .registration-details {
            background-color: #f8fafc;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }
        
        .detail-section {
            margin-bottom: 20px;
        }
        
        .detail-label {
            font-weight: 600;
            color: #475569;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        
        .detail-value {
            color: #1e293b;
            font-size: 16px;
            margin: 0;
        }
        
        .message-box {
            background-color: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-top: 10px;
        }
        
        .action-buttons {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }
        
        .action-button {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
        }
        
        .button-primary {
            background: linear-gradient(135deg, #5F9EA0 0%, #7fb2b4 100%);
            color: white;
        }
        
        .button-secondary {
            background-color: #f1f5f9;
            color: #475569;
            border: 1px solid #e2e8f0;
        }
        
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 20px;
            }
            
            .action-buttons {
                flex-direction: column;
            }
            
            .action-button {
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="header-title">New Program Registration 🎯</h1>
        </div>
        
        <div class="content">
            <div class="alert">
                <h3 class="alert-title">Action Required: New Registration</h3>
                <p>A new participant has registered for one of your programs and requires onboarding.</p>
            </div>
            
            <div class="registration-details">
                <div class="detail-section">
                    <div class="detail-label">Program</div>
                    <div class="detail-value" style="color: #5F9EA0; font-weight: 600; font-size: 18px;">${program}</div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="detail-section">
                        <div class="detail-label">Participant Name</div>
                        <div class="detail-value">${name}</div>
                    </div>
                    
                    <div class="detail-section">
                        <div class="detail-label">Contact Email</div>
                        <div class="detail-value">
                            <a href="mailto:${email}" style="color: #5F9EA0; text-decoration: none;">${email}</a>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="detail-section">
                        <div class="detail-label">Phone Number</div>
                        <div class="detail-value">${phone || 'Not provided'}</div>
                    </div>
                    
                    <div class="detail-section">
                        <div class="detail-label">Registration Date</div>
                        <div class="detail-value">${new Date().toLocaleString()}</div>
                    </div>
                </div>
                
                ${message ? `
                <div class="detail-section">
                    <div class="detail-label">Additional Message</div>
                    <div class="message-box">
                        <p style="margin: 0; color: #475569;">${message}</p>
                    </div>
                </div>
                ` : ''}
            </div>
            
            <div class="action-buttons">
                <a href="mailto:${email}" class="action-button button-primary">
                    ✉️ Email Participant
                </a>
                <a href="tel:${phone || '#'}" class="action-button button-secondary" ${!phone ? 'style="opacity: 0.6; pointer-events: none;"' : ''}>
                    📞 Call Participant
                </a>
            </div>
            
            <div style="margin-top: 25px; padding: 15px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                <p style="margin: 0; color: #0369a1; font-size: 14px;">
                    <strong>Next Step:</strong> Please contact this participant within 24 hours to begin their onboarding process.
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p>Thriving Moms' Space - Admin Notification System</p>
            <p>© ${new Date().getFullYear()} Thriving Moms' Space</p>
        </div>
    </div>
</body>
</html>
      `,
    });

    res.status(200).json({ message: 'Registration successful and emails sent!' });

  } catch (error) {
    console.error('Error in registerProgram:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};