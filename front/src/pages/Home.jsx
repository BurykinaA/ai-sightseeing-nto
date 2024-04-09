import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import '../App.css'
import Card from '../components/Card'
import { YMaps, Map, Placemark, Polygon, RouteButton, GeolocationControl, RoutePanel } from '@pbe/react-yandex-maps';
import MapWithRoute from '../components/MapWithRoute';
import CustomMap from '../components/Map';
// import AppRouted from './router/AppRouted'

function Home() {

  const [data, setData]=useState([])
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10', '')
    .then(response=>{
      setData(response.data)
      
    } ) 
    .catch(function (error) {
      console.log(error);
    });
  },[])

  return (
    <div className='flex gap-[16px]'>

<div className='photoGrid  overflow-auto '>
      {data.map(item=>
      <Card key={item.id} item={item}/>
        )}
        
      </div>
      <div className='relative w-[400px] min-w-[400px]'>
      <div className='fixed w-max'>
      <CustomMap/>
      </div>
      </div>
      
        
    </div>
      
  )
}

export default Home