"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import male from "../assets/Male.webp";
import female from "../assets/female.webp";

export default function Profile() {
    const [bmi, setBMI] = useState<number | null>(null);
    const [name, setName] = useState<string>("");
    const [bodyType, setBodyType] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>(""); // FIXED: was `any`
    const [goal, setGoal] = useState<string>("");

    const router = useRouter();
    const handleSelect = () => {
        router.push("/familiar");
    };

    useEffect(() => {
        const storedName = localStorage.getItem("name") || "";
        const storedGender = localStorage.getItem("gender")?.toLowerCase() || "female";
        const cWeightStr = localStorage.getItem("cWeight");
        const goalWeightStr = localStorage.getItem("goalWeight");
        const heightValue = localStorage.getItem("height");

        setName(storedName);
        setImageUrl(storedGender === "male" ? male.src : female.src); // only use gender here

        if (cWeightStr && goalWeightStr && heightValue) {
            const parsedWeight = JSON.parse(cWeightStr);
            const parsedGoal = JSON.parse(goalWeightStr);
            const parsedHeight = JSON.parse(heightValue);

            const cWeightKg = parsedWeight.unit === "lbs"
                ? +(parsedWeight.value * 0.453592).toFixed(1)
                : parsedWeight.value;

            const gWeightKg = parsedGoal.unit === "lbs"
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
            const calculatedBMI = +(cWeightKg / (heightInMeters * heightInMeters)).toFixed(1);
            setBMI(calculatedBMI);

            if (calculatedBMI < 18.5) setBodyType("Underweight");
            else if (calculatedBMI < 25) setBodyType("Normal weight");
            else if (calculatedBMI < 30) setBodyType("On a heavier side");
            else setBodyType("Obese");

            const diff = Math.abs(cWeightKg - gWeightKg).toFixed(1);
            const goalText = cWeightKg > gWeightKg ? `Lose ${diff} kg` : `Gain ${diff} kg`;
            setGoal(goalText);
        }
    }, []);

    if (bmi === null) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full"
        >
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white">
                <div className="w-[40%] profile flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-6">Your personal profile</h1>

                    <div className="w-full max-w-xl bg-gray-100 rounded-2xl p-6 mb-4">
                        <h2 className="font-bold text-lg mb-1">Body Mass Index (BMI)</h2>
                        <p className="text-sm text-gray-500 mb-1">Ideal – 21.5</p>
                        <p className="text-sm text-gray-700 mb-3">Your – {bmi}</p>

                        <div className="relative w-full h-6 rounded mb-4">
                            <div className="absolute h-full w-1/4 bg-blue-400" />
                            <div className="absolute left-1/4 h-full w-1/4 bg-green-400" />
                            <div className="absolute left-2/4 h-full w-1/4 bg-yellow-400" />
                            <div className="absolute left-3/4 h-full w-1/4 bg-red-400" />
                            <div
                                className="absolute -top-5 text-xl"
                                style={{ left: `calc(${Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100))}% - 12px)` }}
                            >
                                ▼
                            </div>
                        </div>

                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Underweight</span>
                            <span>Normal</span>
                            <span>Overweight</span>
                        </div>
                    </div>

                    <div className="w-full max-w-xl mt-11 bg-gray-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-visible profile-text">
                        <div className="flex-1 space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="text-lg font-semibold">{name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Body type</p>
                                <p className="text-lg font-semibold">{bodyType}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Goal</p>
                                <p className="text-lg font-semibold">{goal}</p>
                            </div>
                        </div>

                        <div className="absolute -top-9 right-6">
                            <img
                                src={imageUrl}
                                alt="User Gender"
                                className="w-40 object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-8 w-full max-w-xl bg-green-100 text-black text-md rounded-2xl px-6 py-4 flex gap-3 items-start">
                        <span className="text-green-500 text-xl">✨</span>
                        <p>
                            Although your body might not be in perfect shape yet, this is a great starting point for your weight loss journey!
                        </p>
                    </div>

                    <button onClick={handleSelect} className="mt-8 px-10 py-4 bg-rose-500 text-white text-lg rounded-full hover:bg-rose-600 transition">
                        Continue
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
