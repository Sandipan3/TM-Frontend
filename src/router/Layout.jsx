import { Outlet } from "react-router-dom";
import React from "react";
import MobileNavbar from "../components/MobileNavbar";
import DesktopNavbar from "../components/DesktopNavbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 ">
      <header className="w-full shadow-md bg-white">
        <div className="sm:hidden">
          <MobileNavbar />
        </div>
        <div className="hidden sm:block">
          <DesktopNavbar />
        </div>
      </header>

      <main className="flex-1 w-full flex justify-center p-4 text-center">
        <div className="bg-white shadow-xl rounded-md p-4 w-full max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
