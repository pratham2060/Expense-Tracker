"use client";

import React, { useState } from 'react';
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
import Button2 from './Button2';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Budgets } from '@/utils/schema';
import { toast } from "sonner";
import { useUser } from '@clerk/nextjs';
import { db } from  '../../../../../utils/dbConfig';

function CreateBudget({refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState("😎");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const { user } = useUser();

    const onCreateBudget = async () => {
        const result = await db.insert(Budgets)
            .values({
                name: name,
                amount: amount,
                createdBy: user?.primaryEmailAddress.emailAddress,
                icon: emojiIcon
            })
            .returning({ insertedId: Budgets.id });

        if (result) {

            refreshData();

            toast('New Budget Created!');
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 rounded-md
                    items-center flex flex-col border-2 border-dashed
                    cursor-pointer hover:shadow-md'>
                        <h2 className='text-3xl'>+</h2>
                        <h2 className='bold'>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
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
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                    <Input type="number" placeholder="e.g. 5000$" 
                                        onChange={(e) => setAmount(e.target.value)} />
                                </div>
                                
                            </div>
                        </DialogDescription>
                </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                                    <Button
                                    disabled={!(name && amount)}
                                    onClick={onCreateBudget} // Fixed the unmatched parenthesis
                                    className='mt-2 w-full'>Create Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateBudget;