"use client";

import { SALON_INFO } from "@/lib/constants";
import { Calendar, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section id="about" className="py-24 bg-neutral-100 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                    {/* Text Content */}
                    <div className="p-8 md:p-16 flex flex-col justify-center">
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-widest w-fit mb-6">
                            ΠΕΡΙΟΡΙΣΜΕΝΗ ΔΙΑΘΕΣΙΜΟΤΗΤΑ
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-neutral-900 leading-tight">
                            Είστε έτοιμοι να αγαπήσετε ξανά τα μαλλιά σας;
                        </h2>
                        <p className="text-neutral-600 mb-8 text-lg">
                            Γίνετε μέλος εκατοντάδων ικανοποιημένων πελατών στην Κόρινθο που μας εμπιστεύονται για τη μεταμόρφωσή τους.
                            <br className="hidden md:block" /> Κλείστε το ραντεβού σας σήμερα.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={SALON_INFO.bookingUrl}
                                className="flex items-center justify-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-neutral-800 transition-colors shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1 duration-300"
                            >
                                <Calendar size={18} />
                                Κλειστε Ραντεβου
                            </a>
                            <a
                                href={`tel:${SALON_INFO.phone}`}
                                className="flex items-center justify-center gap-2 bg-neutral-100 text-neutral-900 border border-neutral-200 px-8 py-4 rounded-full font-medium tracking-wide hover:bg-white transition-colors"
                            >
                                <Phone size={18} />
                                {SALON_INFO.phone}
                            </a>
                        </div>
                    </div>

                    {/* Visual/Map/Info */}
                    <div className="bg-neutral-900 text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
                        {/* Decorative circle */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />

                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif font-bold mb-6">Επισκεφθείτε το Κομμωτήριο</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="mt-1 text-neutral-400" />
                                    <div>
                                        <p className="font-medium text-lg">{SALON_INFO.address}</p>
                                        <p className="text-neutral-400 mt-1">{SALON_INFO.location}</p>
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-6">
                                    <h4 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-4">Ωράριο Λειτουργίας</h4>
                                    <ul className="space-y-4 text-neutral-300">
                                        {SALON_INFO.workingHours.map(schedule => (
                                            <li
                                                key={schedule.day}
                                                className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-2 border-b border-white/5 last:border-0 gap-1"
                                            >
                                                <span className="font-semibold text-white tracking-wide text-sm sm:text-base">{schedule.day}</span>
                                                <span className="text-sm text-neutral-400 font-medium">{schedule.hours}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 relative z-10">
                            <a href={`mailto:${SALON_INFO.email}`} className="text-neutral-400 hover:text-white transition-colors text-sm underline">
                                {SALON_INFO.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
