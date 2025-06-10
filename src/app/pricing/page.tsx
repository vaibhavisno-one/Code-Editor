import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import ProPlanView from "./_components/ProPlanView";
import NavigationHeader from "@/components/NavigationHeader";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import { Star } from "lucide-react";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UpgradeButton from "./_components/UpgradeButton";
import LoginButton from "@/components/LoginButton";

async function PricingPage() {
  const user = await currentUser();
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  if (convexUser?.isPro) return <ProPlanView />;

  return (
    <div
      className="relative min-h-screen bg-primary-background selection:bg-accent-blue/20
     selection:text-accent-blue"
    >
      <NavigationHeader />

      {/* main content */}

      <main className="relative pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero   */}
          <div className="text-center mb-24">
            <div className="relative inline-block">
              <div className="absolute -inset-px bg-gradient-to-r from-accent-blue to-accent-purple blur-xl opacity-10" />
              <h1
                className="relative text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r
               from-text-primary to-text-secondary text-transparent bg-clip-text mb-8"
              >
                Elevate Your <br />
                Development Experience
              </h1>
            </div>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Join the next generation of developers with our professional suite of tools
            </p>
          </div>

          {/* Enterprise Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {ENTERPRISE_FEATURES.map((feature) => (
              <div
                key={feature.label}
                className="group relative bg-gradient-to-b from-secondary-background to-primary-background rounded-2xl p-6 hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10
                  flex items-center justify-center mb-4 ring-1 ring-primary-background/60 group-hover:ring-accent-blue/20"
                  >
                    <feature.icon className="w-6 h-6 text-accent-blue" />
                  </div>

                  <h3 className="text-lg font-medium text-text-primary mb-2">{feature.label}</h3>
                  <p className="text-text-secondary">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Card */}

          <div className="relative max-w-4xl mx-auto">
            <div
              className="absolute -inset-px bg-gradient-to-r from-accent-blue
             to-accent-purple rounded-2xl blur opacity-10"
            />
            <div className="relative bg-secondary-background/90 backdrop-blur-xl rounded-2xl">
              <div
                className="absolute inset-x-0 -top-px h-px bg-gradient-to-r 
              from-transparent via-accent-blue/50 to-transparent"
              />
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />

              <div className="relative p-8 md:p-12">
                {/* header */}
                <div className="text-center mb-12">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 ring-1 ring-primary-background/60 mb-6">
                    <Star className="w-8 h-8 text-accent-blue" />
                  </div>
                  <h2 className="text-3xl font-semibold text-text-primary mb-4">Lifetime Pro Access</h2>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-2xl text-text-secondary">$</span>
                    <span className="text-6xl font-semibold bg-gradient-to-r from-text-primary to-text-secondary text-transparent bg-clip-text">
                      3 
                    </span>
                    <span className="text-xl text-text-secondary">Buy Me a Coffee</span>
                  </div>
                  <p className="text-text-secondary text-lg">Unlock the full potential of KodeInSane</p>
                </div>

                {/* Features grid */}
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                  <FeatureCategory label="Development">
                    {FEATURES.development.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Collaboration">
                    {FEATURES.collaboration.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Deployment">
                    {FEATURES.deployment.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                  <SignedIn>
                    <UpgradeButton />
                  </SignedIn>

                  <SignedOut>
                    <LoginButton />
                  </SignedOut>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default PricingPage;