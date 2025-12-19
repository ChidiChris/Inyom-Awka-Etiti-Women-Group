import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Target, ArrowRight, Stethoscope, Globe, HandHeart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { HeroSlider } from "@/components/shared/HeroSlider";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.jpeg";
import hero2 from "@/assets/hero-2.jpeg";
import hero3 from "@/assets/hero-3.jpeg";
import hero4 from "@/assets/hero-4.jpeg";

const heroSlides = [
  {
    image: hero1,
    title: "Promoting unity among women of Awka-Etiti",
    subtitle: "Empowering women through togetherness and collective growth"
  },
  {
    image: hero2,
    title: "Collaborating with community leaders and development partners",
    subtitle: "Working hand in hand with leaders and partners for sustainable development"
  },
  {
    image: hero3,
    title: "Preserving and promoting the cultural heritage of Awka-Etiti women",
    subtitle: "Upholding heritage, inspiring the future"
  },
  {
    image: hero4,
    title: "Improving Social and Economic Wellbeing",
    subtitle: "Building Stronger, More Prosperous Communities"
  }
  // Add pictures on import then declear it's value on the heroSlides array above
];

const quickLinks = [
  {
    icon: Stethoscope,
    title: "Our Programs",
    description: "Explore our medical outreach initiatives",
    href: "/programs"
  },
  {
    icon: Globe,
    title: "Gallery",
    description: "See our impact through photos",
    href: "/gallery"
  },
  {
    icon: HandHeart,
    title: "Get Involved",
    description: "Join our mission today",
    href: "/contact"
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[650px]">
        <HeroSlider
          slides={heroSlides}
          className="h-full"
          showDots={false}
          currentSlideIndex={currentSlide}
          onSlideChange={setCurrentSlide}
        >
          <div className="container mx-auto px-4 text-center text-primary-foreground z-10 relative">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
                <Heart className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">Welcome to INYOM Awka-Etiti (Women's Wing)</span>
              </div>
              {/* Dynamic title that changes with each slide */}
              <h1
                key={currentSlide}
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight animate-fade-up"
              >
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                We are committed to providing skills acquisition and other services to underserved communities through compassionate outreach programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/support">Support Us</Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/about">Our Mission</Link>
                </Button>
              </div>
            </div>
          </div>
        </HeroSlider>
      </section>

      {/* Welcome Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                <span className="text-primary font-medium text-sm">About INYOM</span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
                Transforming Lives Through Compassionate Healthcare
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                The Inyom (Iyom) Awka-Etiti Women’s Group is the recognized women’s association of Awka-Etiti. Rooted in the 
                town’s indigenous social structure, the group emerged from long-standing women’s institutions that historically 
                promoted unity, cultural values, and mutual support among women. Due to its deep pre-colonial origins and reliance 
                on oral tradition, the group does not have a single documented founding date.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Over the years, Inyom Awka-Etiti has evolved into a formally organized women’s wing that actively contributes to 
                community development, economic empowerment, and social welfare. Through collective leadership and sustained commitment, 
                the group continues to play a vital role in advancing the wellbeing of women and supporting the overall development of the 
                Awka-Etiti community.
              </p>
              <Button variant="default" size="lg" asChild>
                <Link to="/about">
                  Learn More About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-primary-foreground shadow-lg shadow-primary/20">
                  <Users className="w-10 h-10 mb-3" />
                  <p className="text-3xl lg:text-4xl font-bold font-display">5,000+</p>
                  <p className="text-sm opacity-90">Patients Served</p>
                </div>
                <div className="bg-muted rounded-3xl p-6 shadow-soft">
                  <Heart className="w-10 h-10 mb-3 text-secondary" />
                  <p className="text-3xl lg:text-4xl font-bold font-display text-foreground">50+</p>
                  <p className="text-sm text-muted-foreground">Medical Missions</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-3xl p-6 text-secondary-foreground shadow-lg shadow-secondary/20">
                  <Globe className="w-10 h-10 mb-3" />
                  <p className="text-3xl lg:text-4xl font-bold font-display">20+</p>
                  <p className="text-sm opacity-90">Communities Reached</p>
                </div>
                <div className="bg-gradient-to-br from-accent to-accent/80 rounded-3xl p-6 shadow-lg shadow-accent/20">
                  <Target className="w-10 h-10 mb-3 text-accent-foreground" />
                  <p className="text-3xl lg:text-4xl font-bold font-display text-accent-foreground">100+</p>
                  <p className="text-sm text-accent-foreground/80">Volunteers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 lg:py-24 section-light">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Get Involved"
            subtitle="Explore the ways you can be part of our mission to bring quality healthcare to underserved communities."
          />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="group bg-card rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 border border-border/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                  <link.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {link.title}
                </h3>
                <p className="text-muted-foreground mb-4">{link.description}</p>
                <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Animation */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Your support helps us reach more communities, provide essential medical care, and create lasting health impact. Together, we can transform lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="hero"
                size="xl"
                asChild
                className="animate-bounce hover:animate-none shadow-lg shadow-white/30 hover:shadow-white/50 transition-shadow"
                style={{ animationDuration: "3s" }}
                // className="shadow-lg shadow-white/30 hover:shadow-white/50 transition-shadow"
              >
                <Link to="/support">Donate Now</Link>
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                asChild
                // className="animate-bounce hover:animate-none"
                // style={{ animationDuration: "6s" }}
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;