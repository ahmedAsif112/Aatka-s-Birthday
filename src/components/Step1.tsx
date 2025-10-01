"use client";
import React, { useState, useEffect } from 'react';
import { Activity, ArrowRight, User } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function BariatricSurveyForm() {
    const [isVisible, setIsVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        height: '',
        height_feet: '',
        height_inches: '',
        weight: ''
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        setIsVisible(true);
    }, []);
    const router = useRouter();

    const validateField = (name, value) => {
        let error = '';

        if (name === 'age') {
            const ageNum = parseInt(value);
            if (!value) {
                error = 'Please enter your age!';
            } else if (ageNum < 16 || ageNum > 100) {
                error = 'Age must be between 16 and 100!';
            }
        }

        if (name === 'height' && heightUnit === 'cm') {
            const heightNum = parseInt(value);
            if (!value) {
                error = 'Please enter your height!';
            } else if (heightNum < 100 || heightNum > 250) {
                error = 'Height must be between 100 and 250 cm!';
            }
        }

        if (name === 'height_feet' && heightUnit === 'ft') {
            const feetNum = parseInt(value);
            if (!value) {
                error = 'Please enter feet!';
            } else if (feetNum < 3 || feetNum > 8) {
                error = 'Feet must be between 3 and 8!';
            }
        }

        if (name === 'height_inches' && heightUnit === 'ft') {
            const inchesNum = parseInt(value);
            if (value === '') {
                error = 'Please enter inches!';
            } else if (inchesNum < 0 || inchesNum > 11) {
                error = 'Inches must be between 0 and 11!';
            }
        }

        if (name === 'weight') {
            const weightNum = parseInt(value);
            const min = weightUnit === 'kg' ? 30 : 66;
            const max = weightUnit === 'kg' ? 300 : 660;
            if (!value) {
                error = 'Please enter your weight!';
            } else if (weightNum < min || weightNum > max) {
                error = `Weight must be between ${min} and ${max} ${weightUnit}!`;
            }
        }

        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setFormErrors(prev => ({ ...prev, [name]: error }));

        setTimeout(() => checkFormValidity({ ...formData, [name]: value }), 0);
    };

    const handleGenderChange = (gender) => {
        setFormData(prev => ({ ...prev, gender }));
        setFormErrors(prev => ({ ...prev, gender: '' }));
        setTimeout(() => checkFormValidity({ ...formData, gender }), 0);
    };

    const checkFormValidity = (data) => {
        let requiredFields = ['gender', 'age', 'weight'];
        if (heightUnit === 'cm') {
            requiredFields.push('height');
        } else {
            requiredFields.push('height_feet', 'height_inches');
        }

        const allFieldsFilled = requiredFields.every(field => {
            const value = data[field];
            return value !== '' && value !== null && value !== undefined;
        });

        const currentErrors = {};
        requiredFields.forEach(field => {
            if (data[field]) {
                const err = validateField(field, data[field]);
                if (err) currentErrors[field] = err;
            }
        });

        const hasErrors = Object.keys(currentErrors).length > 0;

        setIsFormValid(allFieldsFilled && !hasErrors);
    };

    const handleHeightUnitChange = (unit) => {
        setHeightUnit(unit);
        setFormData(prev => ({
            ...prev,
            height: '',
            height_feet: '',
            height_inches: ''
        }));
        setFormErrors(prev => ({
            ...prev,
            height: '',
            height_feet: '',
            height_inches: ''
        }));
        setIsFormValid(false);
    };

    const handleWeightUnitChange = (unit) => {
        setWeightUnit(unit);
        setFormData(prev => ({ ...prev, weight: '' }));
        setFormErrors(prev => ({ ...prev, weight: '' }));
        setIsFormValid(false);
    };

    const handleSubmit = () => {
        const errors = {};
        if (!formData.gender) errors.gender = 'Please select your gender!';

        const ageError = validateField('age', formData.age);
        if (ageError) errors.age = ageError;

        if (heightUnit === 'cm') {
            const heightError = validateField('height', formData.height);
            if (heightError) errors.height = heightError;
        } else {
            const feetError = validateField('height_feet', formData.height_feet);
            const inchesError = validateField('height_inches', formData.height_inches);
            if (feetError) errors.height_feet = feetError;
            if (inchesError) errors.height_inches = inchesError;
        }

        const weightError = validateField('weight', formData.weight);
        if (weightError) errors.weight = weightError;

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        let formattedHeight;
        if (heightUnit === 'cm') {
            formattedHeight = { value: parseInt(formData.height), unit: 'cm' };
        } else {
            formattedHeight = {
                value: {
                    feet: parseInt(formData.height_feet) || 0,
                    inches: parseInt(formData.height_inches) || 0
                },
                unit: 'ft'
            };
        }

        const formattedWeight = {
            value: parseInt(formData.weight),
            unit: weightUnit
        };

        // Get name from memory (would be localStorage in real app)
        const userName = localStorage.getItem("name"); // This would come from previous form

        // Save to memory (simulating localStorage structure)
        const surveyData = {
            age: parseInt(formData.age),
            cWeight: JSON.stringify(formattedWeight),
            extendedvaluekey: "not-provided",
            gender: formData.gender,
            height: JSON.stringify(formattedHeight),
            name: userName
        };

        // In your actual Next.js app, replace these console.logs with:
        localStorage.setItem('age', surveyData.age);
        localStorage.setItem('cWeight', surveyData.cWeight);
        localStorage.setItem('extendedvaluekey', surveyData.extendedvaluekey);
        localStorage.setItem('gender', surveyData.gender);
        localStorage.setItem('height', surveyData.height);
        localStorage.setItem('name', surveyData.name);

        // Navigate to next step
        router.push("/step2")
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-teal-200/30 to-cyan-200/30 rounded-full opacity-60 blur-xl animate-pulse" />
                <div className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-r from-cyan-200/40 to-teal-200/40 rounded-full opacity-40 blur-lg animate-bounce" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
                <div className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-xl animate-pulse">
                        <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h1 className="text-teal-600 mb-2 text-xl sm:text-2xl font-medium tracking-wide">
                        BARIATRIC MEAL PLANNER
                    </h1>
                    <h2 className="text-gray-800 mb-4 text-2xl sm:text-3xl font-normal">
                        Tell Us About Yourself
                    </h2>
                </div>

                <div className={`max-w-lg mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl mx-4 sm:mx-0">
                        <div className="p-4 sm:p-8">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                                    <User className="text-lg sm:text-xl text-white" />
                                </div>
                                <h3 className="text-gray-800 mb-2 text-lg sm:text-xl font-medium">
                                    Quick Survey
                                </h3>
                                <p className="text-gray-600 font-light text-sm sm:text-base">
                                    Help us personalize your bariatric journey
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">
                                        Gender
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {['male', 'female', 'prefer-not-to-say'].map((gender) => (
                                            <button
                                                key={gender}
                                                type="button"
                                                onClick={() => handleGenderChange(gender)}
                                                className={`h-14 rounded-xl flex items-center justify-center border transition-all duration-300 ${formData.gender === gender
                                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-teal-500 shadow-lg'
                                                    : 'bg-white border-gray-300 hover:border-teal-400 hover:shadow-md'
                                                    }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>{gender === 'male' ? '👨' : gender === 'female' ? '👩' : '🤐'}</span>
                                                    <span className="text-sm sm:text-base">
                                                        {gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : 'Rather not say'}
                                                    </span>
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    {formErrors.gender && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.gender}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        placeholder="Enter your age"
                                        min="16"
                                        max="100"
                                        className={`w-full h-12 px-4 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300 ${formErrors.age ? 'border-red-500' : 'border-gray-200 hover:border-teal-300'
                                            }`}
                                    />
                                    {formErrors.age && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.age}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">
                                        Height
                                    </label>
                                    {heightUnit === 'cm' ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                name="height"
                                                value={formData.height}
                                                onChange={handleInputChange}
                                                placeholder="170"
                                                min="100"
                                                max="250"
                                                className={`flex-1 h-12 px-4 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300 ${formErrors.height ? 'border-red-500' : 'border-gray-200 hover:border-teal-300'
                                                    }`}
                                            />
                                            <select
                                                value={heightUnit}
                                                onChange={(e) => handleHeightUnitChange(e.target.value)}
                                                className="w-20 h-12 px-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                            >
                                                <option value="cm">cm</option>
                                                <option value="ft">ft/in</option>
                                            </select>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <input
                                                        type="number"
                                                        name="height_feet"
                                                        value={formData.height_feet}
                                                        onChange={handleInputChange}
                                                        placeholder="5 ft"
                                                        min="3"
                                                        max="8"
                                                        className={`w-full h-12 px-4 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300 ${formErrors.height_feet ? 'border-red-500' : 'border-gray-200 hover:border-teal-300'
                                                            }`}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="number"
                                                        name="height_inches"
                                                        value={formData.height_inches}
                                                        onChange={handleInputChange}
                                                        placeholder="8 in"
                                                        min="0"
                                                        max="11"
                                                        className={`w-full h-12 px-4 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300 ${formErrors.height_inches ? 'border-red-500' : 'border-gray-200 hover:border-teal-300'
                                                            }`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <select
                                                    value={heightUnit}
                                                    onChange={(e) => handleHeightUnitChange(e.target.value)}
                                                    className="w-20 h-12 px-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                                >
                                                    <option value="cm">cm</option>
                                                    <option value="ft">ft/in</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                    {(formErrors.height || formErrors.height_feet || formErrors.height_inches) && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {formErrors.height || formErrors.height_feet || formErrors.height_inches}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium text-sm sm:text-base mb-2">
                                        Current Weight
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleInputChange}
                                            placeholder={weightUnit === 'kg' ? "70" : "154"}
                                            min={weightUnit === 'kg' ? "30" : "66"}
                                            max={weightUnit === 'kg' ? "300" : "660"}
                                            className={`flex-1 h-12 px-4 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300 ${formErrors.weight ? 'border-red-500' : 'border-gray-200 hover:border-teal-300'
                                                }`}
                                        />
                                        <select
                                            value={weightUnit}
                                            onChange={(e) => handleWeightUnitChange(e.target.value)}
                                            className="w-20 h-12 px-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                        >
                                            <option value="kg">kg</option>
                                            <option value="lbs">lbs</option>
                                        </select>
                                    </div>
                                    {formErrors.weight && (
                                        <p className="mt-1 text-sm text-red-500">{formErrors.weight}</p>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={!isFormValid}
                                    className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6 flex items-center justify-center gap-2"
                                >
                                    Continue <ArrowRight className="w-4 h-4" />
                                </button>

                                <div className="mt-4 text-center">
                                    <p className="text-gray-500 text-xs sm:text-sm font-light">
                                        🔒 100% secure • No spam
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}