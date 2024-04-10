import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, RoutePanel, Button } from '@pbe/react-yandex-maps';

const apiKey = 'YOUR_API_KEY';

const MapWithRoute = () => {
  const [mapState, setMapState] = useState({
    center: [55.751574, 37.573856],
    zoom: 9,
  });
  const [points, setPoints] = useState([]);

  const addPoint = (e) => {
    setPoints([...points, e.get('coords')]);
  };

  const clearPoints = () => {
    setPoints([]);
  };

  return (
    <YMaps query={{apikey: apiKey}}>
      <Map state={mapState} style={{ width: '100%', height: '400px' }} onClick={addPoint}>
        {points.map((point, index) => (
          <Placemark key={index} geometry={point} />
        ))}
       <RoutePanel
  options={{ float: 'right' }}
  mapState={mapState}
  routes={{
    add: true,
  }}
  onRouteChange={(event) => {
    const route = event.get('route');
    if (route) {
      const coordinates = route.getPaths().get(0).getCoordinates();
      setPoints(coordinates);
    }
  }}
/>

        <Button onClick={clearPoints}>Очистить маршрут</Button>
      </Map>
    </YMaps>
  );
};

export default MapWithRoute;
