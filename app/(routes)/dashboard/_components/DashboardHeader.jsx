import { UserButton } from '@clerk/nextjs'
import React from 'react'
import DynamicSideNav from './DynamicSideNav'

function DashboardHeader
() {
  return (
    <div className=' p-5 shadow-md border-b flex justify-between '>
        <div>
            
        </div>
        <div>
            <UserButton />
        </div>
    </div>
  )
}

export default DashboardHeader
