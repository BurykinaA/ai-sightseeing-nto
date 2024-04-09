import { useState } from 'react'
import '../App.css'
import ThemeToggle from './ThemeToggle'
import { Link } from 'react-router-dom'
// import AppRouted from './router/AppRouted'

function Nav() {
  const [count, setCount] = useState(0)

  return (
    
      <div className='fixed top-0 left-0 w-full h-[60px] bg-[#f6fafc] flex items-center px-10 z-10 shadow-md'>
       <Link to='/' className='text-black'>home</Link> 
        {/* <ThemeToggle /> */}
      </div>
  )
}

export default Nav
