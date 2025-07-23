"use client";

import React from "react";
import { useRouter } from "next/navigation";
import facechange from "../assets/fattoslim.webp";
import weight from "../assets/Weight.webp";
import { motion } from "framer-motion";
const FaceChange = () => {
    const router = useRouter();
    const handleSelect = () => {

        router.push("/calculatingplansend");
    };
    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", width: "100%" }}
        >
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white text-center">
                <h1 className="text-2xl md:text-3xl font-semibold leading-snug mb-8">
                    Here’s how weight loss can change <br /> the face
                </h1>

                <div className="pt-8">
                    <img
                        src={facechange.src}
                        alt="Face transformation"
                        className="max-w-xs md:max-w-md w-full mb-4"
                    />

                    <img
                        src={weight.src}
                        alt="Weight indicators"
                        className="max-w-sm md:max-w-md w-full mb-6 pt-4"
                    />

                </div>
                <p className="text-base text-gray-700 max-w-md mb-2">
                    Losing weight can help reduce extra fullness in the cheeks and jawline,
                    while also firming up sagging skin.
                </p>


                <button
                    onClick={handleSelect}
                    className="px-10 mt-8 py-3 bg-rose-500 hover:bg-rose-600 text-white text-lg font-semibold rounded-full"
                >
                    Continue
                </button>
            </div>
        </motion.div>
    );
};

export default FaceChange;
