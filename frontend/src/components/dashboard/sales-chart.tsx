"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface SalesData {
  labels: string[];
  data: number[];
}

interface SalesChartProps {
  data: SalesData;
  title: string;
}

export default function SalesChart({ data, title }: SalesChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Sales",
            data: data.data,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: title,
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title]);

  return (
    <Card className="w-full">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <canvas ref={chartRef} />
      </CardContent>
    </Card>
  );
}
