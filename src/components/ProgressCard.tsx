import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
}

export const ProgressCard = ({ title, value, icon, description }: ProgressCardProps) => {
  return (
    <Card className="bg-gradient-eco text-white shadow-eco">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-white/20">
            {icon}
          </div>
          <span className="font-medium">{title}</span>
        </div>
        
        <div className="space-y-3">
          <div className="text-3xl font-bold">
            {value.toFixed(0)}%
          </div>
          <Progress 
            value={value} 
            className="h-2 bg-white/20"
          />
          {description && (
            <p className="text-sm text-white/80">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};