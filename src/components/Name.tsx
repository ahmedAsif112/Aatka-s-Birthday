"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NameInput() {
    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedName = localStorage.getItem("name");
            if (storedName) setName(storedName);
        }
    }, []);

    const handleContinue = () => {
        if (!name.trim()) return;

        if (typeof window !== "undefined") {
            localStorage.setItem("name", name.trim());
        }

        router.push("/profile");
    };

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full"
        >
            <div className="min-h-screen flex flex-col gap-7 items-center justify-center px-6 py-10 bg-white">
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">
                    What is your name?
                </h1>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-4xl font-bold text-center border-b border-gray-300 focus:outline-none focus:border-[#F43F5E] bg-transparent w-full max-w-md mb-10"
                    placeholder="Name"
                />

                <button
                    onClick={handleContinue}
                    className="bg-[#F43F5E] hover:bg-[#e73556] text-white text-base font-semibold py-3 px-10 rounded-full transition duration-300"
                >
                    Continue
                </button>
            </div>
        </motion.div>
    );
}