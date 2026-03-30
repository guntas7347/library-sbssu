"use client";

import SideBar from "@/components/sidebar";
import Navbar from "@/components/Header";
import { validateKohaSession } from "@/lib/koha/kohaFetch";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    (async () => {
      const isValid = await validateKohaSession();

      if (!isValid) {
        redirect("/login");
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-2 lg:p-4">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
