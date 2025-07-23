'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const getRandomDiscount = () => Math.floor(Math.random() * 21) + 30; // 30% - 50%

export default function SurpriseDiscount() {
    const router = useRouter();
    const [revealed, setRevealed] = useState(false);
    const [discount] = useState(getRandomDiscount);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
            <h1 className="text-2xl font-bold text-center mb-2">Tap and save on your weight loss!</h1>
            <p className="text-gray-600 mb-8 text-sm text-center">
                Positivity is the key to making progress! Get your gift from us 🎉
            </p>

            {!revealed ? (
                <button
                    onClick={() => setRevealed(true)}
                    className="bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 p-16 rounded-xl text-xl font-bold shadow-lg relative"
                >
                    <p className='text-[80px]'>🎁</p><br />
                    <div className='pt-11'>
                        <span className="text-[20px] font-medium mt-6">Click to reveal</span>
                    </div>
                </button>
            ) : (
                <div className="bg-purple-600 text-white rounded-xl w-[300px] h-[300px] flex flex-col items-center justify-center shadow-lg transition-all duration-500">
                    <p className="text-5xl font-bold">{discount}%</p>
                    <p className="mt-2 text-lg font-medium">Off your subscription</p>
                </div>
            )}

            {revealed && (
                <button
                    onClick={() => router.push('/checkout')}
                    className="mt-10 px-6 py-3 bg-rose-500 text-white font-semibold rounded-full shadow hover:bg-pink-600 transition"
                >
                    Get your reward
                </button>
            )}
        </div>
    );
}