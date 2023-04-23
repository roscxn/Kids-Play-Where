import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const playIcon = new L.Icon({
  iconUrl:
    "https://i.ibb.co/0YzqCQ4/children-playing-png-icon-transparent-png-modified.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const homeIcon = new L.Icon({
  iconUrl: "https://i.ibb.co/NCmDSGH/houseicon-modified.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map = () => {
  const position = [1.3521, 103.8198];
  const [locations, setLocations] = useState([]);
  const southWest = L.latLng(1.16, 103.59);
  const northEast = L.latLng(1.48, 104.05);
  const bounds = L.latLngBounds(southWest, northEast);

  const [searchPostalCode, setSearchPostalCode] = useState("");
  const [searchMarker, setSearchMarker] = useState(null);
  const [invalidPostalCode, setInvalidPostalCode] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("/api/location")
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchMarker(null);
    setInvalidPostalCode(false);

    // Use a geocoding API to get the latitude and longitude for the entered postal code.
    const geocodingApiUrl = `https://nominatim.openstreetmap.org/search?q=${searchPostalCode}&format=json`;
    fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0 || !data[0].display_name.includes("Singapore")) {
          // Set an error message if the postal code is invalid
          setSearchMarker({ error: true });
          setInvalidPostalCode(true);
          return;
        }

        const [result] = data;
        const { lat, lon } = result;
        // Set the search marker on the map.
        setSearchMarker({ lat, lon });
        // Reset the map view to the initial position and zoom level
        mapRef.current.setView(position, 10);
      })
      .catch((error) => {
        console.log(error);
        // setInvalidPostalCode(true);
        setSearchMarker({ error: true });
      });
  };

  // Playground marker zoom in
  const handleMarkerClick = (location) => {
    const { latitude, longitude } = location;
    mapRef.current.flyTo([latitude, longitude], 18);
  };

  // Searched postal code marker zoom in
  const handleSearchMarkerClick = () => {
    mapRef.current.flyTo([searchMarker.lat, searchMarker.lon], 16);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Enter postal code:
          <input
            type="text"
            value={searchPostalCode}
            onChange={(e) => setSearchPostalCode(e.target.value)}
            minLength={6}
            maxLength={6}
            pattern="\d{6}"
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {invalidPostalCode && (
        <div style={{ color: "red" }}>
          Invalid postal code. Please enter a Singapore postal code.
        </div>
      )}

      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "600px" }}
        bounds={bounds}
        minZoom={12}
        maxZoom={18}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location._id}
            position={[location.latitude, location.longitude]}
            icon={playIcon}
            eventHandlers={{
              click: () => handleMarkerClick(location),
            }}
          >
            <Popup>
              {location.locationName}
              <br />
              {location.address}, Singapore({location.postalCode})<br />
              <br />
            </Popup>
          </Marker>
        ))}
        {searchMarker && searchMarker.lat && searchMarker.lon && (
          <Marker
            position={[searchMarker.lat, searchMarker.lon]}
            icon={homeIcon}
            eventHandlers={{
              click: handleSearchMarkerClick,
            }}
          >
            {searchMarker.error ? (
              <Popup>
                Invalid postal code. Please enter a Singapore postal code.
              </Popup>
            ) : (
              <Popup>Searched Postal Code: {searchPostalCode}</Popup>
            )}
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
