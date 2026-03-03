import { useState } from "react";
import { Customer, MESSAGE_TEMPLATES } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { X, Rocket } from "lucide-react";

interface CampaignModalProps {
  customers: Customer[];
  onStart: (customers: Customer[], message: string) => void;
  onClose: () => void;
}

export default function CampaignModal({ customers, onStart, onClose }: CampaignModalProps) {
  const [selectedSegment, setSelectedSegment] = useState<string>("all");
  const segments = ["all", ...new Set(customers.map((c) => c.segment))];

  const filtered = selectedSegment === "all" ? customers : customers.filter((c) => c.segment === selectedSegment);

  const defaultTemplate =
    selectedSegment === "all"
      ? MESSAGE_TEMPLATES.Active
      : MESSAGE_TEMPLATES[selectedSegment] || MESSAGE_TEMPLATES.Active;

  const [message, setMessage] = useState(defaultTemplate);

  const handleSegmentChange = (seg: string) => {
    setSelectedSegment(seg);
    const tmpl = seg === "all" ? MESSAGE_TEMPLATES.Active : MESSAGE_TEMPLATES[seg] || MESSAGE_TEMPLATES.Active;
    setMessage(tmpl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg p-7">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-heading tracking-wide">Start Smart Queue</h2>
          <button onClick={onClose} className="rounded-xl p-1.5 text-muted-foreground hover:bg-secondary transition-colors duration-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-xs text-muted-foreground font-body uppercase tracking-wider">Target Segment</label>
          <div className="flex flex-wrap gap-2">
            {segments.map((s) => (
              <button
                key={s}
                onClick={() => handleSegmentChange(s)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-body capitalize transition-all duration-300 ${
                  selectedSegment === s
                    ? "border-primary bg-primary/12 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {s} ({s === "all" ? customers.length : customers.filter((c) => c.segment === s).length})
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-xs text-muted-foreground font-body uppercase tracking-wider">
            Message Template ({filtered.length} recipients)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-border bg-secondary/50 p-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
          />
          <p className="mt-1.5 text-xs text-muted-foreground font-body">
            Use {"{{name}}"} to insert customer name
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 transition-all duration-300">
            Cancel
          </Button>
          <Button onClick={() => onStart(filtered, message)} className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
            <Rocket className="h-4 w-4" />
            Start Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}
