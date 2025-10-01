"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
    ScriptableLineSegmentContext,
    TooltipItem
} from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ChartDataLabels
);

const testimonials = [
    {
        name: "Tina",
        country: "United States",
        text: "After my bariatric surgery, tracking my progress was crucial. This service helped me stay on track and I've successfully lost 10 lbs in almost 4 weeks!"
    },
    {
        name: "Liam",
        country: "Canada",
        text: "Post-surgery nutrition was confusing at first. But since starting with this planner, I'm already down 7 lbs in 2 weeks and feeling great."
    },
    {
        name: "Sarah",
        country: "UK",
        text: "I was worried about meeting my post-bariatric goals, but this personalized approach is working perfectly. The scale is finally moving in the right direction!"
    }
];

const WeightProgressChart = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    const router = useRouter();
    const [unit, setUnit] = useState<"kg" | "lbs">("kg");
    const [cWeight, setCWeight] = useState<number>(92);
    const [goalWeight, setGoalWeight] = useState<number>(82);
    const [name, setName] = useState("Undifined");
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    const testimonialsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);

        if (typeof window !== "undefined") {
            const storedCWeight = JSON.parse(localStorage.getItem("cWeight") || "null");
            const storedGoalWeight = JSON.parse(localStorage.getItem("goalWeight") || "null");
            const storedName = localStorage.getItem("name");
            const storedUnit = JSON.parse(localStorage.getItem("unit") || `"kg"`);

            if (storedCWeight?.value) setCWeight(storedCWeight.value);
            if (storedGoalWeight?.value) setGoalWeight(storedGoalWeight.value);
            if (storedName) setName(storedName);
            if (storedUnit === "lbs" || storedUnit === "kg") setUnit(storedUnit);
        }

        const chartTimer = setTimeout(() => {
            chartRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 2000);

        const testimonialsTimer = setTimeout(() => {
            testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 5000);

        return () => {
            clearTimeout(chartTimer);
            clearTimeout(testimonialsTimer);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 flex items-center justify-center">
                <div className="text-teal-600 text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    const convertToLbs = (kg: number) => kg * 2.20462;
    const formatWeight = (value: number) =>
        unit === "lbs" ? `${convertToLbs(value).toFixed(1)} lbs` : `${value.toFixed(1)} kg`;
    const formatWeightNoDecimal = (value: number) =>
        unit === "lbs" ? `${Math.round(convertToLbs(value))} lbs` : `${Math.round(value)} kg`;

    const augWeight = cWeight + (goalWeight - cWeight) * 0.33;
    const sepWeight = cWeight + (goalWeight - cWeight) * 0.66;

    const now = new Date();
    const labels = Array.from({ length: 4 }).map((_, i) =>
        new Date(now.getFullYear(), now.getMonth() + i, 1).toLocaleString("default", {
            month: "short"
        })
    );

    const data: ChartData<"line"> = {
        labels,
        datasets: [
            {
                data: [cWeight, augWeight, sepWeight, goalWeight],
                tension: 0.5,
                pointRadius: 8,
                pointHoverRadius: 10,
                pointBackgroundColor: ["#14b8a6", "#06b6d4", "#22d3ee", "#10b981"],
                segment: {
                    borderColor: (ctx: ScriptableLineSegmentContext) => {
                        const i = ctx.p0DataIndex;
                        return ["#14b8a6", "#06b6d4", "#22d3ee"][i] || "#10b981";
                    },
                    borderWidth: 4
                },
                fill: false
            }
        ]
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { left: 20, right: 20, top: 30, bottom: 40 } },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx: TooltipItem<"line">) => formatWeight(ctx.parsed.y)
                }
            },
            datalabels: {
                anchor: (ctx: Context) => {
                    if (ctx.dataIndex === 3) return "center";
                    return "end";
                },
                align: (ctx: Context) => {
                    if (ctx.dataIndex === 3) {
                        const isGoingDown = cWeight > goalWeight;
                        return isGoingDown ? "top" : "bottom";
                    }
                    return "top";
                },
                formatter: (value: number, ctx: Context) =>
                    ctx.dataIndex === 3
                        ? "Goal\n" + formatWeightNoDecimal(value)
                        : formatWeightNoDecimal(value),
                font: { weight: "bold", size: 12 },
                color: (ctx: Context) => (ctx.dataIndex === 3 ? "#fff" : "#000"),
                backgroundColor: (ctx: Context) => (ctx.dataIndex === 3 ? "#10b981" : null),
                borderRadius: (ctx: Context) => (ctx.dataIndex === 3 ? 8 : 0),
                padding: (ctx: Context) => (ctx.dataIndex === 3 ? 8 : 0),
                offset: (ctx: Context) => (ctx.dataIndex === 3 ? 20 : 0),
                clip: false
            }
        },
        scales: {
            y: { display: false, grid: { display: false } },
            x: {
                offset: true,
                grid: { display: false },
                ticks: {
                    color: "#000",
                    font: { weight: "bold", size: 12 }
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-cyan-200/40 to-teal-200/40 rounded-full opacity-40 blur-lg animate-bounce" />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8"
            >
                <motion.div
                    className={`w-full max-w-4xl mx-auto text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <div className="w-20 h-20 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl animate-pulse">
                        <span className="text-3xl">📊</span>
                    </div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {name}, we predict you'll be{" "}
                        <motion.span
                            className="text-teal-600"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 200 }}
                        >
                            {formatWeightNoDecimal(goalWeight)}
                        </motion.span>{" "}
                        by{" "}
                        <motion.span
                            className="text-teal-600"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, duration: 0.6, type: "spring", stiffness: 200 }}
                        >
                            {labels[3]} 6th
                        </motion.span>
                    </motion.h2>

                    <motion.p
                        className="text-teal-600 text-lg font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        Your personalized bariatric weight loss journey
                    </motion.p>
                </motion.div>

                <motion.div
                    ref={chartRef}
                    className="w-full max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 100 }}
                >
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-teal-200/50">
                        <motion.div
                            style={{ height: "300px" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6, duration: 1 }}
                        >
                            <Line data={data} options={options} />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full max-w-4xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: "🎯", title: "Target Set", desc: "Goal weight defined" },
                            { icon: "📈", title: "Progress Tracking", desc: "Monthly milestones" },
                            { icon: "💪", title: "Success Path", desc: "Bariatric lifestyle" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-r from-teal-500/80 to-cyan-500/80 backdrop-blur-sm border border-teal-400/30 rounded-2xl p-6 text-center"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 + index * 0.2, duration: 0.6 }}
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            >
                                <div className="text-3xl mb-3 animate-pulse" style={{ animationDelay: `${index * 0.3}s` }}>
                                    {item.icon}
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-cyan-50 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    ref={testimonialsRef}
                    className="w-full max-w-4xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4, duration: 0.8 }}
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                            <span className="text-2xl">💬</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">What people say</h3>
                        <p className="text-teal-600 font-light">Real success stories from our community</p>
                    </div>

                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial}
                                initial={{ x: 400, opacity: 0, scale: 0.95 }}
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                exit={{ x: -400, opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 0.8,
                                    type: "spring",
                                    stiffness: 80,
                                    damping: 20
                                }}
                                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl border border-teal-200/50"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    <p className="font-semibold text-lg mb-2">
                                        {testimonials[currentTestimonial].name},{" "}
                                        <span className="text-gray-500">{testimonials[currentTestimonial].country}</span>
                                    </p>
                                    <div className="text-yellow-500 my-3 text-xl">⭐⭐⭐⭐⭐</div>
                                    <p className="font-medium text-gray-700 text-base leading-relaxed">
                                        {testimonials[currentTestimonial].text}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-3 mt-6">
                        {testimonials.map((_, i) => (
                            <motion.div
                                key={i}
                                className={`w-3 h-3 rounded-full transition-all duration-500 ${i === currentTestimonial ? "bg-teal-500" : "bg-gray-300"
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                animate={i === currentTestimonial ? { scale: 1.2 } : { scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}
                    </div>
                </motion.div>

                <motion.p
                    className="text-sm text-teal-600/70 mb-8 text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 0.8 }}
                >
                    The prediction above is based on the results of members like you and not a guarantee
                </motion.p>

                <motion.div
                    className="sticky bottom-2 md:bottom-4 z-10 py-3 md:py-4 px-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.2, duration: 0.8 }}
                >
                    <motion.button
                        onClick={() => router.push("/step5")}
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-8 md:px-12 py-3 md:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg w-full sm:w-auto"
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Continue Your Journey →
                    </motion.button>

                    <motion.div
                        className="mt-3 md:mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.6, duration: 0.8 }}
                    >
                        <p className="text-teal-600 text-xs md:text-sm font-light text-center">
                            🔒 100% secure • No spam
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default WeightProgressChart;