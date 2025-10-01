"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import male from "../assets/Male.webp";
import female from "../assets/female.webp";
import { useRouter } from "next/navigation";

export default function Profile() {
    const [bmi, setBMI] = useState<number | null>(null);
    const [name, setName] = useState<string>("");
    const [bodyType, setBodyType] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [goal, setGoal] = useState<string>("");
    const [isVisible, setIsVisible] = useState(false);
    const [gender, setGender] = useState<string>("male");
    const router = useRouter();

    const handleSelect = () => {
        console.log("Navigating to step 4");
        router.push("/step4");
    };

    useEffect(() => {
        setIsVisible(true);

        // Pehle localStorage se le
        const storedName = localStorage.getItem("name");
        const storedGender = localStorage.getItem("gender");
        const cWeightStr = localStorage.getItem("cWeight");
        const goalWeightStr = localStorage.getItem("goalWeight");
        const heightValue = localStorage.getItem("height");

        // Agar localStorage empty hai to fallback do (sirf demo ke liye)
        const nameVal = storedName || "Guest";
        const genderVal = storedGender?.trim().toLowerCase() || "male";

        setName(nameVal);
        setGender(genderVal);
        setImageUrl(storedGender === "male" ? male.src : female.src);

        if (cWeightStr && goalWeightStr && heightValue) {
            const parsedWeight = JSON.parse(cWeightStr);
            const parsedGoal = JSON.parse(goalWeightStr);
            const parsedHeight = JSON.parse(heightValue);

            const cWeightKg =
                parsedWeight.unit === "lbs"
                    ? +(parsedWeight.value * 0.453592).toFixed(1)
                    : parsedWeight.value;

            const gWeightKg =
                parsedGoal.unit === "lbs"
                    ? +(parsedGoal.value * 0.453592).toFixed(1)
                    : parsedGoal.value;

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
            const calculatedBMI = +(
                cWeightKg /
                (heightInMeters * heightInMeters)
            ).toFixed(1);
            setBMI(calculatedBMI);

            if (calculatedBMI < 18.5) setBodyType("Underweight");
            else if (calculatedBMI < 25) setBodyType("Normal weight");
            else if (calculatedBMI < 30) setBodyType("On a heavier side");
            else setBodyType("Obese");

            const diff = Math.abs(cWeightKg - gWeightKg).toFixed(1);
            const goalText =
                cWeightKg > gWeightKg ? `Lose ${diff} kg` : `Gain ${diff} kg`;
            setGoal(goalText);
        }
    }, []);


    const getArrowPosition = () => {
        if (bmi === null) return 0;
        const minBMI = 10;
        const maxBMI = 40;
        const percent = Math.min(100, Math.max(0, ((bmi - minBMI) / (maxBMI - minBMI)) * 100));
        return percent;
    };

    if (bmi === null) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 flex items-center justify-center">
                <div className="text-teal-600 text-xl animate-pulse">Loading...</div>
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
                className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-10"
            >
                <div className={`w-full max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl animate-pulse">
                            <span className="text-2xl">👤</span>
                        </div>
                        <motion.h1
                            className="text-3xl font-medium text-teal-700 mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Your Personal Profile
                        </motion.h1>
                        <motion.p
                            className="text-teal-600 font-light"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Your health journey overview
                        </motion.p>
                    </div>

                    {/* BMI Card */}
                    <motion.div
                        className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <h2 className="font-bold text-lg mb-1 text-gray-800">Body Mass Index (BMI)</h2>
                        <p className="text-sm text-gray-500 mb-1">Ideal – 21.5</p>
                        <p className="text-sm text-gray-700 mb-4">Your – <span className="font-semibold text-teal-600">{bmi}</span></p>

                        {/* Enhanced BMI Scale */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <div className="relative w-full h-6 rounded-lg overflow-hidden mb-4 shadow-inner">
                                <div className="absolute h-full w-1/4 bg-gradient-to-r from-blue-400 to-blue-500" />
                                <div className="absolute left-1/4 h-full w-1/4 bg-gradient-to-r from-green-400 to-green-500" />
                                <div className="absolute left-2/4 h-full w-1/4 bg-gradient-to-r from-yellow-400 to-yellow-500" />
                                <div className="absolute left-3/4 h-full w-1/4 bg-gradient-to-r from-red-400 to-red-500" />
                                <motion.div
                                    className="absolute -top-4 text-2xl text-black"
                                    style={{ left: `calc(${getArrowPosition()}% - 16px)` }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 0.6, type: "spring", stiffness: 100 }}
                                >
                                    ▼
                                </motion.div>
                            </div>

                            <div className="flex justify-between text-sm text-gray-700">
                                <span>Underweight</span>
                                <span>Normal</span>
                                <span>Overweight</span>
                                <span>Obese</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Profile Details Card */}
                    <motion.div
                        className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start gap-6 relative overflow-visible mb-6 mt-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        <div className="flex-1 space-y-4 pr-36 sm:pr-44 md:pr-48">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.4, duration: 0.5 }}
                                className="text-left"
                            >
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="text-lg font-semibold text-gray-800">{name}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.6, duration: 0.5 }}
                                className="text-left"
                            >
                                <p className="text-sm text-gray-500">Body type</p>
                                <p className="text-lg font-semibold text-gray-800">{bodyType}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.8, duration: 0.5 }}
                                className="text-left"
                            >
                                <p className="text-sm text-gray-500">Goal</p>
                                <p className="text-lg font-semibold text-teal-600">{goal}</p>
                            </motion.div>
                        </div>

                        <motion.div
                            className="absolute bottom-0 right-6"
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 2, duration: 0.8, type: "spring", stiffness: 100 }}
                        >
                            <img
                                src={imageUrl}
                                alt="User Gender"
                                className="w-32 sm:w-36 md:w-40 object-cover filter drop-shadow-lg"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Motivational Message */}
                    <motion.div
                        className="bg-gradient-to-r from-teal-100/90 to-cyan-100/90 backdrop-blur-sm border border-teal-200/50 shadow-xl rounded-2xl px-6 py-4 flex gap-3 items-start mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2, duration: 0.6 }}
                    >
                        <motion.span
                            className="text-teal-500 text-xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            ✨
                        </motion.span>
                        <p className="text-teal-800 font-light">
                            You've already taken the hardest step and proven you can make tough decisions by getting this far. Your body is ready for change, and with proper guidance, you're about to discover what your health can really achieve. This approach works because it aligns with sustainable lifestyle changes - and the best version of yourself is closer than you think.
                        </p>
                    </motion.div>

                    {/* Continue Button */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.4, duration: 0.6 }}
                    >
                        <motion.button
                            onClick={handleSelect}
                            className="px-12 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Continue Your Journey →
                        </motion.button>

                        <motion.div
                            className="mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.6, duration: 0.8 }}
                        >
                            <p className="text-teal-600 text-sm font-light">
                                Ready to transform with personalized guidance
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}