import { useState } from 'react'
import './App.css'
import AppRouted from './router/AppRouted'
import { BrowserRouter } from 'react-router-dom'
import Nav from './components/Nav'
import { ObjContext } from './context'

function App() {
  const [count, setCount] = useState(0)
  const [obj, setObj]= useState([])
  return (
    <ObjContext.Provider value={{obj, setObj}}>
      <BrowserRouter>
        <div className='flex'>
          <Nav/>
          <div className='mt-[50px] w-full flex'>
              <AppRouted/>
          </div>
        </div>
    </BrowserRouter>
   </ObjContext.Provider>
  )
}

export default App
