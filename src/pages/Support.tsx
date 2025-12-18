import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Copy, Check, MessageCircle, Heart, Building, CreditCard, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import hero2 from "@/assets/hero-2.jpeg";

const bankDetails = {
  bankName: "First Bank of Nigeria",
  accountName: "INYOM Medical Outreach Foundation",
  accountNumber: "3001234567"
};

const Support = () => {
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopied(true);
    toast({
      title: "Account number copied!",
      description: "You can now paste it in your banking app.",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello! I would like to support INYOM Medical Outreach. I have made a donation and would like to send proof of payment.");
    window.open(`https://wa.me/2348012345678?text=${message}`, "_blank");
  };

  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={hero2} 
            alt="Support our mission" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
        <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Support Our Mission
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Your generosity helps us bring quality development to underserved communities
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Impact Message */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-secondary" />
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Support Our Medical Mission
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every donation, no matter the size, makes a difference. Your contribution helps us provide free medical care, essential medicines, and health education to communities in need.
              </p>
            </div>

            {/* Bank Details Card */}
            <div className="bg-card rounded-2xl shadow-elevated p-8 lg:p-10 mb-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-6 text-center">
                Bank Transfer Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bank Name</p>
                    <p className="font-semibold text-foreground">{bankDetails.bankName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Name</p>
                    <p className="font-semibold text-foreground">{bankDetails.accountName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-xl border-2 border-secondary/20">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Account Number</p>
                    <p className="font-bold text-xl text-foreground font-mono tracking-wider">
                      {bankDetails.accountNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-4">
                <Button
                  variant="default"
                  size="xl"
                  className="w-full"
                  onClick={copyAccountNumber}
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy Account Number
                    </>
                  )}
                </Button>

                <Button
                  variant="whatsapp"
                  size="xl"
                  className="w-full"
                  onClick={openWhatsApp}
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Proof of Payment via WhatsApp
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-muted rounded-2xl p-6 lg:p-8 text-center">
              <h4 className="font-semibold text-foreground mb-2">After Making Your Donation</h4>
              <p className="text-muted-foreground text-sm">
                Please send your proof of payment via WhatsApp so we can acknowledge your generous contribution and keep you updated on how your donation is making an impact.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { value: "₦10,000", label: "Provides medicines for 5 patients" },
                { value: "₦50,000", label: "Sponsors a community screening" },
                { value: "₦100,000", label: "Funds a full outreach day" },
              ].map((item, index) => (
                <div key={index} className="text-center p-4 bg-card rounded-xl shadow-soft">
                  <p className="font-display text-xl lg:text-2xl font-bold text-secondary mb-1">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
