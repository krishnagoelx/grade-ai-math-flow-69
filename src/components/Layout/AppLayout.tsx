
import { Outlet } from "react-router-dom";
import { MobileHeader } from "./MobileHeader";
import { cn } from "@/lib/utils";

export const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <MobileHeader />
      <main className="flex-1 overflow-auto px-4 py-5 transition-all duration-300">
        <div className="mx-auto max-w-3xl pb-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
