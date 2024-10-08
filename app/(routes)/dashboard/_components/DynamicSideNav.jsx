"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function DynamicSideNav({ onClose }) {
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
      path: "/dashboard/expenses",
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

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed top-0 left-0 h-screen w-64 bg-white p-4 shadow-lg z-50 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 text-primary font-medium">
            <Image src="/logo.svg" alt="Logo" width={50} height={40} />
            <h2 className="text-xl font-extrabold">HISABH</h2>
          </div>
          <X 
            className="cursor-pointer text-gray-500 hover:text-primary" 
            size={24} 
            onClick={onClose}
          />
        </div>
        <div className="mt-6">
          {menuList.map((menuItem) => (
            <Link href={menuItem.path} key={menuItem.id} onClick={handleLinkClick}>
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
        <div className="mt-6 flex gap-2 p-6 items-center">
          <UserButton />
          Profile
        </div>
      </div>
    </>
  );
}

export default DynamicSideNav;