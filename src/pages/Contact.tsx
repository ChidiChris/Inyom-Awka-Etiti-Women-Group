// This is a hybrid solution for the contact page:
// First, it tries to submit via AJAX (fetch) so the user stays on the same page.
// If FormSubmit responds that captcha or verification is required, it falls back to
//  a normal form submission, redirecting the user so they can complete it.

import { useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import hero3 from "@/assets/hero-3.jpeg";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255)
    .optional()
    .or(z.literal("")), // allow empty string
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().trim().min(5, "Message must be at least 5 characters").max(1000),
});

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+234 706 575 5655", "+234 814 650 5046", "+234 812 013 4477"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["iyomakwaetiti@gmail.com",],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["Inyom Awka Etiti Town Hall, Awka Etiti, Idemili South, Anambra State, Nigeria."],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 9AM - 5PM", "Saturday: 10AM - 2PM"],
  },
];

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      contactSchema.parse(formData);

      // Attempt AJAX submission first
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => formPayload.append(key, value));
      formPayload.append("_captcha", "false");
      formPayload.append("_template", "table");
      formPayload.append("_subject", "New Contact Message From INYOM Website");

      const response = await fetch("https://formsubmit.co/ajax/chidichristopher0@gmail.com", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        // If FormSubmit requires captcha, fallback to normal form submit
        toast({
          title: "Please verify you're human",
          description: "Redirecting to FormSubmit for verification...",
        });
        formRef.current?.submit();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Unexpected error
        toast({
          title: "Submission failed",
          description: "Please try again or contact us via email.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello! I would like to get in touch with INYOM Medical Outreach.");
    window.open(`https://wa.me/2348012345678?text=${message}`, "_blank");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero3} alt="Contact us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
        <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Get in touch with our team. We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 lg:py-16 section-light">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-shadow duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

              <form
                ref={formRef}
                action="https://formsubmit.co/chidichristopher0@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="New Contact Message From INYOM Website" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="chidi@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 800 *** ****"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className={errors.subject ? "border-destructive" : ""}
                    />
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="whatsapp" size="lg" onClick={openWhatsApp}>
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </Button>
                </div>
              </form>
            </div>

            {/* Google Map */}
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">Find Us</h2>
              <p className="text-muted-foreground mb-8">Visit our office or reach out to us at the address below.</p>
              <div className="rounded-2xl overflow-hidden shadow-elevated h-[400px] lg:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.007017003897!2d6.9404409!3d6.031737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104398862d64eb59%3A0xadfe6d13b8ebfbde!2sAwka%20Etiti%2C%20Anambra!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="INYOM Medical Outreach Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;



// Below is the complete code for src/pages/Contact.tsx with an optional email section,
//  integrated with formsubmit and not redirecting me to another page

// import { useState } from "react";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { z } from "zod";
// import hero3 from "@/assets/hero-3.jpeg";

// const contactSchema = z.object({
//   name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
//   email: z
//     .string()
//     .trim()
//     .email("Please enter a valid email address")
//     .max(255)
//     .optional()
//     .or(z.literal("")), // Allow empty string
//   phone: z.string().trim().optional(),
//   subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(200),
//   message: z.string().trim().min(5, "Message must be at least 5 characters").max(1000),
// });

// const contactInfo = [
//   { icon: Phone, title: "Phone", details: ["+234 801 234 5678", "+234 802 345 6789"] },
//   { icon: Mail, title: "Email", details: ["contact@inyom.org", "support@inyom.org"] },
//   { icon: MapPin, title: "Address", details: ["123 Medical Center Road", "Victoria Island, Lagos, Nigeria"] },
//   { icon: Clock, title: "Office Hours", details: ["Monday - Friday: 9AM - 5PM", "Saturday: 10AM - 2PM"] },
// ];

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrors({});

//     try {
//       contactSchema.parse(formData);

//       // Send via FormSubmit AJAX
//       const response = await fetch("https://formsubmit.co/ajax/chidichristopher0@gmail.com", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Accept: "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           _captcha: "false",
//           _subject: "New Contact Message From INYOM Website",
//           _template: "table",
//         }),
//       });

//       const data = await response.json();

//       if (data.success === "true" || response.ok) {
//         toast({ title: "Message sent successfully!", description: "We'll get back to you as soon as possible." });
//         setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
//       } else {
//         toast({ title: "Error sending message", description: "Please try again later.", variant: "destructive" });
//       }

//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const fieldErrors: Record<string, string> = {};
//         error.errors.forEach(err => {
//           if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
//         });
//         setErrors(fieldErrors);
//       } else {
//         toast({ title: "Error sending message", description: "Please try again later.", variant: "destructive" });
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openWhatsApp = () => {
//     const message = encodeURIComponent("Hello! I would like to get in touch with INYOM Medical Outreach.");
//     window.open(`https://wa.me/2348012345678?text=${message}`, "_blank");
//   };

//   return (
//     <Layout>
//       {/* Hero Section */}
//       <section className="relative py-20 lg:py-28 overflow-hidden">
//         <div className="absolute inset-0">
//           <img src={hero3} alt="Contact us" className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
//         </div>
//         <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
//           <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Contact Us</h1>
//           <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
//             Get in touch with our team. We'd love to hear from you.
//           </p>
//         </div>
//       </section>

//       {/* Contact Info Cards */}
//       <section className="py-12 lg:py-16 section-light">
//         <div className="container mx-auto px-4">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
//             {contactInfo.map((info, i) => (
//               <div key={i} className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-shadow duration-300">
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
//                   <info.icon className="w-6 h-6 text-primary" />
//                 </div>
//                 <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
//                 {info.details.map((detail, j) => (
//                   <p key={j} className="text-sm text-muted-foreground">{detail}</p>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Form & Map */}
//       <section className="py-16 lg:py-24 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
//             {/* Contact Form */}
//             <div>
//               <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
//               <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name *</Label>
//                     <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={errors.name ? "border-destructive" : ""} />
//                     {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email Address</Label>
//                     <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="chidi@example.com" className={errors.email ? "border-destructive" : ""} />
//                     {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
//                   </div>
//                 </div>
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 800 *** ****" />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="subject">Subject *</Label>
//                     <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" className={errors.subject ? "border-destructive" : ""} />
//                     {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="message">Message *</Label>
//                   <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your inquiry..." rows={5} className={errors.message ? "border-destructive" : ""} />
//                   {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}<Send className="w-4 h-4" /></Button>
//                   <Button type="button" variant="whatsapp" size="lg" onClick={openWhatsApp}><MessageCircle className="w-4 h-4" />Chat on WhatsApp</Button>
//                 </div>
//               </form>
//             </div>

//             {/* Google Map */}
//             <div>
//               <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">Find Us</h2>
//               <p className="text-muted-foreground mb-8">Visit our office or reach out to us at the address below.</p>
//               <div className="rounded-2xl overflow-hidden shadow-elevated h-[400px] lg:h-[500px]">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.007017003897!2d6.9404409!3d6.031737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104398862d64eb59%3A0xadfe6d13b8ebfbde!2sAwka%20Etiti%2C%20Anambra!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="INYOM Medical Outreach Location"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Contact;


// Below is the complete code for src/pages/Contact.tsx with an optional email section integrated with formsubmit

// import { useState, useRef } from "react";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { z } from "zod";
// import hero3 from "@/assets/hero-3.jpeg";

// const contactSchema = z.object({
//   name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
//   email: z
//     .string()
//     .trim()
//     .email("Please enter a valid email address")
//     .max(255)
//     .optional()
//     .or(z.literal("")), // Allow empty string as optional
//   phone: z.string().trim().optional(),
//   subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(200),
//   message: z.string().trim().min(5, "Message must be at least 5 characters").max(1000),
// });

// const contactInfo = [
//   {
//     icon: Phone,
//     title: "Phone",
//     details: ["+234 801 234 5678", "+234 802 345 6789"],
//   },
//   {
//     icon: Mail,
//     title: "Email",
//     details: ["contact@inyom.org", "support@inyom.org"],
//   },
//   {
//     icon: MapPin,
//     title: "Address",
//     details: ["123 Medical Center Road", "Victoria Island, Lagos, Nigeria"],
//   },
//   {
//     icon: Clock,
//     title: "Office Hours",
//     details: ["Monday - Friday: 9AM - 5PM", "Saturday: 10AM - 2PM"],
//   },
// ];

// const Contact = () => {
//   const formRef = useRef<HTMLFormElement>(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrors({});

//     try {
//       contactSchema.parse(formData);

//       // Submit to FormSubmit
//       formRef.current?.submit();

//       toast({
//         title: "Message sent successfully!",
//         description: "We'll get back to you as soon as possible.",
//       });

//       setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const fieldErrors: Record<string, string> = {};
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             fieldErrors[err.path[0] as string] = err.message;
//           }
//         });
//         setErrors(fieldErrors);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openWhatsApp = () => {
//     const message = encodeURIComponent("Hello! I would like to get in touch with INYOM Medical Outreach.");
//     window.open(`https://wa.me/2348012345678?text=${message}`, "_blank");
//   };

//   return (
//     <Layout>
//       {/* Hero Section */}
//       <section className="relative py-20 lg:py-28 overflow-hidden">
//         <div className="absolute inset-0">
//           <img 
//             src={hero3} 
//             alt="Contact us" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
//         </div>
//         <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
//           <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
//             Contact Us
//           </h1>
//           <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
//             Get in touch with our team. We'd love to hear from you.
//           </p>
//         </div>
//       </section>

//       {/* Contact Info Cards */}
//       <section className="py-12 lg:py-16 section-light">
//         <div className="container mx-auto px-4">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
//             {contactInfo.map((info, index) => (
//               <div key={index} className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-shadow duration-300">
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
//                   <info.icon className="w-6 h-6 text-primary" />
//                 </div>
//                 <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
//                 {info.details.map((detail, i) => (
//                   <p key={i} className="text-sm text-muted-foreground">{detail}</p>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Form & Map */}
//       <section className="py-16 lg:py-24 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
//             {/* Contact Form */}
//             <div>
//               <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
//                 Send Us a Message
//               </h2>
//               <p className="text-muted-foreground mb-8">
//                 Fill out the form below and we'll get back to you within 24 hours.
//               </p>

//               <form
//                 ref={formRef}
//                 action="https://formsubmit.co/chidichristopher0@gmail.com" // ← Replace with your email
//                 method="POST"
//                 onSubmit={handleSubmit}
//                 className="space-y-6"
//               >
//                 {/* Hidden FormSubmit fields */}
//                 <input type="hidden" name="_captcha" value="false" />
//                 <input type="hidden" name="_template" value="table" />
//                 <input type="hidden" name="_subject" value="New Contact Message From INYOM Website" />

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name *</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Your Name"
//                       className={errors.name ? "border-destructive" : ""}
//                     />
//                     {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email Address</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="chidi@example.com"
//                       className={errors.email ? "border-destructive" : ""}
//                     />
//                     {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
//                   </div>
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="+234 800 *** ****"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="subject">Subject *</Label>
//                     <Input
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       placeholder="How can we help?"
//                       className={errors.subject ? "border-destructive" : ""}
//                     />
//                     {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="message">Message *</Label>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Tell us more about your inquiry..."
//                     rows={5}
//                     className={errors.message ? "border-destructive" : ""}
//                   />
//                   {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <Button type="submit" size="lg" disabled={isSubmitting}>
//                     {isSubmitting ? "Sending..." : "Send Message"}
//                     <Send className="w-4 h-4" />
//                   </Button>
//                   <Button type="button" variant="whatsapp" size="lg" onClick={openWhatsApp}>
//                     <MessageCircle className="w-4 h-4" />
//                     Chat on WhatsApp
//                   </Button>
//                 </div>
//               </form>
//             </div>

//             {/* Google Map */}
//             <div>
//               <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
//                 Find Us
//               </h2>
//               <p className="text-muted-foreground mb-8">
//                 Visit our office or reach out to us at the address below.
//               </p>
//               <div className="rounded-2xl overflow-hidden shadow-elevated h-[400px] lg:h-[500px]">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.007017003897!2d6.9404409!3d6.031737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104398862d64eb59%3A0xadfe6d13b8ebfbde!2sAwka%20Etiti%2C%20Anambra!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="INYOM Medical Outreach Location"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Contact;


// Below is the complete code for src/pages/Contact.tsx that has a conplusory email section
// import { useState, useRef } from "react";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { z } from "zod";
// import hero3 from "@/assets/hero-3.jpeg";

// const contactSchema = z.object({
//   name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
//   email: z.string().trim().email("Please enter a valid email address").max(255),
//   phone: z.string().trim().optional(),
//   subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(200),
//   message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
// });

// const contactInfo = [
//   {
//     icon: Phone,
//     title: "Phone",
//     details: ["+234 801 234 5678", "+234 802 345 6789"],
//   },
//   {
//     icon: Mail,
//     title: "Email",
//     details: ["contact@inyom.org", "support@inyom.org"],
//   },
//   {
//     icon: MapPin,
//     title: "Address",
//     details: ["123 Medical Center Road", "Victoria Island, Lagos, Nigeria"],
//   },
//   {
//     icon: Clock,
//     title: "Office Hours",
//     details: ["Monday - Friday: 9AM - 5PM", "Saturday: 10AM - 2PM"],
//   },
// ];

// const Contact = () => {
//   const formRef = useRef<HTMLFormElement>(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrors({});

//     try {
//       contactSchema.parse(formData);

//       // Submit to FormSubmit
//       formRef.current?.submit();

//       toast({
//         title: "Message sent successfully!",
//         description: "We'll get back to you as soon as possible.",
//       });

//       setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const fieldErrors: Record<string, string> = {};
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             fieldErrors[err.path[0] as string] = err.message;
//           }
//         });
//         setErrors(fieldErrors);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openWhatsApp = () => {
//     const message = encodeURIComponent("Hello! I would like to get in touch with INYOM Medical Outreach.");
//     window.open(`https://wa.me/2348012345678?text=${message}`, "_blank");
//   };

//   return (
//     <Layout>
//       {/* Hero Section */}
//       <section className="relative py-20 lg:py-28 overflow-hidden">
//         <div className="absolute inset-0">
//           <img 
//             src={hero3} 
//             alt="Contact us" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
//         </div>
//         <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
//           <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
//             Contact Us
//           </h1>
//           <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
//             Get in touch with our team. We'd love to hear from you.
//           </p>
//         </div>
//       </section>

//       {/* Contact Info Cards */}
//       <section className="py-12 lg:py-16 section-light">
//         <div className="container mx-auto px-4">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
//             {contactInfo.map((info, index) => (
//               <div key={index} className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-shadow duration-300">
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
//                   <info.icon className="w-6 h-6 text-primary" />
//                 </div>
//                 <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
//                 {info.details.map((detail, i) => (
//                   <p key={i} className="text-sm text-muted-foreground">{detail}</p>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Form & Map */}
//       <section className="py-16 lg:py-24 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
//             {/* Contact Form */}
//             <div>
//               <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
//                 Send Us a Message
//               </h2>
//               <p className="text-muted-foreground mb-8">
//                 Fill out the form below and we'll get back to you within 24 hours.
//               </p>

//               <form
//                 ref={formRef}
//                 action="https://formsubmit.co/chidichristopher0@gmail.com" // ← Replace with your email
//                 method="POST"
//                 onSubmit={handleSubmit}
//                 className="space-y-6"
//               >
//                 {/* Hidden FormSubmit fields */}
//                 <input type="hidden" name="_captcha" value="false" />
//                 <input type="hidden" name="_template" value="table" />
//                 <input type="hidden" name="_subject" value="New Contact Message From INYOM Website" />

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name *</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="John Doe"
//                       className={errors.name ? "border-destructive" : ""}
//                     />
//                     {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email Address *</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="john@example.com"
//                       className={errors.email ? "border-destructive" : ""}
//                     />
//                     {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
//                   </div>
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="+234 800 000 0000"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="subject">Subject *</Label>
//                     <Input
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       placeholder="How can we help?"
//                       className={errors.subject ? "border-destructive" : ""}
//                     />
//                     {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="message">Message *</Label>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Tell us more about your inquiry..."
//                     rows={5}
//                     className={errors.message ? "border-destructive" : ""}
//                   />
//                   {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <Button type="submit" size="lg" disabled={isSubmitting}>
//                     {isSubmitting ? "Sending..." : "Send Message"}
//                     <Send className="w-4 h-4" />
//                   </Button>
//                   <Button type="button" variant="whatsapp" size="lg" onClick={openWhatsApp}>
//                     <MessageCircle className="w-4 h-4" />
//                     Chat on WhatsApp
//                   </Button>
//                 </div>
//               </form>
//             </div>

//             {/* Google Map */}
//             <div>
//               <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
//                 Find Us
//               </h2>
//               <p className="text-muted-foreground mb-8">
//                 Visit our office or reach out to us at the address below.
//               </p>
//               <div className="rounded-2xl overflow-hidden shadow-elevated h-[400px] lg:h-[500px]">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7286407550396!2d3.4216556!3d6.4280556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53e48c5bf9b%3A0x377ef99f84c1d9e2!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="INYOM Medical Outreach Location"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Contact;




// Below is the original code for src/pages/Contact.tsx with the compulsory email section before formsubmit integration

// import { useState } from "react";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { z } from "zod";
// import hero3 from "@/assets/hero-3.jpeg";

// const contactSchema = z.object({
//   name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
//   email: z.string().trim().email("Please enter a valid email address").max(255),
//   phone: z.string().trim().optional(),
//   subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(200),
//   message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
// });

// const contactInfo = [
//   {
//     icon: Phone,
//     title: "Phone",
//     details: ["+234 801 234 5678", "+234 802 345 6789"],
//   },
//   {
//     icon: Mail,
//     title: "Email",
//     details: ["contact@inyom.org", "support@inyom.org"],
//   },
//   {
//     icon: MapPin,
//     title: "Address",
//     details: ["123 Medical Center Road", "Victoria Island, Lagos, Nigeria"],
//   },
//   {
//     icon: Clock,
//     title: "Office Hours",
//     details: ["Monday - Friday: 9AM - 5PM", "Saturday: 10AM - 2PM"],
//   },
// ];

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrors({});

//     try {
//       contactSchema.parse(formData);
      
//       // Simulate form submission
//       await new Promise((resolve) => setTimeout(resolve, 1000));
      
//       toast({
//         title: "Message sent successfully!",
//         description: "We'll get back to you as soon as possible.",
//       });
      
//       setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const fieldErrors: Record<string, string> = {};
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             fieldErrors[err.path[0] as string] = err.message;
//           }
//         });
//         setErrors(fieldErrors);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openWhatsApp = () => {
//     const message = encodeURIComponent("Hello! I would like to get in touch with INYOM Medical Outreach.");
//     window.open(`https://wa.me/2348012345678?text=${message}`, "_blank");
//   };

//   return (
//     <Layout>
//       {/* Hero Section with Background Image */}
//       <section className="relative py-20 lg:py-28 overflow-hidden">
//         <div className="absolute inset-0">
//           <img 
//             src={hero3} 
//             alt="Contact us" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
//         </div>
//         <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
//           <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
//             Contact Us
//           </h1>
//           <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
//             Get in touch with our team. We'd love to hear from you.
//           </p>
//         </div>
//       </section>

//       {/* Contact Info Cards */}
//       <section className="py-12 lg:py-16 section-light">
//         <div className="container mx-auto px-4">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
//             {contactInfo.map((info, index) => (
//               <div
//                 key={index}
//                 className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-shadow duration-300"
//               >
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
//                   <info.icon className="w-6 h-6 text-primary" />
//                 </div>
//                 <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
//                 {info.details.map((detail, i) => (
//                   <p key={i} className="text-sm text-muted-foreground">
//                     {detail}
//                   </p>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Form & Map */}
//       <section className="py-16 lg:py-24 bg-background">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
//             {/* Contact Form */}
//             <div>
//               <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
//                 Send Us a Message
//               </h2>
//               <p className="text-muted-foreground mb-8">
//                 Fill out the form below and we'll get back to you within 24 hours.
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name *</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="John Doe"
//                       className={errors.name ? "border-destructive" : ""}
//                     />
//                     {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email Address *</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="john@example.com"
//                       className={errors.email ? "border-destructive" : ""}
//                     />
//                     {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
//                   </div>
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="+234 800 000 0000"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="subject">Subject *</Label>
//                     <Input
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       placeholder="How can we help?"
//                       className={errors.subject ? "border-destructive" : ""}
//                     />
//                     {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="message">Message *</Label>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Tell us more about your inquiry..."
//                     rows={5}
//                     className={errors.message ? "border-destructive" : ""}
//                   />
//                   {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <Button type="submit" size="lg" disabled={isSubmitting}>
//                     {isSubmitting ? "Sending..." : "Send Message"}
//                     <Send className="w-4 h-4" />
//                   </Button>
//                   <Button type="button" variant="whatsapp" size="lg" onClick={openWhatsApp}>
//                     <MessageCircle className="w-4 h-4" />
//                     Chat on WhatsApp
//                   </Button>
//                 </div>
//               </form>
//             </div>

//             {/* Google Map */}
//             <div>
//               <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
//                 Find Us
//               </h2>
//               <p className="text-muted-foreground mb-8">
//                 Visit our office or reach out to us at the address below.
//               </p>
//               <div className="rounded-2xl overflow-hidden shadow-elevated h-[400px] lg:h-[500px]">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7286407550396!2d3.4216556!3d6.4280556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53e48c5bf9b%3A0x377ef99f84c1d9e2!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   title="INYOM Medical Outreach Location"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Contact;
