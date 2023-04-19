import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const blackIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
});

const Map = () => {
  const position = [1.3521, 103.8198];
  const [locations, setLocations] = useState([]);
  const southWest = L.latLng(1.16, 103.59);
  const northEast = L.latLng(1.48, 104.05);
  const bounds = L.latLngBounds(southWest, northEast);

    useEffect(() => {
      fetch("/api/location")
        .then((response) => response.json())
        .then((data) => setLocations(data));
    }, []);

  return (
    <MapContainer
      center={position}
      zoom={14}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "600px" }}
      bounds={bounds}
      minZoom={12}
      maxZoom={18}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => (
        <Marker
          key={location._id}
          position={[location.latitude, location.longitude]}
          icon={blackIcon}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
