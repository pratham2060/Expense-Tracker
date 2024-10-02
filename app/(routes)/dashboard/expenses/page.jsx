"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbconfig";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { UserButton, useUser } from "@clerk/nextjs";
import ExpenseListTable from './_components/ExpenseListTable';

function ExpensesMain() {

    const { user } = useUser();
    const [budgetList, setBudgetList] = useState([]);
     const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
        if (user) {
          getAllExpenses();
        }
      }, [user]);

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
    <div>
      <div className='mt-5 p-2 border m-5 rounded-lg'>
        <h2 className="font-bold text-2xl mt-5">All Current Expenses</h2>
        <ExpenseListTable expenseList={expensesList} refreshData={() => getAllExpenses} />
      </div>
    </div>
  )
}

export default ExpensesMain;