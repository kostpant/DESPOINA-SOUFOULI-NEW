"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { isMobile } from "react-device-detect";
import { SALON_INFO } from "@/lib/constants";

const FRAME_COUNT_DESKTOP = 144;

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    // Check for mobile on mount to avoid hydration mismatch
    useEffect(() => {
        setIsMobileDevice(isMobile);
        if (isMobile) {
            window.scrollTo(0, 0);
        }
    }, []);

    // Connect scroll to animation frame
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Preload images
    useEffect(() => {
        let mounted = true;
        const loadedImages: HTMLImageElement[] = [];
        const step = isMobileDevice ? 2 : 1; // Faster but smoother (72 frames instead of 48)

        const loadImages = async () => {
            // 1. Load the first frame immediately for instant visual
            const firstImg = new Image();
            firstImg.src = `/animations/hair-flow/frame_000.jpg`;
            await new Promise((resolve) => {
                firstImg.onload = resolve;
                firstImg.onerror = resolve;
            });
            if (!mounted) return;
            loadedImages[0] = firstImg;
            setImages([firstImg]); // Show first frame immediately

            // 2. Load the rest in parallel batches
            const remainingIndices = [];
            for (let i = step; i < FRAME_COUNT_DESKTOP; i += step) {
                remainingIndices.push(i);
            }

            // Load in chunks
            const CHUNK_SIZE = isMobileDevice ? 8 : 12;
            for (let i = 0; i < remainingIndices.length; i += CHUNK_SIZE) {
                const chunk = remainingIndices.slice(i, i + CHUNK_SIZE);
                await Promise.all(chunk.map(idx => {
                    return new Promise<void>((resolve) => {
                        const img = new Image();
                        img.src = `/animations/hair-flow/frame_${idx.toString().padStart(3, "0")}.jpg`;
                        img.onload = () => {
                            loadedImages[idx] = img;
                            resolve();
                        };
                        img.onerror = () => resolve();
                    });
                }));
                if (!mounted) return;

                // Allow early reveal after first few batches
                if (i === 0 || (isMobileDevice && i === CHUNK_SIZE)) {
                    setImages([...loadedImages]);
                }
            }

            setImages([...loadedImages]);
            setIsLoaded(true);
        };

        loadImages();
        return () => { mounted = false; };
    }, [isMobileDevice]);

    // Draw to canvas based on scroll
    useEffect(() => {
        const render = (progress: number) => {
            const canvas = canvasRef.current;
            if (!canvas || images.length === 0) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Map 0-1 progress to available indices
            const rawIndex = Math.floor(progress * (FRAME_COUNT_DESKTOP - 1));
            // Find the closest loaded frame (snapping)
            const step = isMobileDevice ? 2 : 1;
            const frameIndex = isMobileDevice ? Math.round(rawIndex / step) * step : rawIndex;

            const img = images[frameIndex];
            if (!img || !img.complete || img.naturalWidth === 0) return;

            // Draw image covering the canvas
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            requestAnimationFrame(() => render(latest));
        });

        // Initial render
        render(scrollYProgress.get());

        return () => unsubscribe();
    }, [scrollYProgress, images, isLoaded, isMobileDevice]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                // Redraw current frame
                const rawIndex = Math.floor(scrollYProgress.get() * (FRAME_COUNT_DESKTOP - 1));
                const step = isMobileDevice ? 2 : 1;
                const frameIndex = isMobileDevice ? Math.round(rawIndex / step) * step : rawIndex;
                const img = images[frameIndex];
                if (img && img.complete) {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                        const x = (canvas.width / 2) - (img.width / 2) * scale;
                        const y = (canvas.height / 2) - (img.height / 2) * scale;
                        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                    }
                }
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [images, isMobileDevice, scrollYProgress]);

    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-neutral-900">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <motion.canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ opacity }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70 pointer-events-none z-[5]" />


                {/* Content Overlay */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4"
                    style={{ y: textY, opacity: textOpacity }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-4 drop-shadow-2xl"
                    >
                        <span className="text-[#C5A02E] block mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                            Δέσποινα Σοφούλη
                        </span>
                        <span className="text-white">Κομμωτήριο</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-base md:text-xl text-white max-w-xl mb-8 font-medium drop-shadow-lg"
                    >
                        Expert Balayage, Επαγγελματικό Styling & Μεταμορφώσεις στην Κόρινθο
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 relative z-20 w-full sm:w-auto px-4 sm:px-0"
                    >
                        <a
                            href={`tel:${SALON_INFO.phone}`}
                            className="px-8 py-4 bg-[#C5A02E] text-black font-bold tracking-wide hover:bg-[#D5B03E] transition-all shadow-xl uppercase text-sm rounded-sm text-center"
                        >
                            Κλειστε Ραντεβου
                        </a>
                        <a
                            href="#services"
                            className="px-8 py-4 border-2 border-white text-white font-bold tracking-wide hover:bg-white hover:text-black transition-all shadow-xl uppercase text-sm rounded-sm backdrop-blur-sm text-center"
                        >
                            Δειτε τις Υπηρεσιες
                        </a>
                    </motion.div>
                </motion.div>


                <AnimatePresence>
                    {!isLoaded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20"
                        >
                            <div className="relative flex flex-col items-center">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="tracking-[0.4em] text-[10px] md:text-xs uppercase text-white/60 mb-8 font-light"
                                >
                                    Φορτωση Εμπειριας
                                </motion.span>

                                {/* Progress Line */}
                                <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A02E] to-transparent"
                                        animate={{
                                            x: ["-100%", "100%"]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </div>

                                {/* Logo/Initial */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1 }}
                                    className="mt-8 text-2xl font-serif text-[#C5A02E]"
                                >
                                    ΔΣ
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>

    );
}
