"use client";
import React, { useState, useEffect } from 'react';
import { Activity, Crown, Shield, Target, CheckCircle, Star, Users, TrendingUp, Award, Heart, Mail, Gift, User, Phone } from 'lucide-react';
import collage from "@/assets/collagehero.png"
import girl from "@/assets/Hero.png"
import about from "@/assets/about.png"
import Image from 'next/image';
import { useRouter } from "next/navigation";

const BariatricFunnelPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    // Form states
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [isFormValid, setIsFormValid] = useState(false);
    const [formErrors, setFormErrors] = useState({ name: '', email: '' });
    const [animatedCards, setAnimatedCards] = useState([false, false, false, false, false, false]);
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });

        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        const delays = [500, 700, 900, 1100, 1300, 1500];
        delays.forEach((delay, index) => {
            setTimeout(() => {
                setAnimatedCards((prev) => {
                    const newState = [...prev];
                    newState[index] = true;
                    return newState;
                });
            }, delay);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(interval);
        };
    }, []);

    const testimonials = [
        {
            name: "Sarah Mitchell",
            result: "Lost 85lbs safely",
            text: "This meal plan made my post-surgery journey so much easier. I feel amazing and healthier than ever!",
            rating: 5,
            surgery: "Gastric Sleeve"
        },
        {
            name: "Michael Rodriguez",
            result: "Avoided complications",
            text: "The portion control and nutrition guidance helped me stay on track. Highly recommended for all bariatric patients!",
            rating: 5,
            surgery: "Gastric Bypass"
        },
        {
            name: "Jennifer Adams",
            result: "Energy levels doubled",
            text: "Finally, a meal plan that understands bariatric needs. The recipes are delicious and perfectly portioned.",
            rating: 5,
            surgery: "Lap Band"
        }
    ];

    const validateField = (name, value) => {
        let error = '';

        if (name === 'name') {
            if (!value || value.trim().length === 0) {
                error = 'Please enter your full name!';
            } else if (value.trim().length < 2) {
                error = 'Name must be at least 2 characters long!';
            } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                error = 'Name should only contain letters and spaces!';
            }
        }

        if (name === 'email') {
            if (!value || value.trim().length === 0) {
                error = 'Please enter your email address!';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = 'Please enter a valid email address!';
            }
        }

        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const trimmedValue = value.trim();

        setFormData(prev => ({ ...prev, [name]: value }));

        const error = validateField(name, trimmedValue);
        setFormErrors(prev => ({ ...prev, [name]: error }));

        const updatedFormData = { ...formData, [name]: value };
        const nameError = name === 'name' ? error : validateField('name', updatedFormData.name);
        const emailError = name === 'email' ? error : validateField('email', updatedFormData.email);

        const hasErrors = nameError || emailError;
        const hasAllFields = updatedFormData.name.trim() && updatedFormData.email.trim();

        setIsFormValid(hasAllFields && !hasErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameError = validateField('name', formData.name);
        const emailError = validateField('email', formData.email);

        if (nameError || emailError) {
            setFormErrors({ name: nameError, email: emailError });
            return;
        }

        try {
            // Save to localStorage with your exact keys
            localStorage.setItem('name', formData.name.trim());
            localStorage.setItem('userEmail', formData.email.trim());

            setFormSubmitted(true);
            console.log("Form submitted:", {
                name: formData.name.trim(),
                email: formData.email.trim()
            });
        } catch (error) {
            console.log("Form submission failed:", error);
        }
    };

    const handleContinueToSurvey = () => {
        router.push("/step1");

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-cyan-200/40 to-teal-200/40 rounded-full opacity-40 blur-lg animate-bounce" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="px-4 sm:px-6 lg:px-8 py-6">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl border border-teal-300/30">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                    BariatricPlan
                                </h1>
                                <p className="text-xs text-gray-500 -mt-1">Your transformation partner</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>Trusted by 10,000+ Patients</span>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-7 items-center">
                            {/* Content */}
                            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <div className="mb-6">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 text-teal-700 font-semibold text-sm border border-teal-200 backdrop-blur-sm">
                                        <Crown className="w-4 h-4 mr-2" />
                                        Trusted by 10,000+ Patients
                                    </span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                    <span className="text-gray-800">Transform Your Life with</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                                        Bariatric Meal Plans
                                    </span>
                                </h1>

                                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                                    Medically-approved nutrition for gastric sleeve, bypass & lap band patients. Achieve sustainable weight loss safely with our proven system.
                                </p>

                                {/* Trust Indicators */}
                                <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-teal-500" />
                                        <span>Nutritionist Approved</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-teal-500" />
                                        <span>Post-Surgery Safe</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-teal-500" />
                                        <span>Proven Results</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Visual */}
                            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-teal-100">
                                    {/* Main Visual */}
                                    <div className="relative mb-8">
                                        <div className="w-full h-64 sm:h-80 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                                            <Image
                                                src={collage}
                                                alt="Premium ribeye steak"
                                                className="w-full h-64 p-4 sm:h-80 object-cover rounded-2xl shadow-2xl"
                                            />
                                        </div>

                                        {/* Floating Quality Badges */}
                                        <div className="absolute -top-3 -right-3 bg-white p-3 rounded-xl shadow-lg animate-pulse border border-teal-200">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-teal-600">A+</div>
                                                <div className="text-xs text-gray-600">Grade</div>
                                            </div>
                                        </div>

                                        <div className="absolute -bottom-3 -left-3 bg-white p-3 rounded-xl shadow-lg animate-bounce border border-cyan-200">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-cyan-600">100%</div>
                                                <div className="text-xs text-gray-600">Safe</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center space-y-6">
                                        <div className="flex justify-center items-center space-x-4 mb-4">
                                            <Gift className="text-3xl text-yellow-500 animate-bounce" />
                                            <h2 className="text-teal-600 text-2xl font-bold">FREE BONUS!</h2>
                                            <Gift
                                                className="text-3xl text-yellow-500 animate-bounce"
                                                style={{ animationDelay: "0.5s" }}
                                            />
                                        </div>

                                        <p className="text-gray-600 text-base font-light">
                                            Complete our quick survey and get
                                        </p>

                                        <h1 className="text-teal-600 text-3xl lg:text-4xl font-bold animate-pulse">
                                            6+ FREE BARIATRIC GUIDES
                                        </h1>

                                        {/* Green Ribbon */}
                                        <div className="flex justify-center">
                                            <div className="relative inline-block">
                                                <div className="bg-teal-600 text-white font-bold px-6 py-2 rounded-sm relative z-10">
                                                    Worth $197 - Yours absolutely free!
                                                </div>
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 w-3 h-0 border-t-[20px] border-b-[20px] border-r-[12px] border-r-teal-700 border-t-transparent border-b-transparent"></div>
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 w-3 h-0 border-t-[20px] border-b-[20px] border-l-[12px] border-l-teal-700 border-t-transparent border-b-transparent"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-7 bg-gradient-to-r from-teal-500 to-cyan-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10" />
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-bounce" />
                    <div className="max-w-lg mx-auto relative z-10">
                        <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6">
                            {!formSubmitted ? (
                                <div>
                                    <div className="text-center mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                                            <Gift className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-gray-800 text-xl font-medium mb-2">
                                            Get Your FREE Guides Now!
                                        </h3>
                                        <p className="text-gray-600 font-light">
                                            Enter your details to start your transformation
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <User className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your full name"
                                                    className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300 ${formErrors.name ? 'border-red-500' : 'border-gray-200 hover:border-teal-300'
                                                        }`}
                                                />
                                            </div>
                                            {formErrors.name && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your email address"
                                                    className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300 ${formErrors.email ? 'border-red-500' : 'border-gray-200 hover:border-teal-300'
                                                        }`}
                                                />
                                            </div>
                                            {formErrors.email && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!isFormValid}
                                            className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-blinkJump"
                                        >
                                            Get My FREE Guides & Start Journey!
                                        </button>
                                    </form>

                                    <div className="mt-4 text-center">
                                        <p className="text-gray-500 text-sm font-light">
                                            100% secure • No spam
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-18 h-18 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                                        <CheckCircle className="w-7 h-7 text-green-500" />
                                    </div>
                                    <h3 className="text-green-600 text-xl font-medium mb-4">
                                        Welcome {formData.name}!
                                    </h3>
                                    <p className="text-gray-600 mb-6 font-light">
                                        Your free guides are waiting... Answer a few quick questions
                                    </p>
                                    <button
                                        onClick={handleContinueToSurvey}
                                        className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 h-11 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                                    >
                                        Continue to Survey
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-8 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { number: "10,000+", label: "Success Stories", icon: <Users className="w-6 h-6" /> },
                                { number: "95%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
                                { number: "30", label: "Day Results", icon: <Target className="w-6 h-6" /> },
                                { number: "24/7", label: "Expert Support", icon: <Award className="w-6 h-6" /> }
                            ].map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                                        <div className="text-2xl text-teal-500 mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                                            {stat.icon}
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">{stat.number}</h3>
                                        <p className="text-gray-600 font-medium text-sm">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Science Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-10 bg-gradient-to-br from-teal-50 to-cyan-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                                        The Science of <span className="text-teal-600">Bariatric</span>
                                        <br />
                                        <span className="text-cyan-600">Excellence</span>
                                    </h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-md">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Target className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">Phase-Based Nutrition</h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    Carefully structured meal plans that progress with your recovery, from clear liquids to solid foods, ensuring optimal healing.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-md">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Shield className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">Protein-First Approach</h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    Every meal prioritizes high-quality protein to support healing, muscle preservation, and optimal weight loss outcomes.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-md">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Activity className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">Medical Compliance</h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    All plans designed with bariatric guidelines and approved by certified nutritionists for your safety and success.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-teal-100">
                                    <div className="relative mb-8">
                                        <div className="w-full h-80 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-2xl shadow-2xl flex items-center justify-center">
                                            <Image
                                                src={girl}
                                                alt="Premium cuts of meat"
                                                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                                            />                                        </div>

                                        <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-xl border border-teal-200">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-teal-600">95%</div>
                                                <div className="text-xs text-gray-600">Success Rate</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-100 text-center">
                                            <div className="text-teal-600 mb-2 flex justify-center">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div className="text-lg font-bold text-gray-800">10,000+</div>
                                            <div className="text-xs text-gray-600">Success Stories</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-xl border border-cyan-100 text-center">
                                            <div className="text-cyan-600 mb-2 flex justify-center">
                                                <Award className="w-5 h-5" />
                                            </div>
                                            <div className="text-lg font-bold text-gray-800">24/7</div>
                                            <div className="text-xs text-gray-600">Expert Support</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What is Bariatric Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-7 bg-white">
                    <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 shadow-xl overflow-hidden rounded-2xl">
                            <div className="grid lg:grid-cols-2 gap-8 p-8">
                                <div className="space-y-6">
                                    <h2 className="text-gray-800 text-3xl font-bold mb-4">
                                        What is the Bariatric Diet?
                                    </h2>

                                    <p className="text-gray-600 text-base leading-relaxed font-light">
                                        The bariatric diet is a specialized nutrition approach designed for patients who have undergone weight loss surgery. By following carefully structured meal plans and portion guidelines, patients experience safe, sustainable weight loss while maintaining proper nutrition and healing.
                                    </p>

                                    <div className="bg-white p-6 rounded-xl border border-teal-200">
                                        <h4 className="text-teal-700 mb-3 text-lg font-semibold">
                                            What You Can Eat
                                        </h4>
                                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                            <div className="space-y-2">
                                                <p className="text-gray-700 font-medium">• Lean Proteins (Chicken, Fish)</p>
                                                <p className="text-gray-700 font-medium">• Greek Yogurt & Cottage Cheese</p>
                                                <p className="text-gray-700 font-medium">• Eggs (Various Preparations)</p>
                                                <p className="text-gray-700 font-medium">• Soft Cooked Vegetables</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-gray-700 font-medium">• Protein Shakes & Smoothies</p>
                                                <p className="text-gray-700 font-medium">• Low-Fat Dairy Products</p>
                                                <p className="text-gray-700 font-medium">• Bone Broth & Clear Soups</p>
                                                <p className="text-gray-700 font-medium">• Water & Sugar-Free Drinks</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { title: "Safe Weight Loss", desc: "Lose weight safely with medically-approved portion control" },
                                            { title: "Improved Health", desc: "Reduce comorbidities and improve overall wellbeing" },
                                            { title: "Proper Healing", desc: "Support post-surgery recovery with optimal nutrition" },
                                            { title: "Simplified Eating", desc: "Clear guidelines for each recovery phase" },
                                            { title: "Better Digestion", desc: "Gentle foods that work with your new stomach" },
                                            { title: "Stable Energy", desc: "Consistent nutrition prevents fatigue and weakness" }
                                        ].map((benefit, index) => (
                                            <div
                                                key={benefit.title}
                                                className={`bg-white p-4 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300 hover:scale-105 ${animatedCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div>
                                                        <h5 className="text-gray-800 mb-1 text-base font-medium">
                                                            {benefit.title}
                                                        </h5>
                                                        <p className="text-gray-600 text-sm font-light">
                                                            {benefit.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border-l-4 border-teal-500">
                                        <h4 className="text-teal-700 mb-3 text-lg font-semibold">
                                            How Does It Work?
                                        </h4>
                                        <p className="text-gray-600 font-light mb-3">
                                            After bariatric surgery, your stomach capacity is significantly reduced. Our phased approach ensures you get adequate protein and nutrients while allowing your body to heal properly and adjust to your new anatomy.
                                        </p>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p>• <strong>Phase 1-2:</strong> Clear liquids and full liquids (1-2 weeks)</p>
                                            <p>• <strong>Phase 3:</strong> Pureed and soft foods (2-4 weeks)</p>
                                            <p>• <strong>Phase 4+:</strong> Regular solid foods with portion control</p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border-l-4 border-cyan-500">
                                        <h4 className="text-cyan-700 mb-2 text-lg font-semibold">
                                            Perfect for All Surgery Types!
                                        </h4>
                                        <p className="text-gray-600 font-light mb-3">
                                            Our comprehensive guides work for gastric sleeve, bypass, lap band, and duodenal switch patients at every stage of recovery.
                                        </p>
                                        <div className="text-sm text-gray-700 space-y-1">
                                            <p>✓ Phase-specific meal plans</p>
                                            <p>✓ Portion control guidelines</p>
                                            <p>✓ Protein-first recipes</p>
                                            <p>✓ 24/7 nutritionist support</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="bg-white rounded-2xl p-6 h-full border border-teal-100">
                                        <div className="relative mb-6">
                                            <div className="w-full h-auto bg-gradient-to-br from-teal-400 to-cyan-400 rounded-lg shadow-lg flex items-center justify-center" style={{ aspectRatio: '3/2', maxHeight: '500px' }}>
                                                <Image
                                                    src={about}
                                                    alt="Animal-based nutrition foods"
                                                    className={`w-full h-auto object-contain rounded-lg shadow-lg transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                                    style={{ aspectRatio: '3/2', maxHeight: '500px' }}
                                                />                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-gray-800 text-xl font-bold text-center mb-4">
                                                Why Bariatric Diet Works
                                            </h4>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl text-center border border-teal-200 hover:scale-105 transition-transform">
                                                    <div className="text-2xl font-bold text-teal-600">60-80g</div>
                                                    <div className="text-sm text-gray-600">Daily Protein</div>
                                                </div>
                                                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-xl text-center border border-cyan-200 hover:scale-105 transition-transform">
                                                    <div className="text-2xl font-bold text-cyan-600">4-6oz</div>
                                                    <div className="text-sm text-gray-600">Meal Size</div>
                                                </div>
                                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl text-center border border-teal-200 hover:scale-105 transition-transform">
                                                    <div className="text-2xl font-bold text-teal-600">5-6</div>
                                                    <div className="text-sm text-gray-600">Small Meals</div>
                                                </div>
                                                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-xl text-center border border-cyan-200 hover:scale-105 transition-transform">
                                                    <div className="text-2xl font-bold text-cyan-600">64oz</div>
                                                    <div className="text-sm text-gray-600">Water Daily</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Second Form Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-7 bg-gradient-to-r from-teal-500 to-cyan-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10" />
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-bounce" />
                    <div className="max-w-lg mx-auto relative z-10">
                        <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-6">
                            {!formSubmitted ? (
                                <div>
                                    <div className="text-center mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                                            <Gift className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-gray-800 text-xl font-medium mb-2">
                                            Get Your FREE Guides Now!
                                        </h3>
                                        <p className="text-gray-600 font-light">
                                            Enter your details to start your transformation
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <User className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your full name"
                                                    className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300 ${formErrors.name ? 'border-red-500' : 'border-gray-200 hover:border-teal-300'
                                                        }`}
                                                />
                                            </div>
                                            {formErrors.name && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your email address"
                                                    className={`w-full h-12 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300 ${formErrors.email ? 'border-red-500' : 'border-gray-200 hover:border-teal-300'
                                                        }`}
                                                />
                                            </div>
                                            {formErrors.email && (
                                                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!isFormValid}
                                            className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-blinkJump"
                                        >
                                            Get My FREE Guides & Start Journey!
                                        </button>
                                    </form>

                                    <div className="mt-4 text-center">
                                        <p className="text-gray-500 text-sm font-light">
                                            100% secure • No spam
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-18 h-18 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                                        <CheckCircle className="w-7 h-7 text-green-500" />
                                    </div>
                                    <h3 className="text-green-600 text-xl font-medium mb-4">
                                        Welcome {formData.name}!
                                    </h3>
                                    <p className="text-gray-600 mb-6 font-light">
                                        Your free guides are waiting... Answer a few quick questions
                                    </p>
                                    <button
                                        onClick={handleContinueToSurvey}
                                        className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 h-11 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                                    >
                                        Continue to Survey
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Testimonial Carousel */}
                <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-cyan-50 to-teal-50">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                                Real People, <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Real Results</span>
                            </h2>
                            <p className="text-gray-600 text-lg">Join thousands who have already transformed their lives</p>
                        </div>

                        <div className="relative">
                            <div className="bg-white border border-teal-100 rounded-3xl p-8 text-center shadow-2xl">
                                <div className="mb-6">
                                    <div className="bg-gradient-to-r from-teal-100 to-cyan-100 px-4 py-2 rounded-full inline-block border border-teal-200 mb-4">
                                        <span className="text-teal-700 font-semibold text-sm">{testimonials[currentTestimonial].result}</span>
                                    </div>
                                </div>

                                <blockquote className="text-lg sm:text-xl text-gray-700 italic mb-6 leading-relaxed">
                                    {testimonials[currentTestimonial].text}
                                </blockquote>

                                <div>
                                    <h4 className="text-gray-800 font-bold text-lg mb-1">{testimonials[currentTestimonial].name}</h4>
                                    <div className="flex justify-center text-yellow-400 mb-4">
                                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-teal-600 text-sm font-medium">{testimonials[currentTestimonial].surgery}</p>
                                </div>
                            </div>

                            <div className="flex justify-center mt-6 space-x-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                                            ? 'bg-teal-500 scale-125'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl border border-teal-300/30">
                                        <Activity className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                            BariatricPlan
                                        </h1>
                                        <p className="text-xs text-gray-400 -mt-1">Your transformation partner</p>
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed max-w-md">
                                    Transform your post-surgery journey with medically-approved meal plans. Join thousands who have achieved their weight loss goals safely and sustainably.
                                </p>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span>10,000+ Success Stories</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <Heart className="w-4 h-4 text-teal-400" />
                                        <span>95% Success Rate</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-4 flex items-center">
                                    <Target className="w-4 h-4 mr-2 text-teal-400" />
                                    Quick Links
                                </h3>
                                <ul className="space-y-3">
                                    <li><a href="#science" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">Science & Research</a></li>
                                    <li><a href="#testimonials" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">Success Stories</a></li>
                                    <li><a href="#what-is-bariatric" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">What is Bariatric?</a></li>
                                    <li><a href="#benefits" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">Benefits</a></li>
                                    <li><a href="#start" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">Start Your Journey</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-4 flex items-center">
                                    <Shield className="w-4 h-4 mr-2 text-teal-400" />
                                    Support
                                </h3>
                                <ul className="space-y-3">
                                    <li><a href="#community" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">Community</a></li>
                                    <li className="flex items-center space-x-2 text-sm text-gray-400">
                                        <Phone className="w-3 h-3" />
                                        <span>24/7 Expert Support</span>
                                    </li>
                                    <li className="flex items-center space-x-2 text-sm text-gray-400">
                                        <Mail className="w-3 h-3" />
                                        <span>support@bariatric.com</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-800">
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                                <div className="flex items-center space-x-6 text-sm text-gray-400">
                                    <span>© 2025 BariatricPlan. All rights reserved.</span>
                                </div>

                                <div className="flex items-center space-x-6 text-sm">
                                    <a href="#privacy" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">Privacy Policy</a>
                                    <a href="#terms" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">Terms of Service</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <style jsx>{`
              @keyframes blinkJump {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.7; }
              }
              .animate-blinkJump {
                animation: blinkJump 1.5s infinite;
              }
            
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(-25%);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(0);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                .animate-bounce {
                    animation: bounce 1s infinite;
                }
            `}</style>
        </div>
    );
};

export default BariatricFunnelPage;