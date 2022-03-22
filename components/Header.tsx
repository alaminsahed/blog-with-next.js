import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between p-5 ">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="image/mediu,.png"
            alt="logo"
            className="object-container w-48 cursor-pointer"
          />
        </Link>
        <div className="hidden space-x-5 md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="rounded-full bg-green-600 py-1 px-4 text-white">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex space-x-5 text-green-700">
        <h3 className="py-1">SignIn</h3>
        <h3 className="rounded-full border border-green-300 px-4 py-1">
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
