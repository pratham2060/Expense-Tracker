"use client";

import React, { useEffect } from "react";
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const { user, isLoaded } = useUser(); // Ensure user is fully loaded
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      checkUserBudget(); // Only run when the user is loaded
    }
  }, [isLoaded, user]);

  const checkUserBudget = async () => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) {
        console.log("User email address is not available.");
        return;
      }

      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));

      console.log("Budget result:", result);

      if (result.length === 0) {
        router.push('/dashboard/budgets'); // Push only when no budgets found
      }
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  return (
    <div>
      <div className="fixed md:w-60 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-60">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
