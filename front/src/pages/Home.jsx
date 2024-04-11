import { useContext, useEffect, useRef, useState } from 'react'
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
import { URL } from '../const';
import { ObjContext } from '../context';

import { BarChart } from '@mui/x-charts/BarChart';

// import AppRouted from './router/AppRouted'

function Home() {
  const {obj, setObj}= useContext(ObjContext)
 
  const [filter, setFilter]= useState({
    owner: [], // Категория правообладателя
    type: [], //Тип собственности
    status: [], // Статус
    
  })
  const [fetching, setFetching] = useState(false)
  
  const [page, setPage] = useState(1);
  
  

  useEffect(() => {
    fetching&&axios.get(URL+`api/object?_limit=10&page=${page}`
    +`${filter.owner.length==0?'':'&city='+filter.owner.map((item)=>item.id)}${filter.status.length==0?'':'&rate='+filter.status.map((item)=>item.id)}${filter.type.length==0?'':'&category='+filter.type.map((item)=>item.id)}`
    , '')
    .then(response=>{
      setPage(prevPage => prevPage + 1);
      setObj(prevData => [...prevData, ...response.data]);
      console.log(filter)
      setFetching(false);
    } ) 
    .catch(function (error) {
      console.log(error);
      setFetching(false);
    });
  }, [fetching]);

  const handleScroll = () => {
    if (!fetching && (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 600) {
      setFetching(true);
    }
  };
  const getData=()=>{
    setPage(1)
    setObj([])
    axios.get(URL+`api/object?_limit=10&page=1`
    +`${filter.owner.length==0?'':'&city='+filter.owner.map((item)=>item.id)}${filter.status.length==0?'':'&rate='+filter.status.map((item)=>item.id)}${filter.type.length==0?'':'&category='+filter.type.map((item)=>item.id)}`
    , '')
    .then(response=>{
      setPage(prevPage => prevPage + 1);
      setObj(response.data);
      console.log(filter)
      setFetching(false);
    } ) 
    .catch(function (error) {
      console.log(error);
      setFetching(false);
    });
  }
  useEffect(()=>{
    getData()
  },[])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          {obj.map(item=>
            <Card key={item.id} item={item}/>
          )}
        </div>
        
      </div>

      <div className='relative w-[400px] min-w-[400px] text-left  '>
        <div className='fixed w-max flex flex-col gap-4 pr-2'>
          <CustomMap all={true} filter={filter}/>
          <Filter filter={filter} setFilter={setFilter} handleFilterChangeNew={handleFilterChangeNew} getData={getData}/>
        

              {console.log(obj.map(item => item.label)?obj.map(item => item.label): obj.map(item => item.name))}
         {obj[0]&&obj[0].score&& <BarChart
            xAxis={[{ scaleType: 'band', data: obj.map(item => item.label)?obj.map(item => item.label): obj.map(item => item.name) }]}
            series={[{ data: obj.map(item => item.score)}]}
            width={400}
            height={300}
          />
}
        </div>
       
      </div>
      
        
    </div>
      
  )
}

export default Home