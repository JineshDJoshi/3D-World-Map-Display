import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe3D from '../components/visualizer/Globe3D';
import ServerMarker from '../components/visualizer/ServerMarker';
// import LatencyConnection from '../components/visualizer/LatencyConnection';
import ControlPanel from '../components/visualizer/ControlPanel';
// import HistoricalChart from '../components/visualizer/HistoricalChart';
//import Header from '../components/common/Header';
import { useLatencyData } from '../hooks/useLatencyData';
import { useRealTimeUpdates } from '../hooks/useRealTimeUpdates';
import { useTheme } from '../hooks/useTheme';

function LatencyDashboard() {
  const { darkMode } = useTheme();
  const { servers, serverPairs } = useLatencyData();
  const { realTimeLatencies } = useRealTimeUpdates();
  
  const [selectedServer, setSelectedServer] = useState(null);
  const [filters, setFilters] = useState({
    provider: 'all',
    showRealTime: true,
    showHistorical: false
  });

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      {/* <Header /> */}
      
      <div className="flex h-[calc(100vh-80px)]">
        <ControlPanel 
          filters={filters}
          setFilters={setFilters}
          servers={servers}
          selectedServer={selectedServer}
          setSelectedServer={setSelectedServer}
          realTimeLatencies={realTimeLatencies}
        />
        
        <div className="flex-1 relative">
          <Canvas
            camera={{ position: [0, 0, 15], fov: 60 }}
            style={{ background: darkMode ? '#1f2937' : '#f3f4f6' }}
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            <Globe3D />
            
            {servers.map(server => (
              <ServerMarker
                key={server.id}
                server={server}
                isSelected={selectedServer?.id === server.id}
                onClick={() => setSelectedServer(selectedServer?.id === server.id ? null : server)}
                darkMode={darkMode}
              />
            ))}
{/*             
            {filters.showRealTime && serverPairs.slice(0, 8).map((pair, index) => (
              <LatencyConnection
                key={`${pair.from.id}-${pair.to.id}`}
                from={pair.from}
                to={pair.to}
                latency={pair.latency}
                animated={true}
              />
            ))} */}
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={8}
              maxDistance={25}
            />
          </Canvas>
          
          {/* {filters.showHistorical && (
            <HistoricalChart />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default LatencyDashboard;