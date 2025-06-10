import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

function NavigationHeader() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-secondary-background bg-primary-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-accent-purple/5" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              {/* logo hover effect */}
              <div
                className="absolute -inset-2 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-lg opacity-0
              group-hover:opacity-100 transition-all duration-500 blur-xl"
              />

              {/* Logo */}
              <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-text-primary/10 group-hover:ring-text-primary/20 transition-all">
                <Blocks className="w-6 h-6 text-accent-blue transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <div className="relative">
                <span
                  className="block text-lg font-semibold bg-gradient-to-r
                 from-accent-blue via-accent-blue to-accent-purple text-transparent bg-clip-text"
                >
                  KodeInSane
                </span>
                <span className="block text-xs text-accent-blue/60 font-medium">
                  Interactive Code Editor
                </span>
              </div>
            </Link>

            {/* snippets Link */}
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-text-secondary bg-secondary-background/50 hover:bg-accent-blue/10
              border border-secondary-background hover:border-accent-blue/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-accent-blue/10
              to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span className="text-sm font-medium relative z-10 group-hover:text-text-primary transition-colors">
                Snippets
              </span>
            </Link>
          </div>

          {/* right rection */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-accent-purple/20
                 hover:border-accent-purple/40 bg-gradient-to-r from-accent-purple/10
                to-accent-purple/10 hover:from-accent-purple/20 hover:to-accent-purple/20 transition-all
                duration-300"
              >
                <Sparkles className="w-4 h-4 text-accent-purple hover:text-accent-purple/90" />
                <span className="text-sm font-medium text-accent-purple hover:text-accent-purple/90">
                  Pro
                </span>
              </Link>
            </SignedOut>

            {/* profile button */}
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;