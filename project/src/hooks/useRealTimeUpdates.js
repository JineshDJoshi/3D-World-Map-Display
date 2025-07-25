import { useState, useEffect } from 'react';
import { exchangeServers } from '../utils/mockData';

export const useRealTimeUpdates = () => {
  const [realTimeLatencies, setRealTimeLatencies] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newLatencies = {};
      exchangeServers.forEach(server => {
        newLatencies[server.id] = Math.max(1, server.latency + (Math.random() - 0.5) * 10);
      });
      setRealTimeLatencies(newLatencies);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { realTimeLatencies };
};