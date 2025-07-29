import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
    try {
        const { email, name } = await req.json();
        console.log('📥 Incoming email:', email, name);

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }
        

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
    site:"bariatric" // ✅ include status here
  },
});

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('❌ Email send error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
