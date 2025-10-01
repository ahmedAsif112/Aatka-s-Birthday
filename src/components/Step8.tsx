'use client';
import { Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { Heart, Crown, Timer, CheckCircle, Star, Target, Gift } from 'lucide-react';
import collage from "../assets/collage.png"
import collagetwo from "../assets/collagetwo.png"
import Image from 'next/image';

const plans = [
    {
        id: '4w',
        title: '4-week plan with 6+ free nutrition guides',
        newPrice: '$27.99',
    },
];

export default function PlanPage() {
    const [selectedPlan, setSelectedPlan] = useState('4w');
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
    const handlePaypalCheckout = async () => {
        const res = await fetch("/api/paypal", { method: "POST" });

        if (!res.ok) {
            alert("Failed to create PayPal order");
            return;
        }

        const data = await res.json();
        if (data?.url) {
            window.location.href = data.url;
        } else {
            alert("PayPal order creation failed");
        }
    };
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

    const genderLabel = gender === 'Female' ? 'women' : 'men / women';

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
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-40 left-4 sm:left-10 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full opacity-40 blur-lg animate-bounce" />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-full opacity-30 blur-md animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Timer Bar */}
            <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 text-white text-center py-2 sm:py-3 border-b border-teal-600/50 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-1 sm:space-x-2 px-2">
                    <Timer className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-300 animate-pulse" />
                    <span className="text-xs sm:text-sm font-medium">Introductory offer expires in:</span>
                    <span className="font-bold text-cyan-200 bg-black/30 px-2 sm:px-3 py-1 rounded-full text-sm sm:text-lg animate-pulse">
                        {formatTime()}
                    </span>
                </div>
            </div>

            <div className="relative z-10 max-w-xl mx-auto px-3 sm:px-4 pt-4 sm:pt-8 pb-20 sm:pb-24">
                {/* Header Card */}
                <div className="bg-gradient-to-br from-white/90 to-teal-50/80 border border-teal-200/50 backdrop-blur-sm text-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center mb-6 sm:mb-8 shadow-2xl">
                    <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
                        <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                        <div className="bg-gradient-to-r from-teal-100 to-cyan-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm border border-teal-300/50">
                            {email || 'Loading email...'}
                        </div>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        Your Personalized Bariatric Plan is Ready
                    </h2>

                    <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center text-xs sm:text-sm text-gray-700">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                            <span>Perfect for {genderLabel} over 22</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-700">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                            <span>For post-bariatric nutrition</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-700">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                            <span>For lightly active lifestyle</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-700">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                            <span>Optimized protein intake</span>
                        </div>
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="w-full bg-gradient-to-br from-white/80 to-teal-50/60 border border-teal-200/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-6 sm:mb-8 shadow-xl">
                    <Carousel autoplay autoplaySpeed={2000} dots={false} infinite>
                        <div className="flex justify-center items-center">
                            <div className="relative">
                                <Image
                                    src={collage}
                                    alt="Healthy bariatric meals"
                                    className="w-full max-w-screen-xl rounded-lg sm:rounded-xl shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/10 to-transparent rounded-lg sm:rounded-xl" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="relative">
                                <Image
                                    src={collagetwo}
                                    alt="Bariatric recipe collection"
                                    className="w-full max-w-screen-xl rounded-lg sm:rounded-xl shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/10 to-transparent rounded-lg sm:rounded-xl" />
                            </div>
                        </div>
                    </Carousel>
                </div>

                {/* Plan Selection */}
                <div className="text-center mb-6 sm:mb-10">
                    <div className="flex items-center justify-center space-x-2 mb-3 flex-wrap">
                        <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 animate-bounce" />
                        <h2 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-500 drop-shadow-lg animate-pulse">
                            Special Checkout Offer
                        </h2>
                        <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 animate-bounce" />
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        Get your <span className="font-semibold text-gray-900">4-Week Customized Bariatric Meal Plan {" "}</span>
                        for just <span className="font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-500 animate-pulse">$27.99</span>
                        (<span className="line-through text-gray-500">$197</span>) — an insane
                        <span className="text-green-600 font-bold animate-pulse"> 85.8% OFF!</span>
                    </p>
                </div>

                <div className="relative border border-teal-300/60 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white/90 via-teal-50/70 to-cyan-50/60 shadow-2xl backdrop-blur-md space-y-6 overflow-hidden">
                    {/* glowing border animation */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-teal-500/10 blur-2xl animate-pulse"></div>

                    <ul className="space-y-4 relative z-10">
                        <li className="flex items-start space-x-3">
                            <div className="relative">
                                <CheckCircle className="w-6 h-6 text-green-500 animate-ping absolute opacity-75" />
                                <CheckCircle className="w-6 h-6 text-green-500 relative" />
                            </div>
                            <span className="text-gray-700 text-sm sm:text-base leading-snug">
                                <span className="font-bold text-gray-900">Only $27.99</span> for your 4-week customized meal plan
                            </span>
                        </li>

                        <li className="flex items-start space-x-3">
                            <div className="relative">
                                <Gift className="w-6 h-6 text-teal-600 animate-spin-slow" />
                            </div>
                            <span className="text-gray-700 text-sm sm:text-base leading-snug">
                                After purchase, you'll unlock <span className="font-bold text-gray-900 animate-pulse">6+ Premium Bariatric Nutrition Guides</span> — <span className="text-teal-600 font-extrabold">FREE Bonus!</span>
                            </span>
                        </li>
                    </ul>

                    <div className="text-center mt-4 relative z-10">
                        <p className="text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-500 animate-pulse">
                            🏥 Don't miss out — optimize your post-bariatric success!
                        </p>
                    </div>
                </div>


                {/* Checkout Button */}
                <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r mt-5 from-teal-600 via-teal-500 to-cyan-500 hover:from-teal-700 hover:via-teal-600 hover:to-cyan-600 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl animate-pulse"
                >
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-base sm:text-lg">Get my personalized bariatric plan<div>(Pay with card)</div></span>
                    </div>
                </button>
                <button
                    onClick={handlePaypalCheckout}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-[#FFC439] hover:bg-[#F7B500] text-black font-semibold py-3 rounded-lg transition"
                >
                    <img
                        src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                        alt="PayPal"
                        className="h-5"
                    />
                    <span>Pay with PayPal</span>
                </button>
                {/* Trust Indicators */}
                <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-gray-600 text-xs sm:text-sm">
                        🔒 100% secure checkout
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(-25%);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(0);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .animate-bounce {
                    animation: bounce 1s infinite;
                }

                /* Custom radio button styling */
                input[type="radio"] {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    border: 2px solid #14b8a6;
                    border-radius: 50%;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                
                input[type="radio"]:checked {
                    background-color: #14b8a6;
                    border-color: #14b8a6;
                }
                
                input[type="radio"]:checked::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: white;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                
                @media (min-width: 640px) {
                    input[type="radio"]:checked::before {
                        width: 8px;
                        height: 8px;
                    }
                }
            `}</style>
        </div>
    );
}