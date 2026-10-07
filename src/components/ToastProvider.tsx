"use client";

import { Toaster } from "react-hot-toast";

function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2400,
        style: {
          background: "#151916",
          color: "#f2f5f0",
          border: "1px solid #2c352e",
          borderRadius: "14px",
        },
      }}
    />
  );
}

export default ToastProvider;