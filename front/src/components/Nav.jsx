import { useContext, useState } from 'react'
import '../App.css'
import ThemeToggle from './ThemeToggle'
import { Link } from 'react-router-dom'
import AddAlbum from './PhotoSearch'
import TextSearch from './TextSearch'
import PhotoSearch from './PhotoSearch'
import axios from 'axios'
import { URL } from '../const'
import { ObjContext } from '../context'
// import AppRouted from './router/AppRouted'

function Nav() {
  const {obj, setObj}= useContext(ObjContext)
  const [data, setData] = useState('')
  const handleSubmit=()=>{
    axios.post(URL+'api/name_reseach', {text:data},'' )
    .then(response=>{
      console.log(response.data)
      setObj(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}

  return (
    
      <div className='fixed top-0 left-0 w-full h-[60px] bg-[#f6fafc] flex items-center gap-10 px-[30px] z-10 shadow-md'>
       <Link to='/' className='text-black'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
  <path d="M27.3565 1.06138C26.7314 0.381777 25.8838 0 25 0C24.1162 0 23.2686 0.381777 22.6435 1.06138L0.488731 25.1537C0.333784 25.3222 0.210874 25.5223 0.127017 25.7425C0.0431605 25.9626 0 26.1986 0 26.437C0 26.6753 0.0431605 26.9113 0.127017 27.1315C0.210874 27.3517 0.333784 27.5517 0.488731 27.7202C0.80166 28.0606 1.22608 28.2518 1.66863 28.2518C1.88776 28.2518 2.10474 28.2048 2.30719 28.1136C2.50964 28.0224 2.69359 27.8888 2.84853 27.7202L5.00168 25.3748V44.5624C5.00168 46.0045 5.52842 47.3876 6.46603 48.4074C7.40363 49.4271 8.67529 50 10.0013 50H39.9987C41.3247 50 42.5964 49.4271 43.534 48.4074C44.4716 47.3876 44.9983 46.0045 44.9983 44.5624V25.3748L47.1515 27.7202C47.4644 28.0606 47.8888 28.2518 48.3314 28.2518C48.7739 28.2518 49.1983 28.0606 49.5113 27.7202C49.8242 27.3799 50 26.9183 50 26.437C50 25.9556 49.8242 25.494 49.5113 25.1537L41.6653 16.6239V4.68646C41.6653 4.20574 41.4897 3.74472 41.1772 3.4048C40.8646 3.06488 40.4407 2.87392 39.9987 2.87392H36.6657C36.2237 2.87392 35.7998 3.06488 35.4873 3.4048C35.1747 3.74472 34.9992 4.20574 34.9992 4.68646V9.37369L27.3565 1.06138ZM41.6653 21.7497V44.5624C41.6653 45.0431 41.4897 45.5041 41.1772 45.844C40.8646 46.184 40.4407 46.3749 39.9987 46.3749H10.0013C9.55927 46.3749 9.13539 46.184 8.82285 45.844C8.51032 45.5041 8.33474 45.0431 8.33474 44.5624V21.7497L25 3.62431L41.6653 21.7497Z" fill="currentColor"/>
</svg></Link> 
       <Link to='/' className='text-black text-2xl'>Экскурсии</Link> 
       <div className='flex gap-4 '>
        <input className="focus:outline-none bg-white border shadow rounded-lg h-10 w-full outline-0 px-2 py-2.5" placeholder="Поиск по названию" value={data} onChange={(e)=>setData(e.target.value)}/>
        <button className='blueButton mr-6' onClick={handleSubmit}>Поиск</button>
        <PhotoSearch/>
        <TextSearch/>
        </div>
        {/* <ThemeToggle /> */} 
      </div>
  )
}

export default Nav
