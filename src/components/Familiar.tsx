"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Familiar() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const router = useRouter();

    const options = [
        { label: "Consider me as a beginner", icon: "😊" },
        { label: "I have some basic knowledge", icon: "🧐" },
        { label: "I am well experienced", icon: "😎" }
    ];

    useEffect(() => {
        const storedGender = localStorage.getItem("gender");
        if (storedGender) {
            const index = options.findIndex(option => option.label === storedGender);
            if (index !== -1) setSelectedIndex(index);
        }
    }, []);

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        router.push("/whatiscarnivoure");
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
                    How familiar are you with Carnivore Diet?
                </h1>

                <div className="space-y-4 w-[40%] familiar">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            className={`w-full flex items-center justify-between px-6 py-4  rounded-xl text-[14px] font-medium transition ${selectedIndex === index
                                ? "bg-[#F43F5E] text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-xl">{option.icon}</span>
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}