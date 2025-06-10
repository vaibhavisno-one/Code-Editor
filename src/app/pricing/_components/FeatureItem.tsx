import { Check } from "lucide-react";

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3 group">
    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20 group-hover:border-accent-blue/40 group-hover:bg-accent-blue/20 transition-colors">
      <Check className="w-3 h-3 text-accent-blue" />
    </div>
    <span className="text-text-secondary group-hover:text-text-primary transition-colors">{children}</span>
  </div>
);

export default FeatureItem;