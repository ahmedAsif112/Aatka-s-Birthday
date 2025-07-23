/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
    const router = useRouter();

    const validateEmailFormat = (email: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    // Common invalid/disposable email domains
    const disposableDomains = [
        '10minutemail.com', 'guerrillamail.com', 'tempmail.org',
        'throwaway.email', 'temp-mail.org', 'mailinator.com'
    ];

    const checkDisposableEmail = (email: string) => {
        const domain = email.split('@')[1]?.toLowerCase();
        return disposableDomains.includes(domain);
    };

    // Real-time validation as user types
    useEffect(() => {
        if (!email) {
            setValidationStatus('idle');
            setError("");
            return;
        }

        const timeoutId = setTimeout(async () => {
            setIsValidating(true);

            if (!validateEmailFormat(email)) {
                setError("Please enter a valid email format");
                setValidationStatus('invalid');
                setIsValidating(false);
                return;
            }

            if (checkDisposableEmail(email)) {
                setError("Disposable email addresses are not allowed");
                setValidationStatus('invalid');
                setIsValidating(false);
                return;
            }

            // Call your API or validation service here
            try {
                const response = await fetch('/api/verify-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (data.isValid) {
                    setValidationStatus('valid');
                    setError("");
                } else {
                    setValidationStatus('invalid');
                    setError("This email address appears to be invalid or unreachable");
                }
            } catch (error: any) {
                // If API fails, just validate format
                setValidationStatus('valid');
                setError("");
                console.log(error)
            }

            setIsValidating(false);
        }, 800); // Debounce for 800ms

        return () => clearTimeout(timeoutId);
    }, [email]);

    const handleContinue = () => {
        if (validationStatus !== 'valid') {
            setError("Please enter a valid email address");
            return;
        }

        if (typeof window !== "undefined") {
            localStorage.setItem("userEmail", email);
        }

        router.push("/almostdone");
    };

    const getInputBorderClass = () => {
        if (validationStatus === 'valid') return 'border-green-500 focus:ring-green-500';
        if (validationStatus === 'invalid') return 'border-red-500 focus:ring-red-500';
        return 'border-gray-300 focus:ring-rose-500';
    };

    const getValidationIcon = () => {
        if (isValidating) return <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />;
        if (validationStatus === 'valid') return <span className="text-green-500">✓</span>;
        if (validationStatus === 'invalid') return <span className="text-red-500">✗</span>;
        return null;
    };

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", width: "100%" }}
        >
            <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white">
                <h1 className="text-3xl font-semibold mb-8">Sign up</h1>

                <div className="relative w-full max-w-md">
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-3 pr-10 text-lg mb-4 focus:outline-none focus:ring-2 transition-colors ${getInputBorderClass()}`}
                    />
                    <div className="absolute right-3 top-3">
                        {getValidationIcon()}
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                        <p className="text-sm text-red-600 flex items-center gap-2">
                            <span>⚠️</span>
                            {error}
                        </p>
                    </motion.div>
                )}

                {validationStatus === 'valid' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                        <p className="text-sm text-green-600 flex items-center gap-2">
                            <span>✅</span>
                            Email looks good!
                        </p>
                    </motion.div>
                )}

                <button
                    onClick={handleContinue}
                    disabled={validationStatus !== 'valid' || isValidating}
                    className={`w-full max-w-md mt-7 font-semibold text-lg py-3 rounded-full transition mb-6 ${validationStatus === 'valid' && !isValidating
                        ? "bg-rose-500 hover:bg-rose-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Continue with email
                </button>

                <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="text-xl">🔒</span>
                    Please check our{" "}
                    <a href="#" className="underline text-gray-500">
                        Privacy Policy
                    </a>{" "}
                    to understand how we use your data
                </p>
            </div>
        </motion.div>
    );
}