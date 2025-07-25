import { useState, useEffect } from 'react';
import { exchangeServers } from '../utils/mockData';

export const useLatencyData = () => {
  const [servers, setServers] = useState(exchangeServers);
  const [serverPairs, setServerPairs] = useState([]);

  useEffect(() => {
    // Generate server pairs for connections
    const pairs = [];
    for (let i = 0; i < servers.length; i++) {
      for (let j = i + 1; j < servers.length; j++) {
        pairs.push({
          from: servers[i],
          to: servers[j],
          latency: Math.abs(servers[i].latency - servers[j].latency) + Math.random() * 10
        });
      }
    }
    setServerPairs(pairs);
  }, [servers]);

  return { servers, serverPairs };
};