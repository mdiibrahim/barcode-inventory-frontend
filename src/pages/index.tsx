import React, { useState, useEffect } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import Category from "../components/Category";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types";

const Home: React.FC = () => {
  const { data: products, isLoading, isError } = useProducts();
  const [categories, setCategories] = useState<{ [key: string]: Product[] }>({
    Uncategorized: [],
  });

  useEffect(() => {
    if (products) {
      const updatedCategories: { [key: string]: Product[] } = {
        Uncategorized: [],
      };
      products.forEach((product: Product) => {
        if (!updatedCategories[product.category]) {
          updatedCategories[product.category] = [];
        }
        updatedCategories[product.category].push(product);
      });
      setCategories(updatedCategories);
    }
  }, [products]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-600">
          Error fetching products
        </div>
      </div>
    );

  const handleDropProduct = (productId: string, newCategory: string) => {
    const updatedCategories = { ...categories };
    const product = products.find(
      (p: { barcode: string }) => p.barcode === productId
    );
    if (product) {
      const oldCategory = product.category;
      updatedCategories[oldCategory] = updatedCategories[oldCategory].filter(
        (p) => p.barcode !== productId
      );
      product.category = newCategory;
      if (!updatedCategories[newCategory]) {
        updatedCategories[newCategory] = [];
      }
      updatedCategories[newCategory].push(product);
      setCategories(updatedCategories);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        Barcode Inventory Management
      </h1>
      <div className="max-w-4xl mx-auto mb-8">
        <BarcodeScanner />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(categories).map((category) => (
          <Category
            key={category}
            category={category}
            products={categories[category]}
            onDropProduct={handleDropProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
