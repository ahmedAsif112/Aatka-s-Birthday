"use client";

import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Menu, X, Heart, Activity, Target, Shield, Users, CheckCircle, Star, ArrowRight, Download, Play, Zap, Sparkles, Mail } from 'lucide-react';
import bowl from "@/assets/Bowl.png"
import egg from "@/assets/egg.png"
import lunch from "@/assets/lunch.png"
import about from "@/assets/about.png"
import hero from "@/assets/Hero.png"
import { useRouter } from "next/navigation";
import Image from 'next/image';
const BariatricMealPlan = () => {
    const [isVisible, setIsVisible] = useState({});
    const [scrollY, setScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const router = useRouter();

    // Throttled scroll handler
    const handleScroll = useCallback(() => {
        const y = window.scrollY;
        if (Math.abs(y - scrollY) > 5) {
            setScrollY(y);
            setScrolled(y > 20);
        }
    }, [scrollY]);

    useEffect(() => {
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
        setIsLoaded(true);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, [handleScroll]);

    // Optimize intersection observer
    useEffect(() => {
        if (!isLoaded) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const updates = {};
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const updates: Record<string, boolean> = {};
                        updates[entry.target.id] = true;
                    }
                });

                if (Object.keys(updates).length > 0) {
                    setIsVisible((prev) => ({ ...prev, ...updates }));
                }
            },
            {
                threshold: 0.1,
                rootMargin: "50px",
            }
        );

        const elements = document.querySelectorAll("[data-animate]");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [isLoaded]);

    const features = useMemo(() => [
        {
            icon: <Target className="w-8 h-8" />,
            title: "Personalized Plans",
            description: "Custom meal plans tailored to your specific bariatric surgery type and recovery stage.",
            color: "from-emerald-400 to-teal-500"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Medical Compliance",
            description: "All plans are designed with bariatric guidelines and approved by certified nutritionists.",
            color: "from-blue-400 to-indigo-500"
        },
        {
            icon: <Activity className="w-8 h-8" />,
            title: "Progress Tracking",
            description: "Monitor your nutritional intake, weight loss, and health improvements with our tools.",
            color: "from-purple-400 to-pink-500"
        }
    ], []);

    const testimonials = useMemo(() => [
        {
            name: "Sarah Mitchell",
            text: "This meal plan made my post-surgery journey so much easier. I've lost 85 lbs safely and feel amazing!",
            rating: 5,
            surgery: "Gastric Sleeve",
            timeframe: "8 months post-op"
        },
        {
            name: "Michael Rodriguez",
            text: "The portion control and nutrition guidance helped me avoid complications. Highly recommended!",
            rating: 5,
            surgery: "Gastric Bypass",
            timeframe: "1 year post-op"
        },
        {
            name: "Jennifer Adams",
            text: "Finally, a meal plan that understands bariatric needs. The recipes are delicious and filling.",
            rating: 5,
            surgery: "Lap Band",
            timeframe: "6 months post-op"
        }
    ], []);

    const mealTypes = useMemo(() => [
        {
            name: "Protein-Rich Breakfast",
            image: egg,
            calories: "200-300",
            protein: "25-30g",
            phase: "All Phases"
        },
        {
            name: "Soft Foods Lunch",
            image: lunch,
            calories: "250-350",
            protein: "20-25g",
            phase: "Phase 3+"
        },
        {
            name: "Nutrient-Dense Dinner",
            image: bowl,
            calories: "300-400",
            protein: "30-35g",
            phase: "Phase 4+"
        }
    ], []);

    const stats = useMemo(() => [
        { number: "10K+", label: "Success Stories", icon: <Users className="w-6 h-6" /> },
        { number: "500+", label: "Approved Recipes", icon: <Heart className="w-6 h-6" /> },
        { number: "95%", label: "Success Rate", icon: <Target className="w-6 h-6" /> },
        { number: "24/7", label: "Nutritionist Support", icon: <Shield className="w-6 h-6" /> }
    ], []);

    const backgroundTransforms = useMemo(() => ({
        first: { transform: `translateY(${scrollY * 0.1}px)` },
        second: { transform: `translateY(${scrollY * 0.15}px)` },
        third: { transform: `translateY(${scrollY * -0.1}px)` }
    }), [scrollY]);

    const menuItems = ['Home', 'About', 'Plans', 'Success Stories', 'Contact'];

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-pulse mb-4 mx-auto">
                        <Activity className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xl font-semibold text-gray-600">Loading Your Transformation...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 overflow-x-hidden">
            {/* Floating Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full opacity-20 blur-xl will-change-transform"
                    style={backgroundTransforms.first}
                />
                <div
                    className="absolute top-40 left-10 w-24 h-24 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-30 blur-lg will-change-transform"
                    style={backgroundTransforms.second}
                />
                <div
                    className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-r from-teal-200 to-emerald-200 rounded-full opacity-15 blur-2xl will-change-transform"
                    style={backgroundTransforms.third}
                />
            </div>

            {/* Enhanced Navigation Header */}
            <div className="fixed top-0 left-0 w-full h-32 overflow-hidden pointer-events-none z-40">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -top-5 right-1/4 w-32 h-32 bg-teal-200/20 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
                <div className="absolute top-0 right-10 w-24 h-24 bg-blue-200/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${scrolled
                ? 'bg-white/95 backdrop-blur-2xl shadow-2xl shadow-emerald-500/10 border-b border-emerald-200/50'
                : 'bg-white/80 backdrop-blur-xl border-b border-emerald-100/30'
                }`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 via-blue-400 to-emerald-400 bg-size-200 animate-gradient"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-4 group cursor-pointer relative">
                            <div className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                <Zap className="w-3 h-3 text-teal-400 animate-spin" style={{ animationDuration: '3s' }} />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 w-14 h-14 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-30 scale-75 group-hover:scale-110 transition-all duration-500 blur-sm"></div>
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 group-hover:shadow-3xl group-hover:shadow-emerald-500/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    <Activity className="w-6 h-6 text-white relative z-10" />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:via-teal-600 group-hover:to-blue-700 transition-all duration-500">
                                    BariatricPlan
                                </h1>
                                <p className="text-xs text-gray-500 group-hover:text-emerald-500 transition-colors duration-300 -mt-1">Your transformation partner</p>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {menuItems.map((item, index) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    className="cursor-pointer relative text-gray-700 hover:text-emerald-600 transition-all duration-400 font-medium group px-3 py-2"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <span className="relative z-10">{item}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-400 group-hover:w-full rounded-full"></span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                                    <Heart className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500" />
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex items-center space-x-4">
                            <button onClick={() => router.push("/weightloss")} className="hidden sm:flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white font-semibold rounded-full shadow-2xl shadow-emerald-500/40 hover:shadow-3xl hover:shadow-emerald-500/60 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                <Target className="w-5 h-5 relative z-10 group-hover:animate-pulse" />
                                <span className="relative z-10">Start Your Journey</span>
                            </button>

                            <button
                                className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 transition-all duration-300 hover:scale-110"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6 text-emerald-600" />
                                ) : (
                                    <Menu className="w-6 h-6 text-emerald-600" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="bg-white/95 backdrop-blur-xl border-t border-emerald-200/50 shadow-inner">
                        <div className="px-6 py-6 space-y-4">
                            {menuItems.map((item, index) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="cursor-pointer block text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:scale-105 transform"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animation: mobileMenuOpen ? "slideInUp 0.5s ease-out forwards" : "",
                                    }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                                        <span>{item}</span>
                                    </div>
                                </a>
                            ))}

                            <button className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Target className="w-5 h-5 relative z-10" />
                                <span className="relative z-10">Start Your Journey</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="flex items-center pt-24 pb-12 relative z-10 min-h-[95vh] lg:min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="flex flex-col gap-4 text-center lg:text-left order-2 lg:order-1">
                            <div className="mb-4">
                                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-600 font-semibold text-sm animate-pulse">
                                    Trusted by 10,000+ Patients
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5 leading-tight">
                                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    Transform Your Life with
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                    Bariatric Meal Plans
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Medically-approved nutrition for gastric sleeve, bypass & lap band patients.
                                Achieve sustainable weight loss safely.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                                <button onClick={() => router.push("/weightloss")} className="flex items-center justify-center space-x-2 h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                    <Play className="w-5 h-5" />
                                    <span>Get My Custom Plan</span>
                                </button>
                                <button onClick={() => router.push("/signup")} className="flex items-center justify-center space-x-2 h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold border-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 rounded-full">
                                    <Download className="w-5 h-5" />
                                    <span>Download Guide</span>
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mb-5 flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 text-sm text-gray-500">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    <span>Nutritionist Approved</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    <span>Post-Surgery Safe</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    <span>Proven Results</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative max-w-sm sm:max-w-md lg:max-w-lg mx-auto order-1 lg:order-2">
                            {/* Main Hero Image */}
                            <div className="relative group">
                                <div className="w-full h-72 sm:h-96 lg:h-[420px] bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20"></div>
                                    <Image
                                        src={hero}
                                        alt="Healthy bariatric meal preparation"
                                        className="w-full h-full object-cover rounded-3xl"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                                </div>

                                {/* Enhanced Floating Elements */}
                                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-2xl animate-bounce border-2 border-emerald-100 hover:shadow-3xl transition-shadow duration-300" style={{ animationDelay: '0.5s' }}>
                                    <Activity className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-2xl animate-bounce border-2 border-teal-100 hover:shadow-3xl transition-shadow duration-300" style={{ animationDelay: '1s' }}>
                                    <Target className="w-6 h-6 text-teal-500" />
                                </div>
                                <div className="absolute top-1/2 -left-6 bg-white p-3 rounded-xl shadow-xl animate-pulse border-2 border-emerald-100 hover:shadow-2xl transition-shadow duration-300" style={{ animationDelay: '1.5s' }}>
                                    <Heart className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="hidden lg:block absolute top-16 -right-8 bg-white p-3 rounded-xl shadow-xl animate-pulse border-2 border-blue-100 hover:shadow-2xl transition-shadow duration-300" style={{ animationDelay: '2s' }}>
                                    <Shield className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="hidden sm:block absolute bottom-16 -right-6 bg-white p-2 rounded-lg shadow-lg animate-bounce border border-purple-100" style={{ animationDelay: '2.5s' }}>
                                    <Users className="w-4 h-4 text-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-gradient-to-br from-white to-emerald-50 border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 p-6 rounded-2xl">
                                    <div className="text-3xl text-emerald-500 mb-2 flex justify-center">{stat.icon}</div>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</h3>
                                    <p className="text-gray-600 font-medium">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-animate id="features-header">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                            Why Choose <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">BariatricPlan</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive nutrition support designed specifically for bariatric surgery patients at every stage of recovery
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="text-center bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 group"
                            >
                                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg text-white`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-gray-800 mb-4 text-xl sm:text-2xl font-bold">{feature.title}</h3>
                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meal Plans Section */}
            <section id="plans" className="py-20 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16" data-animate id="plans-header">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                            Sample <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Meal Plans</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                            Carefully crafted meals that meet your nutritional needs at every recovery phase
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                        {mealTypes.map((meal, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
                            >
                                <div className="relative overflow-hidden">
                                    {typeof meal.image === "string" ? (
                                        <img
                                            src={meal.image}
                                            alt={meal.name}
                                            className="h-48 sm:h-56 w-full object-cover group-hover:scale-110 transition-all duration-500"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <Image
                                            src={meal.image}
                                            alt={meal.name}
                                            className="h-48 sm:h-56 w-full object-cover group-hover:scale-110 transition-all duration-500"
                                            width={400}
                                            height={300}
                                            style={{ objectFit: "cover" }}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-gray-800 mb-3 text-lg sm:text-xl font-bold">{meal.name}</h4>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-full">
                                            {meal.calories} cal
                                        </span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                            {meal.protein} protein
                                        </span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full">
                                            {meal.phase}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-emerald-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="success-stories" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                            Real <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Success Stories</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600">
                            See how our personalized meal plans have transformed lives
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                                <div className="mb-6">
                                    <div className="flex justify-center mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-base sm:text-lg text-gray-600 italic leading-relaxed mb-6">
                                        {testimonial.text}
                                    </p>
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-gray-800 mb-1 text-lg font-semibold">{testimonial.name}</h4>
                                    <p className="text-emerald-600 text-sm mb-1 font-medium">{testimonial.surgery}</p>
                                    <p className="text-gray-500 text-sm">{testimonial.timeframe}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white relative z-10">                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div data-animate id="about-content">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                            Post-Surgery <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Nutrition Made Simple</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-gray-800 mb-2 font-semibold text-lg">Phase-Based Nutrition</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Carefully structured meal plans that progress with your recovery, from clear liquids to solid foods.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-gray-800 mb-2 font-semibold text-lg">Protein-First Approach</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Every meal prioritizes high-quality protein to support healing, muscle preservation, and satiety.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-gray-800 mb-2 font-semibold text-lg">Vitamin & Mineral Support</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Comprehensive supplementation guidance to prevent deficiencies common after bariatric surgery.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative" data-animate id="about-image">
                        <div className="relative group">
                            <Image
                                src={about}
                                alt="Healthy meal planning and nutrition"
                                className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                        </div>

                        {/* Floating nutrition facts */}
                        <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce border-2 border-emerald-100" style={{ animationDelay: '0.5s' }}>
                            <div className="text-center">
                                <p className="text-xs text-gray-500">Daily Protein</p>
                                <p className="text-lg font-bold text-emerald-600">60-80g</p>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce border-2 border-teal-100" style={{ animationDelay: '1s' }}>
                            <div className="text-center">
                                <p className="text-xs text-gray-500">Meal Size</p>
                                <p className="text-lg font-bold text-teal-600">4-6oz</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-500 text-white relative overflow-hidden z-10">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>

                {/* Animated background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div data-animate id="cta-content">
                        <div className="mb-6">
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white font-semibold text-sm backdrop-blur-sm">
                                Limited Time - Free Consultation Included
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Post-Surgery Journey?
                        </h2>
                        <p className="text-lg sm:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of successful bariatric patients who have achieved their weight loss goals with our personalized meal plans
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <button onClick={() => router.push("/signup")} className="flex items-center justify-center space-x-2 h-14 px-8 text-lg font-semibold bg-white text-emerald-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                <Target className="w-5 h-5" />
                                <span>Get Your Custom Plan - $27.99</span>
                            </button>

                        </div>

                        <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-100">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4" />
                                <span>30-Day Money Back Guarantee</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4" />
                                <span>Instant Digital Access</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4" />
                                <span>Free Nutritionist Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-white py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
                        <div className="lg:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-3xl font-bold text-white">BariatricPlan</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                                Your trusted partner for post-bariatric surgery nutrition. We provide medically-approved meal plans
                                that support your weight loss journey and long-term health goals.
                            </p>
                            <div className="flex space-x-4">
                                <button className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors duration-300">
                                    <Heart className="w-5 h-5 text-white" />
                                </button>
                                <button className="w-10 h-10 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-300">
                                    <Users className="w-5 h-5 text-white" />
                                </button>
                                <button className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300">
                                    <Shield className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white mb-4 text-lg font-semibold">Quick Links</h4>
                            <div className="space-y-3">
                                {['Home', 'About', 'Plans', 'Success Stories', 'Contact'].map((link) => (
                                    <div key={link}>
                                        <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 block">
                                            {link}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white mb-4 text-lg font-semibold">Surgery Types</h4>
                            <div className="space-y-3">
                                {['Gastric Sleeve', 'Gastric Bypass', 'Lap Band', 'Duodenal Switch'].map((surgery) => (
                                    <div key={surgery}>
                                        <span className="text-gray-400 block">{surgery}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white mb-4 text-lg font-semibold">Contact Us</h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-emerald-400" />
                                    <div>
                                        <p className="text-gray-400 text-sm">Email</p>
                                        <a href="mailto:support@bariatricplan.com" className="text-white hover:text-emerald-400 transition-colors duration-300">
                                            benywilson3@gmail.com
                                        </a>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm mb-4 md:mb-0">
                                © 2024 BariatricPlan. All rights reserved. Consult your healthcare provider before starting any meal plan.
                            </p>
                            <div className="flex space-x-6">
                                <a onClick={() => router.push("/privacypolicy")} className="cursor-pointer text-gray-400 hover:text-emerald-400 transition-colors text-sm">Privacy Policy</a>
                                <a onClick={() => router.push("/termsofservice")} className="cursor-pointer text-gray-400 hover:text-emerald-400 transition-colors text-sm">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Enhanced CSS Animations */}
            <style jsx>{`
        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Enhanced animations */
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.8); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #10b981, #14b8a6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #059669, #0d9488);
        }

        /* Optimized hover effects */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
        }

        /* Loading animation */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Pulsing animation for floating elements */
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.05); }
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default BariatricMealPlan;