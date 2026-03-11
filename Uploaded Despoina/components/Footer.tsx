"use client";

import { SALON_INFO, NAV_LINKS } from "@/lib/constants";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold tracking-tight">
                            {SALON_INFO.name}
                        </h2>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                            {SALON_INFO.tagline}. Dedicated to providing an exceptional experience and results you'll love.
                        </p>
                        <div className="flex gap-8 pt-4">
                            <a href={SALON_INFO.social.instagram} className="hover:text-amber-500 transition-all p-2 -m-2" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <Instagram size={24} />
                            </a>
                            <a href={SALON_INFO.social.facebook} className="hover:text-amber-500 transition-all p-2 -m-2" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <Facebook size={24} />
                            </a>
                            <a href={SALON_INFO.social.tiktok} className="hover:text-amber-500 transition-all p-2 -m-2 font-bold" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-neutral-500">
                            Menu
                        </h3>
                        <ul className="space-y-3">
                            {NAV_LINKS.map(link => (
                                <li key={link.name}>
                                    <a
                                        href={link.href.startsWith('#') ? `/${link.href}` : link.href}
                                        className="text-neutral-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}

                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-neutral-500">
                            Contact
                        </h3>
                        <ul className="space-y-3 text-sm text-neutral-400">
                            <li>{SALON_INFO.address}</li>
                            <li>{SALON_INFO.location}</li>
                            <li className="pt-2">
                                <a href={`tel:${SALON_INFO.phone}`} className="hover:text-white transition-colors">
                                    {SALON_INFO.phone}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${SALON_INFO.email}`} className="hover:text-white transition-colors">
                                    {SALON_INFO.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal/Newsletter */}
                    <div>
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-neutral-500">
                            Newsletter
                        </h3>
                        <p className="text-neutral-400 text-sm mb-4">
                            Subscribe for hair tips and exclusive offers.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-neutral-800 border-none text-sm px-4 py-2 rounded-lg w-full focus:ring-1 focus:ring-amber-500 outline-none text-white placeholder:text-neutral-500"
                            />
                            <button type="submit" className="bg-white text-neutral-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-neutral-200 transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
                    <p>© {new Date().getFullYear()} {SALON_INFO.name}. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
