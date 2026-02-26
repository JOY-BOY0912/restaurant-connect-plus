import { Customer, MESSAGE_TEMPLATES } from "@/types/customer";
import { generateWhatsAppLink, buildMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { MessageSquare, Skull } from "lucide-react";

interface DeadCustomersProps {
  customers: Customer[];
}

export default function DeadCustomers({ customers }: DeadCustomersProps) {
  const dead = customers.filter((c) => c.lifecycle === "DEAD");

  const handleSend = (c: Customer) => {
    const template = MESSAGE_TEMPLATES[c.segment] || MESSAGE_TEMPLATES.Sleeping;
    const msg = buildMessage(template, c.customer_name);
    window.open(generateWhatsAppLink(c.phone, msg), "_blank");
  };

  return (
    <div className="glass-card glow-red overflow-hidden border-dead/20">
      <div className="flex items-center gap-2 border-b border-dead/20 p-5">
        <Skull className="h-5 w-5 text-dead" />
        <h2 className="text-lg font-semibold text-dead">
          Dead Customers
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            (No visit &gt; 7 days)
          </span>
        </h2>
        <span className="ml-auto rounded-full bg-dead/20 px-2.5 py-0.5 text-xs font-medium text-dead">
          {dead.length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dead/10 text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Phone</th>
              <th className="px-5 py-3 font-medium">Last Visited</th>
              <th className="px-5 py-3 font-medium">Days Since</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {dead.map((c, i) => (
              <tr key={i} className="border-b border-border/20 transition-colors hover:bg-dead-muted/30">
                <td className="px-5 py-3 font-medium">{c.customer_name}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.phone}</td>
                <td className="px-5 py-3 text-muted-foreground">
                  {new Date(c.last_order_date).toLocaleDateString()}
                </td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-dead/20 px-2 py-0.5 text-xs font-medium text-dead">
                    {c.daysSinceVisit}d
                  </span>
                </td>
                <td className="px-5 py-3">
                  <Button size="sm" onClick={() => handleSend(c)} className="gap-1.5 bg-dead/20 text-dead hover:bg-dead/30 border-0">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Send
                  </Button>
                </td>
              </tr>
            ))}
            {dead.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">
                  No dead customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
