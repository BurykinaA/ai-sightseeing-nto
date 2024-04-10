import { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

function Card({item}) {
  const [count, setCount] = useState(0)

  return (
    
      <div className='min-w-[420px]  w-[420px] h-[585px] bg-white shadow-md rounded-xl flex gap-2  flex-col items-center p-4 hover:scale-[102%] duration-200 hover:-translate-y-0.5 '>
        <img className='w-[380px] h-[380px] rounded-lg object-cover ' src={'data:image/jpg;base64,'+item.photo}/>
       <div className='h-full flex flex-col items-start'>
        <p className='text-xl font-semibold'>{item.name}</p>
        <p className=''>{item.description}</p>
        <Link to={'/object/'+item.id} className='text-black no-underline mt-auto ms-auto'>
        <button className='blueButtonInherit'>Перейти</button>
        </Link>
        
       </div>
        
      </div>
  )
}

export default Card
