"use client";
import Link from "next/link";
import React, { useState } from "react";

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

const Swap = () => {
  const [active, setActive]=useState(transactions);
  const[amount, setAmount]=useState("");
  const[mail, setMail]=useState("");
  const [messages, setMessages] = useState([]);
  const [typed, setTyped] = useState("");
  const [inputValue, setInputValue] = useState("");
  let i = 6;

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTransaction=(e)=>{
    e.preventDefault();
    const addActive={
      name: mail,
      amount,
    };
    setActive([...active, addActive]);
    setMail("");
    setAmount("");
  }

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
    <div className="p-10 m-10 flex flex-col gap-5 items-center justify-center">
      

      <div className=" flex flex-col max-w-[40%] items-center bg-slate-300/70 p-5 rounded-lg">
        <h1 className="text-3xl font-semibold ">Swap DAI</h1>
        <input
          type="text"
          className="p-2 m-2 bg-transparent focus:outline-none border-solid border-gray-500 border-[1px] w-[60%] rounded-lg "
          placeholder="Enter Your Paypal email"
          value={mail} onChange={(e)=>setMail(e.target.value)}
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          repellendus quo necessitatibus fuga esse consequuntur earum aliquam
          molestias officia dolores.
        </p>
        <input type="text" placeholder="Enter Amount" className="p-2 m-2 bg-transparent focus:outline-none border-solid border-gray-500 border-[1px] w-[60%] rounded-lg " value={amount}  onChange={(e)=>setAmount(e.target.value)}/>
        <button className="p-2 h-10  font-semibold text-lg bg-black text-white rounded-full hover:bg-white hover:text-black outline outline-2 outline-black" onClick={handleTransaction}>
          Sell DAI
        </button>
      </div>
      <div className=" flex flex-col w-[40%] items-center bg-slate-300/70 p-5 rounded-lg">
        <h1 className="text-xl font-semibold">Active Orders</h1>
        <div className="w-full flex flex-col gap-5">
          {active.map((item, h) => (
            <div
              key={h}
              className="border-solid border-2 border-gray-500 rounded-xl w-full p-5 flex justify-between items-center"
            >
              <span>
                <h2 className="font-semibold">{item.name}</h2>
                <p>{item.amount}</p>
              </span>
              <Link href='swap/chat'
                className="p-2 h-10  font-semibold text-lg bg-black text-white rounded-xl hover:bg-white hover:text-black outline outline-2 outline-black"
              >Chat</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Swap;
