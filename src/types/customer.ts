export interface CustomerRaw {
  customer_name: string;
  phone: string;
  segment: "VIP" | "Active" | "Sleeping" | string;
  total_orders: number;
  total_spent: number;
  last_order_date: string;
}

export interface Customer extends CustomerRaw {
  daysSinceVisit: number;
  lifecycle: "ALIVE" | "DEAD";
}

export interface CampaignRecord {
  campaignName: string;
  startedAt: string;
  sentCount: number;
  skippedCount: number;
  totalCustomers: number;
  status: "in-progress" | "completed" | "cancelled";
}

export const MESSAGE_TEMPLATES: Record<string, string> = {
  VIP: `Hi {{name}} 👑\nThanks for being our VIP customer!\nSpecial offer for you 🎉`,
  Active: `Hi {{name}} 😊\nNew offers available!`,
  Sleeping: `Hi {{name}} 😢\nWe miss you! Come back for discounts.`,
};
