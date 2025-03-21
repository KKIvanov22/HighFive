import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Login from "./Login"

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
  { id: 6, name: "Second Hand Love Sofia", position: [42.6957, 23.3342] },
  { id: 7, name: "Thrift Bazaar Plovdiv", position: [42.1423, 24.7489] },
  { id: 8, name: "Vintage Hub Varna", position: [43.2155, 27.9125] },
  { id: 9, name: "Eco Shop Burgas", position: [42.5021, 27.4586] },
  { id: 10, name: "Old Fashion Ruse", position: [43.8375, 25.9630] },
  { id: 11, name: "Sustainable Style Stara Zagora", position: [42.4255, 25.6350] },
  { id: 12, name: "Thrift Fashion Gabrovo", position: [42.8693, 25.3372] },
  { id: 13, name: "Retro Trends Blagoevgrad", position: [42.0200, 23.1073] },
  { id: 14, name: "Vintage World Veliko Tarnovo", position: [43.0732, 25.6174] },
  { id: 15, name: "Green Closet Pleven", position: [43.4173, 24.6163] },
  { id: 16, name: "The Second Hand Shop Varna", position: [43.2100, 27.9140] },
  { id: 17, name: "Vintage Avenue Sofia", position: [42.6944, 23.3295] },
  { id: 18, name: "Thrift Shop Plovdiv", position: [42.1406, 24.7517] },
  { id: 19, name: "Retro Store Blagoevgrad", position: [42.0150, 23.1030] },
  { id: 20, name: "Second Chance Burgas", position: [42.5027, 27.4628] },
  { id: 21, name: "Eco Thrift Sofia", position: [42.6982, 23.3255] },
  { id: 22, name: "Sustainable Trends Plovdiv", position: [42.1329, 24.7415] },
  { id: 23, name: "Thrift Haven Varna", position: [43.2167, 27.9133] },
  { id: 24, name: "Oldies but Goodies Ruse", position: [43.8340, 25.9655] },
  { id: 25, name: "Vintage Love Veliko Tarnovo", position: [43.0720, 25.6160] },
  // 15 additional stores in smaller towns
  { id: 26, name: "Second Hand Burgas", position: [42.5020, 27.4620] },
  { id: 27, name: "Thrift Store Dupnitsa", position: [42.2661, 23.1063] },
  { id: 28, name: "Retro Clothes Lovech", position: [43.1329, 24.7263] },
  { id: 29, name: "Sustainable Finds Targovishte", position: [43.2612, 26.6106] },
  { id: 30, name: "Thrift Fashion Pleven", position: [43.4066, 24.6175] },
  { id: 31, name: "Vintage Collection Sliven", position: [42.6803, 26.3412] },
  { id: 32, name: "Eco Clothes Smolyan", position: [41.5681, 24.7163] },
  { id: 33, name: "Second Hand Sandanski", position: [41.5670, 23.2841] },
  { id: 34, name: "Thrift Store Vidin", position: [43.9893, 22.8769] },
  { id: 35, name: "Retro Finds Haskovo", position: [41.9373, 25.5564] },
  { id: 36, name: "Vintage Street Gabrovo", position: [42.8680, 25.3365] },
  { id: 37, name: "Eco Fashion Asenovgrad", position: [42.0054, 24.8783] },
  { id: 38, name: "Second Chance Plovdiv", position: [42.1419, 24.7490] },
  { id: 39, name: "Old World Pernik", position: [42.5953, 23.0350] },
  { id: 40, name: "Vintage Dreams Yambol", position: [42.4869, 26.5015] },
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
