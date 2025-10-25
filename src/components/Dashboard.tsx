import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Property, PropertyStatus } from '@/types';
import PropertyCard from './PropertyCard';
import { STATUS_OPTIONS, FILTER_TO_STATUS_MAP } from '@/constants';

interface DashboardProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ properties, onSelectProperty, onLogout }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Todos']);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredProperties = useMemo(() => {
    // Si "Todos" está seleccionado, mostrar todas las propiedades
    if (selectedFilters.includes('Todos')) {
      return properties;
    }
    
    // Filtrar por los estados seleccionados
    const statusesToFilter = selectedFilters.map(filter => FILTER_TO_STATUS_MAP[filter]);
    return properties.filter(p => statusesToFilter.includes(p.status));
  }, [properties, selectedFilters]);

  // Función para manejar selección múltiple
  const handleFilterToggle = (filter: string) => {
    if (filter === 'Todos') {
      // Si se selecciona "Todos", limpiar otras selecciones
      setSelectedFilters(['Todos']);
    } else {
      // Remover "Todos" si está seleccionado
      let newFilters = selectedFilters.filter(f => f !== 'Todos');
      
      if (newFilters.includes(filter)) {
        // Si ya está seleccionado, removerlo
        newFilters = newFilters.filter(f => f !== filter);
      } else {
        // Si no está seleccionado, agregarlo
        newFilters.push(filter);
      }
      
      // Si no hay filtros seleccionados, volver a "Todos"
      if (newFilters.length === 0) {
        newFilters = ['Todos'];
      }
      
      setSelectedFilters(newFilters);
    }
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* --- Background gradient igual al login --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-orange-400 to-orange-600" />

      {/* Brillos/blur suaves igual al login */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-3xl bg-white/25 blur-3xl rotate-12" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-3xl bg-orange-300/40 blur-3xl -rotate-6" />
      <div className="pointer-events-none absolute top-1/3 -right-16 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
      
      {/* Header Compacto */}
      <div className="relative mb-6 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Título y descripción */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Propiedades Asignadas</h1>
                <p className="text-gray-600 text-xs">Gestión de cartera inmobiliaria</p>
              </div>
            </div>

            {/* Filtro y stats en línea */}
            <div className="flex items-center gap-4">
              {/* Filtro con estilo mejorado */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <label className="text-sm font-semibold text-gray-700">Filtrar por estado</label>
                </div>
                <div className="relative z-50" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between bg-white border-2 border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm min-w-[160px]"
                  >
                    <span>
                      {selectedFilters.includes('Todos') 
                        ? 'Todos' 
                        : selectedFilters.length > 1 
                          ? `${selectedFilters.length} filtros`
                          : selectedFilters[0] || 'Seleccionar'
                      }
                    </span>
                    <svg 
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999] overflow-hidden max-h-60 overflow-y-auto">
                      {STATUS_OPTIONS.map((option, index) => {
                        const isSelected = selectedFilters.includes(option);
                        return (
                          <button
                            key={option}
                            onClick={() => handleFilterToggle(option)}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                              isSelected
                                ? 'bg-orange-50 text-orange-700 border-l-4 border-orange-500'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            } ${index === 0 ? 'rounded-t-lg' : ''} ${index === STATUS_OPTIONS.length - 1 ? 'rounded-b-lg' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`h-4 w-4 rounded border-2 flex items-center justify-center ${
                                isSelected 
                                  ? 'bg-orange-500 border-orange-500' 
                                  : 'border-gray-300'
                              }`}>
                                {isSelected && (
                                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <span>{option}</span>
                              {isSelected && (
                                <svg className="h-4 w-4 text-orange-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Stats con estilo mejorado */}
              <div className="flex gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg px-4 py-2 border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-bold text-blue-700">{properties.length}</span>
                    <span className="text-xs text-blue-600 font-medium">Total</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg px-4 py-2 border border-green-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-bold text-green-700">{filteredProperties.length}</span>
                    <span className="text-xs text-green-600 font-medium">Mostrando</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de propiedades mejorado */}
      <div className="relative">
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onClick={() => onSelectProperty(property)} 
              />
            ))}
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-white/20">
            <div className="max-w-md mx-auto">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No hay propiedades</h3>
              <p className="text-gray-600">
                No se encontraron propiedades con el filtro seleccionado. 
                Intente cambiar el estado del filtro.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;