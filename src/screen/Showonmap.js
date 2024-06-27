import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import markerIconUrl from '../assets/locationpointer.png';

const markerIcon = L.icon({
  iconUrl: markerIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [nearbyMarkers, setNearbyMarkers] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 9.0101, lng: 38.7617 }); // Default center coordinates
  const [error, setError] = useState('');

  const markers = [
    { id: 1, lat: 9.0101, lng: 38.7617, name: 'Droga Physiotherapy Bole Branch' },
    { id: 2, lat: 9.0457, lng: 38.7636, name: 'Droga Physiotherapy Branch 4killo' },
  ];

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchCoordinates = async () => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery + ' Ethiopia'}`);
      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        setSearchResult({ lat: parseFloat(lat), lng: parseFloat(lon), name: display_name });
        setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
        findNearbyMarkers({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setError('');
      } else {
        setError('Location not found');
      }
    } catch (error) {
      setError('Error fetching location');
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const findNearbyMarkers = (location) => {
    let maxDistance = Infinity; // Start with maximum possible distance

    const nearby = markers.filter(marker => {
      let dis = calculateDistance(location.lat, location.lng, marker.lat, marker.lng);
      return dis <= maxDistance;
    }).map(marker => ({
      ...marker,
      distance: calculateDistance(location.lat, location.lng, marker.lat, marker.lng).toFixed(2) + ' km'
    })).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)); // Sort by distance

    setNearbyMarkers(nearby);
  };

  const handleSearch = () => {
    fetchCoordinates();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <div style={{ display: 'flex', width: '70%' }}>
        <MapContainer center={{ lat: coordinates.lat, lng: coordinates.lng }} zoom={13} scrollWheelZoom={false} style={{ height: "70vh", width: "80%", borderRadius: '15px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((loc) => (
            <Marker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} icon={markerIcon}>
              <Popup>
                {loc.name}
              </Popup>
            </Marker>
          ))}
          {searchResult && (
            <Marker position={{ lat: searchResult.lat, lng: searchResult.lng }} icon={markerIcon}>
              <Popup>
                {searchResult.name}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', }}>
        <div style={{ marginBottom: '20px', display: 'flex', }}>
          <Input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search location"
            style={{ marginRight: '10px', padding: '5px' }}
            className="search_input"
            prefix={<SearchOutlined className="search_icon" />}
          />
          <Button onClick={handleSearch} style={{ padding: '5px 10px', borderRadius: '15px' }} className="primary-button">
            Search
          </Button>
        </div>
        <div style={{ marginTop: '20px', width: '60%' }}>
          {searchResult && (
            <div style={{ marginBottom: '10px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Search Result:</h3>
              <p>{searchResult.name}</p>
            </div>
          )}
          <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Nearby Branches:</h3>
          {nearbyMarkers.length > 0 ? (
            nearbyMarkers.map((marker) => (
              <div key={marker.id} style={{ marginBottom: '10px' }}>
                <p>{marker.name} - {marker.distance}</p>
              </div>
            ))
          ) : (
            <p>No nearby branches found within 50km.</p>
          )}
        </div>
      </div>

    </div>
  );
}
