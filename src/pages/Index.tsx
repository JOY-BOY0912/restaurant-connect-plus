import { useState, useCallback } from "react";
import { useCustomers } from "@/hooks/useCustomers";
import { Customer, CampaignRecord } from "@/types/customer";
import StatsCards from "@/components/Dashboard/StatsCards";

import AliveCustomers from "@/components/Dashboard/AliveCustomers";
import DeadCustomers from "@/components/Dashboard/DeadCustomers";
import CampaignModal from "@/components/Dashboard/CampaignModal";
import OperatorMode from "@/components/Dashboard/OperatorMode";
import CampaignHistory from "@/components/Dashboard/CampaignHistory";
import { Button } from "@/components/ui/button";
import { Rocket, Loader2, RefreshCw } from "lucide-react";
import ishLogo from "@/assets/ish-logo.jpg";

const Index = () => {
  const { data: customers = [], isLoading, error, refetch } = useCustomers();

  const [showModal, setShowModal] = useState(false);
  const [campaignActive, setCampaignActive] = useState(false);
  const [campaignCustomers, setCampaignCustomers] = useState<Customer[]>([]);
  const [campaignMessage, setCampaignMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);
  const [campaignStartedAt, setCampaignStartedAt] = useState("");

  const handleStartCampaign = useCallback((filtered: Customer[], message: string) => {
    setCampaignCustomers(filtered);
    setCampaignMessage(message);
    setCurrentIndex(0);
    setSentCount(0);
    setSkippedCount(0);
    setCampaignStartedAt(new Date().toISOString());
    setCampaignActive(true);
    setShowModal(false);
  }, []);

  const finishCampaign = useCallback(
    (status: "completed" | "cancelled") => {
      setCampaigns((prev) => [
        {
          campaignName: `Campaign ${prev.length + 1}`,
          startedAt: campaignStartedAt,
          sentCount,
          skippedCount,
          totalCustomers: campaignCustomers.length,
          status,
        },
        ...prev,
      ]);
      setCampaignActive(false);
    },
    [campaignStartedAt, sentCount, skippedCount, campaignCustomers.length]
  );

  const handleMarkSent = useCallback(() => {
    setSentCount((p) => p + 1);
    if (currentIndex + 1 >= campaignCustomers.length) {
      finishCampaign("completed");
    } else {
      setCurrentIndex((p) => p + 1);
    }
  }, [currentIndex, campaignCustomers.length, finishCampaign]);

  const handleSkip = useCallback(() => {
    setSkippedCount((p) => p + 1);
    if (currentIndex + 1 >= campaignCustomers.length) {
      finishCampaign("completed");
    } else {
      setCurrentIndex((p) => p + 1);
    }
  }, [currentIndex, campaignCustomers.length, finishCampaign]);

  const handleEnd = useCallback(() => {
    finishCampaign("cancelled");
  }, [finishCampaign]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <p className="text-dead">Failed to load customers</p>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={ishLogo}
              alt="ISH Legacy"
              className="h-11 w-auto rounded-lg object-contain"
            />
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-wide sm:text-3xl">
                Campaign Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Lifecycle automation · Smart WhatsApp campaigns
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={() => setShowModal(true)}
              disabled={campaignActive}
              className="gap-1.5"
            >
              <Rocket className="h-3.5 w-3.5" />
              Start Smart Queue
            </Button>
          </div>
        </div>

        <StatsCards customers={customers} />

        {campaignActive && (
          <OperatorMode
            customers={campaignCustomers}
            currentIndex={currentIndex}
            message={campaignMessage}
            sentCount={sentCount}
            skippedCount={skippedCount}
            onMarkSent={handleMarkSent}
            onSkip={handleSkip}
            onEnd={handleEnd}
          />
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <AliveCustomers customers={customers} />
          <DeadCustomers customers={customers} />
        </div>

        <CampaignHistory campaigns={campaigns} />

        {showModal && (
          <CampaignModal
            customers={customers}
            onStart={handleStartCampaign}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
