import { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { YMaps, Map, Placemark, GeolocationControl, Clusterer, FullscreenControl } from '@pbe/react-yandex-maps';
import { URL } from '../const';
import axios from 'axios';

function CustomMap({all, filter, city, obj}) {

  const [zoom, setZoom] = useState(8)
  const [center, setCenter] = useState([55.75, 37.57]); // Изначальный центр карты

  const handleCityChange = (cities) => {
    if (cities.length == 0) {
        setCenter([56.326887, 44.005986]); // По умолчанию Москва
        return;
    }
    
      setZoom(9-cities.length)
    
    
    // Вычисляем средние координаты для всех городов
    const avgLatitude = cities.reduce((sum, city) => sum + city[0], 0) / cities.length;
    const avgLongitude = cities.reduce((sum, city) => sum + city[1], 0) / cities.length;

    setCenter([avgLatitude, avgLongitude]);
};
const [data, setData]= useState([])
useEffect(()=>{
  axios.get(URL+'api/object_coordinates', '')
  .then(response=>{
    setData(response.data)
    
  } ) 
  .catch(function (error) {
    console.log(error);
  });

  
},[all])


useEffect(() => {
  // console.log(filter.owner.map(city => city.coordinates), filter.owner)
  filter&&filter.owner && handleCityChange(filter.owner.map(city => city.coordinates));
}, [filter]);

useEffect(() => {
  city&&(setCenter(city),setZoom(15))
}, [city]);


  return (
    
    <div className='min-w-[400px]  w-[400px] h-max bg-white text-gray-900 rounded-xl shadow-md p-[10px] flex flex-col gap-4'>
    <p className='text-2xl font-bold'>Карта</p>
    <YMaps query={{ apikey: 'a934cf94-8e4f-4733-a09a-71b68cd2795b' }}> 
      <Map 
        height= '380px' width='380px' state={{ center: center, zoom: zoom}} 
      >
        <FullscreenControl />
        <GeolocationControl options={{ float: "left" }} />
        <Clusterer
          options={{
            preset: "islands#invertedVioletClusterIcons",
            groupByCoordinates: false,
          }}
        > 
          {(!city&&data.length>0)&&data.map(item=>
            <Placemark
              modules={["geoObject.addon.balloon"]}
              geometry={item.coordinates}
              properties={{
                balloonContentBody: `<a target='_blank' href='/object/${item.id}'>${item.name}</a>`
              }}
            />
          )}
          {(city)&&obj.map(item=>
            <Placemark
              modules={["geoObject.addon.balloon"]}
              geometry={item.coordinates}
              properties={{
                balloonContentBody: `<a target='_blank' href='/object/${item.id}'>${item.name}</a>`
              }}
            />
          )}
        </Clusterer>
      </Map>
    </YMaps>
  </div>
  )
}

export default CustomMap
