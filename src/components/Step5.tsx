"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from 'antd';
import { CheckCircle, Circle } from "lucide-react";
import { useRouter } from "next/navigation";

const questions = [
    {
        id: 1,
        icon: "😴",
        title: "How would you rate the quality of your sleep?",
        subtitle: " ",
        options: [
            { id: "a", text: "I have trouble falling asleep", icon: "🌙" },
            { id: "b", text: "It varies", icon: "🔄" },
            { id: "c", text: "I sleep well most nights", icon: "💤" }
        ]
    },
    {
        id: 2,
        icon: "🍽️",
        title: "How would you describe your eating habits?",
        subtitle: " ",
        options: [
            { id: "a", text: "I like to experiment with different foods", icon: "🧪" },
            { id: "b", text: "I rotate between familiar foods", icon: "🔄" },
            { id: "c", text: "I eat similar foods, with some variation", icon: "🍲" },
            { id: "d", text: "I eat the same food every day", icon: "📅" }
        ]
    },
    {
        id: 3,
        icon: "👨‍🍳",
        title: "How would you describe your cooking skills?",
        subtitle: " ",
        options: [
            { id: "a", text: "I don't know how to cook at all", icon: "❌" },
            { id: "b", text: "I'm learning to be a better cook", icon: "📖" },
            { id: "c", text: "I'm an expert cook", icon: "⭐" }
        ]
    }
];

export default function BariatricMCQPage() {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isVisible, setIsVisible] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleOptionSelect = (questionId: number, optionId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const getCompletionPercentage = () => {
        const answeredCount = Object.keys(answers).length;
        return (answeredCount / questions.length) * 100;
    };

    const isAllQuestionsAnswered = () => {
        return Object.keys(answers).length === questions.length;
    };

    const handleSubmit = () => {
        if (isAllQuestionsAnswered()) {
            setShowResults(true);
            router.push("/step6");
        }
    };

    if (showResults) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 relative overflow-hidden">
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute opacity-10 animate-bounce"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }}
                        >
                            🏥
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
                className="relative z-10 min-h-screen py-4 sm:py-8 px-3 sm:px-4"
            >
                <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-center mb-6 sm:mb-8"
                    >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-xl animate-pulse">
                            <span className="text-xl sm:text-2xl">📝</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-2 sm:mb-3 px-2">
                            Bariatric Lifestyle Assessment
                        </h1>
                        <p className="text-teal-600 font-light text-sm sm:text-base px-2">
                            Help us create your personalized bariatric journey
                        </p>
                    </motion.div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6 sm:mb-8 mx-2 sm:mx-0"
                    >
                        <div className="flex justify-between items-center text-teal-600 text-xs sm:text-sm mb-2 sm:mb-3">
                            <span>{Object.keys(answers).length} of {questions.length} questions answered</span>
                            <span>{Math.round(getCompletionPercentage())}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200/50 rounded-full h-1.5 sm:h-2 overflow-hidden shadow-inner">
                            <motion.div
                                className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg"
                                initial={{ width: 0 }}
                                animate={{ width: `${getCompletionPercentage()}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                    </motion.div>

                    {/* Questions Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 mx-2 sm:mx-0">
                        {questions.map((question, questionIdx) => (
                            <motion.div
                                key={question.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (questionIdx * 0.1), duration: 0.6 }}
                                className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-teal-200/50"
                            >
                                {/* Question Header */}
                                <div className="text-center mb-4 sm:mb-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center shadow-lg">
                                        <span className="text-lg sm:text-xl">{question.icon}</span>
                                    </div>
                                    <h3 className="text-sm sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2 leading-tight px-1">
                                        {question.title}
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm font-light">
                                        {question.subtitle}
                                    </p>
                                </div>

                                {/* Options */}
                                <div className="space-y-2 sm:space-y-3">
                                    {question.options.map((option, optionIdx) => (
                                        <motion.div
                                            key={`${question.id}-${option.id}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.4 + (questionIdx * 0.1) + (optionIdx * 0.05),
                                                duration: 0.4
                                            }}
                                            className={`
                        relative rounded-lg p-2.5 sm:p-3 cursor-pointer transition-all duration-300 border-2
                        ${answers[question.id] === option.id
                                                    ? 'border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50 shadow-md transform scale-[1.02]'
                                                    : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50 hover:transform hover:scale-[1.01]'
                                                }
                      `}
                                            onClick={() => handleOptionSelect(question.id, option.id)}
                                            whileHover={{ y: -1 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center space-x-2 sm:space-x-3">
                                                <div className="flex-shrink-0">
                                                    {answers[question.id] === option.id ? (
                                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
                                                    ) : (
                                                        <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-1.5 sm:space-x-2 flex-1 min-w-0">
                                                    <span className="text-sm sm:text-lg flex-shrink-0">{option.icon}</span>
                                                    <span className="text-gray-800 font-medium text-xs sm:text-sm break-words leading-tight">{option.text}</span>
                                                </div>
                                                {answers[question.id] === option.id && (
                                                    <motion.div
                                                        initial={{ scale: 0, rotate: -180 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        className="flex-shrink-0"
                                                    >
                                                        <span className="text-sm sm:text-lg">✨</span>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Question Progress Indicator */}
                                <div className="mt-3 sm:mt-4 text-center">
                                    <div className={`inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium ${answers[question.id]
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {answers[question.id] ? (
                                            <>
                                                <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                                <span>Answered</span>
                                            </>
                                        ) : (
                                            <>
                                                <Circle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                                <span className="hidden sm:inline">Select an option</span>
                                                <span className="sm:hidden">Select option</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="text-center px-2 sm:px-0"
                    >
                        <Button
                            onClick={handleSubmit}
                            disabled={!isAllQuestionsAnswered()}
                            size="large"
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 border-0 text-white rounded-full px-6 sm:px-12 h-12 sm:h-14 text-sm sm:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto max-w-sm"
                        >
                            {isAllQuestionsAnswered() ? 'Complete Assessment →' :
                                <span className="text-center">
                                    <span className="block sm:inline">Answer {questions.length - Object.keys(answers).length} more</span>
                                    <span className="block sm:inline sm:ml-1">questions</span>
                                </span>}
                        </Button>

                        <div className="mt-3 sm:mt-4">
                            <p className="text-teal-600 text-xs sm:text-sm font-light px-2">
                                🎯 Complete all questions to unlock your personalized bariatric plan
                            </p>
                        </div>
                    </motion.div>

                    {/* Motivational Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="text-center mt-6 sm:mt-8 mx-2 sm:mx-0"
                    >
                        <div className="bg-gradient-to-r from-teal-50/50 to-cyan-50/50 p-3 sm:p-4 rounded-xl border border-teal-500/20">
                            <p className="text-gray-700 text-xs sm:text-sm font-light">
                                🏥 Your answers help us create the perfect bariatric lifestyle plan for you
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}