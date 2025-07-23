"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AgePage() {
    const [age, setAge] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedAge = localStorage.getItem("age");
            if (storedAge) {
                setAge(storedAge);
            }
        }
    }, []);

    const handleContinue = () => {
        const numericAge = Number(age);
        if (!isNaN(numericAge) && numericAge >= 0) {
            if (typeof window !== "undefined") {
                localStorage.setItem("age", age);
            }
        }
    };

    const handleSelect = () => {
        router.push("/height");
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
                <h1 className="text-3xl font-semibold text-black mb-10">How old are you?</h1>

                <div className="w-full max-w-sm">
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setAge(value);
                            }
                        }}
                        placeholder="Age"
                        className="text-center w-full text-5xl text-gray-400 font-bold border-b border-gray-200 focus:outline-none focus:border-black placeholder-gray-400"
                    />
                </div>

                <button
                    onClick={() => {
                        handleContinue();
                        handleSelect();
                    }}
                    className="mt-20 px-10 py-4 bg-rose-500 text-white text-lg rounded-full hover:bg-rose-600 transition"
                >
                    Continue
                </button>
            </div>
        </motion.div>
    );
}
