import React, { useState } from 'react';
import { Search, Filter, Settings, Server, Activity } from 'lucide-react';
import { providerConfig } from '../../utils/mockData';

function ControlPanel({ 
  filters, 
  setFilters, 
  servers, 
  selectedServer, 
  setSelectedServer, 
  realTimeLatencies 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredServers = servers.filter(server => {
    if (filters.provider !== 'all' && server.provider !== filters.provider) return false;
    if (searchTerm && !server.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Search className="w-4 h-4 inline mr-1" />
            Search Exchanges
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exchanges..."
            className="w-full px-3 py-2 rounded-lg border bg-gray-700 border-gray-600 text-white"
          />
        </div>

        {/* Provider Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Filter className="w-4 h-4 inline mr-1" />
            Cloud Provider
          </label>
          <select
            value={filters.provider}
            onChange={(e) => setFilters({...filters, provider: e.target.value})}
            className="w-full px-3 py-2 rounded-lg border bg-gray-700 border-gray-600 text-white"
          >
            <option value="all">All Providers</option>
            <option value="AWS">AWS</option>
            <option value="GCP">Google Cloud</option>
            <option value="Azure">Microsoft Azure</option>
          </select>
        </div>

        {/* Visualization Toggles */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <Settings className="w-4 h-4 inline mr-1" />
            Visualization Options
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.showRealTime}
                onChange={(e) => setFilters({...filters, showRealTime: e.target.checked})}
                className="mr-2"
              />
              Show Real-time Connections
            </label>
          </div>
        </div>

        {/* Legend */}
        <div>
          <h3 className="text-sm font-medium mb-2">Cloud Providers</h3>
          <div className="space-y-1">
            {Object.entries(providerConfig).map(([provider, config]) => (
              <div key={provider} className="flex items-center text-sm">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: config.color }}
                />
                {provider}
              </div>
            ))}
          </div>
        </div>

        {/* Server List */}
        <div>
          <h3 className="text-sm font-medium mb-2">
            <Server className="w-4 h-4 inline mr-1" />
            Exchange Servers ({filteredServers.length})
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredServers.map(server => (
              <div
                key={server.id}
                onClick={() => setSelectedServer(selectedServer?.id === server.id ? null : server)}
                className={`p-2 rounded cursor-pointer transition-colors ${
                  selectedServer?.id === server.id
                    ? 'bg-blue-900 border-blue-700'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{server.name}</div>
                    <div className="text-xs opacity-75">{server.city}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className="w-2 h-2 rounded-full mb-1"
                      style={{ backgroundColor: providerConfig[server.provider].color }}
                    />
                    <div className="text-xs">
                      {realTimeLatencies[server.id]?.toFixed(0) || server.latency}ms
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <h3 className="text-sm font-medium mb-2">
            <Activity className="w-4 h-4 inline mr-1" />
            System Status
          </h3>
          <div className="p-3 rounded-lg bg-gray-700">
            <div className="flex justify-between text-sm mb-1">
              <span>Avg Latency</span>
              <span className="font-mono">
                {(Object.values(realTimeLatencies).reduce((a, b) => a + b, 0) / Object.values(realTimeLatencies).length || 12).toFixed(1)}ms
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Active Servers</span>
              <span className="font-mono">{filteredServers.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;