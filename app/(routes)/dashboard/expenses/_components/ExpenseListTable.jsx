import { Trash } from 'lucide-react';
import React from 'react';
import { db } from '@/utils/dbconfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

function ExpenseListTable({ expenseList ,refreshData}) {

    const deleteExpense = async (expense) => {
        const result = await db.delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning({deletedID:Expenses.id});

        if(result){
            toast.success("Expense deleted!");
            refreshData();
        }
    }

  return (
    <div className='mt-3'>
      <div className='grid grid-cols-4 bg-slate-200 p-2 rounded-lg'>
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>

      {/* Check if expenseList exists and has items */}
      {expenseList && expenseList.length > 0 ? (
        expenseList.map((expense, index) => (
          <div key={expense.id} className='grid grid-cols-4 bg-slate-50 p-2 '>
            <h2>{expense.name}</h2>
            <h2>{expense.amount}</h2>
            {/* Format the createdAt date */}
            <h2>{new Date(expense.createdAt).toLocaleDateString()}</h2>
            <h2>
              <Trash className='text-red-500 cursor-pointer'
              onClick={() => {
                deleteExpense(expense);
              }}
              />
            </h2>
          </div>
        ))
      ) : (
        <div className='mt-4 text-center'>
          <h2>No expenses found.</h2>
        </div>
      )}
    </div>
  );
}

export default ExpenseListTable;
