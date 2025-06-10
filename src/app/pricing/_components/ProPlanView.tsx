import NavigationHeader from "@/components/NavigationHeader";
import { ArrowRight, Command, Star } from "lucide-react";
import Link from "next/link";

function ProPlanView() {
  return (
    <div className="bg-primary-background">
      <NavigationHeader />
      <div className="relative px-4 h-[80vh] flex items-center justify-center">
        <div className="relative max-w-xl mx-auto text-center">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent" />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue/30 to-accent-purple/30 blur-2xl opacity-10" />

          <div className="relative bg-secondary-background/90 border border-primary-background/50 backdrop-blur-2xl rounded-2xl p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.05] to-accent-purple/[0.05] rounded-2xl" />

            <div className="relative">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-accent-purple/10 to-accent-blue/10 mb-6 ring-1 ring-primary-background/60">
                <Star className="w-8 h-8 text-accent-purple" />
              </div>

              <h1 className="text-3xl font-semibold text-text-primary mb-3">Pro Plan Active</h1>
              <p className="text-text-secondary mb-8 text-lg">
                Experience the full power of professional development
              </p>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 hover:from-accent-blue/20 hover:to-accent-purple/20 text-text-primary rounded-xl transition-all duration-200 border border-primary-background hover:border-accent-blue/50 group"
              >
                <Command className="w-5 h-5 text-accent-blue" />
                <span>Open Editor</span>
                <ArrowRight className="w-5 h-5 text-accent-purple group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProPlanView;