"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
    images: string[];
    title: string;
    emptyMessage: string;
}

export default function ImageCarousel({ images, title, emptyMessage }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const thumbnailRef = useRef<HTMLDivElement>(null);

    const minSwipeDistance = 40;

    const navigate = useCallback(
        (dir: "left" | "right") => {
            if (isAnimating || images.length <= 1) return;
            setDirection(dir);
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) =>
                    dir === "right"
                        ? prev === images.length - 1 ? 0 : prev + 1
                        : prev === 0 ? images.length - 1 : prev - 1
                );
                setIsAnimating(false);
            }, 350);
        },
        [isAnimating, images.length]
    );

    const goToSlide = useCallback(
        (index: number) => {
            if (isAnimating || index === currentIndex) return;
            setDirection(index > currentIndex ? "right" : "left");
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(index);
                setIsAnimating(false);
            }, 350);
        },
        [isAnimating, currentIndex]
    );

    // Auto-play
    useEffect(() => {
        if (images.length <= 1) return;
        autoPlayRef.current = setInterval(() => navigate("right"), 4500);
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [navigate, images.length]);

    // Reset autoplay on manual interaction
    const resetAutoPlay = useCallback(
        (action: () => void) => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            action();
            autoPlayRef.current = setInterval(() => navigate("right"), 4500);
        },
        [navigate]
    );

    // Scroll thumbnail strip horizontally (contained — does NOT scroll the page)
    useEffect(() => {
        const container = thumbnailRef.current;
        if (!container) return;
        const active = container.children[currentIndex] as HTMLElement;
        if (!active) return;
        const containerCenter = container.offsetWidth / 2;
        const activeCenter = active.offsetLeft + active.offsetWidth / 2;
        container.scrollTo({ left: activeCenter - containerCenter, behavior: "smooth" });
    }, [currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") resetAutoPlay(() => navigate("left"));
            else if (e.key === "ArrowRight") resetAutoPlay(() => navigate("right"));
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [navigate, resetAutoPlay]);

    // Touch handlers
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (Math.abs(distance) < minSwipeDistance) return;
        resetAutoPlay(() => navigate(distance > 0 ? "right" : "left"));
    };

    // Empty state
    if (images.length === 0) {
        return (
            <div className="py-12 px-4">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-neutral-900 text-center">
                    {title}
                </h2>
                <div className="bg-neutral-50 rounded-2xl p-12 text-center border-2 border-dashed border-neutral-200">
                    <p className="text-neutral-400 text-lg">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    const slideClass = isAnimating
        ? direction === "right"
            ? "opacity-0 scale-[0.97] translate-x-4"
            : "opacity-0 scale-[0.97] -translate-x-4"
        : "opacity-100 scale-100 translate-x-0";

    return (
        <div className="py-8 px-2 md:px-0">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-neutral-900 text-center tracking-tight">
                {title}
            </h2>

            <div className="relative max-w-4xl mx-auto">
                {/* Main Image */}
                <div
                    className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-neutral-100"
                    style={{ aspectRatio: "4/3" }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div
                        className={`absolute inset-0 transition-all duration-350 ease-in-out ${slideClass}`}
                        style={{ transition: "opacity 0.35s ease, transform 0.35s ease" }}
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${title} - Εικόνα ${currentIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 900px"
                            priority={currentIndex === 0}
                        />
                    </div>

                    {/* Gradient overlay - bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-b-2xl" />

                    {/* Counter badge */}
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Prev Button */}
                    {images.length > 1 && (
                        <button
                            onClick={() => resetAutoPlay(() => navigate("left"))}
                            aria-label="Προηγούμενη εικόνα"
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-neutral-900 p-2.5 md:p-3.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 z-10"
                        >
                            <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>
                    )}

                    {/* Next Button */}
                    {images.length > 1 && (
                        <button
                            onClick={() => resetAutoPlay(() => navigate("right"))}
                            aria-label="Επόμενη εικόνα"
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-neutral-900 p-2.5 md:p-3.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 z-10"
                        >
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </button>
                    )}
                </div>

                {/* Progress bar */}
                {images.length > 1 && (
                    <div className="flex gap-1.5 mt-4 justify-center">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => resetAutoPlay(() => goToSlide(index))}
                                aria-label={`Μετάβαση στην εικόνα ${index + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${index === currentIndex
                                    ? "bg-amber-700 w-8"
                                    : "bg-neutral-300 hover:bg-neutral-400 w-3"
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Thumbnail strip */}
                {images.length > 1 && (
                    <div
                        ref={thumbnailRef}
                        className="flex gap-2 mt-4 overflow-x-auto pb-2 scroll-smooth px-1"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {images.map((src, index) => (
                            <button
                                key={index}
                                onClick={() => resetAutoPlay(() => goToSlide(index))}
                                aria-label={`Εικόνα ${index + 1}`}
                                className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-200 ${index === currentIndex
                                    ? "ring-2 ring-amber-600 ring-offset-2 opacity-100 scale-105"
                                    : "opacity-55 hover:opacity-90 hover:scale-105"
                                    }`}
                            >
                                <Image
                                    src={src}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
