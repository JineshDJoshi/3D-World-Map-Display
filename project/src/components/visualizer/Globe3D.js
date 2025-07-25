import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Globe3D() {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshPhongMaterial
        color="#2563eb"
        transparent
        opacity={0.6}
        wireframe={false}
      />
      <mesh>
        <sphereGeometry args={[5.01, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </mesh>
  );
}

export default Globe3D;