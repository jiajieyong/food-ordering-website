"use client";

import { Menubar, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import Link from 'next/link';
import { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNav = () => {
      setMenuOpen(!menuOpen);
    }

    return (
      <nav className="fixed w-full h-24 shadow-xl bg-white">
        <Menubar className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
          <MenubarMenu>
            <MenubarTrigger className="ml-10 uppercase hover: border-b text-xl">
              <Link href="/menu">Menu</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="ml-10 uppercase hover: border-b text-xl">
              <Link href="/order">Order</Link>
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="ml-10 uppercase hover: border-b text-xl">
              <Link href="/queue">Queue</Link>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>

        <div onClick={handleNav} className="md:hidden cursor pointer pl-24">
          <HamburgerMenuIcon/>
        </div>
      </nav>
    );
  };

export default Navigation;