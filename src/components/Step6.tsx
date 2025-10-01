"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GoalSetScreenFunnel = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const handleSelect = () => {
        router.push("/step7");
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-cyan-200/40 to-teal-200/40 rounded-full opacity-40 blur-lg animate-bounce" />
            </div>

            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10"
            >
                <div className={`w-full max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Header with animated icon */}
                    <div className="text-center mb-8">
                        <motion.div
                            className="w-20 h-20 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl"
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="text-3xl">🎯</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            YOU DID IT!
                        </motion.h1>

                        <motion.h2
                            className="text-2xl md:text-3xl font-bold text-teal-600 mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            DON'T STOP NOW!
                        </motion.h2>
                    </div>

                    {/* Main Content Card */}
                    <motion.div
                        className="bg-white/95 backdrop-blur-sm border border-teal-200/50 shadow-xl rounded-2xl p-8 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <motion.div
                            className="text-center mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                ✨ INCREDIBLE! You're taking control of your post-bariatric journey!
                            </h3>

                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                You just invested valuable time creating something life-changing -
                                <span className="font-semibold text-teal-600"> your personalized bariatric nutrition roadmap.</span>
                            </p>

                            <p className="text-base text-gray-600 mb-4 leading-relaxed">
                                Most people never make it this far. But you did. That proves you're serious about making your bariatric surgery work for you long-term.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 mb-6 border border-teal-200"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                                🏥 Your 100% PERSONALIZED Bariatric Meal Plan is Ready!
                            </h4>

                            <p className="text-gray-700 mb-4 font-medium">
                                This isn't some generic plan - it's scientifically tailored to YOUR specific post-surgery needs:
                            </p>

                            <div className="space-y-2">
                                <motion.div
                                    className="flex items-center text-gray-700"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2, duration: 0.4 }}
                                >
                                    <span className="text-teal-500 mr-2 text-xl">✓</span>
                                    <span className="font-medium">Your nutritional requirements based on your weight & goals</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center text-gray-700"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.4, duration: 0.4 }}
                                >
                                    <span className="text-teal-500 mr-2 text-xl">✓</span>
                                    <span className="font-medium">Your eating preferences & lifestyle habits</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center text-gray-700"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.6, duration: 0.4 }}
                                >
                                    <span className="text-teal-500 mr-2 text-xl">✓</span>
                                    <span className="font-medium">Your unique body composition & metabolism</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center text-gray-700"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.8, duration: 0.4 }}
                                >
                                    <span className="text-teal-500 mr-2 text-xl">✓</span>
                                    <span className="font-medium">Optimized for post-bariatric success</span>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2, duration: 0.6 }}
                        >
                            <p className="text-gray-800 font-semibold mb-2">
                                ⚠️ Here's the truth most won't tell you:
                            </p>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Studies show that <span className="font-bold">30% of bariatric patients regain significant weight</span> within 2 years because they lack proper nutritional guidance. Your personalized plan addresses exactly what you need to be in the successful 70%.
                            </p>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.2, duration: 0.6 }}
                        >
                            <p className="text-lg font-semibold text-gray-800 mb-2">
                                ⏰ You're literally 20 seconds from accessing your success roadmap...
                            </p>

                            <p className="text-gray-700 font-medium">
                                Your surgery gave you the tool. This plan gives you the <span className="font-bold text-teal-600">strategy</span> to make it work for life.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Motivational Message */}
                    <motion.div
                        className="bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm border border-teal-400/30 shadow-xl rounded-2xl px-6 py-4 flex gap-3 items-start mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.4, duration: 0.6 }}
                    >
                        <motion.span
                            className="text-white text-xl flex-shrink-0"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            💪
                        </motion.span>
                        <p className="text-white font-light leading-relaxed">
                            <span className="font-semibold">The difference between bariatric success and regain?</span> Having a clear, personalized nutrition plan you can actually follow. You've invested in surgery - now invest 20 more seconds to get the nutrition plan that ensures it works.
                        </p>
                    </motion.div>

                    {/* Continue Button */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.6, duration: 0.6 }}
                    >
                        <motion.button
                            onClick={handleSelect}
                            className="px-12 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 uppercase tracking-wide"
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get My Personalized Plan →
                        </motion.button>

                        <motion.div
                            className="mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.8, duration: 0.8 }}
                        >
                            <p className="text-teal-600 text-sm font-light">
                                🔒 100% secure • Evidence-based nutrition
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Final urgency note */}
                    <motion.div
                        className="text-center mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 0.8 }}
                    >
                        <p className="text-gray-600 text-sm italic">
                            Don't let this moment pass. Your future self will thank you for clicking continue.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default GoalSetScreenFunnel;