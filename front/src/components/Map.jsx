import { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { YMaps, Map, Placemark, GeolocationControl, Clusterer, FullscreenControl, Polyline } from '@pbe/react-yandex-maps';
import { URL } from '../const';
import axios from 'axios';

function CustomMap({all, filter, city, obj, points}) {

  const [zoom, setZoom] = useState(8)
  const [center, setCenter] = useState([55.75, 37.57]); // Изначальный центр карты
useEffect(()=>{setLine()},[ city, obj, points, all])
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
  !points&&axios.get(URL+'api/object_coordinates', '')
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
const [line, setLine]= useState()

useEffect(()=>{
  if(points){
  const route=findOptimalRoute(points)
  console.log(route)
  route&&axios.get(`https://api.geoapify.com/v1/routing?waypoints=${route.map(pair => pair.join(',')).join('|')}&mode=walk&apiKey=b32c2cf7efe34eb0935c82d17d305172` , '')
  .then(response=>{
    setLine(response.data.features[0].geometry.coordinates)
    console.log(response.data.features[0].geometry.coordinates,points.map(pair => pair.join(',')).join('|'),points)
  } ) 
  .catch(function (error) {
  });
  }

},[points])

function distance(point1, point2) {
  const dx = point1[0] - point2[0];
  const dy = point1[1] - point2[1];
  return Math.sqrt(dx * dx + dy * dy);
}

// Функция нахождения ближайшей непосещенной точки к заданной
function findNearest(point, points, visited) {
  let minDistance = Infinity;
  let nearestPoint = null;
  for (let i = 0; i < points.length; i++) {
      if (!visited[i]) {
          const d = distance(point, points[i]);
          if (d < minDistance) {
              minDistance = d;
              nearestPoint = i;
          }
      }
  }
  return nearestPoint;
}

function findOptimalRoute(points) {
  const n = points.length;
  const visited = new Array(n).fill(false);
  const route = [points[0]]; // Начинаем с первой точки
  visited[0] = true;
  for (let i = 1; i < n; i++) {
      const lastPoint = route[route.length - 1];
      const nearestPointIndex = findNearest(lastPoint, points, visited);
      route.push(points[nearestPointIndex]);
      visited[nearestPointIndex] = true;
  }
  return route;
}

  return (
    
    <div className='min-w-[400px]  w-[400px] h-max bg-white text-gray-900 rounded-xl shadow-md p-[10px] flex flex-col gap-4'>
    <p className='text-2xl font-bold'>Карта</p>
    <YMaps query={{ apikey: 'a934cf94-8e4f-4733-a09a-71b68cd2795b' }}> 
      <Map 
        height= '380px' width='380px' state={{ center: center, zoom: zoom}} 
      >
        <FullscreenControl />
        <GeolocationControl options={{ float: "left" }} />
        {line&&line.map(li=><Polyline
            geometry={li.map(point => [point[1], point[0]])}/>
           )} 
        <Clusterer
          options={{
            preset: "islands#invertedVioletClusterIcons",
            groupByCoordinates: false,
          }}
        > 
          {(!city&&!points&&data.length>0)&&data.map(item=>
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
          {console.log(points)}
          {points&&points.map(item=>
            <Placemark
              modules={["geoObject.addon.balloon"]}
              geometry={item}
             
            />
            // console.log(item)
          )}
        </Clusterer>
      </Map>
    </YMaps>
  </div>
  )
}

export default CustomMap
