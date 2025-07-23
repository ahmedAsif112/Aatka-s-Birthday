'use client';

import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';

export default function SuccessPage() {
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(true);
    const hasSent = useRef(false); // ✅ flag to prevent double send

    useEffect(() => {
        const email = localStorage.getItem('userEmail');

        if (!email || hasSent.current) return;

        hasSent.current = true; // ✅ mark as sent once

        fetch('/api/sendemail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('✅ Email sent:', data);
                setEmailSent(true);
                setLoading(false);
            })
            .catch((err) => {
                console.error('❌ Email send failed:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {loading ? (
                <div className="flex flex-col items-center gap-4">
                    <Spin size="large" tip="Sending your PDF..." />
                </div>
            ) : emailSent ? (
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">THANK YOU!</h1>
                    <div className="text-6xl text-green-500 mb-6">✓</div>

                    <p className="text-lg text-gray-700 mb-4">
                        Your <strong>30 Day Carnivore Diet Mealplan With 6 + Free Bonuses Cookbooks</strong> is on its way to your email.
                    </p>

                    <p className="text-lg text-gray-700 mb-2">
                        But you can also download it directly from the link below:
                    </p>

                    <a
                        href="https://drive.google.com/drive/folders/1qZuHN_ZwpYtGDvVnu8--xKddsKK_Ojb_?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 underline text-lg font-medium mb-6"
                    >
                        Click here to access your download instantly
                    </a>

                    <p className="text-gray-600 text-sm">
                        We’ve also sent this link to your email for easy access later.
                    </p>
                </div>
            ) : (
                <div className="text-red-600 text-2xl font-bold text-center">
                    ❌ Failed to send email. Please contact support.
                </div>
            )}
        </div>
    );
}
