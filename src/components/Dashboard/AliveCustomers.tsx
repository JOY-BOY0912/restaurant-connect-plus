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
    <div className="glass-card glow-green overflow-hidden border-alive/20">
      <div className="flex items-center gap-2 border-b border-alive/20 p-5">
        <HeartPulse className="h-5 w-5 text-alive" />
        <h2 className="text-lg font-semibold text-alive">
          Alive Customers
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            (Visited within 7 days)
          </span>
        </h2>
        <span className="ml-auto rounded-full bg-alive/20 px-2.5 py-0.5 text-xs font-medium text-alive">
          {alive.length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-alive/10 text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Phone</th>
              <th className="px-5 py-3 font-medium">Last Visited</th>
              <th className="px-5 py-3 font-medium">Days Since</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {alive.map((c, i) => (
              <tr key={i} className="border-b border-border/20 transition-colors hover:bg-alive-muted/30">
                <td className="px-5 py-3 font-medium">{c.customer_name}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.phone}</td>
                <td className="px-5 py-3 text-muted-foreground">
                  {new Date(c.last_order_date).toLocaleDateString()}
                </td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-alive/20 px-2 py-0.5 text-xs font-medium text-alive">
                    {c.daysSinceVisit}d
                  </span>
                </td>
                <td className="px-5 py-3">
                  <Button size="sm" onClick={() => handleSend(c)} className="gap-1.5 bg-alive/20 text-alive hover:bg-alive/30 border-0">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Send
                  </Button>
                </td>
              </tr>
            ))}
            {alive.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">
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
