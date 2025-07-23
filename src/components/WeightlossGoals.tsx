"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WeightLossGoal() {
    const [unit, setUnit] = useState("LB");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const router = useRouter();

    const goalsLB = [
        "Lose 1-20 lbs for good",
        "Lose 21-50 lbs for good",
        "Lose over 50 lbs for good",
        "Maintain weight and get fit",
        "I haven’t decided yet",
    ];

    const goalsKG = [
        "Lose 1-10 kg for good",
        "Lose 10-25 kg for good",
        "Lose over 25 kg for good",
        "Maintain weight and get fit",
        "I haven’t decided yet",
    ];

    const goals = unit === "LB" ? goalsLB : goalsKG;
    const handleSelect = () => {
        router.push("/age");
    };
    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", width: "100%" }}
        >
            <div className="min-h-screen flex flex-col items-center justify-start px-6 py-10 bg-white">
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
                    What is your weight loss goal?
                </h1>

                {/* Unit Toggle */}
                <div className="flex items-center space-x-4 mb-10">
                    <button
                        onClick={() => setUnit("LB")}
                        className={`px-6 py-2 rounded-full text-[14px] font-medium transition shadow-md ${unit === "LB"
                            ? "bg-[#F43F5E] text-white"
                            : "text-black bg-gray-200"
                            }`}
                    >
                        LB
                    </button>
                    <button
                        onClick={() => setUnit("KG")}
                        className={`px-6 py-2 rounded-full text-[14px] font-medium transition shadow-md ${unit === "KG"
                            ? "bg-[#F43F5E] text-white"
                            : "text-black bg-gray-200"
                            }`}
                    >
                        KG
                    </button>
                </div>

                {/* Goal Options */}
                <div className="space-y-4 w-[40%] weight-loss-container">
                    {goals.map((goal, index) => (
                        <button

                            key={index}
                            onClick={() => {
                                setSelectedIndex(index);
                                handleSelect();
                            }}
                            className={`w-full text-left px-6 py-4 rounded-xl text-[14px] font-medium transition ${selectedIndex === index
                                ? "bg-[#F43F5E] text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {goal}
                        </button>
                    ))}

                </div>
            </div>
        </motion.div>
    );
}