"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from "next/navigation";
import {
    Shield,
    Eye,
    Lock,
    UserCheck,
    Database,
    Globe,
    Mail,
    Phone,
    Calendar,
    FileText,
    CheckCircle,
    AlertTriangle,
    ArrowRight,
    Menu,
    X,
    Activity,
    Heart,
    Users,
    Target,
    Sparkles,
    Zap,
    Scale,
    CreditCard,
    XCircle,
    AlertCircle
} from 'lucide-react';

const TermsConditionsPage = () => {
    const [isVisible, setIsVisible] = useState({});
    const [scrollY, setScrollY] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();
    // Throttled scroll handler
    const handleScroll = useCallback(() => {
        const y = window.scrollY;
        if (Math.abs(y - scrollY) > 5) {
            setScrollY(y);
            setScrolled(y > 20);
        }
    }, [scrollY]);

    const handleBackToHome = () => {
        // In a real Next.js app, you'd use: router.push("/home")
        router.push("/home");
    };

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

    // Intersection Observer for animations
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

    // Background transforms for parallax effect
    const backgroundTransforms = {
        first: { transform: `translateY(${scrollY * 0.1}px)` },
        second: { transform: `translateY(${scrollY * 0.15}px)` },
        third: { transform: `translateY(${scrollY * -0.1}px)` }
    };

    const termsSections = [
        {
            id: 'service-agreement',
            title: 'Service Agreement',
            icon: <Scale className="w-6 h-6" />,
            content: [
                {
                    subtitle: 'Acceptance of Terms',
                    details: 'By accessing or using BariatricPlan, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please discontinue use of our services immediately.'
                },
                {
                    subtitle: 'Service Description',
                    details: 'BariatricPlan provides personalized meal planning and nutritional guidance specifically designed for individuals who have undergone bariatric surgery. Our services are educational and supportive in nature.'
                },
                {
                    subtitle: 'Eligibility',
                    details: 'You must be at least 18 years old and have undergone or be scheduled for bariatric surgery to use our services. You must provide accurate health information for personalized meal planning.'
                }
            ]
        },
        {
            id: 'user-responsibilities',
            title: 'User Responsibilities',
            icon: <UserCheck className="w-6 h-6" />,
            content: [
                {
                    subtitle: 'Account Security',
                    details: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.'
                },
                {
                    subtitle: 'Accurate Information',
                    details: 'You must provide accurate, current, and complete information about your health status, surgery type, and dietary needs. Inaccurate information may result in inappropriate meal recommendations.'
                },
                {
                    subtitle: 'Medical Supervision',
                    details: 'Our meal plans are recommendations only. You must follow your healthcare provider\'s specific instructions and obtain approval before making any dietary changes post-surgery.'
                }
            ]
        },
        {
            id: 'payment-refunds',
            title: 'Payment & Refund Policy',
            icon: <CreditCard className="w-6 h-6" />,
            content: [
                {
                    subtitle: 'Payment Terms',
                    details: 'Subscription fees are charged in advance on a monthly or annual basis. Payment is due immediately upon subscription activation. We accept major credit cards and secure payment methods.'
                },
                {
                    subtitle: 'No Refund Policy',
                    details: 'All sales are final. We do not offer refunds for subscription fees, whether monthly or annual, regardless of usage or satisfaction. This policy applies to all circumstances without exception.'
                },
                {
                    subtitle: 'Subscription Changes',
                    details: 'You may cancel your subscription at any time, but cancellation will take effect at the end of your current billing period. No partial refunds will be provided for unused portions of your subscription.'
                }
            ]
        },
        {
            id: 'service-limitations',
            title: 'Service Limitations',
            icon: <AlertCircle className="w-6 h-6" />,
            content: [
                {
                    subtitle: 'Not Medical Advice',
                    details: 'BariatricPlan provides nutritional guidance and meal suggestions. We do not provide medical advice, diagnosis, or treatment. Always consult your healthcare provider for medical decisions.'
                },
                {
                    subtitle: 'Individual Results',
                    details: 'Results may vary among users. Our meal plans are based on general bariatric nutrition principles and your provided information. Individual outcomes depend on many factors beyond our control.'
                },
                {
                    subtitle: 'Service Availability',
                    details: 'We strive to maintain service availability but do not guarantee uninterrupted access. We may temporarily suspend service for maintenance, updates, or technical issues without prior notice.'
                }
            ]
        },
        {
            id: 'prohibited-uses',
            title: 'Prohibited Uses',
            icon: <XCircle className="w-6 h-6" />,
            content: [
                {
                    subtitle: 'Unauthorized Access',
                    details: 'You may not attempt to gain unauthorized access to our systems, other user accounts, or any part of the service through hacking, password mining, or any other means.'
                },
                {
                    subtitle: 'Content Misuse',
                    details: 'You may not copy, reproduce, distribute, or create derivative works from our meal plans, educational content, or proprietary materials without written permission.'
                },
                {
                    subtitle: 'Account Sharing',
                    details: 'Your account is for personal use only. Sharing login credentials or allowing others to access your account is strictly prohibited and may result in account termination.'
                }
            ]
        },
        {
            id: 'termination',
            title: 'Account Termination',
            icon: <Lock className="w-6 h-6" />,
            content: [
                {
                    subtitle: 'User Termination',
                    details: 'You may terminate your account at any time through your account settings or by contacting customer support. Termination will take effect at the end of your current billing period.'
                },
                {
                    subtitle: 'Service Termination',
                    details: 'We reserve the right to terminate or suspend your account immediately for violation of these terms, fraudulent activity, or any conduct we deem harmful to our service or other users.'
                },
                {
                    subtitle: 'Data Retention',
                    details: 'Upon termination, your account data will be retained according to our Privacy Policy. You may request account data deletion, subject to legal and safety requirements.'
                }
            ]
        }
    ];

    const quickLinks = [
        { name: 'Service Agreement', id: 'service-agreement' },
        { name: 'User Responsibilities', id: 'user-responsibilities' },
        { name: 'Payment & Refunds', id: 'payment-refunds' },
        { name: 'Service Limitations', id: 'service-limitations' },
        { name: 'Prohibited Uses', id: 'prohibited-uses' },
        { name: 'Account Termination', id: 'termination' }
    ];

    const handleSectionClick = (sectionId: any) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-pulse mb-4 mx-auto">
                        <Scale className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xl font-semibold text-gray-600">Loading Terms & Conditions...</p>
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
                                <p className="text-xs text-gray-500 group-hover:text-emerald-500 transition-colors duration-300 -mt-1">Terms & Conditions</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-6">
                            <button
                                onClick={handleBackToHome}
                                className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium"
                            >
                                Back to Home
                            </button>
                            <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium">
                                Contact
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
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

                {/* Mobile Menu Dropdown */}
                <div
                    className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-emerald-200/50 shadow-2xl transition-all duration-300 ease-out ${mobileMenuOpen
                        ? 'opacity-100 visible transform translate-y-0'
                        : 'opacity-0 invisible transform -translate-y-4'
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() => {
                                    handleBackToHome();
                                    setMobileMenuOpen(false);
                                }}
                                className="text-left px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300 font-medium"
                            >
                                Back to Home
                            </button>
                            <button
                                onClick={() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    setMobileMenuOpen(false);
                                }}
                                className="text-left px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300 font-medium"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12" data-animate id="hero-content">
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-2xl mb-6 animate-pulse">
                                <Scale className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Terms &
                            </span>
                            {' '}
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                Conditions
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                            Please read these terms carefully before using BariatricPlan. By using our service, you agree to be bound by these terms and conditions.
                        </p>

                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-8">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-emerald-500" />
                                <span>Last Updated: August 28, 2025</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <XCircle className="w-4 h-4 text-red-500" />
                                <span>No Refund Policy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Navigation */}
            <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-emerald-100/50 sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {quickLinks.map((link, index) => (
                            <button
                                key={link.id}
                                onClick={() => handleSectionClick(link.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeSection === link.id
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 border border-emerald-200/50'
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Terms Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-40">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-100/50">
                                <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                                    <FileText className="w-5 h-5 text-emerald-500" />
                                    <span>Quick Navigation</span>
                                </h3>
                                <div className="space-y-2">
                                    {quickLinks.map((link) => (
                                        <button
                                            key={link.id}
                                            onClick={() => handleSectionClick(link.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${activeSection === link.id
                                                ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 font-medium'
                                                : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50'
                                                }`}
                                        >
                                            {link.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <div className="space-y-12">
                            {termsSections.map((section, sectionIndex) => (
                                <div
                                    key={section.id}
                                    id={section.id}
                                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-100/50 hover:shadow-2xl transition-all duration-500"
                                    data-animate
                                    style={{ animationDelay: `${sectionIndex * 200}ms` }}
                                >
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{section.title}</h2>
                                    </div>

                                    <div className="space-y-6">
                                        {section.content.map((item, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                className="border-l-4 border-emerald-200 pl-6 py-4 hover:border-emerald-400 transition-colors duration-300"
                                            >
                                                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                                    <span>{item.subtitle}</span>
                                                </h4>
                                                <p className="text-gray-600 leading-relaxed">{item.details}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* No Refund Notice */}
                            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8 shadow-xl">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                        <XCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">Important: No Refund Policy</h3>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            All subscription fees are non-refundable. This includes monthly and annual subscriptions, regardless of usage,
                                            satisfaction, or circumstances. By subscribing to BariatricPlan, you acknowledge and accept this no-refund policy.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed">
                                            We encourage you to try our free resources and consult with your healthcare provider before subscribing
                                            to ensure our service aligns with your needs and expectations.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Disclaimer */}
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 shadow-xl">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">Medical Disclaimer</h3>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            BariatricPlan provides nutritional guidance and meal planning services for educational purposes only.
                                            We do not provide medical advice, diagnosis, or treatment. Always consult with your bariatric surgeon,
                                            registered dietitian, or healthcare provider before making changes to your post-surgery nutrition plan.
                                        </p>
                                        <p className="text-gray-700 leading-relaxed">
                                            Individual results may vary. Your use of our service is at your own risk, and you assume full responsibility
                                            for any decisions made regarding your diet and health based on our recommendations.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white shadow-2xl">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
                                    <p className="text-emerald-100 mb-6 leading-relaxed">
                                        If you have questions about these Terms and Conditions or need clarification about our policies,
                                        please don’t hesitate to contact us.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                        <a
                                            href="mailto:legal@bariatricplan.com"
                                            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <Mail className="w-5 h-5" />
                                            <span>benywilson3@gmail.com</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-white py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
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
                        </div>

                        <div>
                            <h4 className="text-white mb-4 text-lg font-semibold">Legal</h4>
                            <div className="space-y-3">
                                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 block">
                                    Terms & Conditions
                                </a>
                                <a onClick={() => router.push("/privacypolicy")} className="cursor-pointer text-gray-400 hover:text-emerald-400 transition-colors duration-300 block">
                                    Privacy Policy
                                </a>

                            </div>
                        </div>

                        <div>
                            <h4 className="text-white mb-4 text-lg font-semibold">Contact</h4>
                            <div className="space-y-3">
                                <div className="text-gray-400">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    benywilson3@gmail.com
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            © 2024 BariatricPlan. All rights reserved. These terms are effective as of August 28, 2025.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Enhanced CSS Animations */}
            <style jsx>{`
        @keyframes fadeInUp {
          from { 
            transform: translateY(30px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }

        @keyframes slideInLeft {
          from { 
            transform: translateX(-30px); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }

        @keyframes slideInRight {
          from { 
            transform: translateX(30px); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }

        @keyframes scaleIn {
          from { 
            transform: scale(0.8); 
            opacity: 0; 
          }
          to { 
            transform: scale(1); 
            opacity: 1; 
          }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3);
          }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.05); }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
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

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }

        .animate-shimmer {
          overflow: hidden;
          position: relative;
        }

        .animate-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent
          );
          animation: shimmer 2s infinite;
        }

        .will-change-transform {
          will-change: transform;
        }

        [data-animate] {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        [data-animate].slide-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        [data-animate].slide-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        [data-animate].scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          [data-animate] {
            opacity: 1;
            transform: none;
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #10b981, #14b8a6);
          border-radius: 8px;
          transition: background 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #059669, #0d9488);
        }

        ::-webkit-scrollbar-corner {
          background: #f1f5f9;
        }

        ::selection {
          background: rgba(16, 185, 129, 0.2);
          color: #065f46;
        }

        ::-moz-selection {
          background: rgba(16, 185, 129, 0.2);
          color: #065f46;
        }

        .focus-ring:focus {
          outline: 2px solid #10b981;
          outline-offset: 2px;
        }

        .loading-skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .interactive:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease;
        }

        .interactive:active {
          transform: scale(0.98);
        }

        .backdrop-blur-fallback {
          background: rgba(255, 255, 255, 0.9);
        }

        @supports (backdrop-filter: blur(12px)) {
          .backdrop-blur-fallback {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
          }
        }
      `}</style>
        </div>
    );
};

export default TermsConditionsPage;