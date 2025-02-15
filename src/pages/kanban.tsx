/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const KanbanBoard = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    // Fetch categories and products from the backend
    const fetchData = async () => {
      const categoryResponse = await axios.get(
        "http://localhost:5000/api/categories"
      );
      setCategories(categoryResponse.data);

      const productResponse = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(productResponse.data);
    };
    fetchData();
  }, []);

  const handleDragEnd = async (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const productBarcode = result.draggableId;
      const newCategory = destination.droppableId;

      await axios.put(`/api/products/${productBarcode}/category`, {
        category: newCategory,
      });
      setProducts((prev) =>
        prev.map((product) =>
          product.barcode === productBarcode
            ? { ...product, category: newCategory }
            : product
        )
      );
    }
  };

  const handleAddCategory = async () => {
    if (newCategory) {
      await axios.post("/api/categories", { name: newCategory });
      setCategories([...categories, { name: newCategory }]);
      setNewCategory("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Add new category"
      />
      <button onClick={handleAddCategory}>Add Category</button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {categories.map((category) => (
            <Droppable key={category.name} droppableId={category.name}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{category.name}</h3>
                  {products
                    .filter((product) => product.category === category.name)
                    .map((product, index) => (
                      <Draggable
                        key={product.barcode}
                        draggableId={product.barcode}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="kanban-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p>{product.name}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
