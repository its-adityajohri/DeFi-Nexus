"use client"
import React from 'react'
import DataTable from '@/components/DataTable'
const user=false;

const Vote = () => {
  return (
  <>
      {
        !user&&<div className='bg-red-300 m-10 p-2 rounded-md'>
          <p className='text-xl font-semibold pl-2 text-center'>Please connect your wallet to participate in voting.</p>
        </div>
      }
      <DataTable/>
    </>
  )
}

export default Vote
// const votes =[
//   { id: 1, collateral: 'wBTC', status: 'active', debtCeiling: '100M', utilization: '50%', apy: '5%', bribes: '10 ETH', voteCount: 100, badDebt: 0 },
//     { id: 2, collateral: 'ETH', status: 'active', debtCeiling: '200M', utilization: '75%', apy: '7%', bribes: '5 ETH', voteCount: 50, badDebt: 0 },
//     {
//       id: 3,
//       collateral: 'APE',
//       status: 'inactive',
//       debtCeiling: '50M',
//       utilization: '25%',
//       apy: '3%',
//       bribes: '2 ETH',
//       voteCount: 20,
//       badDebt: 1378,
//     },
// ]

