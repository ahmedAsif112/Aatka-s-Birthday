"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BMIResult() {
    const router = useRouter();
    const [bmi, setBMI] = useState<number | null>(null);

    const handleClick = () => {
        router.push("/goalweight");
    };

    useEffect(() => {
        const cWeight = localStorage.getItem("cWeight");
        const heightValue = localStorage.getItem("height");

        if (cWeight && heightValue) {
            const parsedWeight = JSON.parse(cWeight);
            const parsedHeight = JSON.parse(heightValue);

            let kg = parsedWeight.value;
            if (parsedWeight.unit === "lbs") {
                kg = +(kg * 0.453592).toFixed(1);
            }

            let heightInCm = 0;
            if (parsedHeight.unit === "ft") {
                const feet = parsedHeight.value.feet;
                const inches = parsedHeight.value.inches;
                const totalInches = feet * 12 + inches;
                heightInCm = totalInches * 2.54;
            } else if (parsedHeight.unit === "cm") {
                heightInCm = parsedHeight.value;
            }

            const heightInMeters = heightInCm / 100;
            const calculatedBMI = +(kg / (heightInMeters * heightInMeters)).toFixed(1);
            setBMI(calculatedBMI);
        }
    }, []);

    const getArrowPosition = () => {
        if (bmi === null) return 0;
        const minBMI = 10;
        const maxBMI = 40;
        const percent = Math.min(100, Math.max(0, ((bmi - minBMI) / (maxBMI - minBMI)) * 100));
        return percent;
    };

    if (bmi === null) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", width: "100%" }}
        >
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
                <h1 className="text-2xl font-bold text-black mb-4">Risks of unhealthy BMI</h1>
                <div className="text-5xl font-bold text-black mb-1">{bmi}</div>
                <div className="text-gray-500 text-sm mb-4">Body Mass Index</div>
                <div className="flex justify-between w-[320px] text-[16px] text-black px-1 pb-2">
                    <div>18.5</div>
                    <div>25</div>
                    <div>30</div>
                </div>

                <div className="relative w-[320px] h-6 rounded-none overflow-hidden mb-4">
                    <div className="absolute h-full w-1/4 bg-blue-400" />
                    <div className="absolute left-1/4 h-full w-1/4 bg-green-400" />
                    <div className="absolute left-2/4 h-full w-1/4 bg-yellow-400" />
                    <div className="absolute left-3/4 h-full w-1/4 bg-red-400" />
                    <div
                        className="absolute -top-5 text-4xl"
                        style={{ left: `calc(${getArrowPosition()}% - 24px)` }}
                    >
                        ▼
                    </div>
                </div>

                <div className="flex justify-between w-[320px] text-[16px] text-black px-1">
                    <div>62 kg</div>
                    <div>84 kg</div>
                    <div>100 kg</div>
                </div>

                <p className="mt-6 text-center max-w-md text-gray-700">
                    Reaching and maintaining a healthy BMI (18.5 – 24.9) reduces the risk of many
                    chronic diseases like heart disease, high blood pressure, type 2 diabetes,
                    breathing problems, and certain types of cancer
                </p>

                <button onClick={handleClick} className="mt-10 px-10 py-4 bg-rose-500 text-white text-lg rounded-full hover:bg-rose-600 transition">
                    Continue
                </button>
            </div>
        </motion.div>
    );
}
