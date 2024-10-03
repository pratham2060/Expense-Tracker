"use client";

import React, { useState } from 'react'
import DynamicSideNav from './DynamicSideNav'
import { Menu, Search } from 'lucide-react'
import { UserButton } from "@clerk/nextjs";
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Image from 'next/image'

function DashboardHeader({ children }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const isSmallScreen = useMediaQuery('(max-width: 768px)')

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen)
  }

  return (
    <div className="relative">
      <header className='p-5 shadow-md border-b flex justify-between items-center bg-white'>
        <div className="flex items-center">
          {isSmallScreen ? (
            <Menu 
              className="cursor-pointer text-gray-600 hover:text-blue-600" 
              onClick={toggleSideNav}
            />
          ) : (
            <div className="flex items-center">
              {isSideNavOpen && (
                <div className='flex gap-2 text-primary font-medium'>
                  <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                  <span className="ml-2 text-xl font-extrabold text-gray-800">HISABH</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-grow mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-100 px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <UserButton />
      </header>
      {isSideNavOpen && <DynamicSideNav onClose={() => setIsSideNavOpen(false)} />}
      <main className="p-4">
        {children}
      </main>
    </div>
  )
}

export default DashboardHeader
