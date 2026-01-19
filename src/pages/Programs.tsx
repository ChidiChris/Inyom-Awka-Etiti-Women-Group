
import { LazyYouTubeEmbed } from "@/components/shared/LazyYouTubeEmbed";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Users, Pill, Stethoscope, Eye, Heart } from "lucide-react";
import program1 from "@/assets/program-1.jpeg";
import program2 from "@/assets/program-2.jpeg";
import thanksgiving from "@/assets/thanksgiving.jpeg";
import hero1 from "@/assets/hero-1.jpeg";
import drug1 from "@/assets/drug-1.jpeg";

const programs = [
  {
    id: 1,
    title: "Thanksgiving Sunday",
    focus: "Gratitude, Worship, and Community Service",
    location: "Anambra State, Nigeria",
    date: "January 04, 2026",
    image: thanksgiving,
    summary: "A special Thanksgiving Sunday celebration centered on gratitude to God and service to the community",
    icon: Heart,

  },
  {
    id: 2,
    title: "Community Health Screening",
    focus: "Blood Pressure, Diabetes, and General Health Screening",
    location: "Anambra State, Nigeria",
    date: "January 05-07, 2026",
    image: program1,
    summary: "Comprehensive health screening program reaching over 130 community members with free blood pressure, blood sugar, and general health checks. Medical professionals provided consultations and health education.",
    icon: Stethoscope,
    patients: 133
  },
  // {
  //   id: 2,
  //   title: "Eye Care Outreach",
  //   focus: "Vision Screening, Glasses Distribution, and Eye Treatment",
  //   location: "Enugu State, Nigeria",
  //   date: "February 8-10, 2024",
  //   image: program2,
  //   summary: "Free eye examinations and distribution of prescription glasses to elderly and underprivileged community members. Over 200 reading glasses distributed and 50 referrals made for specialized treatment.",
  //   icon: Eye,
  //   patients: 312
  // },
  // {
  //   id: 3,
  //   title: "Maternal & Child Health Program",
  //   focus: "Prenatal Care, Immunization, and Nutrition Support",
  //   location: "Delta State, Nigeria",
  //   date: "January 20-22, 2026",
  //   image: program3,
  //   summary: "Focused on maternal and child health with free prenatal checkups, immunizations for children, and nutritional counseling for expectant mothers. Distributed vitamins and supplements.",
  //   icon: Heart,
  //   patients: 285
  // },
  {
    id: 3,
    title: "Drug Distribution Drive",
    focus: "Essential Medicines Distribution and Health Education",
    location: "Anambra State, Nigeria",
    date: "January 05-09, 2026",
    image: drug1,
    summary: "Free distribution of essential medicines including antimalarials, antibiotics, pain relievers, and chronic disease medications. Included health education sessions on proper medication use.",
    icon: Pill,
    patients: 149
  }
];

const Programs = () => {
  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero1}
            alt="Outreach Programs"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
        <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Outreach Programs
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Explore our medical outreach programs bringing healthcare to communities across Nigeria
          </p>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Content on the left */}
            <div className="order-2 lg:order-1">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Featured Video
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                See Our Work in Action
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Appreciation by the incumbent P.G and her executive to the outgoing executives of the inyom awka-etiti women's wing, idemili south, Anambra state.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Free medical consultations and treatments</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Thousands of lives impacted yearly</span>
                </li>
                <li className="flex items-center gap-3">
                  <Stethoscope className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Professional outreach delivered with compassion</span>
                </li>
              </ul>
            </div>

            {/* Video on the right */}
            <div className="order-1 lg:order-2">
              <LazyYouTubeEmbed
                videoId="3wGCudVBRVc"
                title="Appreciation by the incumbent P.G and her executive."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-12 lg:space-y-16">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-elevated group">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {program.patients} patients
                    </div> */}
                    {program.patients && (
                      <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {program.patients} patients
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <program.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" /> {program.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        <MapPin className="w-3.5 h-3.5" /> {program.location}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
                    {program.title}
                  </h3>
                  <p className="text-secondary font-medium mb-4">
                    {program.focus}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {program.summary}
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/gallery">
                      View Photos <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 section-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { value: "200+", label: "People Served" },
              { value: "2", label: "Programs Completed" },
              { value: "1", label: "States Reached" },
              { value: "20+", label: "Volunteers Mobilized" }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-card rounded-2xl p-6 shadow-soft">
                <p className="font-display text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={program2}
            alt="Support background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto text-primary-foreground">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Support Our Next Outreach
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Your donation helps us organize more outreach programs and reach more communities in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/support">Donate Now</Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/contact">Volunteer With Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
