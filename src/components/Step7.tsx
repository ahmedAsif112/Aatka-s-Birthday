'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const progressItems = [
    { label: 'Bariatric Profile Assessment', emoji: '🏥' },
    { label: 'Nutritional Requirements Analysis', emoji: '💪' },
    { label: 'Calculating Protein & Vitamin Needs', emoji: '🔬' },
    { label: 'Lifestyle & Dietary Preferences', emoji: '🍽️' }
];

const testimonials = [
    '"This meal planner helped me stay on track after surgery - down 30 lbs!"',
    '"Finally understand my nutritional needs post-bariatric. Life-changing!"',
    '"The personalized approach took the guesswork out of eating right!"'
];

export default function Calculating() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

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
                    setTimeout(() => router.push('/step8'), 500);
                }
            }
        }, 33);

        return () => clearInterval(interval);
    }, [currentIndex]);

    useEffect(() => {
        const testimonialInterval = setInterval(() => {
            setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        }, 2500);

        return () => clearInterval(testimonialInterval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-cyan-200/40 to-teal-200/40 rounded-full opacity-40 blur-lg animate-bounce" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-6 py-6 sm:py-10">
                <div className={`w-full max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-xl animate-pulse">
                            <span className="text-2xl sm:text-3xl">🏥</span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-wide px-2">
                            Crafting Your Perfect
                            <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                Bariatric Journey
                            </span>
                        </h1>
                        <p className="text-teal-600 font-light text-base sm:text-lg px-4">
                            Personalizing your post-surgery nutrition plan
                        </p>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-white/95 backdrop-blur-sm border border-teal-200/50 shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 mx-2 sm:mx-0">
                        <div className="space-y-4 sm:space-y-6">
                            {progressItems.map((item, idx) => (
                                <div
                                    key={item.label}
                                    className={`transition-all duration-500 ${idx <= currentIndex ? 'opacity-100' : 'opacity-60'}`}
                                >
                                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                        <span className="text-xl sm:text-2xl flex-shrink-0">{item.emoji}</span>
                                        <div className={`text-sm sm:text-lg font-medium transition-all duration-300 ${idx === currentIndex
                                            ? 'font-bold text-teal-600 scale-105'
                                            : idx < currentIndex
                                                ? 'text-green-600'
                                                : 'text-gray-600'
                                            }`}>
                                            {item.label}
                                        </div>
                                        {idx < currentIndex && (
                                            <span className="text-green-500 text-lg sm:text-xl animate-bounce flex-shrink-0">✓</span>
                                        )}
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner">
                                        <div
                                            className={`h-2 sm:h-3 rounded-full transition-all duration-300 ease-out ${idx < currentIndex || (idx === currentIndex && progress >= 100)
                                                ? 'bg-gradient-to-r from-green-400 to-green-500 w-full shadow-lg'
                                                : idx === currentIndex
                                                    ? 'bg-gradient-to-r from-teal-400 to-cyan-500 shadow-lg'
                                                    : 'w-0'
                                                }`}
                                            style={{
                                                width: idx === currentIndex ? `${Math.min(progress, 100)}%`
                                                    : idx < currentIndex ? '100%' : '0%'
                                            }}
                                        />
                                    </div>

                                    <div className="text-right text-xs sm:text-sm mt-1 sm:mt-2 font-medium">
                                        <span className={`${idx < currentIndex
                                            ? 'text-green-600'
                                            : idx === currentIndex
                                                ? 'text-teal-600'
                                                : 'text-gray-400'
                                            }`}>
                                            {idx < currentIndex
                                                ? '100%'
                                                : idx === currentIndex
                                                    ? `${Math.min(progress, 100).toFixed(0)}%`
                                                    : '0%'
                                            }
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial Section */}
                    <div className="text-center px-2 sm:px-0">
                        <div className="mb-4 sm:mb-6">
                            <p className="text-teal-700 font-medium text-sm sm:text-lg mb-2 px-2">
                                Trusted by over 50,000+ bariatric patients
                            </p>
                            <div className="flex justify-center gap-1 mb-3 sm:mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-lg sm:text-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                                        ⭐
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm border border-teal-400/30 shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-sm sm:max-w-md mx-auto transition-all duration-500 hover:scale-105">
                            <div className="text-white text-base sm:text-lg italic font-light leading-relaxed">
                                {testimonials[testimonialIndex]}
                            </div>
                            <div className="mt-3 sm:mt-4 text-cyan-100 text-xs sm:text-sm">
                                — Verified Bariatric Patient
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-8 flex justify-center gap-2">
                            {testimonials.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === testimonialIndex
                                        ? 'bg-teal-500 w-6 sm:w-8'
                                        : 'bg-teal-600/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Loading Message */}
                    <div className="mt-6 sm:mt-8 text-center px-2">
                        <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/60 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-teal-200">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-teal-500 rounded-full animate-ping"></div>
                            <span className="text-teal-700 font-light text-sm sm:text-base">
                                Analyzing your bariatric nutrition needs...
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}