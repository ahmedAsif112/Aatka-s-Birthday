import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import { prisma } from '../../../../lib/prisma';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    try {
        const { sessionId, referrer } = await req.json();
        console.log('📥 Incoming session ID:', sessionId);

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
        }

        // Retrieve the Stripe checkout session
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log('✅ Stripe session retrieved:', session.id);

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 400 });
        }

        // Extract email from metadata or customer details
        const email = session.metadata?.email || session.customer_details?.email;

        if (!email) {
            return NextResponse.json({ error: 'Email not found in session' }, { status: 400 });
        }

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });



        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: '30 Day bariatric guide Mealplan With 16 + Free Bonuses Cookbooks',
            html: `<p>Hi , hope you are well<br /><br/>  <div>
Here's your Customised Meal-Plan with 16+ free bariatric Cookbooks .
Here you can Download 
</div>: <a href="https://drive.google.com/drive/folders/1YEJ93EkD0gVELH3lyvFbCHg5yyroZy_t?usp=drive_link">Download PDF</a></p><br /><br /><div>Regards,<br/>Carnivore Diet Representative</div>`,

        });

        // Log in DB
        await prisma.emailLog.create({
            data: {
                email,
                status: 'Delivered',
                site: "bariatric",
                referrer: referrer || null, // ✅ include status here
            },
        });

        return NextResponse.json({
            success: true,
            email,
            message: 'Email sent successfully'
        });

    } catch (error: any) {
        console.error('❌ Error:', error);

        // Handle specific Stripe errors
        if (error.type === 'StripeInvalidRequestError') {
            return NextResponse.json(
                { error: 'Invalid session ID or session not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to send email', details: error.message },
            { status: 500 }
        );
    }
}
