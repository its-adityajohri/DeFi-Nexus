import React from 'react'

const Docs = () => {
  return (
    <div className='p-10 m-10 '>
      <div className="flex items-end gap-5">
        <h1 className="text-5xl font-bold">DeFi-Nexus</h1>
        <p className="font-semibold">A modern way to exchange crypto.</p>
      </div>
      <hr className="mt-2 w-[40%] p-[1px] bg-gray-300" />
      <div className="w-[30%] flex items-center justify-between">
        <button className="p-2 m-10 outline outline-2 outline-black rounded-lg bg-black text-white rounded-lg hover:bg-white hover:text-black">Try Nexus</button>
        <button className="p-2 m-10 outline outline-2 outline-black rounded-lg hover:bg-black hover:text-white">Source Code</button>
      </div>

      <div className="bg-slate-100/70 p-5 mt-5 rounded-lg max-w-full">
        <h2 className="text-3xl font-semibold">Introduction to Nexus</h2>
        <p className='pl-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati in voluptatem eligendi id. Cumque eveniet, minus vel vero porro assumenda corrupti laborum recusandae sit temporibus, corporis excepturi officia reprehenderit. Labore voluptas quisquam explicabo obcaecati magni quidem non eligendi nobis quibusdam.</p>
        <br />
        <h3 className="text-xl font-semibold"> Why Nexus</h3>
        <p className='pl-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus mollitia architecto ea accusantium cupiditate nihil exercitationem a distinctio culpa nostrum, doloribus suscipit fugit aliquam, sed fuga velit similique corrupti magni autem praesentium. Qui quasi necessitatibus totam expedita odit officia dolores nobis cupiditate maxime, quia molestias ad temporibus reprehenderit, veritatis sed soluta ut enim blanditiis rem nulla mollitia, aut modi dignissimos neque. Architecto aperiam vero sint. Quis exercitationem reiciendis vitae, mollitia nemo temporibus rem, accusantium similique, culpa debitis provident ipsa dignissimos.
        </p>
        <br />
        <ul className='list-decimal pl-20'>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quo.</li>
          <br />
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quo.</li>
          <br />
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quo.</li>
          <br />
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quo.</li>
          <br />
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quo.</li>
        </ul>
        <br />
        <br />
        <p className='pl-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est voluptatibus reprehenderit eveniet architecto cupiditate, possimus debitis ratione? Ipsam, neque dicta.</p>
      </div>


    </div>
  )
}

export default Docs