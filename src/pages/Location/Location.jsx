import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Location = () => {
  const position = [1.3521, 103.8198]

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ width: '400px', height: '400px' }}>
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
  )
}

export default Location

