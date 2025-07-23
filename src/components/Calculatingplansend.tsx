'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const progressItems = [
    { label: 'Demographic Profile' },
    { label: 'Health and Medical Conditions' },
    { label: 'Calculating Nutrition Needs' },
    { label: 'Activity and Habits' }
];

const testimonials = [
    '"This app made it easy to track my goals!"',
    '"Fantastic guidance with macros, super helpful."',
    '"I finally understood my nutrition needs. Great service!"'
];

export default function Home() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    useEffect(() => {
        const startTime = Date.now();

        const interval: NodeJS.Timeout = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const percentage = Math.min((elapsed / 4000) * 100, 100);
            setProgress(percentage);

            if (percentage >= 100) {
                clearInterval(interval);
                if (currentIndex < progressItems.length - 1) {
                    setTimeout(() => {
                        setCurrentIndex((prev) => prev + 1);
                        setProgress(0);
                    }, 100);
                } else {
                    setTimeout(() => router.push('/reward'), 500);
                }
            }
        }, 33);

        return () => clearInterval(interval);
    }, [currentIndex]);

    useEffect(() => {
        const testimonialInterval = setInterval(() => {
            setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        }, 2000);
        return () => clearInterval(testimonialInterval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-black">
            <h1 className="text-2xl font-semibold mb-10 text-center">Preparing your customized program</h1>
            <div className="space-y-5 w-full max-w-xl">
                {progressItems.map((item, idx) => (
                    <div key={item.label}>
                        <div className={`text-sm font-medium ${idx === currentIndex ? 'font-bold' : ''}`}>{item.label}</div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-200 ease-linear ${idx < currentIndex || (idx === currentIndex && progress >= 100) ? 'bg-green-500 w-full' : idx === currentIndex ? 'bg-rose-500' : ''}`}
                                style={{ width: idx === currentIndex ? `${Math.min(progress, 100)}%` : idx < currentIndex ? '100%' : '0%' }}
                            />
                        </div>
                        <div className="text-right text-xs mt-1">{idx < currentIndex ? '100%' : idx === currentIndex ? `${Math.min(progress, 100).toFixed(0)}%` : '0%'}</div>
                    </div>
                ))}
            </div>
            <div className="mt-12 text-center">
                <p className="font-medium text-sm text-gray-500">Trusted by over 185,224 customers</p>
                <div className="bg-white shadow-md p-4 mt-4 rounded-xl w-80 text-sm italic transition-all duration-500">
                    ⭐⭐⭐⭐⭐
                    <p className="mt-2">{testimonials[testimonialIndex]}</p>
                </div>
            </div>
        </div>
    );
}
