"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const meatOptions = [
    { label: "Vitamins" },
    { label: "Hormones" },
    { label: "Antibiotics" },
    { label: "Anxiety medications" },
    { label: "Other" },
    { label: "No" },

];

export default function Madication() {
    const router = useRouter();
    const handleSelect = () => {

        router.push("/risklist");
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
                    Are you taking any medications?

                </h1>

                <div className="w-full pt-8 max-w-xl space-y-3">
                    <button
                        className={`w-full text-left px-6 py-4 rounded-xl font-medium bg-gray-100 flex justify-between items-center`}
                        onClick={() => toggleOption("All in one")}
                    >
                        <span>All in one</span>
                        <span className="text-2xl">+</span>
                    </button>

                    {meatOptions.map(({ label, }) => (
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
                                        <p className="font-medium">
                                            {label}
                                        </p>

                                    </>
                                ) : (
                                    <span className="flex items-center gap-2  font-normal">
                                        {label}
                                    </span>
                                )}
                            </div>
                            {isSelected(label) && <span className="text-xl">✔</span>}
                            {!isSelected(label) && <span className="text-xl">+</span>}
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
