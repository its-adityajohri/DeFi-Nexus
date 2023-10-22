// "use client"

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
      <>

      <div className="p-10 m-10 flex flex-col w-full">
        <div className="w-[90%] flex flex-col items-center">
          <div className="flex w-full justify-between items-center">
            <span className="flex-1 font-semibold text-center">COLLATERAL</span>
            <span className="flex-1 font-semibold text-center">STATUS</span>
            <span className="flex-1 font-semibold text-center">LTV</span>
            <span className="flex-1 font-semibold text-center">DEBT CEILING/UTIL</span>
            <span className="flex-1 font-semibold text-center">APY</span>
            <span className="flex-1 font-semibold text-center">R3 BRIBES</span>
            <span className="flex-1 font-semibold text-center">ROUND 3 VOTES</span>
            <span className="flex-1 font-semibold text-center">VOTE</span>
          </div>
          <hr className="p-[1px] bg-gray-500 w-full mt-5" />
        </div>
        
        {
          votes.map((item)=>{ return(
            <div key={item.key} className="w-[90%] flex flex-col items-center">
          <div className="flex mt-5 w-full justify-between items-center">
            <span className="flex-1 text-center">{item.collateral}</span>
            <span className="flex-1 text-center">{item.status}</span>
            <span className="flex-1 text-center">{item.lvt}</span>
            <span className="flex-1 text-center">{item.debt}</span>
            <span className="flex-1 text-center">{item.api}</span>
            <span className="flex-1 text-center">{item.bribes}</span>
            <span className="flex-1 text-center">{item.votes}</span>
            <span className="flex-1 text-center">
            <button className='pt-1 pb-1 p-2 m-2 bg-black hover:bg-white text-white hover:text-black outline outline-black outline-2 rounded-md'>VOTE</button>
            </span>
          </div>
        </div>
          )})
        }
      </div>
      </>
  )
}

export default DataTable