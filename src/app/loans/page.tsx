import LoanLog from '@/components/LoanLog'
import NexusConverter from '@/components/NexusConverter'
import Transaction from '@/components/Transaction'
import React from 'react'

const Loans = () => {
  return (
    <div className='p-10 m-10 min-w-fit h-full'>
      <div className="flex justify-evenly">
        <LoanLog/>
        <NexusConverter/>
        <Transaction/>
      </div>
    </div>
  )
}

export default Loans