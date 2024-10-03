"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { UserButton, useUser } from "@clerk/nextjs";
import ExpenseListTable from "./_components/ExpenseListTable";
import { Button } from "@/components/ui/button";

function ExpensesMain() {
  const { user } = useUser();
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
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  const handlePrint = () => {
    const printSection = document.getElementById("expense-printable");
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Expense List</title>
          <style>
            ${document.querySelector("style").innerHTML}
          </style>
        </head>
        <body>
          ${printSection.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div>
      <div className="mt-5 p-2 border m-5 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl">All Current Expenses</h2>
          <Button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Print
          </Button>
        </div>
        <div id="expense-printable">
          <ExpenseListTable expenseList={expensesList} refreshData={() => getAllExpenses()} />
        </div>
      </div>
    </div>
  );
}

export default ExpensesMain;
