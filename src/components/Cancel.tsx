'use client';
import { useRouter } from 'next/navigation';
export default function CancelPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-4">
            <div className="text-red-600 text-2xl font-semibold mb-4">
                ❌ Payment canceled. Try again when you&apos;re ready.
            </div>

            <button
                onClick={() => router.push('/checkout')}
                className="mt-4 px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg shadow-md transition duration-200"
            >
                Go Back to Checkout
            </button>
        </div>
    );
}