// import Link from "next/link"

import { useState } from "react";
import Navbar from "../components/Navbar";
// import Home from './Home/page';
// import { useState } from 'react'


export default function Home() {

    return(
    <>
      <header className="w-50">
        <Navbar/>
      </header>
      <div className="w-[100vw] h-[100vh]">
      <div className="flex flex-col justify-center items-center p-48 gap-9">
        <h1 className="text-6xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing.</h1>
        <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A similique iusto eligendi deserunt distinctio minus ad quam eius ipsum debitis obcaecati esse neque quod delectus officiis, nesciunt tenetur quia, quibusdam iste? Eum expedita omnis a aspernatur explicabo rem aliquid dolore amet hic tenetur similique, et perferendis quidem incidunt? Est, earum.</p>
        <button className="hover:bg-transparent outline outline-2 p-2 m-2 border-none text-xl font-semibold outline-black rounded-md bg-black text-white hover:text-black">Get Started</button>
      </div>
    </div>
    </>
  )
}
