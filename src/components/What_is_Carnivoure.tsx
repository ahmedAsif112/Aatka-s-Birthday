"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import proteinImage from "../assets/protein.webp";

export default function What_is_carnivoure() {


    const router = useRouter();

    const handleSelect = () => {
        router.push("/calculatingplan"); // Navigate to /target-route
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
                <div className="w-full md:w-[40%] flex flex-col items-center justify-center px-4">
                    <h1 className="text-3xl font-bold mb-2 text-center">
                        Carnivore Diet is a <span className="text-yellow-500">high-protein, all-meat</span> diet for weight loss
                    </h1>
                    <p className="text-center text-gray-600 mb-4">
                        Switch from varied foods to an all-meat diet and lose 1–2 lbs per week
                    </p>

                    <div className="relative w-full flex pt-5 justify-center">
                        <img src={proteinImage.src} alt="protein-chart" className="w-full" />

                        {/* Bottom white fade */}
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    </div>

                    <button onClick={handleSelect} className="mt-4 px-10 py-4 bg-rose-500 text-white text-lg rounded-full hover:bg-rose-600 transition">
                        Continue
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
