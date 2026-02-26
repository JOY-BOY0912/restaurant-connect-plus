import { Users, HeartPulse, Skull, Crown, Zap, Moon } from "lucide-react";
import { Customer } from "@/types/customer";

interface StatsCardsProps {
  customers: Customer[];
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent?: string;
}

function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <div className={`stat-card flex items-center gap-4 ${accent || ""}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function StatsCards({ customers }: StatsCardsProps) {
  const alive = customers.filter((c) => c.lifecycle === "ALIVE").length;
  const dead = customers.filter((c) => c.lifecycle === "DEAD").length;
  const vip = customers.filter((c) => c.segment === "VIP").length;
  const active = customers.filter((c) => c.segment === "Active").length;
  const sleeping = customers.filter((c) => c.segment === "Sleeping").length;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <StatCard
        label="Total Customers"
        value={customers.length}
        icon={<Users className="h-5 w-5 text-foreground" />}
      />
      <StatCard
        label="Alive"
        value={alive}
        icon={<HeartPulse className="h-5 w-5 text-alive" />}
        accent="glow-green"
      />
      <StatCard
        label="Dead"
        value={dead}
        icon={<Skull className="h-5 w-5 text-dead" />}
        accent="glow-red"
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
