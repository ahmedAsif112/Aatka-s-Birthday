"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Carnivoureisdelicious = () => {
    const router = useRouter();
    const handleSelect = () => {
        router.push("/foodprefrences"); // Navigate to /target-route
    };
    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", width: "100%" }}
        >
            <div className="flex  items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 text-white text-center px-4">
                <div className="max-w-md">
                    {/* Emoji Icon or replace with <img src="..." /> */}
                    <div className="text-6xl mb-6">🥩</div>

                    {/* Heading */}
                    <h1 className="text-3xl font-bold mb-4">Carnivore Diet is delicious!</h1>

                    {/* Subtext */}
                    <p className="text-[25px] font-medium">

                        <p className="pt-8 text-[20px] font-medium">Our app includes recipes of different level of complexity, you can have amazing meals, enjoy your favorite foods and lose weight at the same time!
                        </p>
                    </p>

                    {/* Continue Button */}
                    <button
                        className="mt-20 bg-red-500 hover:bg-red-400 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                        onClick={handleSelect}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Carnivoureisdelicious;