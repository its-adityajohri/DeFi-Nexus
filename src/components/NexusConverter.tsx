"use client"
// import Image from 'next/image'
import React, { useState } from 'react'

const NexusConverter = () => {
  const [nexus, setNexus] = useState(0.00);

  const handleSubmit=(e)=>{
    e.preventDefault();
    const netAmount=e.target[0].value*0.56;
    setNexus(netAmount);
  };


  return (
    <div className='p-10 mt-10 bg-slate-300/70 rounded-lg min-w-[300px] h-[350px]'>
      <h1 className="text-2xl font-bold">Peg Stability</h1>
      <h2 className="text-xl">Mint Nexus with DAI</h2>
      <form action="" className='flex flex-col justify-around h-full' onSubmit={handleSubmit}>
        <span className='flex border-solid p-2 border-2 border-gray-300 rounded-lg'>
          <input type="text" required placeholder='0.00' className='bg-transparent' onClick={()=>{setNexus(0.00)}}/>
          {/* <Image src='/a.jpg' width={10} height={10} alt='token'/> */}
          <p>DAI</p>
        </span>
        <span className='flex border-solid p-2 border-2 border-gray-300 rounded-lg'>
          <input type="text" disabled placeholder='0.00' className='bg-transparent' value={nexus===0.00?"":nexus}/>
          {/* <Image src='/' width={10} height={10} alt='token'/> */}
          <p>Nexus</p>
        </span>
        <button className='mb-10 bg-black text-white p-2 pl-5 pr-5 rounded-lg w-fit hover:bg-white hover:text-black text-md font-semibold outline outline-black outline-2'>Get Nexus</button>
      </form>
    </div>
  )
}

export default NexusConverter