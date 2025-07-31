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
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const router = useRouter();

    const initialTimerRef = useRef<NodeJS.Timeout | null>(null);
    const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

    const [genderText, setGenderText] = useState("women");

    useEffect(() => {
        const storedGender = localStorage.getItem("gender")?.toLowerCase();
        setGenderText(storedGender === "male" ? "mens" : "womens");
    }, []);

    useEffect(() => {
        if (progress < 80 && !showModal) {
            initialTimerRef.current = setInterval(() => {
                setProgress((prev) => {
                    const next = Math.min(prev + 1.34, 80);
                    if (next >= 80) {
                        clearInterval(initialTimerRef.current!);
                        setShowModal(true);
                    }
                    return next;
                });
            }, 100);
        }

        return () => clearInterval(initialTimerRef.current!);
    }, [showModal]);

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
        setShowModal(false);
        setContinueClicked(true);
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
                        <div className="bg-white p-6 rounded-xl w-[90%] max-w-md text-center relative">
                            <label className="flex gap-3 items-start mb-6 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="accent-rose-500 w-5 h-5 mt-1"
                                    checked={consent}
                                    onChange={() => setConsent(!consent)}
                                />
                                <span className="text-left">
                                    I consent to Dieting Solutions processing my health data (such as age and weight) to personalize my plan and improve service delivery, in accordance with the{" "}
                                    <button
                                        className="underline text-rose-600"
                                        onClick={() => setShowPrivacyModal(true)}
                                    >
                                        Privacy & Cookie Policy
                                    </button>
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

                {showPrivacyModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white max-w-2xl w-[90%] p-6 rounded-2xl overflow-y-auto max-h-[90vh] relative">
                            <button
                                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPrivacyModal(false)}
                            >
                                ×
                            </button>
                            <h2 className="text-2xl font-bold mb-2 text-center">Privacy & Cookie Policy</h2>
                            <p className="text-sm text-gray-600 text-center mb-6">
                                Company Name: <strong>Dieting Solutions</strong><br />
                                Website: <a href="https://www.gastricmealplan.com/" className="text-rose-600 underline" target="_blank">www.gastricmealplan.com</a>
                            </p>

                            <h3 className="font-semibold text-lg mb-1">What Are Cookies?</h3>
                            <p className="text-sm mb-4">
                                Cookies are small text files placed on your device (computer, smartphone, or tablet)
                                when you visit a website. They help the site remember your preferences and improve
                                your browsing experience.
                            </p>

                            <h3 className="font-semibold text-lg mb-1">How We Use Cookies</h3>
                            <p className="text-sm mb-2">We use cookies to:</p>
                            <ul className="list-disc list-inside text-sm mb-4">
                                <li>Analyze website traffic and performance (via tools like Google Analytics)</li>
                                <li>Understand how visitors interact with our site</li>
                                <li>Remember basic settings (like language or browser type)</li>
                            </ul>
                            <p className="text-sm mb-4">
                                <em>Note: These cookies do not collect personally identifiable information.</em>
                            </p>

                            <h3 className="font-semibold text-lg mb-1">Types of Cookies We Use</h3>
                            <table className="w-full text-sm border border-gray-300 mb-4">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">Type</th>
                                        <th className="p-2 border">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-2 border">Essential Cookies</td>
                                        <td className="p-2 border">Ensure website functionality and security.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Analytics Cookies</td>
                                        <td className="p-2 border">Track anonymous visitor data (e.g., most visited pages, bounce rates).</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border">Third-Party Cookies</td>
                                        <td className="p-2 border">Used by services like Google Analytics or Stripe to support their functionality.</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3 className="font-semibold text-lg mb-1">Managing Cookies</h3>
                            <p className="text-sm mb-2">You can control or disable cookies through your browser settings:</p>
                            <ul className="list-disc list-inside text-sm mb-4">
                                <li><a href="https://support.google.com/chrome/answer/95647" className="text-rose-600 underline" target="_blank">Google Chrome</a></li>
                                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" className="text-rose-600 underline" target="_blank">Mozilla Firefox</a></li>
                                <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" className="text-rose-600 underline" target="_blank">Safari</a></li>
                                <li><a href="https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies" className="text-rose-600 underline" target="_blank">Microsoft Edge</a></li>
                            </ul>

                            <h3 className="font-semibold text-lg mb-1">Third-Party Tools Used</h3>
                            <p className="text-sm mb-4">
                                We may use tools or services that rely on cookies, such as:
                            </p>
                            <ul className="list-disc list-inside text-sm mb-4">
                                <li>Google Analytics</li>
                                <li>Stripe</li>
                                <li>PayPal</li>
                            </ul>
                            <p className="text-sm mb-4">
                                Each of these services has its own cookie and privacy policy.
                            </p>

                            <h3 className="font-semibold text-lg mb-1">Changes to This Cookie Policy</h3>
                            <p className="text-sm mb-4">
                                We may update this Cookie Policy from time to time. Updates will be posted on this page with a new effective date.
                            </p>

                            <h3 className="font-semibold text-lg mb-1">Contact Us</h3>
                            <p className="text-sm">
                                If you have any questions about how we use cookies, email us at:{" "}
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
