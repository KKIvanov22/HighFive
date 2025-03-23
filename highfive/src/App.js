
import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from 'react-player';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import video from "./3.mp4";
import "./App.css";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Challenges from './Challenges';
import Chat from './chat';
import Login from './Login';
import Register from './Register';
import logo from './figma/logo.png';

const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -40],
});

const tileLayerUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";

const secondHandStores = [
  { id: 1, name: "Second Hand Sofia", city: "Sofia", position: [42.6977, 23.3242] },
  { id: 2, name: "Thrift Store Plovdiv", city: "Plovdiv", position: [42.1354, 24.7453] },
  { id: 3, name: "Vintage Varna", city: "Varna", position: [43.2141, 27.9147] },
  { id: 4, name: "Eco Clothes Burgas", city: "Burgas", position: [42.5048, 27.4626] },
  { id: 5, name: "Retro Fashion Ruse", city: "Ruse", position: [43.8356, 25.9657] },
  { id: 6, name: "Thrift Haven Stara Zagora", city: "Stara Zagora", position: [42.4255, 25.6350] },
  { id: 7, name: "Vintage Love Blagoevgrad", city: "Blagoevgrad", position: [42.0200, 23.1073] },
  { id: 8, name: "Eco Thrift Pleven", city: "Pleven", position: [43.4173, 24.6163] },
  { id: 9, name: "Second Chance Vidin", city: "Vidin", position: [43.9893, 22.8769] },
  { id: 10, name: "Thrift Treasure Gabrovo", city: "Gabrovo", position: [42.8693, 25.3372] },
  { id: 11, name: "Retro Finds Veliko Tarnovo", city: "Veliko Tarnovo", position: [43.0732, 25.6174] },
  { id: 12, name: "Vintage Finds Lovech", city: "Lovech", position: [43.1329, 24.7263] },
  { id: 13, name: "Sustainable Wardrobe Targovishte", city: "Targovishte", position: [43.2612, 26.6106] },
  { id: 14, name: "Thrift Style Haskovo", city: "Haskovo", position: [41.9373, 25.5564] },
  { id: 15, name: "Vintage Boulevard Yambol", city: "Yambol", position: [42.4869, 26.5015] },
  { id: 16, name: "Eco Trends Montana", city: "Montana", position: [43.4073, 23.2257] },
  { id: 17, name: "Retro Clothing Kyustendil", city: "Kyustendil", position: [42.2862, 22.6910] },
  { id: 18, name: "Thrift Charm Silistra", city: "Silistra", position: [44.1174, 27.2606] },
  { id: 19, name: "Vintage Wave Pernik", city: "Pernik", position: [42.5953, 23.0350] },
  { id: 20, name: "Second Hand Dreams Razgrad", city: "Razgrad", position: [43.5333, 26.5167] },
  { id: 21, name: "Classic Finds Sliven", city: "Sliven", position: [42.6819, 26.1814] },
  { id: 22, name: "Vintage Paradise Dobrich", city: "Dobrich", position: [43.5667, 27.8333] },
  { id: 23, name: "Thrift Style Pazardzhik", city: "Pazardzhik", position: [42.2044, 24.3431] },
  { id: 24, name: "Eco Chic Sofia", city: "Sofia", position: [42.7028, 23.3238] },
  { id: 25, name: "Retro Vibes Blagoevgrad", city: "Blagoevgrad", position: [42.0145, 23.1033] },
  { id: 26, name: "Thrift Stop Veliko Tarnovo", city: "Veliko Tarnovo", position: [43.0866, 25.6120] },
  { id: 27, name: "Vintage Trends Razgrad", city: "Razgrad", position: [43.5333, 26.5167] },
  { id: 28, name: "Sustainable Fashion Haskovo", city: "Haskovo", position: [41.9322, 25.5529] },
  { id: 29, name: "Eco Finds Pleven", city: "Pleven", position: [43.4187, 24.6173] },
  { id: 30, name: "Retro Styles Ruse", city: "Ruse", position: [43.8404, 25.9658] },
  { id: 31, name: "Second Hand Discovery Sofia", city: "Sofia", position: [42.6907, 23.3183] },
  { id: 32, name: "Vintage Vault Varna", city: "Varna", position: [43.2121, 27.9142] },
  { id: 33, name: "Classic Clothing Burgas", city: "Burgas", position: [42.5027, 27.4662] },
  { id: 34, name: "Eco Couture Stara Zagora", city: "Stara Zagora", position: [42.4280, 25.6357] },
  { id: 35, name: "Thrift Revolution Blagoevgrad", city: "Blagoevgrad", position: [42.0234, 23.1030] },
];

