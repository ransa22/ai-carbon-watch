import { MetricCard } from "@/components/MetricCard";
import { ProgressCard } from "@/components/ProgressCard";
import { CarbonChart } from "@/components/CarbonChart";
import { Button } from "@/components/ui/button";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Play, Pause, RotateCcw, Download, Zap, Leaf, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { data, isRunning, startDemo, stopDemo, resetData, downloadReport } = useDashboardData();
  const { toast } = useToast();

  const handleDownload = () => {
    downloadReport();
    toast({
      title: "Report Downloaded",
      description: "Carbon dashboard report has been saved as CSV file.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-eco">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Carbon-Aware AI Dashboard</h1>
                <p className="text-muted-foreground">Real-time environmental impact monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="gap-2"
                disabled={data.chartData.length === 0}
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              
              <div className="flex items-center gap-2">
                {!isRunning ? (
                  <Button onClick={startDemo} className="gap-2 bg-gradient-eco hover:opacity-90">
                    <Play className="h-4 w-4" />
                    Start Demo
                  </Button>
                ) : (
                  <Button onClick={stopDemo} variant="secondary" className="gap-2">
                    <Pause className="h-4 w-4" />
                    Pause
                  </Button>
                )}
                
                <Button onClick={resetData} variant="outline" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
            Status: {isRunning ? 'Live Monitoring' : 'Idle'}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Job Runtime"
            value={`${Math.floor(data.runtime)}h ${Math.floor((data.runtime % 1) * 60)}m`}
            unit=""
            icon={<Clock className="h-5 w-5" />}
            trend="up"
            trendValue={isRunning ? "Running" : "Stopped"}
          />
          
          <MetricCard
            title="Energy Consumed"
            value={data.energy.toFixed(2)}
            unit="kWh"
            icon={<Zap className="h-5 w-5" />}
            trend="neutral"
            trendValue={`${(data.energy * 0.5).toFixed(1)} kW avg`}
          />
          
          <MetricCard
            title="Carbon Emission"
            value={data.carbon.toFixed(2)}
            unit="kg CO₂"
            icon={<Leaf className="h-5 w-5" />}
            trend="down"
            trendValue={`${((data.carbon / data.energy) * 100).toFixed(0)}% intensity`}
          />
          
          <ProgressCard
            title="Real-time Status"
            value={data.progress}
            icon={<TrendingUp className="h-5 w-5" />}
            description={data.progress < 100 ? "Processing..." : "Complete"}
          />
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CarbonChart data={data.chartData} />
          </div>
          
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-card rounded-lg p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Session Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Runtime:</span>
                  <span className="font-medium">{data.runtime.toFixed(1)}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Energy Rate:</span>
                  <span className="font-medium">{data.chartData.length > 0 ? (data.chartData.reduce((acc, point) => acc + point.energy, 0) / data.chartData.length).toFixed(2) : '0.00'} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Carbon:</span>
                  <span className="font-medium">{data.chartData.length > 0 ? data.chartData.reduce((acc, point) => acc + point.carbon, 0).toFixed(2) : '0.00'} kg CO₂</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Points:</span>
                  <span className="font-medium">{data.chartData.length}</span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-accent/50 border border-accent rounded-lg p-6">
              <h4 className="font-medium text-accent-foreground mb-2">💡 About This Dashboard</h4>
              <p className="text-sm text-accent-foreground/80 leading-relaxed">
                This prototype tracks environmental impact of AI workloads in real-time. 
                The demo simulates carbon footprint monitoring with live updates every 2 seconds.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
