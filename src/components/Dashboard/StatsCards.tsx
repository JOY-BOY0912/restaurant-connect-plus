import { Users, Crown, Zap, Moon } from "lucide-react";
import { Customer } from "@/types/customer";

interface StatsCardsProps {
  customers: Customer[];
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="stat-card flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
        {icon}
      </div>
      <div>
        <p className="text-xs font-body text-muted-foreground tracking-wide uppercase">{label}</p>
        <p className="text-2xl font-display font-semibold tracking-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function StatsCards({ customers }: StatsCardsProps) {
  const vip = customers.filter((c) => c.segment === "VIP").length;
  const active = customers.filter((c) => c.segment === "Active").length;
  const sleeping = customers.filter((c) => c.segment === "Sleeping").length;

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
      <StatCard
        label="Total Customers"
        value={customers.length}
        icon={<Users className="h-5 w-5 text-primary" />}
      />
      <StatCard
        label="VIP"
        value={vip}
        icon={<Crown className="h-5 w-5 text-vip" />}
      />
      <StatCard
        label="Active"
        value={active}
        icon={<Zap className="h-5 w-5 text-primary" />}
      />
      <StatCard
        label="Sleeping"
        value={sleeping}
        icon={<Moon className="h-5 w-5 text-muted-foreground" />}
      />
    </div>
  );
}
