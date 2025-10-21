const express = require("express");
const Assessment = require("../models/Assessment");
const { Resend } = require("resend");

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// @POST /api/assessment
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Save to DB
    const assessment = new Assessment(data);
    await assessment.save();

    // Send confirmation email to user
    await resend.emails.send({
      from: "Thriving Moms' Space <no-reply@updates.thrivingmomspace.com>",
      to: data.email,
      subject: "Your Career Assessment Has Been Received!",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Career Assessment Confirmation</title>
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
                padding: 25px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
       
        
        <div class="content">
            <p class="greeting">Hi ${data.name},</p>
            
            <p class="message">Thank you for completing your career assessment with <span class="highlight">Thriving Moms' Space</span>. We're excited to help you create a fulfilling career that works with your family life.</p>
            
            <p class="message">Our team is currently reviewing your assessment, and one of our advisors will contact you within <span class="highlight">24 hours</span> to discuss your personalized program recommendations.</p>
            
            <div class="next-steps">
                <h3 class="next-steps-title">What happens next?</h3>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <p class="step-text">Our team reviews your assessment responses</p>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <p class="step-text">We match you with the perfect program based on your goals</p>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <p class="step-text">An advisor contacts you to discuss your personalized plan</p>
                </div>
                
                <div class="step">
                    <div class="step-number">4</div>
                    <p class="step-text">You begin your journey to a flexible, fulfilling career</p>
                </div>
            </div>
            
            <p class="message">In the meantime, feel free to explore our programs and community resources.</p>
            
            <a href="https://thrivingmomspace.com/programs" class="cta-button">Explore Our Programs</a>
            
            <p class="message">We're honored to be part of your journey and can't wait to help you thrive as both a mom and a professional.</p>
            
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

    // Notify admin
    await resend.emails.send({
      from: "Thriving Moms' Space <no-reply@updates.thrivingmomspace.com>",
      to: process.env.ADMIN_EMAIL,
      subject: "New Assessment Submission - Thriving Moms' Space",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Assessment Submission</title>
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
        
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .details-table th {
            text-align: left;
            padding: 12px 15px;
            background-color: #f1f5f9;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .details-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .highlight {
            color: #5F9EA0;
            font-weight: 600;
        }
        
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="header-title">New Assessment Submission</h1>
        </div>
        
        <div class="content">
            <div class="alert">
                <strong>Action Required:</strong> A new career assessment has been submitted and requires review.
            </div>
            
            <h2>Assessment Details</h2>
            
            <table class="details-table">
                <tr>
                    <th>Field</th>
                    <th>Response</th>
                </tr>
                <tr>
                    <td><strong>Name</strong></td>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td><strong>Email</strong></td>
                    <td>${data.email}</td>
                </tr>
                <tr>
                    <td><strong>Phone</strong></td>
                    <td>${data.phone || 'Not provided'}</td>
                </tr>
                <tr>
                    <td><strong>Current Stage</strong></td>
                    <td>${data.stage ? data.stage.charAt(0).toUpperCase() + data.stage.slice(1) : 'Not provided'}</td>
                </tr>
                <tr>
                    <td><strong>Time Availability</strong></td>
                    <td>${data.timeAvailability || 'Not provided'}</td>
                </tr>
                <tr>
                    <td><strong>Goals</strong></td>
                    <td>${data.goals || 'Not provided'}</td>
                </tr>
                <tr>
                    <td><strong>Challenges</strong></td>
                    <td>${data.challenges || 'Not provided'}</td>
                </tr>
                <tr>
                    <td><strong>Skills</strong></td>
                    <td>${data.skills && data.skills.length > 0 ? data.skills.join(', ') : 'Not provided'}</td>
                </tr>
                <tr>
                    <td><strong>Interests</strong></td>
                    <td>${data.interests && data.interests.length > 0 ? data.interests.join(', ') : 'Not provided'}</td>
                </tr>
                <tr>
                    <td><strong>Submitted At</strong></td>
                    <td>${new Date().toLocaleString()}</td>
                </tr>
            </table>
            
            <p><span class="highlight">Next Step:</span> Please contact this potential client within 24 hours to discuss program recommendations.</p>
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

    res.status(201).json({ message: "Assessment submitted successfully" });
  } catch (error) {
    console.error("Assessment submission error:", error);
    res.status(500).json({ error: "Failed to submit assessment" });
  }
});

module.exports = router;