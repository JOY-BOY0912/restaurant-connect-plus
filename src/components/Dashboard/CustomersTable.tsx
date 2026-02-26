import { Customer, MESSAGE_TEMPLATES } from "@/types/customer";
import { generateWhatsAppLink, buildMessage } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface CustomersTableProps {
  customers: Customer[];
}

function segmentColor(segment: string) {
  switch (segment) {
    case "VIP":
      return "bg-vip/20 text-vip border-vip/30";
    case "Active":
      return "bg-alive/20 text-alive border-alive/30";
    case "Sleeping":
      return "bg-dead/20 text-dead border-dead/30";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

export default function CustomersTable({ customers }: CustomersTableProps) {
  const handleSend = (customer: Customer) => {
    const template = MESSAGE_TEMPLATES[customer.segment] || MESSAGE_TEMPLATES.Active;
    const msg = buildMessage(template, customer.customer_name);
    const link = generateWhatsAppLink(customer.phone, msg);
    window.open(link, "_blank");
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-border/50 p-5">
        <h2 className="text-lg font-semibold">Customers Data</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Phone</th>
              <th className="px-5 py-3 font-medium">Segment</th>
              <th className="px-5 py-3 font-medium">Orders</th>
              <th className="px-5 py-3 font-medium">Spent</th>
              <th className="px-5 py-3 font-medium">Last Order</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} className="border-b border-border/30 transition-colors hover:bg-secondary/40">
                <td className="px-5 py-3 font-medium">{c.customer_name}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.phone}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${segmentColor(c.segment)}`}>
                    {c.segment}
                  </span>
                </td>
                <td className="px-5 py-3">{c.total_orders}</td>
                <td className="px-5 py-3">₹{c.total_spent}</td>
                <td className="px-5 py-3 text-muted-foreground">
                  {new Date(c.last_order_date).toLocaleDateString()}
                </td>
                <td className="px-5 py-3">
                  <Button size="sm" variant="outline" onClick={() => handleSend(c)} className="gap-1.5 border-primary/30 text-primary hover:bg-primary/10">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Send
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
