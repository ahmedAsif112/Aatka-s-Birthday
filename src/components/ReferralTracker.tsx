"use client";
import { useEffect } from "react";

export default function ReferralTracker() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        console.log("📍 Full URL:", window.location.href);
        console.log("🔍 Search Params:", window.location.search);

        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get("ref");

        if (ref) {
            localStorage.setItem("referrer", ref);
            console.log("✅ Referrer captured:", ref);

            // Clean URL
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        } else {
            console.log("❌ No ref param found");
        }
    }, []);

    return null;
}
