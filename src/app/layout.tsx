import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import { FitLogProvider } from "@/context/fitlog";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "Train with intent. Log every set.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />
          {children}
          <Footer />
          <ToastProvider />
        </FitLogProvider>
      </body>
    </html>
  );
}

export default RootLayout;