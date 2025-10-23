import React, { useState, useMemo } from 'react';
import { Property, PropertyStatus } from '@/types';
import PropertyCard from './PropertyCard';
import { STATUS_OPTIONS, FILTER_TO_STATUS_MAP } from '@/constants';

interface DashboardProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ properties, onSelectProperty, onLogout }) => {
  const [filter, setFilter] = useState<string>('Todos');

  const filteredProperties = useMemo(() => {
    const statusToFilter = FILTER_TO_STATUS_MAP[filter];
    if (statusToFilter === 'todos') {
      return properties;
    }
    return properties.filter(p => p.status === statusToFilter);
  }, [properties, filter]);
  
  return (
    <div 
      className="p-4 sm:p-6 lg:p-8 min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/src/assets/home-background.jpeg)'
      }}
    >
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-white bg-opacity-60 -z-10"></div>
      <header className="flex items-start justify-between mb-8">
        <div>
            <h1 className="text-4xl font-bold text-gray-800">Propiedades Asignadas</h1>
            <p className="text-gray-500">Revise, filtre y gestione las propiedades de su cartera.</p>
        </div>
        <div className="text-right">
            <p className="font-semibold text-gray-700">Bienvenido inversionista</p>
            <button 
                onClick={onLogout}
                className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
                Cerrar sesión
            </button>
        </div>
      </header>

      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {STATUS_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProperties.map(property => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            onClick={() => onSelectProperty(property)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;