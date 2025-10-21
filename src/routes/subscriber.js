const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");
const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/subscribe
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required." });

    // check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "You're already subscribed." });

    // save to database
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    // send confirmation to user
    await resend.emails.send({
      from: "Thriving Moms' Space <no-reply@updates.thrivingmomspace.com>",
      to: email,
      subject: "Welcome to Thriving Moms' Space!",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Thriving Moms' Space</title>
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
            background: #5F9EA0;
            padding: 40px 20px;
            text-align: center;
            border-radius: 0 0 20px 20px;
        }
        
        .logo {
            color: white;
            font-size: 20px;
            font-weight: 700;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 15px;
        }
        
        .header-title {
            color: white;
            font-size: 18px;
            font-weight: 700;
            margin: 10px 0;
        }
        
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 18px;
            font-weight: 400;
            margin: 0;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 20px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 25px;
        }
        
        .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 25px;
            line-height: 1.7;
        }
        
        .highlight {
            color: #5F9EA0;
            font-weight: 600;
        }
        
        .welcome-box {
            background: linear-gradient(135deg, #fef6e6 0%, #fef9e7 100%);
            border: 1px solid #FFD700;
            border-radius: 16px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
        }
        
        .welcome-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .welcome-title {
            font-size: 20px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 10px;
        }
        
        .benefits {
            background-color: #f1f5f9;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .benefits-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .benefit-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
        }
        
        .benefit-icon {
            width: 20px;
            height: 20px;
            background-color: #5F9EA0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            flex-shrink: 0;
            margin-top: 2px;
        }
        
        .benefit-icon svg {
            width: 12px;
            height: 12px;
            fill: white;
        }
        
        .benefit-text {
            color: #475569;
            flex: 1;
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
        
        .social-section {
            text-align: center;
            margin: 30px 0;
        }
        
        .social-title {
            font-size: 16px;
            font-weight: 600;
            color: #475569;
            margin-bottom: 15px;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 12px;
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
            transition: all 0.3s ease;
        }
        
        .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-radius: 20px 20px 0 0;
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
        
        .unsubscribe {
            font-size: 12px;
            color: #94a3b8;
            margin-top: 20px;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            
            .header-title {
                font-size: 28px;
            }
            
            .header {
                padding: 30px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        
        <div class="content">
            <p class="greeting">Hello there!</p>
            
            <p class="message">
                Thank you for subscribing to <span class="highlight">Thriving Moms' Space</span>! We're thrilled to welcome you to our community of moms who are building fulfilling careers while embracing the joys of motherhood.
            </p>
            
            <div class="welcome-box">
                <div class="welcome-icon">🎉</div>
                <h3 class="welcome-title">You're Officially On The List!</h3>
                <p class="message" style="margin-bottom: 0;">
                    Get ready for exclusive updates, event invitations, and resources designed specifically for moms like you.
                </p>
            </div>
            
            <div class="benefits">
                <h3 class="benefits-title">What to Expect</h3>
                
                <div class="benefit-item">
                    
                    <p class="benefit-text">First access to our exclusive events and workshops</p>
                </div>
                
                <div class="benefit-item">
                   
                    <p class="benefit-text">Practical tips for balancing career and family life</p>
                </div>
                
                <div class="benefit-item">
                    
                    <p class="benefit-text">Insider resources for skill development and growth</p>
                </div>
                
                <div class="benefit-item">
                    
                    <p class="benefit-text">Inspiring stories from moms who've successfully built flexible careers</p>
                </div>
            </div>
            
            <p class="message">
                We're committed to helping you thrive as both a mother and a professional. Our content is designed to provide real value and support your unique journey.
            </p>
            
            <a href="https://thrivingmomspace.com/events" class="cta-button">
                Explore Programs
            </a>
            
            
            
            <p class="message">
                We're honored to have you in our community and can't wait to support you on your journey.
            </p>
            
            <p class="message">
                Warmly,<br>
                <strong>The Thriving Moms' Space Team</strong>
            </p>
        </div>
        
        <div class="footer">
            <p class="footer-text">Thriving Moms' Space - Balancing Motherhood and Career</p>
            <p class="footer-text">Have questions? <a href="mailto:support@thrivingmomspace.com" class="contact-link">support@thrivingmomspace.com</a></p>
            <p class="footer-text">© ${new Date().getFullYear()} Thriving Moms' Space. All rights reserved.</p>
            <p class="unsubscribe">
                <a href="https://thrivingmomspace.com/unsubscribe" style="color: #94a3b8;">Unsubscribe</a> 
                if you no longer wish to receive these emails.
            </p>
        </div>
    </div>
</body>
</html>
      `,
    });

    // notify admin
    await resend.emails.send({
      from: "Thriving Moms' Space <no-reply@updates.thrivingmomspace.com>",
      to: process.env.ADMIN_EMAIL,
      subject: "🌟 New Community Member - Thriving Moms' Space",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Subscriber Notification</title>
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
            background-color: #f0f9ff;
            border-left: 4px solid #5F9EA0;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
        }
        
        .alert-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 10px;
        }
        
        .subscriber-card {
            background-color: #f8fafc;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }
        
        .subscriber-detail {
            display: flex;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .subscriber-detail:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .detail-label {
            font-weight: 600;
            color: #475569;
            min-width: 80px;
        }
        
        .detail-value {
            color: #1e293b;
            flex: 1;
        }
        
        .stats {
            background: linear-gradient(135deg, #fef6e6 0%, #fef9e7 100%);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
        }
        
        .stats-number {
            font-size: 36px;
            font-weight: 700;
            color: #FFA500;
            margin-bottom: 5px;
        }
        
        .stats-label {
            color: #475569;
            font-size: 14px;
        }
        
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #64748b;
        }
        
        @media (max-width: 600px) {
            .subscriber-detail {
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
            <h1 class="header-title">New Community Member 🌸</h1>
        </div>
        
        <div class="content">
            <div class="alert">
                <div class="alert-title">Welcome a New Mom to Our Community!</div>
                <p>A new subscriber has joined Thriving Moms' Space and is excited to be part of our journey.</p>
            </div>
            
            <h2>Subscriber Details</h2>
            
            <div class="subscriber-card">
                <div class="subscriber-detail">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value"><a href="mailto:${email}">${email}</a></span>
                </div>
                
                <div class="subscriber-detail">
                    <span class="detail-label">Joined:</span>
                    <span class="detail-value">${new Date().toLocaleString()}</span>
                </div>
                
                <div class="subscriber-detail">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value" style="color: #10b981; font-weight: 600;">✓ Active Subscriber</span>
                </div>
            </div>
            
            <div class="stats">
                <div class="stats-number">+1</div>
                <div class="stats-label">New Community Member</div>
            </div>
            
            <p><strong>Next Steps:</strong> This subscriber will now receive our event updates, resources, and community newsletters. They've been added to our nurturing sequence.</p>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 25px;">
                <em>This is an automated notification from your Thriving Moms' Space subscription system.</em>
            </p>
        </div>
        
        <div class="footer">
            <p>Thriving Moms' Space - Community Growth System</p>
            <p>© ${new Date().getFullYear()} Thriving Moms' Space</p>
        </div>
    </div>
</body>
</html>
      `,
    });

    res.status(201).json({
      message: "Subscription successful. Confirmation email sent.",
    });
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;