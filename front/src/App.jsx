import { useState } from 'react'
import './App.css'
import AppRouted from './router/AppRouted'
import { BrowserRouter } from 'react-router-dom'
import Nav from './components/Nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='flex'>
    <Nav/>
    <div className='mt-[50px] w-full flex'>
      
        <AppRouted/>
        
      
      {/* <div className='w-[200px] text-gray-900 '>fcs</div> */}

    </div>
    
   
    </div>
   </BrowserRouter>
  )
}

export default App
