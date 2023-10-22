// import Link from "next/link"

import { useState } from "react";
import Navbar from "../components/Navbar";
// import Home from './Home/page';
// import { useState } from 'react'


export default function Home() {

    return(
    <>
      
      <div className="w-[100vw] h-[100vh]">
      <div className="flex flex-col justify-center items-center p-48 gap-9">
        <h1 className="text-6xl font-bold">DeFi Nexus</h1>
        <p className="text-xl">DeFi Nexus is a pioneering DeFi platform revolutionizing lending, governance, and P2P crypto swaps, eliminating intermediaries, enhancing security, and empowering users within a self-regulating ecosystem.</p>
        <button className="hover:bg-transparent outline outline-2 p-2 m-2 border-none text-xl font-semibold outline-black rounded-md bg-black text-white hover:text-black">Get Started</button>
      </div>
    </div>
    </>
  )
}
