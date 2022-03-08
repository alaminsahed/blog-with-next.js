import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className='flex items-center p-5 max-w-7xl mx-auto justify-between '>
            <div className='flex items-center space-x-5'>
                <Link href="/">
                  <img src="https://links.papareact.com/yvf" alt="logo" className='w-48 object-container cursor-pointer' />
                </Link>
                <div className='space-x-5 hidden md:inline-flex'>
               <h3>About</h3>
               <h3>Contact</h3>
               <h3 className='bg-green-600 py-1 rounded-full px-4 text-white'>Follow</h3>
            </div>
            </div>
            <div className='flex space-x-5 text-green-700'>
                <h3 className='py-1'>SignIn</h3>
                <h3 className='rounded-full border-green-300 border px-4 py-1'>Get Started</h3>
            </div>
        </header>
    );
};

export default Header;