import { useState, useEffect, useCallback } from 'react';

interface DashboardData {
  runtime: number;
  energy: number;
  carbon: number;
  progress: number;
  chartData: Array<{
    time: string;
    carbon: number;
    energy: number;
  }>;
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>({
    runtime: 0,
    energy: 0.5,
    carbon: 0.2,
    progress: 0,
    chartData: []
  });

  const [isRunning, setIsRunning] = useState(false);

  const generateRandomValue = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const formatTime = (hours: number) => {
    const totalMinutes = Math.floor(hours * 60);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const updateData = useCallback(() => {
    setData(prev => {
      const newRuntime = prev.runtime + 0.1; // Increment by 6 minutes
      const newEnergy = generateRandomValue(0.5, 2.5);
      const newCarbon = generateRandomValue(0.2, 1.2);
      const newProgress = Math.min(prev.progress + 2, 100);

      const newChartPoint = {
        time: formatTime(newRuntime),
        carbon: Number(newCarbon.toFixed(2)),
        energy: Number(newEnergy.toFixed(2))
      };

      const newChartData = [...prev.chartData, newChartPoint].slice(-20); // Keep last 20 points

      return {
        runtime: newRuntime,
        energy: newEnergy,
        carbon: newCarbon,
        progress: newProgress,
        chartData: newChartData
      };
    });
  }, []);

  const startDemo = () => {
    setIsRunning(true);
  };

  const stopDemo = () => {
    setIsRunning(false);
  };

  const resetData = () => {
    setData({
      runtime: 0,
      energy: 0.5,
      carbon: 0.2,
      progress: 0,
      chartData: []
    });
    setIsRunning(false);
  };

  const downloadReport = () => {
    const csvContent = [
      ['Time', 'Runtime (h)', 'Energy (kWh)', 'Carbon (kg CO₂)', 'Progress (%)'],
      ...data.chartData.map(point => [
        point.time,
        data.runtime.toFixed(2),
        point.energy.toFixed(2),
        point.carbon.toFixed(2),
        data.progress.toFixed(0)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `carbon-dashboard-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(updateData, 2000); // Update every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, updateData]);

  return {
    data,
    isRunning,
    startDemo,
    stopDemo,
    resetData,
    downloadReport
  };
};