import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import '../App.css'
import Card from '../components/Card'

import MapWithRoute from '../components/MapWithRoute';
import CustomMap from '../components/Map';
import { useParams } from 'react-router-dom';
import { URL } from '../const';
import Rate from '../components/Rate';
// import AppRouted from './router/AppRouted'

function Object() {
  const params = useParams();
  const [data, setData]=useState([])
  const [obj, setObj]=useState({})
  useEffect(()=>{
    axios.get(URL+'api/object/'+params.id, '')
    .then(response=>{
      setObj(response.data)
      
    } ) 
    .catch(function (error) {
      console.log(error);
    });

    axios.get(URL+'api/object/'+params.id+'/same', '')
    .then(response=>{
      setData(response.data)
      
    } ) 
    .catch(function (error) {
      console.log(error);
    });
  },[params.id])
  useEffect(()=>{console.log(obj, obj.photo    )},[obj])

  return (
    <div className='flex flex-col gap-[20px] text-left pb-4' >

      <div className='flex flex-col gap-[20px]'>

        <div className='flex gap-[20px] w-max'>
          
          
          
          <CustomMap obj={[obj]} city={obj.coordinates}/>
          <div className='flex flex-col w-full gap-4'>
          <p className='text-3xl font-bold'> {obj.name}</p>
          <p className='text-xl '>{obj.description}</p>
          <p className='text-xl '>{obj.type}</p>
    <Rate item={obj.rate}/>
        </div>
        </div>
       
        <div className='flex items-center overflow-auto  gap-4'>
              {(obj.photo&&obj.photo.length>0)&& obj.photo.map(item=>
                <img className='w-[400px] h-[400px] rounded-lg object-cover shadow-md' src={'data:image/jpg;base64,'+ item}/>
              )}
          </div>
      </div>
      <div>
        <p className='text-3xl font-bold'> Похожее</p>
        <div className='parent overflow-x-auto overflow-y-visible flex gap-4 items-center h-auto'>
          {data.map(item=>
            <Card key={item.id} item={item}/>
          )}
        </div>
      </div>
    </div>
    
      
  )
}

export default Object