import React from 'react'

const entry=[
  {
    key:1,
    time:"2022-01-01",
    collateral:"100 KMR",
    debt:"50 Nexus",
  },
  {
    key:2,
    time:"2022-01-01",
    collateral:"100 KMR",
    debt:"50 Nexus",
  },
  {
    key:3,
    time:"2022-01-01",
    collateral:"100 KMR",
    debt:"50 Nexus",
  },
]

const LoanLog = () => {
  return (
    <div className='p-10 mt-10 bg-slate-300/70 min-w-[400px] h-[300px] flex gap-10 flex-col rounded-lg'>
      <h1 className='text-3xl font-bold'>Outstanding Loans</h1>
      <table className='flex flex-col gap-2'>
        <tr className='flex justify-around'>
          <th>LOAN TIME</th>
          <th>COLLATERAL</th>
          <th>DEBT</th>
        </tr>
        
        {entry.map((item)=>{
          return(
            <tr key={item.key} className='flex justify-around'>
              <td>{item.time}</td>
              <td>{item.collateral}</td>
              <td>{item.debt}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default LoanLog