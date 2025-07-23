"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Height() {
    const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
    const [height, setHeight] = useState('');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedHeight = localStorage.getItem("height");
            if (storedHeight) {
                try {
                    const parsed = JSON.parse(storedHeight);
                    if (parsed.unit === 'cm') {
                        setUnit('cm');
                        setHeight(String(parsed.value));
                    } else if (parsed.unit === 'ft' && typeof parsed.value === 'object') {
                        setUnit('ft');
                        setFeet(String(parsed.value.feet ?? ''));
                        setInches(String(parsed.value.inches ?? ''));
                    }
                } catch {
                    // skip invalid storage format
                }
            }
        }
    }, []);

    const handleSelect = () => {
        router.push("/currentweight");
    };

    const handleContinue = () => {
        if (typeof window !== "undefined") {
            if (unit === 'cm') {
                const numericHeight = Number(height);
                if (!isNaN(numericHeight) && numericHeight > 0) {
                    localStorage.setItem("height", JSON.stringify({ value: numericHeight, unit }));
                }
            } else if (unit === 'ft') {
                const f = Number(feet);
                const i = Number(inches);
                if (!isNaN(f) && !isNaN(i) && (f > 0 || i > 0)) {
                    localStorage.setItem("height", JSON.stringify({ value: { feet: f, inches: i }, unit }));
                }
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
                <h1 className="text-2xl font-semibold text-black mb-6">What is your height?</h1>

                <div className="flex space-x-5 mb-8">
                    <button
                        onClick={() => setUnit('ft')}
                        className={`px-5 py-2 rounded-full text-sm font-medium ${unit === 'ft' ? 'bg-rose-500 text-white' : 'text-black'}`}
                    >
                        FT
                    </button>
                    <button
                        onClick={() => setUnit('cm')}
                        className={`px-5 py-2 rounded-full text-sm font-medium ${unit === 'cm' ? 'bg-rose-500 text-white' : 'text-black'}`}
                    >
                        CM
                    </button>
                </div>

                {unit === 'cm' ? (
                    <div className="flex items-end justify-center space-x-2 text-6xl mb-2">
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) setHeight(value);
                            }}
                            placeholder="0"
                            className="w-28 text-center font-bold text-black bg-transparent border-b border-gray-200 focus:outline-none"
                        />
                        <span className="text-gray-500 pl-4 text-3xl font-semibold">cm</span>
                    </div>
                ) : (
                    <div className="flex items-end justify-center space-x-10 text-6xl mb-2">
                        <div className="flex flex-col items-center">
                            <input
                                type="number"
                                value={feet}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) setFeet(value);
                                }}
                                placeholder="0"
                                className="w-20 text-center font-bold text-black bg-transparent border-b border-gray-200 focus:outline-none"
                            />
                            <span className="text-gray-500 text-xl font-semibold mt-2">ft</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <input
                                type="number"
                                value={inches}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) setInches(value);
                                }}
                                placeholder="0"
                                className="w-20 text-center font-bold text-black bg-transparent border-b border-gray-200 focus:outline-none"
                            />
                            <span className="text-gray-500 text-xl font-semibold mt-2">in</span>
                        </div>
                    </div>
                )}

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