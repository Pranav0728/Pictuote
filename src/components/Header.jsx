"use client";
import {ModeToggle} from '@/components/ModeToggle'
import Link from 'next/link';

export function Header() { 
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-opacity-70 border-b-2 px-2 py-3">
        <div className="flex items-center justify-between md:px-32 ">
          <h1 className="text-2xl font-medium">Pictuote</h1>

          <div className="space-x-4 flex flex-row items-center">
            <Link href="/" className=" hover:text-gray-400 text-xl">
              Home
            </Link>
            <Link href="/upload" className=" hover:text-gray-400 text-xl">
              Upload
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}