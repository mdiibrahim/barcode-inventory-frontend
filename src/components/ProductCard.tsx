import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setNodeRef, isDragging } = useDraggable({
    id: product.barcode,
    data: { ...product },
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 bg-white rounded-lg shadow-md mb-2 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h4 className="font-bold">{product.name}</h4>
      <p>{product.description}</p>
      <p>Material: {product.material}</p>
    </div>
  );
};

export default ProductCard;
