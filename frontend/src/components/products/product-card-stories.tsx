// frontend/src/components/products/product-card.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "./product-card";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      id: "1",
      name: "Sample Product",
      description: "This is a sample product description",
      price: 99.99,
      imageUrl: "/placeholder.svg",
      categoryId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};
