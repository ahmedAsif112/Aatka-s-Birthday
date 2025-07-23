"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const HalfwayScreen = () => {
    const router = useRouter();
    const handleSelect = () => {
        router.push("/eatinghabbits"); // Navigate to /target-route
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
                    <div className="text-6xl mb-6">🎉</div>

                    {/* Heading */}
                    <h1 className="text-3xl font-bold mb-4">Halfway there!</h1>

                    {/* Subtext */}
                    <p className="text-[25px] font-medium">
                        We’ve created a basic plan for you.<br />
                        <p className="pt-8 text-[20px] font-medium">Now let’s customize it. Please take your time while answering the following questions. Every answer will slightly influence your personal plan.
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

export default HalfwayScreen;