import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Images, ChevronDown } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpeg";
// import gallery2 from "@/assets/gallery-2.jpeg";
// import gallery3 from "@/assets/gallery-3.jpeg";
// import gallery4 from "@/assets/gallery-4.jpeg";
// import gallery5 from "@/assets/gallery-5.jpeg";
// import gallery6 from "@/assets/gallery-6.jpeg";
// import gallery7 from "@/assets/gallery-7.jpeg";
import volunteer1 from "@/assets/volunteers-1.jpeg";
import volunteer2 from "@/assets/volunteers-2.jpeg";
import volunteer3 from "@/assets/volunteers-3.jpeg";
import outreach1 from "@/assets/outreach-1.jpeg";
import outreach2 from "@/assets/outreach-2.jpeg";
import outreach3 from "@/assets/outreach-3.jpeg";
import outreach4 from "@/assets/outreach-4.jpeg";
import outreach5 from "@/assets/outreach-5.jpeg";
import mission1 from "@/assets/mission-1.jpeg";
import mission2 from "@/assets/mission-2.jpeg";
import mission3 from "@/assets/mission-3.jpeg";
import mission4 from "@/assets/mission-4.jpeg";
import event1 from "@/assets/event-1.jpeg";
import event2 from "@/assets/event-2.jpeg";
import event3 from "@/assets/event-3.jpeg";
import event4 from "@/assets/event-4.jpeg";
import event5 from "@/assets/event-5.jpeg";
import event6 from "@/assets/event-6.jpeg";
import event7 from "@/assets/event-7.jpeg";
import hero1 from "@/assets/hero-1.jpeg";

const categories = ["All", "Outreach", "Volunteers", "Medical Missions", "Events"];

const galleryImages = [
    { src: volunteer1, category: "Volunteers", title: "Medical Volunteer Team", year: "2026", description: "Few of our team of medical volunteers gathered to take a group photo with the president before commencing the community outreach program in Anambra State." },
    { src: volunteer2, category: "Volunteers", title: "Medical Volunteer Team", year: "2026", description: "The medical team recording essential details during the community outreach program in Anambra State." },
    { src: volunteer3, category: "Volunteers", title: "Medical Volunteer Team", year: "2026", description: "A medical volunteer reviews details on a medication package as part of patient care during the outreach program." },
    { src: hero1, category: "Volunteers", title: "Team Meeting", year: "2026", description: "Members of the executive team alongside other participants pose for a group photograph followed by a Strategic planning meeting." },
    { src: outreach1, category: "Outreach", title: "Medicine Distribution", year: "2026", description: "Free distribution of essential medicines to patients after consultations." },
    { src: outreach2, category: "Outreach", title: "Relief Items Distribution", year: "2026", description: "Mrs. Augustina Amaka Okpala (Achalugo Nwanyi Mmaruruno) PG. Inyom Awka Etiti, Idemili South, Anambra State, sharing relief items to attendees of the outreach program." },
    { src: outreach3, category: "Outreach", title: "Drug Distribution Drive", year: "2026", description: "Large-scale distribution of antimalarials, antibiotics, and essential medications." },
    { src: outreach4, category: "Outreach", title: "Community Outreach Queue", year: "2026", description: "Community members patiently waiting for their turn to receive free medical consultations and medications." },
    { src: outreach5, category: "Outreach", title: "Health Education Session", year: "2026", description: "Community health education session teaching preventive healthcare practices while giving clear directives for medication" },
    { src: mission1, category: "Medical Missions", title: "Patient Registration", year: "2026", description: "Volunteers registering patients and collecting medical history before consultations begin." },
    { src: mission2, category: "Medical Missions", title: "Blood Pressure Screening Session", year: "2026", description: "Medical volunteers conduct blood pressure checks for community members as part of the outreach program, helping to identify hypertension and promote early health intervention." },
    { src: mission3, category: "Medical Missions", title: "Blood Sugar Testing", year: "2026", description: "A medical volunteer conducts a blood sugar test for a community member as part of the outreach program, supporting early detection and management of diabetes." },
    { src: mission4, category: "Medical Missions", title: "Patient Consultation", year: "2026", description: "A doctor providing one-on-one consultation to a patient during the outreach." },
    { src: event1, category: "Events", title: "Addressing", year: "2026", description: "The Host with the chairman of ogunzele community." },
    { src: event2, category: "Events", title: "Guest", year: "2026", description: "Former executive members of the Inyom Awka etiti women's wing" },
    { src: event3, category: "Events", title: "Guest", year: "2026", description: "The president general welcoming the Inyom Awka Etiti women's wing" },
    { src: event4, category: "Events", title: "Guest", year: "2026", description: "Opening remark by the Bishop of Bauchi Most Rev. Dr. Hilary Nanman Dachelem CMF as heavily represented by the Vicar General Adinistrations Very Rev. Fr. Raphael Agbata." },
    { src: event5, category: "Events", title: "Guest", year: "2026", description: "Invited Guest of honour in attendance." },
    { src: event6, category: "Events", title: "Guest", year: "2026", description: "Clergymen in attendance having a chat with the host." },
    { src: event7, category: "Events", title: "Guest", year: "2026", description: "Prayer session" },
];

