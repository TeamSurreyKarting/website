'use client';

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="w-full h-full bg-nile-blue-900 rounded-xl p-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Error</h1>
            <p>Something went wrong...</p>
        </div>
    );
}