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
      <Image src="/logo.svg" alt="Logo" width={60} height={50} />
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
