"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbconfig";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import BarChartDashBoard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from '@/app/(routes)/dashboard/expenses/_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

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

    getAllExpenses();
    setBudgetList(result);
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)) // Fix here
      .orderBy(desc(Expenses.id));
  
    setExpensesList(result);
  };
  

  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
      <p className="text-gray-500">
        Here's what's happening with your money, let's manage your expense
      </p>

      <CardInfo budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-1">
        <div className="col-span-2">
          <BarChartDashBoard budgetList={budgetList} />
        </div>
        <div className="rounded-lg border border-gray-200 shadow-lg h-[410px] overflow-y-auto bg-white">
          <div className="grid gap-6 p-6">
            <h2 className='font-bold text-2xl '>Latest Budgets</h2>
            {budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} /> 
            ))}
          </div>
          <style jsx>{`
            /* Custom Scrollbar */
            .overflow-y-auto::-webkit-scrollbar {
              width: 8px; /* Make the scrollbar thinner */
            }
            .overflow-y-auto::-webkit-scrollbar-thumb {
              background-color: rgba(0, 0, 0, 0.2); /* Light gray thumb */
              border-radius: 10px; /* Rounded scrollbar */
            }
            .overflow-y-auto::-webkit-scrollbar-thumb:hover {
              background-color: rgba(0, 0, 0, 0.4); /* Darken on hover */
            }
            .overflow-y-auto::-webkit-scrollbar-track {
              background-color: rgba(0, 0, 0, 0.05); /* Light background track */
              border-radius: 10px; /* Match the thumb for smooth scrolling */
            }
            `}
        </style>
        </div>
      </div>
      <div className='mt-5'>
        <h2 className="font-bold text-2xl mt-5">Lastest Expenses</h2>
        <ExpenseListTable expenseList={expensesList} refreshData={() => getBudgetList()} />
      </div>
    </div>
  );
}

export default Dashboard;
