import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Map = () => {
  const position = [1.3521, 103.8198];

  const southWest = L.latLng(1.16, 103.59);
  const northEast = L.latLng(1.48, 104.05);
  const bounds = L.latLngBounds(southWest, northEast);

  return (
    <MapContainer center={position} zoom={14} scrollWheelZoom={true} style={{ width: '100%', height: '600px' }} bounds={bounds} minZoom={12} maxZoom={18}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
