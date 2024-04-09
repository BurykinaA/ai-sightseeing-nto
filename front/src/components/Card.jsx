import { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

function Card({item}) {
  const [count, setCount] = useState(0)

  return (
    
      <div className='min-w-[420px]  w-[420px] h-[585px] bg-white shadow-md rounded-xl flex gap-2  flex-col items-center p-[16px] hover:scale-[102%] duration-200 hover:-translate-y-0.5 '>
        <img className='w-[380px] h-[380px] rounded-lg object-cover ' src={item.url}/>
       <div className='h-full flex flex-col items-start'>
        <p className='text-xl font-semibold'>{item.id}</p>
        <p className=''>{item.title}</p>
        <Link to={'/object/'+item.id} className='text-black no-underline mt-auto ms-auto'>
        <button className=' bg-white border-2 border-gray-600 rounded-lg'>перейти???</button>
        </Link>
        
       </div>
        
      </div>
  )
}

export default Card
