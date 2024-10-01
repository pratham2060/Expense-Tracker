"use client"; // Marks this component as a Client Component

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { getTableColumns, sql, eq } from 'drizzle-orm';
import { Budgets, Expenses as ExpensesTable } from '@/utils/schema'; // Renaming the imported `Expenses` to avoid conflict
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';

function ExpensesPage({ params }) { 

    const { user } = useUser();
    
    const [budgetInfo , setBudgetInfo] = useState(null); // Initialize with null

    useEffect(() => {
        if (user) getBudgetInfo();
    }, [params, user]);

    const getBudgetInfo = async () => {
        const result = await db
            .select({
                ...getTableColumns(Budgets),
                totalSpend: sql`sum(${ExpensesTable.amount})`.mapWith(Number), // Using the renamed `ExpensesTable`
                totalItems: sql`count(${ExpensesTable.id})`.mapWith(Number),
            })
            .from(Budgets)
            .leftJoin(ExpensesTable, eq(Budgets.id, ExpensesTable.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id);

        setBudgetInfo(result[0]);
        
    };

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold'>My Expenses</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                {budgetInfo ? ( // Conditional rendering based on the availability of budgetInfo
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>

                    </div>
                )}

                <AddExpense 
                    budgetId = {params.id} 
                    user={user} 
                    refreshData = { () => getBudgetInfo()}
                />
            </div>
        </div>
    );
}

export default ExpensesPage;
