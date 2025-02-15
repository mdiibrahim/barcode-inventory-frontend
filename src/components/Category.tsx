import React from "react";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import ProductCard from "./ProductCard";
import { Product } from "../../types";

interface CategoryProps {
  category: string;
  products: Product[];
  onDropProduct: (productId: string, newCategory: string) => void;
}

const Category: React.FC<CategoryProps> = ({
  category,
  products,
  onDropProduct,
}) => {
  const { setNodeRef } = useDroppable({
    id: category,
  });

  useDndMonitor({
    onDragEnd(event) {
      if (event.over && event.over.id === category) {
        const productId = event.active.id as string;
        onDropProduct(productId, category);
      }
    },
  });

  return (
    <div ref={setNodeRef} className="p-4 bg-gray-200 rounded-lg">
      <h3 className="font-bold text-xl">{category}</h3>
      <div className="mt-2">
        {products.map((product) => (
          <ProductCard key={product.barcode} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
