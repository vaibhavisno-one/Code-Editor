import { Zap } from "lucide-react";
import Link from "next/link";

export default function UpgradeButton() {
  const CHEKOUT_URL =
    "https://kodeinsane.lemonsqueezy.com/buy/7ca8cac5-2a15-47b4-a4f9-d120c65bd707";

  return (
    <Link
      href={CHEKOUT_URL}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-text-primary
        bg-gradient-to-r from-accent-blue to-accent-purple rounded-lg
        hover:from-accent-blue/90 hover:to-accent-purple/90 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </Link>
  );
}