import React, { useState } from "react";
import axios from "axios";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState<string>("");
  interface ProductDetails {
    name: string;
    description: string;
    category: string;
    material: string;
  }

  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [error, setError] = useState<string>("");

  // Function to handle barcode scanning from an image
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      try {
        // Create a preview of the selected image
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        // Decode the barcode from the image
        const img = document.createElement("img"); // Create image element correctly
        fileReader.onload = () => {
          img.src = fileReader.result as string;
          img.onload = async () => {
            const codeReader = new BrowserMultiFormatReader();
            try {
              const result = await codeReader.decodeFromImageElement(img);
              const scannedBarcode = result.getText();
              setBarcode(scannedBarcode);
              setProductDetails(null);
              setError("");
              fetchProductDetails(scannedBarcode);
            } catch (err) {
              if (err instanceof NotFoundException) {
                setError("No barcode detected. Try another image.");
                setBarcode("");
                setProductDetails(null);
              } else {
                console.error("Error decoding barcode:", err);
                setError("Error decoding barcode");
              }
            }
          };
        };
      } catch (error) {
        console.error("Error scanning barcode:", error);
        setError("Error scanning barcode");
      }
    } else {
      setError("Please select a valid image.");
    }
  };

  // Function to fetch product details from the backend
  const fetchProductDetails = async (barcode: string) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${barcode}`
      );
      if (data && data.product) {
        setProductDetails(data.product);
        setError("");
      } else {
        setError("Product not found");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError("Product not found for this barcode.");
      } else {
        console.error("Error fetching product details:", error);
        setError("Error fetching product details");
      }
      setProductDetails(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Barcode Scanner
      </h2>
      <div className="flex flex-col items-center">
        <input
          type="file"
          accept=".gif,.jpg,.jpeg,.png"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-800 file:text-white
            hover:file:bg-gray-700
            mb-4"
        />

        {barcode && /^[a-zA-Z0-9]+$/.test(barcode) ? (
          <p className="text-lg font-semibold text-gray-700 mt-4">
            Scanned Barcode: <span className="text-blue-600">{barcode}</span>
          </p>
        ) : (
          <p className="text-lg font-semibold text-gray-700 mt-4">
            <span className="text-red-500">
              No valid barcode detected. Try another image.
            </span>
          </p>
        )}

        {/* Display error message gracefully */}
        {error && (
          <p className="text-red-500 text-center mt-4 bg-red-100 p-2 rounded-lg">
            {error}
          </p>
        )}
      </div>

      {productDetails && (
        <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800">
            {productDetails.name}
          </h3>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Details:</span>{" "}
            {productDetails.description}
          </p>
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Category:</span>{" "}
            {productDetails.category}
          </p>
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Material:</span>{" "}
            {productDetails.material}
          </p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
