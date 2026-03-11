"use client";

import useEmblaCarousel from "embla-carousel-react";
import { TESTIMONIALS, SALON_INFO } from "@/lib/constants";
import { Star, Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section id="testimonials" className="py-24 bg-neutral-900 text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-amber-700/30 blur-[100px] rounded-full" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-900/20 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                        Εντυπώσεις Πελατών
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold">
                        Πραγματικές Ιστορίες, Πραγματικές Μεταμορφώσεις
                    </h2>
                </div>

                {/* Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {TESTIMONIALS.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="flex-[0_0_100%] min-w-0 px-4"
                                >
                                    <div className="bg-neutral-800/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/5 text-center">
                                        <div className="flex justify-center mb-6 text-amber-500">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} size={20} fill="currentColor" className="mx-0.5" />
                                            ))}
                                        </div>

                                        <Quote className="mx-auto w-10 h-10 text-neutral-600 mb-6 opacity-50" />

                                        <p className="text-xl md:text-2xl font-serif italic mb-8 leading-relaxed text-neutral-200">
                                            "{testimonial.quote}"
                                        </p>

                                        <div className="flex flex-col items-center">
                                            <cite className="not-italic font-bold text-lg tracking-wide">
                                                {testimonial.author}
                                            </cite>
                                            <span className="text-neutral-400 text-sm mt-1">
                                                {testimonial.role} • {testimonial.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Dots/Buttons could go here, usually hidden for aesthetic cleaner look if auto-playing */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                            aria-label="Previous testimonial"
                        >
                            ←
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                            aria-label="Next testimonial"
                        >
                            →
                        </button>
                    </div>

                </div>

                {/* Trust Indicators */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border-r border-white/20 pr-8">
                            <span className="text-2xl font-bold">Google</span>
                            <div className="flex text-amber-500"><Star fill="currentColor" size={16} /> 5.0</div>
                        </div>
                        <a
                            href={SALON_INFO.googleReviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:text-amber-500 transition-colors flex items-center gap-2 underline underline-offset-4"
                        >
                            Αφήστε μας μια κριτική
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
