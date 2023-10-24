// "use client"

import Link from 'next/link';
// import React, { useState } from 'react'
import WalletConnect from './WalletConnect';
// import { Dialog } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Web3Button } from '@web3modal/react'

const navigation = [
  { name: 'Loans', href: '/loans' },
  { name: 'Docs', href: '/docs' },
  { name: 'Vote', href: '/vote' },
  { name: 'Swap', href: '/swap' },
];


const Navbar = () => {
  return (
    <nav className="relative mt-5 flex items-center justify-between px-8 text-xl font-semibold" >
      <div className='flex-1 pt-1 font-bold leading-6 text-gray-700'>
        <Link href='/'>DEFI-Nexus</Link>
      </div>

      <div className="flex gap-x-12">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="leading-6 text-gray-900">
            {item.name}
          </a>
        ))}
      </div>
      <div className="flex flex-1 justify-end">
         <Link href='/'>
           <WalletConnect/>
         </Link> 
      </div>
      <hr className='absolute top-14 left-[5%] w-[90%] p-[5px]' />
    </nav>
)
}

export default Navbar