import { useState, useEffect } from "react";
import { Customer, MESSAGE_TEMPLATES } from "@/types/customer";
import { generateWhatsAppLink, buildMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Check, SkipForward, XCircle, Crown, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OperatorModeProps {
  customers: Customer[];
  currentIndex: number;
  message: string;
  sentCount: number;
  skippedCount: number;
  onMarkSent: () => void;
  onSkip: () => void;
  onEnd: () => void;
}

export default function OperatorMode({
  customers,
  currentIndex,
  message,
  sentCount,
  skippedCount,
  onMarkSent,
  onSkip,
  onEnd,
}: OperatorModeProps) {
  const customer = customers[currentIndex];

  const [editedMessage, setEditedMessage] = useState("");

  useEffect(() => {
    if (!customer) return;
    const template = MESSAGE_TEMPLATES[customer.segment] || message;
    setEditedMessage(buildMessage(template, customer.customer_name));
  }, [currentIndex, customer?.segment, customer?.customer_name, message]);

  if (!customer) return null;

  const waLink = generateWhatsAppLink(customer.phone, editedMessage);
  const total = customers.length;
  const processed = sentCount + skippedCount;
  const remaining = total - processed;
  const progress = (processed / total) * 100;

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-border/40 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-heading tracking-wide">Operator Assist Mode</h2>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary animate-pulse-green">
            LIVE
          </span>
        </div>
      </div>

      {/* Analytics Bar */}
      <div className="grid grid-cols-4 gap-4 border-b border-border/40 px-6 py-5">
        <div className="text-center">
          <p className="text-2xl font-display font-semibold">{total}</p>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Total</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-display font-semibold text-alive">{sentCount}</p>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Sent</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-display font-semibold text-vip">{skippedCount}</p>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Skipped</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-display font-semibold">{remaining}</p>
          <p className="text-xs text-muted-foreground font-body mt-0.5">Remaining</p>
        </div>
      </div>

      <div className="p-6">
        <Progress value={progress} className="mb-6 h-1.5" />

        {/* Customer Card */}
        <div className="mb-6 rounded-xl border border-border/40 bg-secondary/40 p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              {customer.segment === "VIP" ? (
                <Crown className="h-5 w-5 text-vip" />
              ) : (
                <User className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <p className="font-heading text-sm tracking-wide">{customer.customer_name}</p>
              <p className="text-xs text-muted-foreground font-body">{customer.phone}</p>
            </div>
            <span className="ml-auto rounded-full border border-border/50 bg-card px-2.5 py-0.5 text-xs font-medium font-body">
              {customer.segment}
            </span>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3 text-sm font-body">
            <div>
              <span className="text-muted-foreground">Last Visit: </span>
              {new Date(customer.last_order_date).toLocaleDateString()}
            </div>
            <div>
              <span className="text-muted-foreground">Days Since: </span>
              {customer.daysSinceVisit}d
            </div>
          </div>

          <div className="rounded-xl bg-card p-4">
            <p className="mb-2 text-xs text-muted-foreground font-body tracking-wide uppercase">Message Preview</p>
            <Textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="min-h-[100px] resize-none border-none bg-transparent p-0 text-sm font-body focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Button
            onClick={() => window.open(waLink, "_blank")}
            className="h-14 gap-2 bg-alive text-alive-foreground hover:bg-alive/90 text-sm font-heading tracking-wide transition-all duration-300"
          >
            <ExternalLink className="h-5 w-5" />
            OPEN WA
          </Button>
          <Button
            onClick={onMarkSent}
            className="h-14 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-heading tracking-wide transition-all duration-300"
          >
            <Check className="h-5 w-5" />
            MARK SENT
          </Button>
          <Button
            onClick={onSkip}
            variant="outline"
            className="h-14 gap-2 border-border text-sm font-heading tracking-wide transition-all duration-300"
          >
            <SkipForward className="h-5 w-5" />
            SKIP
          </Button>
          <Button
            onClick={onEnd}
            variant="outline"
            className="h-14 gap-2 border-dead/30 text-dead hover:bg-dead/8 text-sm font-heading tracking-wide transition-all duration-300"
          >
            <XCircle className="h-5 w-5" />
            END
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground font-body">
          Customer {processed + 1} of {total}
        </p>
      </div>
    </div>
  );
}
