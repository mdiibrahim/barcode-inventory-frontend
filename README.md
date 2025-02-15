# Barcode Inventory Frontend

This is the frontend for the Barcode-Driven Inventory System built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It allows users to efficiently scan barcodes, manage inventory, and visualize data using a Kanban board.

## Features

- **Barcode Scanning:** Uses `@zxing/library` and `react-qr-barcode-scanner` for scanning barcodes and QR codes.
- **Drag and Drop Kanban Board:** Implemented with `@dnd-kit/core` and `react-beautiful-dnd` for intuitive inventory management.
- **API Integration:** `axios` is used to communicate with the backend for fetching and updating inventory data.
- **State Management:** `@tanstack/react-query` is used for efficient data fetching, caching, and synchronization.

## Tech Stack

- **Next.js 15.1.7**: Fast React framework with built-in routing and performance optimization.
- **TypeScript**: Provides static typing for better maintainability and error checking.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Turbopack**: Used as the bundler for faster builds and efficient hot module replacement.

## Installation and Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/mdiibrahim/barcode-inventory-frontend.git
   cd barcode-inventory-frontend
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file at the root with the following variables:

   ```env
   NEXT_PUBLIC_API_BASE_URL=<Your Backend API URL>
   ```

4. **Start Development Server:**
   ```sh
   npm run dev
   ```
   The app should now be running at `http://localhost:3000`.

## Scripts

- **dev:** Starts the development server with Turbopack.
- **build:** Builds the application for production.
- **start:** Starts the production server.
- **lint:** Runs ESLint for code quality checks.

## Why These Tools?

- **@dnd-kit/core & react-beautiful-dnd:** For seamless drag-and-drop functionalities, enhancing user interaction.
- **@tanstack/react-query:** Efficient state management for asynchronous data fetching and caching.
- **@zxing/library & react-qr-barcode-scanner:** Robust barcode scanning with support for multiple formats.
- **Turbopack:** Speeds up the development experience with faster bundling.

## Acknowledgments

Special thanks to all open-source contributors whose libraries made this project possible.
