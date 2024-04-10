import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import '../App.css'
import Card from '../components/Card'

import MapWithRoute from '../components/MapWithRoute';
import CustomMap from '../components/Map';
import { useParams } from 'react-router-dom';
import { URL } from '../const';
// import AppRouted from './router/AppRouted'

function Object() {
  const params = useParams();
  const [data, setData]=useState([])
  const [obj, setObj]=useState({})
  useEffect(()=>{
    axios.get(URL+'/api/object/'+params.id, '')
    .then(response=>{
      setObj(response.data)
      
    } ) 
    .catch(function (error) {
      console.log(error);
    });

    axios.get('https://jsonplaceholder.typicode.com/photos?_limit=5', '')
    .then(response=>{
      setData(response.data)
      
    } ) 
    .catch(function (error) {
      console.log(error);
    });
  },[params.id])

  return (
    <div className='flex flex-col gap-[20px] text-left pb-4' >

      <div className='flex gap-[20px]'>

        <div className='flex flex-col gap-[20px] w-max'>
          <img className='w-[400px] h-[400px] rounded-lg object-cover shadow-md' src={obj.url}/>
          <CustomMap data={[obj]} city={obj.coordinates}/>
        </div>
        <div className='flex flex-col w-full '>
          <p className='text-3xl font-bold'> {obj.id}</p>
          <p className='text-xl '>{obj.title}</p>

        </div>
      </div>
      <div>
        <p className='text-3xl font-bold mb-4'> Похожее</p>
        <div className='overflow-auto flex gap-4 h-[600px] items-center'>
          {data.map(item=>
            <Card key={item.id} item={item}/>
          )}
        </div>
      </div>
    </div>
    
      
  )
}

export default Object