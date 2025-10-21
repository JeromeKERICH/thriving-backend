const express = require("express");
const Contact = require("../models/ContactMessage");
const { Resend } = require("resend");

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// @POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save to DB
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Confirmation email to user
    await resend.emails.send({
      from: "Thriving Moms' Space <no-reply@updates.thrivingmomspace.com>",
      to: email,
      subject: "We've Received Your Message!",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Received</title>
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
            padding: 30px 20px;
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
        
        .message-preview {
            background-color: #f1f5f9;
            border-left: 4px solid #5F9EA0;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
        }
        
        .message-preview-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 10px;
        }
        
        .message-detail {
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .message-detail strong {
            color: #334155;
            min-width: 80px;
            display: inline-block;
        }
        
        .response-time {
            background-color: #fef6e6;
            border: 1px solid #FFD700;
            padding: 15px;
            border-radius: 8px;
            margin: 25px 0;
            text-align: center;
        }
        
        .response-time strong {
            color: #FFA500;
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
                padding: 25px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Thriving Moms' Space</div>
            <h1 class="header-title">Message Received</h1>
            <p class="header-subtitle">We're here to support your journey</p>
        </div>
        
        <div class="content">
            <p class="greeting">Hi ${name},</p>
            
            <p class="message">Thank you for reaching out to <span class="highlight">Thriving Moms' Space</span>. We've received your message and appreciate you taking the time to connect with us.</p>
            
            <div class="message-preview">
                <h3 class="message-preview-title">Your Message Details:</h3>
                <p class="message-detail"><strong>Subject:</strong> ${subject}</p>
                <p class="message-detail"><strong>Message:</strong> ${message}</p>
            </div>
            
            <div class="response-time">
                <p><strong>Response Time:</strong> We typically respond to all messages within <strong>24 hours</strong> during business days.</p>
            </div>
            
            <p class="message">In the meantime, feel free to explore our resources and community:</p>
            
            <a href="https://thrivingmomspace.com/programs" class="cta-button">Explore Our Programs</a>
            
            <p class="message">We're honored to be part of your journey toward balancing motherhood and career.</p>
            
            <p class="message">Warmly,<br>The Thriving Moms' Space Team</p>
        </div>
        
        <div class="footer">
            
            <p class="footer-text">Thriving Moms' Space - Balancing Motherhood and Career</p>
            <p class="footer-text">Have questions? <a href="mailto:support@thrivingmomspace.com" class="contact-link">support@thrivingmomspace.com</a></p>
            <p class="footer-text">© ${new Date().getFullYear()} Thriving Moms' Space. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
      `,
    });

    // Notification email to Admin
    await resend.emails.send({
      from: "Thriving Moms' Space <no-reply@updates.thrivingmomspace.com>",
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form: ${subject}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Submission</title>
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
        
        .details-card {
            background-color: #f8fafc;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
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
        }
        
        .detail-value {
            color: #1e293b;
            flex: 1;
        }
        
        .message-content {
            background-color: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-top: 10px;
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
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="header-title">New Contact Form Submission</h1>
        </div>
        
        <div class="content">
            <div class="alert">
                <strong>New Message:</strong> A visitor has submitted a contact form on your website.
            </div>
            
            <h2>Contact Details</h2>
            
            <div class="details-card">
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">${name}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value"><a href="mailto:${email}">${email}</a></span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Subject:</span>
                    <span class="detail-value">${subject}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Submitted:</span>
                    <span class="detail-value">${new Date().toLocaleString()}</span>
                </div>
            </div>
            
            <h3>Message Content</h3>
            <div class="message-content">
                <p>${message}</p>
            </div>
            
            <a href="mailto:${email}" class="action-button">Reply to ${name}</a>
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

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;