import { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { YMaps, Map, Placemark, Polygon, RouteButton, GeolocationControl, RoutePanel } from '@pbe/react-yandex-maps';

function CustomMap() {
  const [count, setCount] = useState(0)

  return (
    
    <div className='min-w-[400px]  w-[400px] h-max bg-white text-gray-900 rounded-xl shadow-md p-[10px] flex flex-col gap-4'>
    <p className='text-2xl font-bold'>Карта</p>
    <YMaps query={{ apikey: 'a934cf94-8e4f-4733-a09a-71b68cd2795b' }}> 
      <Map 
        height= '380px' width='380px' defaultState={{ center: [55.75, 37.57], zoom: 9}} 
      >
        <RouteButton options={{ float: "right" }} />
    
        <GeolocationControl options={{ float: "left" }} />
        <Placemark
          modules={["geoObject.addon.balloon"]}
          geometry={[56.313118, 43.992873]}
          properties={{
            balloonContentBody: "<a target='_blank' href='/1'>Перейти к объекту 1</a>"
          }}
        />
     
      </Map>
    </YMaps>
  </div>
  )
}

export default CustomMap
