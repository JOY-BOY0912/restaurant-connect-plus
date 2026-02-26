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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg border border-border p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Start Smart Queue</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm text-muted-foreground">Target Segment</label>
          <div className="flex flex-wrap gap-2">
            {segments.map((s) => (
              <button
                key={s}
                onClick={() => handleSegmentChange(s)}
                className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
                  selectedSegment === s
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {s} ({s === "all" ? customers.length : customers.filter((c) => c.segment === s).length})
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm text-muted-foreground">
            Message Template ({filtered.length} recipients)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-border bg-secondary p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Use {"{{name}}"} to insert customer name
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={() => onStart(filtered, message)} className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Rocket className="h-4 w-4" />
            Start Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}
