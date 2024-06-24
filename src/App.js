import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Icon} from 'leaflet';

function App() {
  // Setting marker on KPU Library on map
  const markers = [{
    geocode: [49.133129, -122.871460],
    popUp: "KPU Surrey Library"
    }];

  // Configuring custom icons
  const customIcon = new Icon({
    iconUrl: "https://1000logos.net/wp-content/uploads/2021/02/KPU-logo.png",
    // iconUrl: require("./img/KPUicon.png"),
    iconSize: [64, 40] 
    })

  return (
    // Coordinates of KPU Library as the centre of the map
    // Getting map image from openstreetmap
    <MapContainer center={[49.133129, -122.871460]} zoom={18}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(marker => (
        <Marker position={marker.geocode} icon={customIcon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
