"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";


function SideNav() {
  const menuList = [
    {
      id: 1,
      title: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      title: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      title: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses" || "/dashboard/expenses/",
    },
    {
      id: 4,
      title: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const param = usePathname();

  useEffect(() => {
    console.log(param);
  }, [param]);

  return (
    <div className="h-screen p-4 border shadow-md mb-18">
      <div className="flex gap-2 text-primary font-medium">
        <Image src="/logo.svg" alt="Logo" width={50} height={40} />
        <Link href={'/'}>
        <h2 className="text-xl font-extrabold">HISABH</h2>
        </Link>
      </div>
      <div className="mt-6">
        {menuList.map((menuItem) => (
          <Link href={menuItem.path} key={menuItem.id}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium p-6 cursor-pointer rounded-md hover:text-primary hover:bg-blue-200 mt-1 ${
                param === menuItem.path ? "text-primary bg-blue-200" : ""
              }`}
            >
              <menuItem.icon className="inline-block mr-2" />
              {menuItem.title}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-5 flex gap-2 p-6 items-center">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;
