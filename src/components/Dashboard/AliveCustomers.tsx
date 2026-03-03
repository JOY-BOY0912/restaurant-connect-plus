import { Customer, MESSAGE_TEMPLATES } from "@/types/customer";
import { generateWhatsAppLink, buildMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { MessageSquare, HeartPulse } from "lucide-react";

interface AliveCustomersProps {
  customers: Customer[];
}

export default function AliveCustomers({ customers }: AliveCustomersProps) {
  const alive = customers.filter((c) => c.lifecycle === "ALIVE");

  const handleSend = (c: Customer) => {
    const template = MESSAGE_TEMPLATES[c.segment] || MESSAGE_TEMPLATES.Active;
    const msg = buildMessage(template, c.customer_name);
    window.open(generateWhatsAppLink(c.phone, msg), "_blank");
  };

  return (
    <div className="glass-card glow-green overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-border/40 px-6 py-4">
        <HeartPulse className="h-4.5 w-4.5 text-alive" />
        <h2 className="text-base font-heading tracking-wide text-alive">
          Alive Customers
        </h2>
        <span className="ml-1 text-xs font-body text-muted-foreground">
          (Visited within 7 days)
        </span>
        <span className="ml-auto rounded-full bg-alive/12 px-2.5 py-0.5 text-xs font-medium text-alive">
          {alive.length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="brand-table w-full text-sm font-body">
          <thead>
            <tr className="border-b border-border/30 text-left">
              <th>Name</th>
              <th>Phone</th>
              <th>Last Visited</th>
              <th>Days Since</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {alive.map((c, i) => (
              <tr key={i} className="border-b border-border/15">
                <td className="font-medium">{c.customer_name}</td>
                <td className="text-muted-foreground">{c.phone}</td>
                <td className="text-muted-foreground">
                  {new Date(c.last_order_date).toLocaleDateString()}
                </td>
                <td>
                  <span className="rounded-full bg-alive/12 px-2 py-0.5 text-xs font-medium text-alive">
                    {c.daysSinceVisit}d
                  </span>
                </td>
                <td>
                  <Button size="sm" onClick={() => handleSend(c)} className="gap-1.5 bg-alive/12 text-alive hover:bg-alive/20 border-0 transition-all duration-300">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Send
                  </Button>
                </td>
              </tr>
            ))}
            {alive.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                  No alive customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
