"use client"

import React, { useState } from 'react'

const transactions = [
  {
    name: "SparkFun",
    amount: "89.4 USD",
  },
  {
    name: "SparkFun",
    amount: "89.4 USD",
  },
  {
    name: "SparkFun",
    amount: "89.4 USD",
  },
  {
    name: "SparkFun",
    amount: "89.4 USD",
  },
  {
    name: "SparkFun",
    amount: "89.4 USD",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [typed, setTyped] = useState("");
  const [inputValue, setInputValue] = useState("");
  let i = 6;

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e, i) => {
    e.preventDefault();
    setTyped(inputValue);
    const newMessage = {
      key: i,
      text: inputValue,
      sender: "admin",
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
    i++;
    // setValue("");
  };


  return (
    <div className='p-10 m-10 flex gap-5 items-center justify-center'>
      <div className="flex-1 flex flex-col p-10 bg-slate-300/70 rounded-xl max-w-[500px] max-h-[full]">
        <div className="flex flex-row items-center justify-around w-full p-2">
          <div className="flex-1">
            <h2 className="text-xl font-semibold">UserName</h2>
            <p className="text-md">Select Transaction to verify it on chain</p>
          </div>
          <button className="p-2 m-2 bg-black hover:bg-white text-white hover:text-black font-semibold rounded-lg outline outline-black outline-2">
            LogOut
          </button>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-col p-2 m-2 gap-5 max-h-[350px] overflow-y-auto no-scrollbar">
            {transactions.map((item) => (
              <div
                key={item.id}
                className="border-solid border-2 border-gray-500 rounded-xl w-full p-5 flex justify-between items-center"
              >
                <span>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>{item.amount}</p>
                </span>
                <input
                  type="radio"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => {}}
                ></input>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-slate-300/70 max-w-[600px] h-[500px] p-10 rounded-xl">
        <div className="">
          <h1 className="text-xl overflow-scroll no-scrollbar font-semibold max-w-[350px]">
          0x1C8f831965968B59635f6A10aAcdC1Ed8Aa65443
          </h1>
          <p>0.01 DAI</p>
          <hr className="p-[0.5px] m-0 bg-black" />
        </div>

        <div className="flex flex-col flex-auto h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="flex flex-col">
                {
                  messages.map((item, i)=>{ return(
                    <div key={i} className="w-full p-3 rounded-lg">
                      <div className={`flex  float-${item.sender==="admin"?"right":"left"} flex-row items-center`}>
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>{item.text}</div>
                        </div>
                      </div>
                    </div>
                  )})
                }
              </div>
            </div>
          </div>

          <form
            className="flex w-full p-2 items-center gap-5"
          >
            <input
              type="text"
              className="flex-1 p-2 rounded-2xl bg-transparent border-solid border-gray-500 focus:outline focus:outline-gray-500 focus:outline-[2px] focus:border-none border-[1px]"
              placeholder="Write something here...." value={inputValue}
              onChange={handleChange}
            />
            <button className="w-16 h-10 text-center font-semibold text-lg bg-black text-white rounded-full hover:bg-white hover:text-black outline outline-2 outline-black" disabled={inputValue===""?true:false} onClick={handleSubmit}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat