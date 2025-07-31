'use client';
import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import collage from "../assets/collage.png"
import collagetwo from "../assets/collagetwo.png"
import Image from 'next/image';
const plans = [
    {
        id: '4w',
        title: '4-week plan with 16+ free cookbooks',
        newPrice: '$27.99',
    },
];

export default function PlanPage() {
    const [selectedPlan, setSelectedPlan] = useState('4w');
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
    const [acceptedRefundPolicy, setAcceptedRefundPolicy] = useState(false);
    const [showRefundModal, setShowRefundModal] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedGender = localStorage.getItem('gender');
        if (storedEmail) setEmail(storedEmail);
        if (storedGender === 'Male' || storedGender === 'Female') setGender(storedGender);
    }, []);

    const formatTime = () => {
        const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const secs = String(timeLeft % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const genderLabel = gender === 'Female' ? 'women' : 'men';

    const handleCheckout = async () => {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ planId: selectedPlan }),
        });

        if (!res.ok) {
            alert('Failed to create payment session');
            return;
        }

        let data;
        try {
            data = await res.json();
        } catch (err) {
            alert('Invalid server response. Please try again.');
            return;
        }

        if (data?.url) {
            window.location.href = data.url;
        } else {
            alert('Payment session creation failed.');
        }

    };

    return (
        <div className="min-h-screen bg-white pb-24">

            <div className="sticky top-0 z-50 w-full bg-pink-100 text-black text-center py-2 text-sm font-medium">
                Introductory offer expires in: <span className="font-bold">{formatTime()}</span>
            </div>

            <div className="max-w-xl mx-auto px-4 pt-8">
                <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl p-6 text-center mb-8">
                    <div className="bg-green-800 px-4 py-1 rounded-full inline-block mb-4 text-sm">
                        {email || 'Loading email...'}
                    </div>
                    <h2 className="text-xl font-semibold mb-4">Your Personalized Plan is Ready</h2>
                    <ul className="text-sm text-left space-y-2">
                        <li>✔️ Perfect for {genderLabel} over 22</li>
                        <li>✔️ For Carnivore competent</li>
                        <li>✔️ For lightly active lifestyle</li>
                        <li>✔️ No dietary restrictions</li>
                    </ul>
                </div>
                <div className="w-full bg-white py-10">
                    <Carousel autoplay autoplaySpeed={2000} dots={false} infinite>
                        <div className="flex justify-center items-center">
                            <Image src={collage} alt="collage 1" className="w-full max-w-screen-xl" />
                        </div>
                        <div className="flex justify-center items-center">
                            <Image src={collagetwo} alt="collage 2" className="w-full max-w-screen-xl" />
                        </div>

                    </Carousel>
                </div>
                <h3 className="text-lg font-bold mb-4 text-center">Get visible results in 4 weeks plan</h3>
                <div className="space-y-4">
                    {plans.map((plan) => (
                        <label
                            key={plan.id}
                            className={`flex justify-between items-center border rounded-xl p-4 cursor-pointer transition ${selectedPlan === plan.id
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-gray-50'
                                }`}
                        >
                            <div className="flex items-start gap-2">
                                <input
                                    type="radio"
                                    name="plan"
                                    checked={selectedPlan === plan.id}
                                    onChange={() => setSelectedPlan(plan.id)}
                                    className="mt-1 accent-pink-500"
                                />
                                <div>
                                    <div className="font-medium">{plan.title}</div>
                                    <div className="text-sm text-black font-semibold">{plan.newPrice}</div>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={!acceptedRefundPolicy}
                    className={`mt-10 w-full font-semibold py-3 rounded-full transition 
      ${acceptedRefundPolicy
                            ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90'
                            : 'bg-gray-300 text-white cursor-not-allowed'}
    `}
                >
                    Get my plan
                </button>
            </div>
            <div className="mt-6">
                <label className="flex items-center justify-center gap-3 cursor-pointer text-sm text-gray-700">
                    <input
                        type="checkbox"
                        className="accent-pink-500 mt-1"
                        checked={acceptedRefundPolicy}
                        onChange={() => setAcceptedRefundPolicy(!acceptedRefundPolicy)}
                    />
                    <span>
                        I agree to the&nbsp;
                        <button
                            type="button"
                            className="underline text-rose-600"
                            onClick={() => setShowRefundModal(true)}
                        >
                            Refunds Policy
                        </button>
                    </span>
                </label>
            </div>
            {showRefundModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white max-w-2xl w-[90%] p-6 rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
                            onClick={() => setShowRefundModal(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center">Refunds Policy for Digital Products</h2>
                        <p className="text-sm mb-4">
                            Due to the nature of digital products, <strong>all sales are final.</strong> Once a purchase is made,
                            you will receive instant access to the eBooks and resources.
                        </p>
                        <p className="text-sm mb-4">As such, we do not offer refunds, returns, or exchanges for any reason, including but not limited to:</p>
                        <ul className="list-disc list-inside text-sm mb-4 space-y-1">
                            <li>Accidental purchases</li>
                            <li>Compatibility issues</li>
                            <li>Personal dissatisfaction</li>
                            <li>Change of mind</li>
                        </ul>
                        <p className="text-sm mb-4">
                            We encourage you to review the product descriptions carefully before making a purchase.
                        </p>
                        <h3 className="font-semibold text-md mb-2">Need Help?</h3>
                        <p className="text-sm">
                            If you experience any issues accessing your product or have questions before purchasing, feel free to reach out to us at:
                            <br />
                            <a href="mailto:carnivorerepresentatives@gmail.com" className="text-rose-600 underline">
                                carnivorerepresentatives@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
