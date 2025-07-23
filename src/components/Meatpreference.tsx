"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const meatOptions = [
    { label: "Chicken", icon: "🍗" },
    { label: "Pork", icon: "🐖" },
    { label: "Bacon", icon: "🥓" },
    { label: "Beef", icon: "🐄" },
    { label: "Turkey", icon: "🦃" },
    { label: "Fish", icon: "🐟" },
    { label: "Lamb", icon: "🐑" },
    { label: "I’m a vegetarian", icon: "🍆" }
];

export default function MeatPreference() {
    const router = useRouter();
    const handleSelect = () => {

        router.push("/waterintake");
    };
    const [selected, setSelected] = useState<string[]>([]);

    const toggleOption = (label: string) => {
        if (label === "All in one") {
            setSelected(meatOptions.map((m) => m.label));
        } else {
            setSelected((prev) =>
                prev.includes(label)
                    ? prev.filter((item) => item !== label)
                    : [...prev, label]
            );
        }
    };

    const isSelected = (label: string) => selected.includes(label);

    const handleContinue = () => {
        console.log("Selected meat options:", selected);
        // navigation logic here
    };

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", width: "100%" }}
        >
            <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-white px-4">
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
                    Which meat do you prefer?
                </h1>

                <div className="w-full pt-8 max-w-xl space-y-3">
                    <button
                        className={`w-full text-left px-6 py-4 rounded-xl font-medium bg-gray-100 flex justify-between items-center`}
                        onClick={() => toggleOption("All in one")}
                    >
                        <span>All in one</span>
                        <span className="text-2xl">+</span>
                    </button>

                    {meatOptions.map(({ label, icon }) => (
                        <button
                            key={label}
                            className={`w-full text-left px-6 py-4 rounded-xl font-medium flex justify-between items-center ${isSelected(label)
                                ? "bg-[#F43F5E] text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            onClick={() => toggleOption(label)}
                        >
                            <div>
                                {isSelected(label) ? (
                                    <>
                                        <p className="text-sm">
                                            We’ve added <strong>{label.toLowerCase()}</strong>
                                        </p>
                                        <p className="text-sm">to your meal plan</p>
                                    </>
                                ) : (
                                    <span className="flex items-center gap-2 text-base font-normal">
                                        <span>{icon}</span>
                                        {label}
                                    </span>
                                )}
                            </div>
                            {isSelected(label) && <span className="text-xl">✔</span>}
                            {!isSelected(label) && <span className="text-2xl">+</span>}
                        </button>
                    ))}
                </div>

                <button
                    className={`mt-6 px-10 py-3 rounded-full font-semibold text-white bg-rose-500 hover:bg-rose-600`}
                    onClick={() => {
                        handleContinue();
                        handleSelect();
                    }}
                >
                    Continue
                </button>
            </div>
        </motion.div>
    );
}
