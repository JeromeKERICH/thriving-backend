const express = require('express');
const router = express.Router();
const EventRegistration = require('../models/EventRegistration');
const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/events/register
router.post('/register', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const registration = new EventRegistration({ name, email, phone });
    await registration.save();

    // Send confirmation to user
    await resend.emails.send({
      from: 'Thriving Moms Space <no-reply@updates.thrivingmomspace.com>',
      to: email,
      subject: 'You’re Registered! 🎉 Next Thriving Moms Event',
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Registration Confirmation</title>
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
            padding: 40px 20px;
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
        
        .confirmation-card {
            background: linear-gradient(135deg, #fef6e6 0%, #fef9e7 100%);
            border: 1px solid #FFD700;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
        }
        
        .confirmation-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .confirmation-title {
            font-size: 20px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 10px;
        }
        
        .next-steps {
            background-color: #f1f5f9;
            border-left: 4px solid #5F9EA0;
            padding: 20px;
            border-radius: 8px;
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
        
        .cta-button {
            display: block;
            width: 100%;
            text-align: center;
            background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            padding: 16px 0;
            border-radius: 12px;
            margin: 30px 0;
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
        
        .contact-link {
            color: #5F9EA0;
            text-decoration: none;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            
            .header-title {
                font-size: 24px;
            }
            
            .header {
                padding: 30px 15px;
            }
            
            .confirmation-card {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
       
        
        <div class="content">
            <p class="greeting">Hi ${name},</p>
            
            <p class="message">Thank you for registering for our next Thriving Moms Space event! We're thrilled to have you join our community of amazing moms.</p>
            
            <div class="confirmation-card">
                <div class="confirmation-icon">✨</div>
                <h2 class="confirmation-title">Registration Confirmed!</h2>
                <p class="message">You're officially on the list for our next gathering. We can't wait to connect with you!</p>
            </div>
            
            <div class="next-steps">
                <h3 class="next-steps-title">What happens next?</h3>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <p class="step-text">We'll send you event details and joining instructions 48 hours before the event</p>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <p class="step-text">Prepare to connect with like-minded moms and learn new strategies for balancing motherhood and career</p>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <p class="step-text">Join us for an inspiring session filled with learning, laughter, and connection</p>
                </div>
            </div>
            
            <p class="message"><strong>Need to make changes?</strong> If you have any questions or need to update your registration, simply reply to this email.</p>
            
            <a href="https://thrivingmomsspace.com/events" class="cta-button">View Event Details</a>
            
            <p class="message">We're honored to have you in our community and can't wait to see you at the event!</p>
            
            <p class="message">With excitement,<br>The Thriving Moms Space Team 💛</p>
        </div>
        
        <div class="footer">
            
            
            <p class="footer-text">Thriving Moms Space - Balancing Motherhood and Career</p>
            <p class="footer-text">Have questions? <a href="mailto:support@thrivingmomsspace.com" class="contact-link">support@thrivingmomsspace.com</a></p>
            <p class="footer-text">© ${new Date().getFullYear()} Thriving Moms Space. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
      `,
    });

    // Notify admin
    await resend.emails.send({
      from: 'Thriving Moms Space <no-reply@updates.thrivingmomspace.com>',
      to: process.env.ADMIN_EMAIL,
      subject: 'New Event Registration - Thriving Moms Space',
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Event Registration</title>
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
            padding: 25px 20px;
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
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 25px;
            font-size: 15px;
        }
        
        .registration-card {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            border: 1px solid #e2e8f0;
        }
        
        .detail-row {
            display: flex;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .detail-label {
            font-weight: 600;
            color: #475569;
            min-width: 100px;
            flex-shrink: 0;
        }
        
        .detail-value {
            color: #1e293b;
            flex: 1;
        }
        
        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #5F9EA0 0%, #7fb2b4 100%);
            color: white;
            text-decoration: none;
            font-weight: 600;
            padding: 12px 25px;
            border-radius: 8px;
            margin-top: 20px;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 25px 0;
        }
        
        .stat-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
        }
        
        .stat-number {
            font-size: 24px;
            font-weight: 700;
            color: #5F9EA0;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #64748b;
        }
        
        @media (max-width: 600px) {
            .detail-row {
                flex-direction: column;
            }
            
            .detail-label {
                margin-bottom: 5px;
            }
            
            .stats {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="header-title">New Event Registration</h1>
        </div>
        
        <div class="content">
            <div class="alert">
                <strong>New registration received!</strong> A mom has signed up for your upcoming event.
            </div>
            
            <h2>Registration Details</h2>
            
            <div class="registration-card">
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value"><strong>${name}</strong></span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value"><a href="mailto:${email}">${email}</a></span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value">${phone || 'Not provided'}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Registered:</span>
                    <span class="detail-value">${new Date().toLocaleString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span>
                </div>
            </div>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number">1</div>
                    <div class="stat-label">New Registration</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${new Date().getMonth() + 1}</div>
                    <div class="stat-label">This Month</div>
                </div>
            </div>
            
            <a href="mailto:${email}" class="action-button">Send Welcome Email</a>
        </div>
        
        <div class="footer">
            <p>Thriving Moms Space - Event Management System</p>
            <p>© ${new Date().getFullYear()} Thriving Moms Space</p>
        </div>
    </div>
</body>
</html>
      `,
    });

    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to register for event.' });
  }
});

module.exports = router;