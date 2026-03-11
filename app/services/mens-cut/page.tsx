/**
 * ΟΔΗΓΙΕΣ: Πώς να προσθέσετε φωτογραφίες
 * 
 * 1. Ανοίξτε τον φάκελο: public/services/mens-cut/work/
 * 2. Ανοίξτε τον φάκελο: public/services/mens-cut/products/
 * 3. Υποστηριζόμενες μορφές: .jpg, .jpeg, .png, .webp, .avif
 */

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import { SALON_INFO } from "@/lib/constants";

async function getImagesFromFolder(folderPath: string): Promise<string[]> {
    try {
        const publicPath = path.join(process.cwd(), "public", folderPath);
        const files = await fs.readdir(publicPath);
        const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
        const imageFiles = files.filter((file) =>
            imageExtensions.some((ext) => file.toLowerCase().endsWith(ext))
        );
        return imageFiles.map((file) => `/${folderPath}/${file}`);
    } catch {
        return [];
    }
}

export default async function MensCutPage() {
    const workImages = await getImagesFromFolder("services/mens-cut/work");
    const productImages = await getImagesFromFolder("services/mens-cut/products");

    return (
        <>
            {/* Hero Section */}
            <section className="min-h-screen bg-white flex items-center justify-center">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center py-32">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors mb-10 group text-sm"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Αρχική</span>
                    </Link>

                    <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-widest mb-6">
                        ΥΠΗΡΕΣΙΑ
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-neutral-900 leading-tight">
                        Ανδρική Περιποίηση
                    </h1>
                    <div className="text-neutral-600 space-y-4 mx-auto max-w-2xl text-lg md:text-xl leading-relaxed">
                        <p>
                            Μοντέρνα ανδρικά κουρέματα και περιποίηση γενειάδας για μια κομψή, επαγγελματική εμφάνιση.
                        </p>
                        <p>
                            Από κλασικά κουρέματα έως σύγχρονα fade και undercut styles, κάθε κούρεμα περιλαμβάνει διαβούλευση στυλ, ακριβές κούρεμα και styling tips.
                        </p>
                        <p>
                            Προσφέρουμε επίσης υπηρεσίες περιποίησης γενειάδας, trimming και shaping για μια πλήρως ολοκληρωμένη εμφάνιση.
                        </p>
                    </div>
                </div>
            </section>

            {/* Work Carousel */}
            <section className="py-16 bg-neutral-50">
                <div className="container mx-auto px-4 md:px-6">
                    <ImageCarousel
                        images={workImages}
                        title="Ανδρικά Κουρέματα"
                        emptyMessage="Προσθέστε φωτογραφίες στον φάκελο public/services/mens-cut/work για να εμφανιστούν εδώ."
                    />
                </div>
            </section>

            {/* Products Carousel */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <ImageCarousel
                        images={productImages}
                        title="Προϊόντα που χρησιμοποιούμε"
                        emptyMessage="Προσθέστε φωτογραφίες στον φάκελο public/services/mens-cut/products για να εμφανιστούν εδώ."
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-neutral-100 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8 md:p-16 text-center max-w-3xl mx-auto">
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-widest w-fit mb-6">
                            ΠΕΡΙΟΡΙΣΜΕΝΗ ΔΙΑΘΕΣΙΜΟΤΗΤΑ
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-neutral-900 leading-tight">
                            Έτοιμοι για ανανέωση;
                        </h2>
                        <p className="text-neutral-600 mb-8 text-lg">
                            Κλείστε το ραντεβού σας σήμερα για επαγγελματική ανδρική περιποίηση.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`tel:${SALON_INFO.phone}`}
                                className="flex items-center justify-center gap-2 bg-neutral-100 text-neutral-900 border border-neutral-200 px-8 py-4 rounded-full font-medium tracking-wide hover:bg-white transition-colors"
                            >
                                <Phone size={18} />
                                {SALON_INFO.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
