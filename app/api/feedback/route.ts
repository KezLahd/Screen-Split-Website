import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const EMAIL_PASSWORD = process.env.EMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kezzajacko787@gmail.com',
    pass: EMAIL_PASSWORD
  }
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, rating, improvements, features } = body;

    if (!email || !rating || (!improvements && !features)) {
      return NextResponse.json(
        { error: 'All required fields must be filled out' },
        { status: 400 }
      );
    }

    // Create GitHub issue without email for privacy
    const isPositiveReview = rating === 'Excellent' || rating === 'Good';
    const issueTitle = isPositiveReview 
      ? `${rating} Review` 
      : `${rating} Review - Needs Attention`;

    const issueBody = isPositiveReview
      ? `### Feature Request\n${features}`
      : `### Improvement Needed\n${improvements}`;

    const githubResponse = await fetch('https://api.github.com/repos/KezLahd/Screen-Split/issues', {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: [isPositiveReview ? 'enhancement' : 'bug']
      })
    });

    if (!githubResponse.ok) {
      throw new Error('Failed to create GitHub issue');
    }

    // Send email notification with the user's email included
    await transporter.sendMail({
      from: 'kezzajacko787@gmail.com',
      to: 'kezzajacko787@gmail.com',
      subject: `New Screen Split Feedback: ${rating} Rating`,
      text: `
Rating: ${rating}
Email: ${email}
${improvements ? `Improvements Needed: ${improvements}` : ''}
${features ? `Feature Requests: ${features}` : ''}
      `,
      html: `
<h2>New Screen Split Feedback</h2>
<p><strong>Rating:</strong> ${rating}</p>
<p><strong>Email:</strong> ${email}</p>
${improvements ? `<p><strong>Improvements Needed:</strong><br>${improvements}</p>` : ''}
${features ? `<p><strong>Feature Requests:</strong><br>${features}</p>` : ''}
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
} 