import React from 'react'

const votes=[
  {
    key:1,
    collateral:"ETH A",
    status:"HEALTHY",
    lvt:"70%",
    debt:"4 million Nexus/50%",
    api:"10%/50%",
    bribes:5,
    votes: "49%/10,000 NGMI",
  },
  {
    key:2,
    collateral:"ETH A",
    status:"HEALTHY",
    lvt:"70%",
    debt:"4 million Nexus/50%",
    api:"10%/50%",
    bribes:5,
    votes: "49%/10,000 NGMI",
  },
]

const DataTable = () => {
  return (
    <table className='m-10 p-10 w-[90%]'>
        <tr className='w-fit h-10'>
          <th className='font-semibold'>COLLATERAL</th>
          <th className='font-semibold'>STATUS</th>
          <th className='font-semibold'>LTV</th>
          <th className='font-semibold'>DEBT CEILING/UTIL</th>
          <th className='font-semibold'>APY</th>
          <th className='font-semibold'>R3 BRIBES</th>
          <th className='font-semibold'>ROUND 3 VOTES</th>
          <th className='font-semibold'>VOTE</th>
        </tr>
        {
          votes.map((item)=> {
            return(
              <tr className='w-fit h-10' key={item.key}>
                <th>{item.collateral}</th>
                <th>{item.status}</th>
                <th>{item.lvt}</th>
                <th>{item.debt}</th>
                <th>{item.api}</th>
                <th>{item.bribes}</th>
                <th>{item.votes}</th>
                <th><button>VOTE</button></th>
              </tr>
            )
          })
        }
      </table>
  )
}

export default DataTable