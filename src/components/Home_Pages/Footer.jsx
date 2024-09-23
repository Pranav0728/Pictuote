'use client'
import Link from 'next/link'
import Image from 'next/image'
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import logo from "@/assets/post_logo.png"

export function Footer() {
  return (
    <footer className="flex h-16 items-center justify-center mt-auto w-full border-t">
      <div className="w-full max-w-[1000px] md:px-8 px-4 flex place-content-center">
        <div className="gap-x-11 md:flex flex-1 hidden">
          <Link
            href="/"
            className="pointer flex items-center"
          >
            <Image src={logo} alt='logo' width={50} height={50}/>
          </Link>
        </div>
        <div className="flex max-w-fit items-center gap-x-4">
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/Pranav0728" prefetch={false}>
            <GitHubLogoIcon className="h-7 w-7" />
          </Link>
          <Link href="https://x.com/molawade_pranav" prefetch={false}>
            <TwitterLogoIcon className="h-7 w-7" />
          </Link>
        </div>
         
        </div>
      </div>
    </footer>
  )
}
