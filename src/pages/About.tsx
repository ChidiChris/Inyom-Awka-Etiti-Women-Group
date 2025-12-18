import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSlider } from "@/components/shared/HeroSlider";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, ArrowRight, Mail, Users, Phone } from "lucide-react";
import hero1 from "@/assets/hero-1.jpeg";
import hero2 from "@/assets/hero-2.jpeg";
import hero3 from "@/assets/hero-3.jpeg";
import exec1 from "@/assets/exec-1.jpeg";
import exec2 from "@/assets/exec-2.jpeg";
import exec3 from "@/assets/exec-3.jpeg";
import exec4 from "@/assets/exec-4.jpeg";
import program1 from "@/assets/program-1.jpeg";
import program2 from "@/assets/program-2.jpeg";
import person4 from "@/assets/person-4.png"

const aboutSlides = [
    { image: hero1, title: "Our Team", subtitle: "Dedicated healthcare professionals" },
    { image: hero2, title: "Community Outreach", subtitle: "Making healthcare accessible" },
    { image: hero3, title: "Medical Missions", subtitle: "Serving with compassion" },
];

const executives = [
    {
        name: "Mrs. Okpala Amaka",
        position: "President General",
        image: person4,
        phone: "+234 706 575 5655",
        // email: "chidi@gmail.com",
    },
    {
        name: "Umechukwu Oby",
        position: "Vice President General",
        image: person4,
        phone: "+234 814 650 5046",
        // email: "vp@inyom.org"
    },
    {
        name: "Ochuba Oby",
        position: "Secretary",
        image: person4,
        phone: "+234 816 417 8967",
        // email: "secretary@inyom.org"
    },
    {
        name: "Emeli Dorathy",
        position: "Assist. Secretary",
        image: person4,
        phone: "+234 703 132 4517",
        // email: "treasurer@inyom.org"
    },
    {
        name: "Okafor Chizolu",
        position: "Financial Secretary",
        image: person4,
        phone: "+234 814 476 8140",
        // email: "treasurer@inyom.org"
    },
    {
        name: "Chimezie Chiamaka",
        position: "Treasurer",
        image: person4,
        phone: "+234 806 890 8429",
        // email: "treasurer@inyom.org"
    },
    {
        name: "Ngwudo Sabina",
        position: "P.R.O",
        image: person4,
        phone: "+234 812 013 4477",
        // email: "treasurer@inyom.org"
    },
    {
        name: "Ezenwata Ukamaka",
        position: "Provost I",
        image: person4,
        phone: "+234 806 451 6516",
        // email: "treasurer@inyom.org"
    },
    {
        name: "Okeke Chinonye",
        position: "Provost II",
        image: person4,
        phone: "+234 803 481 7695",
        // email: "treasurer@inyom.org"
    },
];

