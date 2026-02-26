import { useQuery } from "@tanstack/react-query";
import { Customer, CustomerRaw } from "@/types/customer";

function calculateLifecycle(raw: CustomerRaw[]): Customer[] {
  const now = new Date();
  return raw.map((c) => {
    const lastOrder = new Date(c.last_order_date);
    const diffMs = now.getTime() - lastOrder.getTime();
    const daysSinceVisit = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return {
      ...c,
      daysSinceVisit,
      lifecycle: daysSinceVisit <= 7 ? "ALIVE" : "DEAD",
    } as Customer;
  });
}

export function useCustomers() {
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await fetch(
        "https://n8n.srv1302157.hstgr.cloud/webhook/customers-campagin"
      );
      if (!res.ok) throw new Error("Failed to fetch customers");
      const raw: CustomerRaw[] = await res.json();
      return calculateLifecycle(raw);
    },
  });
}
