import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import '../App.css'
import Card from '../components/Card'
import { YMaps, Map, Placemark, Polygon, RouteButton, GeolocationControl, RoutePanel } from '@pbe/react-yandex-maps';
import MapWithRoute from '../components/MapWithRoute';
import CustomMap from '../components/Map';
import PhotoSearch from '../components/PhotoSearch';
import TextSearch from '../components/TextSearch';
import SelectDD from '../components/SelectDD';
import Filter from '../components/Filter';

// import AppRouted from './router/AppRouted'

function Home() {
 
  const [filter, setFilter]= useState({
    owner: [], // Категория правообладателя
    type: [], //Тип собственности
    status: [], // Статус
    
  })
  const [data, setData]=useState([])
  
  const getData=()=>{
    axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10'
    +`${filter.owner.length==0?'':'&owner='+filter.owner.map((item)=>item.id)}${filter.status.length==0?'':'&status='+filter.status.map((item)=>item.id)}${filter.type.length==0?'':'&is_private='+filter.type.map((item)=>item.id)}`
    , '')
    .then(response=>{
      setData(response.data)
      console.log(filter)
    } ) 
    .catch(function (error) {
      console.log(error);
    });
  }
  useEffect(()=>{
    getData()
  },[])
  const handleFilterChangeNew = (data, type) => {
    var dataa ={[type]: data}
    
    setFilter(prevState => ({
      ...prevState,
      ...dataa
    }));
  };
  return (
    <div className='flex gap-4'>
     
      <div>
       
      
        <div className='photoGrid  overflow-auto '>
          {data.map(item=>
            <Card key={item.id} item={item}/>
          )}
        </div>
        
      </div>

      <div className='relative w-[400px] min-w-[400px] text-left '>
        <div className='fixed w-max flex flex-col gap-4'>
          <CustomMap/>
          <Filter filter={filter} setFilter={setFilter} handleFilterChangeNew={handleFilterChangeNew} getData={getData}/>
        




        </div>
      </div>
      
        
    </div>
      
  )
}

export default Home