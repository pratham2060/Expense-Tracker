"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from 'next/navigation';

function Header() {
  const { user, isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    router.push('/sign-up');
  }

  return (
    <div className="p-6 flex items-center justify-between shadow-lg bg-white" style={{ height: "70px" }}>
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Logo" width={60} height={50} />
        <h2 className="text-xl font-extrabold ml-3">HISABH</h2>
      </div>

      {/* Navigation links */}
      <div className={`font-bold text-lg flex-col md:flex-row md:flex items-center space-x-4 ${menuOpen ? "flex" : "hidden"} md:flex`}>
        <Link href="/" className="hover:text-primary">
          <h3>Home</h3>
        </Link>
        <Link href="/about" className="hover:text-primary ml-8">
          <h3>About</h3>
        </Link>
        <Link href="#" className="hover:text-primary ml-8">
          <h3>Contact</h3>
        </Link>
      </div>

      {/* Sign-in and User section (kept separate) */}
      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            <UserButton />
          </>
        ) : (
          <Button onClick={handleClick()}>Get started</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
