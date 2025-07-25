export const exchangeServers = [
    {
      id: 'binance-us',
      name: 'Binance US',
      location: { lat: 40.7128, lng: -74.0060 },
      city: 'New York',
      provider: 'AWS',
      region: 'us-east-1',
      latency: 12
    },
    {
      id: 'okx-hk',
      name: 'OKX',
      location: { lat: 22.3193, lng: 114.1694 },
      city: 'Hong Kong',
      provider: 'GCP',
      region: 'asia-east1',
      latency: 8
    },
    {
      id: 'deribit-nl',
      name: 'Deribit',
      location: { lat: 52.3676, lng: 4.9041 },
      city: 'Amsterdam',
      provider: 'Azure',
      region: 'westeurope',
      latency: 15
    }
  ];
  
  export const providerConfig = {
    AWS: { color: '#FF9900', marker: '▲' },
    GCP: { color: '#4285F4', marker: '●' },
    Azure: { color: '#0078D4', marker: '■' }
  };
  