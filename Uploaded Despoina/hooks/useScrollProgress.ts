"use client";

import { useEffect, useState } from "react";

/**
 * Returns the scroll progress as a value between 0 and 1.
 */
export function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (windowHeight === 0) {
                return setProgress(0);
            }

            const currentProgress = totalScroll / windowHeight;
            setProgress(currentProgress);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return progress;
}
