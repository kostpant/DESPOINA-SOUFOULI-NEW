"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SALON_INFO } from "@/lib/constants";

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Check if we're on a page with a white background (not the landing page)
    const isWhiteBackground = pathname !== "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine if navigation should have dark styling
    const shouldUseDarkStyling = isScrolled || isWhiteBackground;

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                shouldUseDarkStyling
                    ? "bg-white/90 backdrop-blur-md py-4 shadow-sm text-neutral-900 border-b border-neutral-100"
                    : "bg-transparent py-6 text-white"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <a href="/" className="text-2xl font-serif font-bold tracking-tight">
                    {SALON_INFO.name}
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href.startsWith('#') ? `/${link.href}` : link.href}
                            className="text-sm font-medium tracking-wide hover:opacity-70 transition-opacity uppercase"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href={`tel:${SALON_INFO.phone}`}
                        className={cn(
                            "px-6 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors",
                            shouldUseDarkStyling
                                ? "bg-neutral-900 text-white hover:bg-neutral-800"
                                : "bg-white text-neutral-900 hover:bg-neutral-200"
                        )}
                    >
                        Κλειστε Ραντεβου
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white text-neutral-900 p-6 shadow-xl border-t md:hidden flex flex-col gap-4 max-h-[85vh] overflow-y-auto pb-12">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href.startsWith('#') ? `/${link.href}` : link.href}
                            className="text-lg font-serif font-medium py-2 border-b border-neutral-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href={`tel:${SALON_INFO.phone}`}
                        className="block w-full py-4 bg-neutral-900 text-white text-center uppercase tracking-wide text-sm font-bold mt-2"
                    >
                        Κληση στο Κομμωτηριο
                    </a>
                </div>
            )}
        </nav>
    );
}
