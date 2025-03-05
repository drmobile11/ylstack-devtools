import React from "react";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface PricingTier {
  name: string;
  description: string;
  price: string;
  priceDetail: string;
  features: Array<{
    text: string;
    tooltip?: string;
    included: boolean;
  }>;
  buttonText: string;
  popular?: boolean;
}

interface PricingSectionProps {
  title?: string;
  description?: string;
  tiers?: PricingTier[];
  onSelectTier?: (tierName: string) => void;
}

const PricingSection = ({
  title = "Pricing Plans",
  description = "Choose the perfect plan for your needs. All plans include a 14-day free trial.",
  tiers = [
    {
      name: "Free",
      description: "Essential features for hobbyists and small projects",
      price: "$0",
      priceDetail: "forever",
      features: [
        { text: "5 projects per month", included: true },
        { text: "Basic component generation", included: true },
        { text: "Community support", included: true },
        { text: "Cloudflare Workers AI only", included: true },
        { text: "Basic templates", included: true },
        { text: "API generation", included: false },
        { text: "Priority support", included: false },
        { text: "Custom branding", included: false },
      ],
      buttonText: "Get Started",
    },
    {
      name: "Pro",
      description: "Advanced features for professionals and teams",
      price: "$19",
      priceDetail: "per month",
      features: [
        { text: "Unlimited projects", included: true },
        { text: "Advanced component generation", included: true },
        { text: "Email support", included: true },
        { text: "All AI models", included: true },
        { text: "Premium templates", included: true },
        { text: "API generation", included: true },
        { text: "Priority support", included: false },
        { text: "Custom branding", included: false },
      ],
      buttonText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "$49",
      priceDetail: "per month",
      features: [
        { text: "Unlimited projects", included: true },
        { text: "Advanced component generation", included: true },
        { text: "Dedicated support", included: true },
        { text: "All AI models", included: true },
        { text: "Premium templates", included: true },
        { text: "API generation", included: true },
        { text: "Priority support", included: true },
        { text: "Custom branding", included: true },
      ],
      buttonText: "Contact Sales",
    },
  ],
  onSelectTier = () => {},
}: PricingSectionProps) => {
  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col h-full border-border ${tier.popular ? "border-primary shadow-lg relative overflow-hidden" : ""}`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground ml-2">
                    {tier.priceDetail}
                  </span>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-start ${!feature.included ? "text-muted-foreground" : ""}`}
                    >
                      <div className="mr-2 mt-1">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                        )}
                      </div>
                      <span className="text-sm">{feature.text}</span>
                      {feature.tooltip && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 ml-1 p-0"
                              >
                                <HelpCircle className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${tier.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={tier.popular ? "default" : "outline"}
                  onClick={() => {
                    onSelectTier(tier.name);
                    // In a real app, this would redirect to checkout or signup
                    console.log(`Selected pricing tier: ${tier.name}`);
                    // If free tier, redirect to signup
                    if (tier.name === "Free") {
                      const authSection = document.querySelector(
                        ".py-16.px-4.bg-muted/30.dark\\:bg-muted/10.min-h-\\[80vh\\]",
                      );
                      if (authSection) {
                        window.scrollTo({
                          top:
                            authSection.getBoundingClientRect().top +
                            window.scrollY,
                          behavior: "smooth",
                        });
                      }
                    } else {
                      // For paid tiers, show a mock checkout modal
                      alert(
                        `You selected the ${tier.name} plan. In a real app, this would redirect to the payment processor.`,
                      );
                    }
                  }}
                >
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? Contact our sales team for a tailored quote.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              // In a real app, this would open a contact form
              window.location.href =
                "mailto:sales@aifullstackgenerator.com?subject=Custom%20Pricing%20Inquiry";
            }}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
