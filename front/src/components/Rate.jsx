import { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

function Rate({item}) {
  const [count, setCount] = useState(0)
  const types=
    [
      {
        id: '1',
        style:'bg-blue-300 rounded py-1 px-4 w-max'
      },
      {
        id: '2',
        style:'bg-amber-200 rounded py-1 px-4 w-max'
      },
      {
        id: '2h',
        style:'bg-lime-200 rounded py-1 px-4 w-max'
      },,
      {
        id: '3',
        style:'bg-violet-200 rounded py-1 px-4 w-max'
      },,
      {
        id: '3h',
        style:'bg-emerald-200 rounded py-1 px-4 w-max'
      },
    ]
    useEffect(()=>{
      const matchingType = types.find(type => type&&type.id==item)
      if (matchingType) {
        console.log(matchingType.style, item);
    } 
    },[item])
    
  return (
    
      <div className={types.find(type => type&&type.id==item) && types.find(type => type&&type.id==item).style}>
        {item}
      </div>
  )
}

export default Rate
