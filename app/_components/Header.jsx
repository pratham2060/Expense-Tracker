"use client";

import React from "react";
import Image from "next/image";
import Button from "./Button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-6 flex items-center border justify-between shadow-lg" style={{ height: "70px" }}>
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Logo" width={60} height={50} />
        <h2 className="text-xl font-extrabold">HISABH</h2>
      </div>
      <div className="font-bold text-lg  text-black flex items-center">
        <Link href={'/'} className="hover:text-primary" ><h3>Home</h3></Link>
        <Link href={'/about'} className="ml-6 hover:text-primary"><h3>About</h3></Link>
        <Link href={'#'} className="ml-6 hover:text-primary"><h3>Contact</h3></Link>
      </div>
      {isSignedIn ? (
        <>
          <div className="flex gap-1 justify-end">
            <Link href="/dashboard" className="mr-5">
              <Button>Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        </>
      ) : (
        <Button>Get started</Button>
      )}
    </div>
  );
}

export default Header;
