import { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { YMaps, Map, Placemark, Polygon, RouteButton, GeolocationControl, RoutePanel, Clusterer, ListBox, ListBoxItem } from '@pbe/react-yandex-maps';
import SelectDD from './SelectDD';

function CustomMap({data, filter, city}) {

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



useEffect(() => {
  // console.log(filter.owner.map(city => city.coordinates), filter.owner)
  filter&&filter.owner && handleCityChange(filter.owner.map(city => city.coordinates));
}, [filter]);

useEffect(() => {
  city&&setCenter(city)
}, [city]);


  return (
    
    <div className='min-w-[400px]  w-[400px] h-max bg-white text-gray-900 rounded-xl shadow-md p-[10px] flex flex-col gap-4'>
    <p className='text-2xl font-bold'>Карта</p>

      {/* <SelectDD opened={false}  filter={filter.owner}  handleFilterChangeNew={handleFilterChangeNew} name='Город' type='owner' value={stats&&stats.values} /> */}
    <YMaps query={{ apikey: 'a934cf94-8e4f-4733-a09a-71b68cd2795b' }}> 
      <Map 
        height= '380px' width='380px' state={{ center: center, zoom: zoom}} 
      >
        <RouteButton options={{ float: "right" }} />
        <GeolocationControl options={{ float: "left" }} />
        <Clusterer
          options={{
            preset: "islands#invertedVioletClusterIcons",
            groupByCoordinates: false,
          }}
        > 
          {data.length>0&&data.map(item=>
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
