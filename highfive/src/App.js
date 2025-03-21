import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const secondHandStores = [
  { id: 1, name: "Second Hand Sofia", position: [42.6977, 23.3242] },
  { id: 2, name: "Thrift Store Plovdiv", position: [42.1354, 24.7453] },
  { id: 3, name: "Vintage Varna", position: [43.2141, 27.9147] },
  { id: 4, name: "Eco Clothes Burgas", position: [42.5048, 27.4626] },
  { id: 5, name: "Retro Fashion Ruse", position: [43.8356, 25.9657] },
];

const BulgariaMap = () => {
  return (
    <div className="map-container">
      <MapContainer center={[42.7339, 25.4858]} zoom={7} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {secondHandStores.map((store) => (
          <Marker key={store.id} position={store.position} icon={markerIcon}>
            <Popup>{store.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BulgariaMap;