import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";

const playIcon = new L.Icon({
  iconUrl: "https://i.ibb.co/Nx7sCZP/playground.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const swimIcon = new L.Icon({
  iconUrl: "https://i.ibb.co/J2HtwCV/swimming.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const homeIcon = new L.Icon({
  iconUrl: "https://i.ibb.co/k3h6vj5/houseicon2.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map = () => {
  const position = [1.2907, 103.8517];
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
        mapRef.current.setView(position, 8);
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
    mapRef.current.flyTo([searchMarker.lat, searchMarker.lon], 14);
  };

  return (
    <div>
      <div
        className="hero min-h-20-screen"
        style={{
          backgroundImage: `url("https://msq.cxcms.ascentis.com.sg/mallsdeals/media/Stores/PPS%20Thumnail.jpg")`,
        }}
      >
        <div className="hero-overlay bg-base-200 bg-opacity-50"></div>
        <div className="hero-content text-center text-gray-700">
          <div className="max-w-md">
            <br />
            <br />
            <br />
            <h1 className="mb-6 text-5xl font-bold">
              Plan Your Next Adventure!
            </h1>
            <div className="mb-8 text-1xl">
              <form onSubmit={handleSearchSubmit}>
                <label>
                  <input
                    className="input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    placeholder="Enter Postal Code"
                    value={searchPostalCode}
                    onChange={(e) => setSearchPostalCode(e.target.value)}
                    minLength={6}
                    maxLength={6}
                    pattern="\d{6}"
                  />
                </label>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!searchPostalCode}
                >
                  Search
                </button>
              </form>
              {invalidPostalCode && (
                <div style={{ color: "black" }}>
                  Invalid postal code. Please try again.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
            icon={location.locationType === "Playground" ? playIcon : swimIcon}
            eventHandlers={{
              click: () => handleMarkerClick(location),
            }}
          >
            <Popup>
              <img
                src={location.image}
                alt="Location Image"
                style={{ width: "300px", height: "220px" }}
              />
              <br />
              <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>
                {location.locationName}
              </h1>
              <br />
              {location.address}, Singapore ({location.postalCode})<br />
              <br />
              <Link to={`/location/${location._id}`}>
                <button>View More</button>
              </Link>
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
