// frontend/src/components/dashboard/dashboard-metrics.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import DashboardMetrics from "./dashboard-metrics";

const meta: Meta<typeof DashboardMetrics> = {
  title: "Components/DashboardMetrics",
  component: DashboardMetrics,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DashboardMetrics>;

export const Default: Story = {
  args: {
    totalSales: 15750.5,
    totalOrders: 125,
    totalProducts: 48,
    totalCategories: 8,
    salesData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [1200, 1900, 1500, 2100, 1800, 2400],
    },
  },
};
