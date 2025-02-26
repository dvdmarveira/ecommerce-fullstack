"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <Card className="max-w-sm">
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl || "/placeholder.svg"}
        alt={product.name}
        className="h-48 object-cover"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-4">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
        </Typography>
        <div className="flex gap-2 mt-4">
          {onEdit && (
            <Button size="small" variant="outlined" onClick={onEdit}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={onDelete}
            >
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
