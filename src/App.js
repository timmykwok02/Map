import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Icon} from 'leaflet';
import getDistance from 'geolib/es/getDistance';

// Setting KPU coordinates
const defLat = 49.133129;
const defLong = -122.871460;

function App() {
  const [userLat, setUserLat] = React.useState('');
  const [userLong, setUserLong] = React.useState('');
  
  // Getting user coordinates with geolib
  React.useEffect(() =>
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude)
    })  
  )

  // Calculating the distance between user and KPU using coordinates
  const distance = getDistance(
    { latitude: userLat, longitude: userLong },
    { latitude: defLat, longitude: defLong }
  );

  // Configuring custom icons for map markers
  const userIcon = new Icon ({
    iconUrl: require("./img/userIcon.png"),
    // iconUrl: "https://www.pngall.com/wp-content/uploads/14/Stick-Figure-PNG-Clipart.png",
    iconSize: [40, 40] 
    })
  const kpuIcon = new Icon({
    iconUrl: require("./img/kpuIcon.png"),
    // iconUrl: require("./img/KPUicon.png"),
    iconSize: [30, 27.5] 
    })

  // Creating array of 2 map markers: coordinates with geocode, on-click message with popUp, and custom icon with icon
  const markers = [
    {
      geocode: [defLat, defLong],
      popUp: "KPU Surrey Library is " + distance/1000 + "km away from you",
      icon: kpuIcon
    },
    {
      geocode: [userLat, userLong],
      popUp: "Your location is " + distance/1000 + "km away from KPU",
      icon: userIcon
    }
  ];

  return (
    // Default placement of map is at the coordinates of KPU Library
    // Getting map image from openstreetmap
    <MapContainer center={[defLat, defLong]} zoom={10}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Iterating through marker array to display them in their correct position, icon and popup */}
      {markers.map(marker => (
        <Marker position={marker.geocode} icon={marker.icon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
