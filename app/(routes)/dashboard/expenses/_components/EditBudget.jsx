"use client";

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import Button2 from '@/app/(routes)/dashboard/budgets/_components/Button2';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Budgets } from '@/utils/schema';
import { toast } from "sonner";
import { useUser } from '@clerk/nextjs';
import { db } from  '../../../../../utils/dbConfig';
import { PenBox } from 'lucide-react';
import { eq } from 'drizzle-orm';

function EditBudget({budgetInfo ,refreshData}) {

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.emoji);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const { user } = useUser();

    useEffect( () => {
        if(budgetInfo){
            setEmojiIcon(budgetInfo?.icon)
            setName(budgetInfo?.name);
            setAmount(budgetInfo?.amount)
        }
    },[budgetInfo]);

    const updateBudget = async () => {

        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon,
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning()

        if(result){
            refreshData();  
            toast.success("Budget Updated!");
        }

    }

  return (
    <div>
        <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex gap-2"><PenBox /> Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-6 relative'>
                                <Button2 onClick={() => setOpenEmojiPicker(!openEmojiPicker)} className='text-lg'>
                                    {emojiIcon}
                                </Button2>

                                {openEmojiPicker && (
                                    <div className='absolute z-20'>
                                        <EmojiPicker onEmojiClick={(e) => {
                                            setEmojiIcon(e.emoji);
                                            setOpenEmojiPicker(false); // Close the emoji picker after selecting
                                        }} />
                                    </div>
                                )}
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                    <Input type="text" placeholder="e.g. Home Decor, etc"
                                        onChange={(e) => setName(e.target.value)}
                                        defaultValue={budgetInfo?.name} />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                    <Input type="number" placeholder="e.g. 5000$" 
                                        onChange={(e) => setAmount(e.target.value)}
                                        defaultValue={budgetInfo?.amount} />
                                </div>
                                
                            </div>
                        </DialogDescription>
                </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                                    <Button
                                    disabled={!(name && amount)}
                                    onClick={() => updateBudget()} // Fixed the unmatched parenthesis
                                    className='mt-2 w-full'>Update Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    </div>
  )
}

export default EditBudget