"use client";

import { useEffect, useState, useRef } from "react";

interface UseAnimationSequenceProps {
    frameCount: number;
    pathConfig: (index: number) => string;
}

export function useAnimationSequence({
    frameCount,
    pathConfig,
}: UseAnimationSequenceProps) {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const loadedImages: HTMLImageElement[] = [];
        let count = 0;

        const preloadImages = async () => {
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = pathConfig(i);

                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                }).catch(() => console.error(`Failed to load frame ${i}`));

                if (!isMounted) return;

                loadedImages[i] = img;
                count++;
                setLoadedCount(count);
            }
            if (isMounted) setImages(loadedImages);
        };

        preloadImages();

        return () => {
            isMounted = false;
        };
    }, [frameCount, pathConfig]); // Dependency on pathConfig might be tricky if it changes, but usually stable.

    return {
        images,
        progress: (count: number) => Math.round((count / frameCount) * 100),
        loaded: loadedCount === frameCount,
    };
}
