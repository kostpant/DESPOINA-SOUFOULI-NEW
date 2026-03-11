"use client";

import { SERVICES } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
    return (
        <section id="services" className="py-24 bg-white text-neutral-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-2 block">
                        Η Εξειδίκευσή Μας
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                        Μεταμορφώσεις που Εντυπωσιάζουν
                    </h2>
                    <p className="text-neutral-600 text-lg">
                        Από την καθημερινή κομψότητα έως τα πιο εντυπωσιακά στυλ, δίνουμε ζωή στο όραμά σας με ακρίβεια και πάθος.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-neutral-50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            <Link href={`/services/${service.id}`} scroll={true} className="flex flex-col flex-grow w-full h-full">
                                {/* Image Container */}
                                <div className="relative h-64 w-full overflow-hidden shrink-0">
                                    <div className="absolute inset-0 bg-neutral-200 animate-pulse" /> {/* Placeholder if image missing */}
                                    {/* 
                      Using a placeholder image since actual service images might not exist yet.
                      In production, we would use service.image 
                    */}
                                    <div className="absolute inset-0 bg-neutral-800/10 group-hover:bg-neutral-800/0 transition-colors duration-300" />
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none'; // Hide if fails
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col grow">
                                    <div className="mb-4 grow">
                                        <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-amber-800 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-neutral-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
                                        <span className="font-medium text-neutral-900">
                                            {service.price}
                                        </span>
                                        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-neutral-500 group-hover:text-amber-800 transition-colors">
                                            Περισσότερα <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
