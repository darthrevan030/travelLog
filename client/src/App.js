import './styles.css';
import "leaflet/dist/leaflet.css";

import { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';


export default function App() {

  // state to store travel logs
  const [logs, setLogs] = useState([]);

  // useEffect runs when component loads
  useEffect(() => {
    // define async function to fetch data
    const fetchLogs = async () => {
      try {
        // Step 1: make request to backend
        const response = await fetch('http://localhost:1337/api/logs');
        // Step 2: Convert response data to json
        const data = await response.json();
        // Step 3: update state
        setLogs(data);
        
        // log the response data
        console.log("🚀 ~ fetchLogs ~ data:", data)
    
      } catch (error) {
        // Step 4: Error Handling
        console.error('Error fetching logs: ', error);
      } 
    };

    // call the function
    fetchLogs();
  }, []); // empty array for 2nd parameter means "run once when component loads"

  const customIcon = new Icon({
    iconUrl: "/icons/marker-icon.png",
    iconSize: [38, 38] // size of icon
  })

  return (
    <MapContainer center={[1.351538170692347, 103.80731437210247]} zoom={12}>
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* loop through fetched logs and create marker for each */}
      {logs.map(log => (
        <Marker
          icon={customIcon}
          key={log._id}
          position={[log.latitude, log.longitude]}
        >
          <Popup>
            {log.title}
          </Popup>

        </Marker>
      ))}
    </MapContainer>
  );
}
