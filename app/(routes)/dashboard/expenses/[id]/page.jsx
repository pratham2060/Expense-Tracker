"use client"; // Marks this component as a Client Component

import React, { useEffect, useState } from 'react';
import { db } from '../../../../../utils/dbConfig';
import { getTableColumns, sql, eq, desc } from 'drizzle-orm';
import { Budgets, Expenses, Expenses as ExpensesTable } from '@/utils/schema'; 
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { PenBox, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import EditBudget from '../_components/EditBudget';  

function ExpensesPage({ params }) { 

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState(null);
    const [expenseList, setExpenseList] = useState([]);

    useEffect(() => {
        if (user) {
            getBudgetInfo();
            getExpensesList();  // Fetch the expenses separately
        }
    }, [params, user]);

    const getBudgetInfo = async () => {
        const result = await db
            .select({
                ...getTableColumns(Budgets),
                totalSpend: sql`sum(${ExpensesTable.amount})`.mapWith(Number),
                totalItems: sql`count(${ExpensesTable.id})`.mapWith(Number),
            })
            .from(Budgets)
            .leftJoin(ExpensesTable, eq(Budgets.id, ExpensesTable.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id);

        setBudgetInfo(result[0]);
    };

    const getExpensesList = async () => {
        const result = await db
            .select()
            .from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id));  // Fix: order by Expenses.id

        setExpenseList(result);  // Set fetched expenses
    };

    const deleteBudget = async () => {

        const deleteExpenseResult = await db.delete(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .returning();

        if(deleteExpenseResult){
            const result = await db.delete(Budgets)
            .where(eq(Budgets.id, params.id))
            .returning();
            router.push('/dashboard/budgets');
        }

        toast.success('Budget deleted !');
    };

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold flex items-center justify-between'>
                My Expenses

                <div className='flex gap-2 items-center'>
                    
                    <EditBudget budgetInfo={budgetInfo} refreshData={() => {
                    getBudgetInfo();
                    getExpensesList();}}/>
                
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className=' text-white flex gap-2' variant='destructive'><Trash /> Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your budget along with all the expenses associated with it.
                            and remove your data from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>

                </div>

            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} refreshData={() => getBudgetInfo()} />
                ) : (
                    <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>
                )}

                <AddExpense 
                    budgetId={params.id} 
                    user={user} 
                    refreshData={() => {
                        getBudgetInfo();
                        getExpensesList();  // Refresh expenses after adding a new one
                    }} 
                />
            </div>
            <div>
                <h2 className='text-lg font-bold'>Latest Expense Table</h2>
                <ExpenseListTable expenseList={expenseList} refreshData={() => {
                    getBudgetInfo();
                    getExpensesList();  // Refresh expenses after adding a new one
                }} />
            </div>
        </div>
    );
}

export default ExpensesPage;
