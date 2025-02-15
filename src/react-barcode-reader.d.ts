/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "react-barcode-reader" {
  import { Component } from "react";

  interface BarcodeReaderProps {
    onScan: (data: string) => void;
    onError: (err: any) => void;
  }

  class BarcodeReader extends Component<BarcodeReaderProps> {}

  export default BarcodeReader;
}
