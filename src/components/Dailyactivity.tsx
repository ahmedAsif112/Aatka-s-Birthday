"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ActivityLevel() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const router = useRouter();

    const options = [
        {
            label: "Not active",
            icon: "🛋️",
            description: "Mostly sedentary"
        },
        {
            label: "Lightly active",
            icon: "🧍",
            description: "Activities of daily living only"
        },
        {
            label: "Moderately active",
            icon: "🏃‍♂️",
            description: "Walking 1.5 to 3 miles daily"
        },
        {
            label: "Active",
            icon: "🚴",
            description: "Walking or exercising daily"
        }
    ];

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        router.push("/name");
    };

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full"
        >
            <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-white">
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                    What&apos;s your typical week like?
                </h1>

                <div className="space-y-4 dailyactivity w-[40%] pt-8">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            className={`w-full text-left px-6 py-4 rounded-xl text-[14px] font-medium transition flex flex-col gap-1 ${selectedIndex === index
                                ? "bg-[#F43F5E] text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-black"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">{option.icon}</span>
                                {option.label}
                            </span>
                            <span className={`text-sm ${selectedIndex === index ? "text-white" : "text-gray-600"
                                }`}>
                                {option.description}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}