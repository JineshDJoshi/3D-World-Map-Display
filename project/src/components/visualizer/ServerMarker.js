import React from 'react';
import { Html } from '@react-three/drei';
import { latLngToVector3 } from '../../utils/coordinates';
import { providerConfig } from '../../utils/mockData';

function ServerMarker({ server, isSelected, onClick, darkMode }) {
  const position = latLngToVector3(server.location.lat, server.location.lng);
  const config = providerConfig[server.provider];
  
  return (
    <group position={position}>
      <mesh onClick={onClick}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={config.color} />
      </mesh>
      {isSelected && (
        <Html>
          <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-2 rounded shadow-lg border text-xs min-w-32`}>
            <div className="font-semibold">{server.name}</div>
            <div>{server.city}</div>
            <div className="text-xs opacity-75">{server.provider} - {server.region}</div>
            <div className="text-xs">Latency: {server.latency}ms</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default ServerMarker;