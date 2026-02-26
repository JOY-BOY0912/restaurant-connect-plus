import { CampaignRecord } from "@/types/customer";
import { Badge } from "@/components/ui/badge";

interface CampaignHistoryProps {
  campaigns: CampaignRecord[];
}

export default function CampaignHistory({ campaigns }: CampaignHistoryProps) {
  if (campaigns.length === 0) return null;

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-border/50 p-5">
        <h2 className="text-lg font-semibold">Campaign History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Campaign</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Sent</th>
              <th className="px-5 py-3 font-medium">Skipped</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i} className="border-b border-border/30">
                <td className="px-5 py-3 font-medium">{c.campaignName}</td>
                <td className="px-5 py-3 text-muted-foreground">
                  {new Date(c.startedAt).toLocaleString()}
                </td>
                <td className="px-5 py-3 text-alive">{c.sentCount}</td>
                <td className="px-5 py-3 text-vip">{c.skippedCount}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.status === "completed"
                        ? "bg-alive/20 text-alive"
                        : c.status === "cancelled"
                        ? "bg-dead/20 text-dead"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
