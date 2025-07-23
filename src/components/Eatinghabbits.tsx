"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Eatinghabbits() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const router = useRouter();

    const options = [
        { label: "I eat the same food every day" },
        { label: "I eat similar foods, with some variation" },
        { label: "I rotate between familiar foods" },
        { label: "I like to experiment with different foods" }
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
        router.push("/cookingskills");
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
                    How would you describe your eating habits?
                </h1>

                <div className="pt-8 space-y-4 eatinghabbits w-[40%]">
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
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}