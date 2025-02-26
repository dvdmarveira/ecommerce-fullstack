"use client";

import { Grid, Card, CardContent, Typography } from "@mui/material";
import {
  TrendingUp,
  ShoppingCart,
  Category,
  Assessment,
} from "@mui/icons-material";
import SalesChart from "./sales-chart";

interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCategories: number;
  salesData: {
    labels: string[];
    data: number[];
  };
}

export default function DashboardMetrics({
  totalSales,
  totalOrders,
  totalProducts,
  totalCategories,
  salesData,
}: DashboardMetrics) {
  const metrics = [
    {
      title: "Total Sales",
      value: `$${totalSales.toFixed(2)}`,
      icon: <TrendingUp />,
      color: "primary.main",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingCart />,
      color: "success.main",
    },
    {
      title: "Products",
      value: totalProducts,
      icon: <Assessment />,
      color: "warning.main",
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: <Category />,
      color: "info.main",
    },
  ];

  return (
    <div className="space-y-6">
      <Grid container spacing={3}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.title}>
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Typography color="textSecondary" gutterBottom>
                      {metric.title}
                    </Typography>
                    <Typography variant="h4">{metric.value}</Typography>
                  </div>
                  <div style={{ color: metric.color }}>{metric.icon}</div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <SalesChart data={salesData} title="Sales Over Time" />
    </div>
  );
}
