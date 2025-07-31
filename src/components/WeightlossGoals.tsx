"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WeightLossGoal() {
    const [unit, setUnit] = useState("LB");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showRefundModal, setShowRefundModal] = useState(false);

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
                            ? "bg-green-600 text-white"
                            : "text-black bg-gray-200"
                            }`}
                    >
                        LB
                    </button>
                    <button
                        onClick={() => setUnit("KG")}
                        className={`px-6 py-2 rounded-full text-[14px] font-medium transition shadow-md ${unit === "KG"
                            ? "bg-green-600 text-white"
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
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {goal}
                        </button>
                    ))}

                </div>
                <div className="mt-9 flex items-center justify-center">


                    <button
                        type="button"
                        className="text-gray-400 text-base underline hover:text-gray-500 transition font-medium"
                        onClick={() => setShowRefundModal(true)}
                    >
                        Refunds Policy
                    </button>



                </div>
                {showRefundModal && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="bg-white max-w-2xl w-[90%] p-6 rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
                            <button
                                className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
                                onClick={() => setShowRefundModal(false)}
                            >
                                ×
                            </button>
                            <h2 className="text-2xl font-bold mb-4 text-center">Refunds Policy for Digital Products</h2>
                            <p className="text-sm mb-4">
                                Due to the nature of digital products, <strong>all sales are final.</strong> Once a purchase is made,
                                you will receive instant access to the eBooks and resources.
                            </p>
                            <p className="text-sm mb-4">As such, we do not offer refunds, returns, or exchanges for any reason, including but not limited to:</p>
                            <ul className="list-disc list-inside text-sm mb-4 space-y-1">
                                <li>Accidental purchases</li>
                                <li>Compatibility issues</li>
                                <li>Personal dissatisfaction</li>
                                <li>Change of mind</li>
                            </ul>
                            <p className="text-sm mb-4">
                                We encourage you to review the product descriptions carefully before making a purchase.
                            </p>
                            <h3 className="font-semibold text-md mb-2">Need Help?</h3>
                            <p className="text-sm">
                                If you experience any issues accessing your product or have questions before purchasing, feel free to reach out to us at:
                                <br />
                                <a href="mailto:carnivorerepresentatives@gmail.com" className="text-rose-600 underline">
                                    carnivorerepresentatives@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}