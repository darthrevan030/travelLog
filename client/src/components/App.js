import '../styles.css';
import "leaflet/dist/leaflet.css";

import { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import * as mapConfig from '../utils/mapConfig';
import * as api from '../services/api';


export default function App() {

  // state to store travel logs
  const [logs, setLogs] = useState([]);

  // useEffect runs when component loads
  useEffect(() => {
    // define async function to fetch data
    const getLogs = async () => {
      try {
        const data = await api.fetchLogs();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    getLogs();
  }, []); // empty array for 2nd parameter means "run once when component loads"  

  return (
    <MapContainer center={mapConfig.defaultCenter} zoom={mapConfig.defaultZoom} scrollWheelZoom={true} style={{ height: "100vh", width: "100vw" }}>
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* loop through fetched logs and create marker for each */}
      {logs.map(log => (
        <Marker
          icon={mapConfig.customIcon} // use the custom marker icon
          key={log._id}
          position={[log.latitude, log.longitude]}
        >
          <Popup>
            <h3>{log.title}</h3>
          </Popup>

        </Marker>
      ))}
    </MapContainer>
  );
}
