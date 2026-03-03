import { CampaignRecord } from "@/types/customer";

interface CampaignHistoryProps {
  campaigns: CampaignRecord[];
}

export default function CampaignHistory({ campaigns }: CampaignHistoryProps) {
  if (campaigns.length === 0) return null;

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-border/40 px-6 py-4">
        <h2 className="text-base font-heading tracking-wide">Campaign History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="brand-table w-full text-sm font-body">
          <thead>
            <tr className="border-b border-border/30 text-left">
              <th>Campaign</th>
              <th>Date</th>
              <th>Sent</th>
              <th>Skipped</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i} className="border-b border-border/15">
                <td className="font-medium">{c.campaignName}</td>
                <td className="text-muted-foreground">
                  {new Date(c.startedAt).toLocaleString()}
                </td>
                <td className="text-alive">{c.sentCount}</td>
                <td className="text-vip">{c.skippedCount}</td>
                <td>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.status === "completed"
                        ? "bg-alive/12 text-alive"
                        : c.status === "cancelled"
                        ? "bg-dead/12 text-dead"
                        : "bg-primary/12 text-primary"
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
