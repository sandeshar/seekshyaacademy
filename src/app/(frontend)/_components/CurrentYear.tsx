"use client";

import { useState, useEffect } from 'react';

export default function CurrentYear() {
    // Start with a null or static value to avoid build-time new Date() issues
    const [year, setYear] = useState<number | string>("");

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return <>{year}</>;
}
