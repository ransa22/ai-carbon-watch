import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ChartDataPoint {
  time: string;
  carbon: number;
  energy: number;
}

interface CarbonChartProps {
  data: ChartDataPoint[];
}

export const CarbonChart = ({ data }: CarbonChartProps) => {
  return (
    <Card className="bg-card shadow-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          Carbon Emissions Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--energy))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--energy))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-card)'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area
                type="monotone"
                dataKey="carbon"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#carbonGradient)"
                name="Carbon (kg CO₂)"
              />
              <Area
                type="monotone"
                dataKey="energy"
                stroke="hsl(var(--energy))"
                strokeWidth={2}
                fill="url(#energyGradient)"
                name="Energy (kWh)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};