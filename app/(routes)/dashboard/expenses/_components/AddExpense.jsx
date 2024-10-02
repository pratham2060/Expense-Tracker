"Use client"

import React, { useEffect, useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { db } from "@/utils/dbconfig";
import { Budgets, Expenses } from "@/utils/schema";
import moment from "moment";
import { Loader } from "lucide-react";

function AddExpense({budgetId ,user ,refreshData}) {

    const [name, setName] = useState();

    const [amount, setAmount] = useState();

    const [loading, setLoading] = useState(false);

    const addNewExpense = async () => {
      setLoading(true)

        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format("DD/MM/YYYY HH:mm:ss")
        }).returning({insertedID:Budgets.id});

        setAmount('');
        setName('');

        console.log(result)
        if(result){
            setLoading(false)
            refreshData()
            toast.success("Expense added successfully");
        }

        setLoading(false)
    }

  return (
    <div className='border p-5 rounded-lg'> 
      <h2 className="font-bold  text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          type="text"
          placeholder="e.g. Home Decor, etc"
          onChange={(e) => setName(e.target.value)}
          value = {name}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          type="number"
          placeholder="e.g. 5000$"
          onChange={(e) => setAmount(e.target.value)}
          value = {amount}
        />
      </div>
      <Button disabled={!(name&&amount) || loading} onClick={()=> addNewExpense()} className='mt-3 w-full'>
        {loading?<Loader className="animate-spin text-white" />:"Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
