"use client"
import React from 'react'

const Transaction = () => {

  const handleSubmit=(e)=>{
    // 
  }
  return (
    <div className='bg-slate-300/70 p-10 mt-10 min-w-[250px] h-[450px] rounded-lg flex flex-col gap-10'>
      <h1 className="text-3xl font-bold">Deposit and Borrow</h1>
      <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5 justify-around h-full'>
        <span className='flex flex-col gap-5'>
          <h3 className="text-xl">Deposit collateral</h3>
          <input type="text" placeholder='Deposit here' className='p-2 rounded-md bg-transparent border-solid border-2 border-gray-300'/>
        </span>
        <span className='flex flex-col gap-5'>
          <h3 className="text-xl">Borrow Tokens</h3>
          <input type="text" placeholder='Borrow from here' className='p-2 rounded-md bg-transparent border-solid border-2 border-gray-300'/>
        </span>
        <span className='flex gap-5 mt-5'>
          <button className='mb-10 bg-black text-white p-2 pl-5 pr-5 rounded-lg w-fit hover:bg-white hover:text-black text-md font-semibold outline outline-black outline-2'>Deposit</button>
          <button className='mb-10 bg-black text-white p-2 pl-5 pr-5 rounded-lg w-fit hover:bg-white hover:text-black text-md font-semibold outline outline-black outline-2'>Borrow</button>
        </span>
      </form>
    </div>
  )
}

export default Transaction