"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Blocks, Code2, Sparkles, User as UserIconLucide } from 'lucide-react'; // UserIconLucide to avoid conflict
import { useScroll } from '@/hooks/useScroll'; // Assuming useScroll is in src/hooks
import { cn } from '@/lib/utils'; // Assuming shadcn/ui utils

// Shadcn/ui components - assuming they are installed
// If not, these imports will cause issues at runtime, but are needed for code generation
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Clerk components
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import LoginButton from './LoginButton'; // Assuming LoginButton is in src/components

export function NewNavbar() {
  const isScrolled = useScroll(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation links data
  const navLinks = [
    { href: "/snippets", label: "Snippets", icon: <Code2 className="w-4 h-4" /> },
    { href: "/pricing", label: "Pro", icon: <Sparkles className="w-4 h-4 text-accent-purple" /> },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        "bg-primary-background/80 backdrop-blur-xl backdrop-saturate-150",
        isScrolled ? "h-14 shadow-md" : "h-20"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between h-full",
          "transition-all duration-300 ease-in-out",
          isScrolled ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" : "w-full px-4"
        )}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <Blocks className="w-7 h-7 text-accent-blue group-hover:animate-pulse" />
          <span className="text-xl font-semibold text-text-primary group-hover:text-accent-blue transition-colors">
            KodeInSane
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Button key={link.label} variant="ghost" asChild>
              <Link href={link.href} className="text-text-secondary hover:text-text-primary px-3 py-2 text-sm font-medium">
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.label}
              </Link>
            </Button>
          ))}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <LoginButton />
          </SignedOut>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6 text-text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[320px] bg-primary-background border-r-secondary-background p-0">
              <SheetHeader className="p-6 border-b border-secondary-background">
                <SheetTitle className="flex items-center gap-2 text-text-primary">
                  <Blocks className="w-6 h-6 text-accent-blue" />
                  KodeInSane
                </SheetTitle>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-background"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 p-6">
                {navLinks.map((link) => (
                  <Button key={link.label} variant="ghost" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href={link.href} className="flex items-center justify-start gap-3 text-text-secondary hover:text-text-primary hover:bg-secondary-background p-3 rounded-md text-base font-medium">
                      {link.icon && <span className="text-current">{link.icon}</span>}
                      {link.label}
                    </Link>
                  </Button>
                ))}
                <div className="border-t border-secondary-background pt-4">
                  <SignedIn>
                    <div className="flex flex-col space-y-2">
                       <Button variant="ghost" asChild onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/profile" className="flex items-center justify-start gap-3 text-text-secondary hover:text-text-primary hover:bg-secondary-background p-3 rounded-md text-base font-medium">
                          <UserIconLucide className="w-4 h-4" /> Profile
                        </Link>
                      </Button>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <LoginButton />
                  </SignedOut>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default NewNavbar;
