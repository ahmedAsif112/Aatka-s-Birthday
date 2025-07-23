"use client";

import React, { useEffect, useState } from "react";
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
        text: "I have done carnivore many times and I’ve never seen much results because I didn’t see a progress and now that I’m using this service, I successfully have lost 10 lbs in almost 4 weeks!!"
    },
    {
        name: "Liam",
        country: "Canada",
        text: "Before this, my diet didn’t move the needle much. But since starting here, I’m already down 7 lbs in 2 weeks."
    },
    {
        name: "Sarah",
        country: "UK",
        text: "Honestly I didn’t expect this to work but I’m super surprised. This is working and I’m finally seeing the scale move!"
    }
];

const WeightProgressChart = () => {
    const router = useRouter();
    const [unit, setUnit] = useState<"kg" | "lbs">("kg");
    const [cWeight, setCWeight] = useState<number>(92);
    const [goalWeight, setGoalWeight] = useState<number>(82);
    const [name, setName] = useState("Ahmed");
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

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
                pointRadius: 10,
                pointHoverRadius: 12,
                pointBackgroundColor: ["#ef5350", "#ffa726", "#ffee58", "#00c853"],
                segment: {
                    borderColor: (ctx: ScriptableLineSegmentContext) => {
                        const i = ctx.p0DataIndex;
                        return ["#ef5350", "#ffa726", "#ffee58"][i] || "#00c853";
                    },
                    borderWidth: 6
                },
                fill: false
            }
        ]
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { left: 30, right: 30, top: 30, bottom: 20 } },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx: TooltipItem<"line">) => formatWeight(ctx.parsed.y)
                }
            },
            datalabels: {
                anchor: (ctx: Context) => ctx.dataIndex === 3 ? "start" : "end",
                align: (ctx: Context) => ctx.dataIndex === 3 ? "bottom" : "top",
                formatter: (value: number, ctx: Context) =>
                    ctx.dataIndex === 3
                        ? "Goal\n" + formatWeightNoDecimal(value)
                        : formatWeightNoDecimal(value),
                font: { weight: "bold", size: 14 },
                color: (ctx: Context) => (ctx.dataIndex === 3 ? "#fff" : "#000"),
                backgroundColor: (ctx: Context) => (ctx.dataIndex === 3 ? "#00c853" : null),
                borderRadius: (ctx: Context) => (ctx.dataIndex === 3 ? 6 : 0),
                offset: (ctx: Context) => (ctx.dataIndex === 3 ? 14 : 0),
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
                    font: { weight: "bold", size: 14 }
                }
            }
        }
    };

    return (
        <div className="w-[40%] weightchart" style={{ margin: "2rem auto", textAlign: "center" }}>
            <h2 className="text-[30px] font-bold mb-4">
                {name}, we predict you’ll be{" "}
                <span style={{ color: "#00c853" }}>{formatWeightNoDecimal(goalWeight)}</span> by{" "}
                <span style={{ color: "#00c853" }}>{labels[3]} 6th</span>
            </h2>
            <div style={{ height: "300px" }}>
                <Line data={data} options={options} />
            </div>

            <div className="mt-16">
                <h3 className="text-[20px] font-bold">What people say</h3>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTestimonial}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#f9f9f9] rounded-2xl p-6 mt-4 max-w-xl mx-auto"
                    >
                        <p className="font-semibold">
                            {testimonials[currentTestimonial].name},{" "}
                            <span className="text-gray-500">{testimonials[currentTestimonial].country}</span>
                        </p>
                        <p className="text-yellow-500 my-1">⭐⭐⭐⭐⭐</p>
                        <p className="font-medium">{testimonials[currentTestimonial].text}</p>
                    </motion.div>
                </AnimatePresence>
                <div className="flex justify-center gap-2 mt-2">
                    {testimonials.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentTestimonial ? "bg-rose-500" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
                <p className="text-sm text-gray-400 mt-8">
                    The prediction above is based on the results of members like you and not a guarantee
                </p>
                <div className="sticky bottom-4 z-10 py-4">
                    <button
                        onClick={() => router.push("/halfwaythere")}
                        className="mt-8 px-8 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeightProgressChart;