"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import graphImage from "../assets/Graph.png";

export default function CalculatingPlans() {
    const [progress, setProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [consent, setConsent] = useState(false);
    const [continueClicked, setContinueClicked] = useState(false);
    const router = useRouter();

    const initialTimerRef = useRef<NodeJS.Timeout | null>(null);
    const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

    const [genderText, setGenderText] = useState("women");

    useEffect(() => {
        const storedGender = localStorage.getItem("gender")?.toLowerCase();
        setGenderText(storedGender === "male" ? "mens" : "womens");
    }, []);
    // Initial progress: 0 → 80%
    useEffect(() => {
        if (progress < 80 && !showModal) {
            initialTimerRef.current = setInterval(() => {
                setProgress((prev) => {
                    const next = Math.min(prev + 1.34, 80);
                    if (next >= 80) {
                        clearInterval(initialTimerRef.current!);
                        setShowModal(true); // Open modal
                    }
                    return next;
                });
            }, 100);
        }

        return () => clearInterval(initialTimerRef.current!);
    }, [showModal]);

    // After clicking "Continue", resume 80 → 100%
    useEffect(() => {
        if (continueClicked) {
            resumeTimerRef.current = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(resumeTimerRef.current!);
                        setTimeout(() => router.push("/weightprogresschart "), 500);
                        return 100;
                    }
                    return Math.min(prev + 1.34, 100);
                });
            }, 100);
        }

        return () => clearInterval(resumeTimerRef.current!);
    }, [continueClicked]);

    const handleContinue = () => {
        setShowModal(false);        // Close modal
        setContinueClicked(true);   // Resume progress
    };

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full overflow-y-auto min-h-screen"
        >
            <div className="min-h-screen flex flex-col items-center justify-start px-4 py-10 bg-white">
                <h1 className="text-3xl font-bold text-center mb-2">Calculating your personal plan</h1>
                <p className="text-center text-gray-600 mb-6 calculatingplans-text">
                    We’ve helped 147,165 {genderText} in their 20s lose over 396 tons
                </p>

                <img src={graphImage.src} alt="graph" className="max-w-xl w-full mb-10 calculatingplans" />

                <div className="w-full max-w-xl">
                    <p className="font-semibold mb-2">Analyzing your profile</p>
                    <div className="relative w-full h-4 rounded-full bg-gray-200 overflow-hidden">
                        <div
                            className="absolute left-0 top-0 h-full bg-rose-600 rounded-full transition-[width] duration-300 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-right text-sm font-semibold mt-1 text-black">
                        {Math.floor(progress)}%
                    </p>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl w-[90%] max-w-md text-center">
                            <label className="flex gap-3 items-start mb-6 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="accent-rose-500 w-5 h-5 mt-1"
                                    checked={consent}
                                    onChange={() => setConsent(!consent)}
                                />
                                <span className="text-left">
                                    I consent to Formula processing my health data (such as age and weight) to
                                    provide services, in accordance with the{" "}
                                    <a className="underline" href="#">Privacy Policy</a>
                                </span>
                            </label>
                            <button
                                disabled={!consent}
                                onClick={handleContinue}
                                className={`w-full py-3 rounded-full text-lg font-semibold transition ${consent
                                    ? "bg-rose-500 text-white hover:bg-rose-600"
                                    : "bg-rose-200 text-white cursor-not-allowed"
                                    }`}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
