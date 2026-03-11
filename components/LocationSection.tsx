"use client";

import { SALON_INFO } from "@/lib/constants";
import { MapPin, Phone } from "lucide-react";

export default function LocationSection() {
    return (
        <section id="contact" className="py-24 bg-white text-neutral-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Info */}
                    <div>
                        <span className="text-sm font-bold tracking-widest text-[#C5A02E] uppercase mb-2 block">
                            Επισκεφθείτε Μας
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">
                            Σε κεντρικό σημείο στην Κόρινθο
                        </h2>

                        <div className="space-y-10">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                                    <MapPin className="text-neutral-900" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">Διεύθυνση</h3>
                                    <p className="text-neutral-600 text-lg">{SALON_INFO.address}</p>
                                    <p className="text-neutral-500">{SALON_INFO.location}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                                    <Phone className="text-neutral-900" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">Τηλέφωνο</h3>
                                    <p className="text-neutral-600 text-lg">
                                        <a href={`tel:${SALON_INFO.phone}`} className="hover:text-[#C5A02E] transition-colors">
                                            {SALON_INFO.phone}
                                        </a>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Map Visual */}
                    <div className="h-[300px] md:h-[500px] w-full bg-neutral-100 rounded-3xl overflow-hidden relative shadow-2xl border-4 border-white lg:mt-20">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.3941454174827!2d22.932857215248887!3d37.93985157973059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a019b885555555%3A0x6a0a0a0a0a0a0a0a!2sPatron%2045%2C%20Korinthos%20201%2031%2C%20Greece!5e0!3m2!1sen!2sgr!4v1707520000000!5m2!1sen!2sgr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
