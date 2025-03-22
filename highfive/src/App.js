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
  // [Previous store list unchanged]
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
    <div style={styles.container}>
      {!hideNavBar && (
        <div style={styles.navBar}>
          <div style={styles.logo}>
            <img src={logo} alt="Logo" style={styles.logoImage} />
          </div>
          <div style={styles.navLinks}>
            <Link to="/" style={styles.navLink}>HOME</Link>
            <Link to="/chat" style={styles.navLink}>CHAT</Link>
            <Link to="/challenges" style={styles.navLink}>CHALLENGES</Link>
          </div>
          <div style={styles.authButtons}>
            <Link to="/login" style={{...styles.authButton, color: '#6E7A7A'}}>Login</Link>
            <Link to="/register" style={{...styles.authButton, color: '#6E7A7A'}}>Register</Link>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={
          <>
            <div style={styles.tagline}>
              <p>Secondhand, First Choice — Look Good, Feel Good, Do Good.</p>
            </div>
            <div style={styles.videoSection}>
              <ReactPlayer
                url={video}
                playing={true}
                loop={true}
                muted={true}
                width="60%"
                height="auto"
                style={{
                  maxWidth: '600px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  margin: '0 auto',
                }}
              />
            </div>
            <div style={styles.materialsSection}>
              <h2 style={styles.sectionTitle}>
                Here are some of the most damaging materials in terms of water pollution and consumption:
              </h2>
              <div style={styles.materialsContainer}>
                <div style={styles.materialCard}>
                  <h3 style={styles.materialTitle}>Cotton:</h3>
                  <p style={styles.materialText}>
                    2,700 liters of water for one t-shirt, plus heavy pesticide use.
                  </p>
                </div>
                <div style={styles.materialCard}>
                  <h3 style={styles.materialTitle}>Polyester & Nylon:</h3>
                  <p style={styles.materialText}>
                    Shed microplastics into oceans during washing.
                  </p>
                </div>
                <div style={styles.materialCard}>
                  <h3 style={styles.materialTitle}>Viscose/Rayon:</h3>
                  <p style={styles.materialText}>
                    Requires toxic chemicals that pollute water.
                  </p>
                </div>
              </div>
            </div>
            <div style={styles.callToAction}>
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

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    color: '#333',
    padding: '0',
    margin: '0',
    minHeight: '100vh',
    backgroundColor: '#fff',
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#CFE1E5',
    padding: '10px 20px',
    borderBottom: '2px solid #ccc',
  },
  logo: {
    flex: '1',
  },
  logoImage: {
    width: '100px',
    height: '80px',
  },
  navLinks: {
    flex: '2',
    display: 'flex',
    justifyContent: 'center',
    gap: '70px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#649D9D',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  authButtons: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  authButton: {
    textDecoration: 'none',
    color: '#333', // This is overridden in the Link components above
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '5px 10px',
    border: '1px solid #333',
    borderRadius: '4px',
    backgroundColor: '#e6f0fa',
  },
  tagline: {
    fontSize: '16px',
    margin: '31px 0',
    color: '#6E7A7A',
  },
  videoSection: {
    margin: '40px 0',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'normal',
    marginBottom: '30px',
    color: '#6E7A7A',
  },
  materialsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  materialCard: {
    backgroundColor: '#649D9D',
    padding: '20px',
    width: '200px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  materialTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#CFE1E5',
  },
  materialText: {
    fontSize: '14px',
    color: '#CFE1E5',
  },
  callToAction: {
    fontSize: '16px',
    margin: '40px 0',
    color: '#6E7A7A',
  },
};

export default App;