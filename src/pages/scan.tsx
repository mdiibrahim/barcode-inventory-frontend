import BarcodeScannerComponent from "../components/BarcodeScanner";

const ScanPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Scan Barcode to Fetch Product
        </h1>
        <BarcodeScannerComponent />
      </div>
    </div>
  );
};

export default ScanPage;
