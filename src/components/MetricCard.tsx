import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  className?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  className,
  trend = "neutral",
  trendValue 
}: MetricCardProps) => {
  return (
    <Card className={cn(
      "relative overflow-hidden bg-card shadow-card hover:shadow-eco transition-all duration-300",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
          </div>
          {trendValue && (
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend === "up" && "bg-success/10 text-success",
              trend === "down" && "bg-destructive/10 text-destructive",
              trend === "neutral" && "bg-muted text-muted-foreground"
            )}>
              {trendValue}
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="text-3xl font-bold text-foreground">
            {value}
            <span className="text-lg font-medium text-muted-foreground ml-1">
              {unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};