const IMAGES_PER_PAGE = 8;

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);
    const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

    const filteredImages = selectedCategory === "All"
        ? galleryImages
        : galleryImages.filter((img) => img.category === selectedCategory);

    const displayedImages = filteredImages.slice(0, visibleCount);
    const hasMore = visibleCount < filteredImages.length;

    const handleSeeMore = () => {
        setVisibleCount(prev => prev + IMAGES_PER_PAGE);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setVisibleCount(IMAGES_PER_PAGE);
    };

    return (
        <Layout>
            {/* Hero Section with Background Image */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={gallery1}
                        alt="Gallery background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
                </div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                </div>
                <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                        <Images className="w-4 h-4" />
                        <span className="text-sm font-medium">Our Photo Gallery</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
                        Moments of Impact
                    </h1>
                    <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                        Explore moments from our outreach programs and community initiatives
                    </p>
                </div>
            </section>

            {/* Filter - Responsive horizontal scroll */}
            <section className="py-6 bg-card border-b border-border sticky top-16 lg:top-20 z-30">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
                                    selectedCategory === category
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-12 lg:py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {displayedImages.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setLightboxImage(image)}
                                className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Always visible overlay with details */}
                                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent">
                                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-primary-foreground">
                                        <p className="font-semibold text-xs md:text-sm truncate">{image.title}</p>
                                        <p className="text-[10px] md:text-xs opacity-80">{image.category} • {image.year}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {filteredImages.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground">No images found in this category.</p>
                        </div>
                    )}

                    {/* See More Button */}
                    {hasMore && (
                        <div className="text-center mt-10">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleSeeMore}
                                className="gap-2"
                            >
                                See More
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox with Details */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        onClick={() => setLightboxImage(null)}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/20 flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-colors z-10"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div
                        className="max-w-6xl w-full flex flex-col lg:flex-row gap-6 animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <div className="flex-1">
                            <img
                                src={lightboxImage.src}
                                alt={lightboxImage.title}
                                className="w-full max-h-[60vh] lg:max-h-[80vh] object-contain rounded-lg"
                            />
                        </div>
                        {/* Details Panel */}
                        <div className="lg:w-80 bg-card/10 backdrop-blur-md rounded-xl p-6 text-primary-foreground">
                            <h3 className="font-display text-2xl font-bold mb-2">{lightboxImage.title}</h3>
                            <div className="flex gap-2 mb-4">
                                <span className="bg-primary/30 px-3 py-1 rounded-full text-xs font-medium">
                                    {lightboxImage.category}
                                </span>
                                <span className="bg-secondary/30 px-3 py-1 rounded-full text-xs font-medium">
                                    {lightboxImage.year}
                                </span>
                            </div>
                            <p className="text-primary-foreground/80 leading-relaxed">
                                {lightboxImage.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Gallery;