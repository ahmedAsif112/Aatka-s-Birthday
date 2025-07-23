"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CWeight() {
    const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');
    const [cWeight, setcWeight] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedWeight = localStorage.getItem("cWeight");
            if (storedWeight) {
                try {
                    const { value, unit } = JSON.parse(storedWeight);
                    if (value) setcWeight(String(value));
                    if (unit === 'lbs' || unit === 'kg') setUnit(unit);
                } catch {
                    // ignore corrupted data
                }
            }
        }
    }, []);

    const handleSelect = () => {
        router.push("/bmi");
    };

    const handleContinue = () => {
        const numericWeight = Number(cWeight);
        if (!isNaN(numericWeight) && numericWeight > 0) {
            if (typeof window !== "undefined") {
                localStorage.setItem("cWeight", JSON.stringify({ value: numericWeight, unit }));
            }
        }
    };

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", width: "100%" }}
        >
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
                <h1 className="text-2xl font-semibold text-black mb-6">What is your current weight?</h1>

                <div className="flex space-x-5 mb-8">
                    <button
                        onClick={() => setUnit('lbs')}
                        className={`px-5 py-2 rounded-full text-sm font-medium ${unit === 'lbs' ? 'bg-rose-500 text-white' : 'text-black'}`}
                    >
                        lbs
                    </button>
                    <button
                        onClick={() => setUnit('kg')}
                        className={`px-5 py-2 rounded-full text-sm font-medium ${unit === 'kg' ? 'bg-rose-500 text-white' : 'text-black'}`}
                    >
                        kg
                    </button>
                </div>

                <div className="flex items-end justify-center space-x-2 text-6xl mb-2">
                    <input
                        type="number"
                        value={cWeight}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setcWeight(value);
                            }
                        }}
                        placeholder="0"
                        className="w-28 text-center font-bold text-black bg-transparent border-b border-gray-200 focus:outline-none"
                    />
                    <span className="text-gray-500 pl-4 text-3xl font-semibold">{unit}</span>
                </div>

                <button
                    onClick={() => {
                        handleContinue();
                        handleSelect();
                    }}
                    className="mt-16 px-10 py-4 bg-rose-500 text-white text-lg rounded-full hover:bg-rose-600 transition"
                >
                    Continue
                </button>
            </div>
        </motion.div>
    );
}
