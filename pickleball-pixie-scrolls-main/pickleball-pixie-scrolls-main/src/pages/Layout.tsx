
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { useEffect } from "react";
import { toast } from "sonner";

export const Layout = () => {
  useEffect(() => {
    // Show a welcome toast
    toast.success("Welcome to SPRAG!", {
      description: "Elevate your pickleball game with AI-powered analytics",
      position: "top-center",
    });
  }, []);

  return (
    <SmoothScrollProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};