const About = () => {
    return (
        <Layout>
            {/* Hero Slider */}
            <section className="relative h-[60vh] min-h-[450px]">
                <HeroSlider slides={aboutSlides} className="h-full" showDots={false}>
                    <div className="container mx-auto px-4 text-center text-primary-foreground z-10 relative">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-medium">About INYOM</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                            Who We Are
                        </h1>
                        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                            Discover our story, mission, and the dedicated team behind our medical outreach programs
                        </p>
                    </div>
                </HeroSlider>
            </section>

            {/* Introduction Section */}
            <section className="py-16 lg:py-24 bg-card">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeader
                            // title="Our Story"
                            title="About the Organization"
                            subtitle="Inyom Awka-Etiti (Community Women’s Wing)"
                        />
                        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                            <p className="text-lg leading-relaxed">
                                <b>Anambra State</b> is located in southeastern Nigeria and is predominantly inhabited by the Igbo ethnic group. Created in 1976 from the former East
                                Central State, the state is known for its rich cultural heritage, strong traditional institutions, early exposure to Western education,
                                and a long-standing culture of community self-help and development driven by town unions and local associations.<br></br>
                                <b>Awka-Etiti</b> is a historic Igbo town in Idemili South Local Government Area of Anambra State. The town consists of seven villages: Nkolofia, Umunocha,
                                Ejighinandu, Iruowelle, Umudunu, Nnaba, and Ogunzele, which form the foundation of its social and administrative organization. Awka-Etiti is widely
                                respected for its strong communal values and collective approach to development, within which women’s institutions such as Inyom (Iyom) Awka-Etiti
                                have played significant and enduring roles.
                            </p>
                            <SectionHeader
                                // title="Our Story"
                                title="Background and History of Inyom (Iyom) Awka-Etiti"
                            // subtitle="Inyom Awka-Etiti (Community Women’s Wing)"
                            />
                            <p className="leading-relaxed">
                                The Inyom (also known as Iyom) Awka-Etiti Women’s Group is the recognized women’s association of Awka-Etiti.
                                The group is deeply rooted in the town’s traditional and communal system and has existed long before the advent
                                of modern documentation and formal town unions.
                                Historical and academic accounts indicate that Inyom Awka-Etiti evolved from indigenous women’s institutions that
                                played vital roles in community organization, cultural preservation, social regulation, and mutual support. Because
                                the group originated in the pre-colonial era and relied on oral tradition, there is no single verifiable founding date.
                                Nevertheless, the women’s group has remained a continuous and influential institution across generations.
                                With the emergence of modern civic structures, Inyom Awka-Etiti became formally organized as the Women’s Wing of the
                                Awka-Etiti community, working closely with the Awka-Etiti Improvement Union (AIU), traditional rulers, and village leadership
                                to promote unity, development, and social welfare. <br></br><br></br>
                                <b>Objectives</b><br></br><br></br>
                                <p>
                                    <li>To promote unity and cooperation among women of Awka-Etiti.</li>
                                    <li>To empower women economically through skills acquisition and income-generating activities.</li>
                                    <li>To support community development projects that improve social and economic wellbeing.</li>
                                    <li>To preserve and promote the cultural heritage of Awka-Etiti women.</li>
                                    <li>To collaborate with community leadership and development partners.</li>
                                </p>

                            </p>
                            <SectionHeader
                                // title="Our Story"
                                title="Key Achievements and Community Impact"
                             subtitle="Multipurpose Centre and Agro-Processing Facility (2025)"
                            />
                            <p className="leading-relaxed">
                                In October 2025, Inyom Awka-Etiti successfully commissioned a multipurpose centre with an agro-processing (garri) facility. 
                                This landmark project was designed to:
                                <p>
                                    <li>Support women engaged in agriculture and food processing.</li>
                                    <li>Create employment and income opportunities.</li>
                                    <li>Enhance local production capacity.</li>
                                    <li>Provide a venue for meetings, training, and community programs.</li>
                                </p>
                            </p>
                            <SectionHeader
                                // title="Our Story"
                                title="Women’s Centre Development"
                            //  subtitle="Women’s Centre Development"
                            />
                            <p className="leading-relaxed">
                                 The group has played a leading role in the development, renovation, and maintenance of women-focused community facilities, 
                                 ensuring functional spaces for coordination and empowerment programmes.
                            </p>
                            <SectionHeader
                                title="Economic Empowerment and Market Support"
                            //  subtitle="Multipurpose Centre and Agro-Processing Facility (2025)"
                            />
                            <p className="leading-relaxed">
                                Inyom Awka-Etiti actively supports women involved in trading, small-scale processing, and cooperative economic activities, 
                                strengthening household incomes and local commerce.
                            </p>
                            <SectionHeader
                                // title="Our Story"
                                title="Leadership Development and Assemblies"
                            //  subtitle="Multipurpose Centre and Agro-Processing Facility (2025)"
                            />
                            <p className="leading-relaxed">
                                Through regular women’s meetings and leadership forums, the group promotes accountability, participatory leadership, 
                                and effective project planning, including engagement with women in the diaspora.
                            </p>
                            <SectionHeader
                                title="Cultural Preservation and Social Support"
                            //  subtitle="Multipurpose Centre and Agro-Processing Facility (2025)"
                            />
                            <p className="leading-relaxed">
                                The women’s group remains central to cultural ceremonies, festivals, and social support systems, reinforcing unity, 
                                moral values, and community cohesion.
                            </p>
                            <SectionHeader
                                // title="Our Story"
                                title="Governance and Structure"
                            //  subtitle="Multipurpose Centre and Agro-Processing Facility (2025)"
                            />
                            <p className="leading-relaxed">
                                Inyom Awka-Etiti operates under a structured leadership headed by a Women President General, supported by executive 
                                officers and committees. The group works collaboratively with traditional rulers, the Awka-Etiti Improvement Union, 
                                and village leadership.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section with Images */}
            <section className="py-16 lg:py-24 section-light">
                <div className="container mx-auto px-4">
                    {/* Mission */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
                        <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-soft hover:shadow-elevated transition-shadow duration-300 order-2 lg:order-1">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
                                <Target className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                                Our Mission
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                To mobilize and empower women through collective action, economic initiatives, skills development,
                                and community service, while preserving the cultural values of Awka-Etiti.
                            </p>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="rounded-3xl overflow-hidden shadow-elevated">
                                <img
                                    src={program1}
                                    alt="Our Mission"
                                    className="w-full aspect-[4/3] object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vision */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
                        <div className="order-1">
                            <div className="rounded-3xl overflow-hidden shadow-elevated">
                                <img
                                    src={program2}
                                    alt="Our Vision"
                                    className="w-full aspect-[4/3] object-cover"
                                />
                            </div>
                        </div>
                        <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-soft hover:shadow-elevated transition-shadow duration-300 order-2">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center mb-6 shadow-lg shadow-secondary/25">
                                <Eye className="w-8 h-8 text-secondary-foreground" />
                            </div>
                            <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                                Our Vision
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                To build a united, empowered, and economically resilient community of women contributing meaningfully
                                to the sustainable development of Awka-Etiti.
                            </p>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-soft">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/25">
                                <Heart className="w-8 h-8 text-accent-foreground" />
                            </div>
                            <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                                Our Core Values
                            </h3>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Compassion", desc: "We serve with empathy and genuine care for every individual" },
                                { title: "Integrity", desc: "We uphold the highest ethical standards in all our operations" },
                                { title: "Excellence", desc: "We strive for quality in every aspect of our medical services" },
                                { title: "Community", desc: "We believe in the power of partnership and collaboration" },
                            ].map((value, index) => (
                                <div key={index} className="bg-muted/50 rounded-2xl p-6 text-center hover:bg-muted transition-colors duration-300">
                                    <h4 className="font-semibold text-foreground mb-2 text-lg">{value.title}</h4>
                                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Executives Section - 2-column grid layout */}
            <section className="py-16 lg:py-24 bg-card">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        title="Our Leadership Team"
                        subtitle="Meet the dedicated executives guiding INYOM's mission to transform healthcare"
                    />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {executives.map((exec, index) => (
                            <div
                                key={index}
                                className="group bg-background rounded-2xl lg:rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img
                                        src={exec.image}
                                        alt={exec.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-4 lg:p-6 text-center">
                                    <h4 className="font-display text-sm lg:text-lg font-bold text-foreground mb-1">
                                        {exec.name}
                                    </h4>
                                    <p className="text-secondary font-medium text-xs lg:text-sm mb-2 lg:mb-3">
                                        {exec.position}
                                    </p>
                                    {exec.phone && (
                                        <a
                                            href={`tel:${exec.phone}`}
                                            className="inline-flex items-center gap-1 lg:gap-2 text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <Phone className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                                            <span className="break-all">{exec.phone}</span>
                                        </a>
                                    )}
                                    {/* {exec.email && (
                                        <a
                                            href={`mailto:${exec.email}`}
                                            className="hidden lg:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <Mail className="w-4 h-4" />
                                            <span className="truncate">{exec.email}</span>
                                        </a>
                                    )} */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-2xl mx-auto text-primary-foreground">
                        <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                            Join Our Mission
                        </h2>
                        <p className="text-primary-foreground/80 mb-8 text-lg">
                            Be part of the change. Your support helps us reach more communities and save more lives.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="hero" size="lg" asChild>
                                <Link to="/support">Support Us <ArrowRight className="w-4 h-4" /></Link>
                            </Button>
                            <Button variant="heroOutline" size="lg" asChild>
                                <Link to="/contact">Get in Touch</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default About;