const generateStreetViewUrl = (lat, lng) => {
  return `https://www.google.com/maps/embed/v1/streetview?key=YOUR_GOOGLE_MAPS_API_KEY&location=${lat},${lng}&heading=210&pitch=10&fov=35`;
};

const BulgariaMap = () => {
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const mapRef = useRef(null);

  const filteredStores = secondHandStores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterCity === "" || store.city === filterCity)
  );

  useEffect(() => {
    if (mapRef.current && filteredStores.length > 0) {
      const bounds = L.latLngBounds(filteredStores.map((store) => store.position));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [filteredStores]);

  return (
    <div className="map-container">
      <div className="controls">
        <input
          type="text"
          placeholder="Search store..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <select onChange={(e) => setFilterCity(e.target.value)} className="city-select">
          <option value="">All Cities</option>
          {[...new Set(secondHandStores.map((store) => store.city))].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <MapContainer
        center={[42.7339, 25.4858]}
        zoom={7}
        style={{ height: "400px", width: "100%", border: "1px solid #ccc", borderRadius: "8px" }}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer url={tileLayerUrl} />
        {filteredStores.map((store) => (
          <Marker key={store.id} position={store.position} icon={markerIcon}>
            <Popup>
              <div className="popup-content">
                <h3>{store.name}</h3>
                <p>{store.city}</p>
                <iframe
                  width="300"
                  height="200"
                  src={generateStreetViewUrl(store.position[0], store.position[1])}
                  frameBorder="0"
                  style={{ border: "none", borderRadius: "8px" }}
                  allowFullScreen
                  title={store.name}
                ></iframe>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const App = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      {!hideNavBar && (
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">HOME</Link>
            <Link to="/chat" className="nav-link">CHAT</Link>
            <Link to="/challenges" className="nav-link">CHALLENGES</Link>
          </div>
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/register" className="auth-button">Register</Link>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={
          <>
            <div className="tagline">
              <p>Secondhand, First Choice — Look Good, Feel Good, Do Good.</p>
            </div>
            <div className="video-section">
              <ReactPlayer
                url={video}
                playing={true}
                loop={true}
                muted={true}
                width="60%"
                height="auto"
                className="react-player"
              />
            </div>
            <div className="materials-section">
              <h2 className="section-title">
                Here are some of the most damaging materials in terms of water pollution and consumption:
              </h2>
              <div className="materials-container">
                <div className="material-card">
                  <h3 className="material-title">Cotton:</h3>
                  <p className="material-text">
                    2,700 liters of water for one t-shirt, plus heavy pesticide use.
                  </p>
                </div>
                <div className="material-card">
                  <h3 className="material-title">Polyester & Nylon:</h3>
                  <p className="material-text">
                    Shed microplastics into oceans during washing.
                  </p>
                </div>
                <div className="material-card">
                  <h3 className="material-title">Viscose/Rayon:</h3>
                  <p className="material-text">
                    Requires toxic chemicals that pollute water.
                  </p>
                </div>
              </div>
            </div>
            <div className="call-to-action">
              By shopping secondhand, you reduce water waste and environmental harm. Start making a difference! Find the nearest secondhand shop below:
            </div>
            <BulgariaMap />
          </>
        } />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;