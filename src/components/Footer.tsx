import { Blocks } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    // TODO: Update hrefs for Support, Privacy, and Terms links when pages are available.
    <footer className="relative border-t border-secondary-background/50 mt-auto">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary-background to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-text-secondary">
            <Blocks className="size-5" />
            <span>Built for developers, by developers</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              Support
            </Link>
            <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-text-secondary hover:text-text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;