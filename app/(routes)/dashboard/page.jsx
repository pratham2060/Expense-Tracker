"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbconfig";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import BarChartDashBoard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };

  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
      <p className="text-gray-500">
        Here's what's happening with your money, let's manage your expense
      </p>

      <CardInfo budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-2">
        <div className="col-span-2">
          <BarChartDashBoard budgetList={budgetList} />
        </div>
        <div className="rounded=lg border">
          <div className="grid gap-6 p-6">
            <h2 className='font-bold text-2xl '>Latest Budgets...</h2>
            {budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} /> 
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
