import React, { useState } from 'react';
import { Property } from '@/types';
import { STATUS_MAP } from '@/constants';
import { isGoogleMapsConfigured, getStaticMapUrl } from '../config/maps';
import HomeIcon from './icons/HomeIcon';
import BedIcon from './icons/BedIcon';
import BathIcon from './icons/BathIcon';
import AreaIcon from './icons/AreaIcon';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const [mapLoadError, setMapLoadError] = useState(false);
  const [zoom, setZoom] = useState(15);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);

  const statusInfo = STATUS_MAP[property.status];
  const isApiKeyMissing = !isGoogleMapsConfigured();
  const mapUrl = getStaticMapUrl(property.coordenadas.lat, property.coordenadas.lng, zoom);

  const handleZoom = (e: React.MouseEvent, direction: 'in' | 'out') => {
    e.stopPropagation(); // Prevent card click from firing
    setZoom(prevZoom => {
      const newZoom = direction === 'in' ? prevZoom + 1 : prevZoom - 1;
      // Clamp zoom level between valid Google Maps API range
      if (newZoom < 10 || newZoom > 21) {
        return prevZoom;
      }
      return newZoom;
    });
  };

  return (
    <div 
      onClick={onClick}
      className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="relative">
        {isApiKeyMissing || mapLoadError ? (
           <div className="flex items-center justify-center w-full h-40 bg-gray-200 text-gray-500 text-center p-2">
             <div>
               <p className="font-semibold">Mapa no disponible</p>
               <p className="text-xs">Se requiere una API Key de Google Maps válida.</p>
             </div>
           </div>
        ) : (
          <>
            <img 
              src={mapUrl}
              alt="Mapa de la propiedad" 
              className="object-cover w-full h-40"
              onError={() => setMapLoadError(true)}
            />
            <div className="absolute bottom-2 right-2 flex items-center space-x-1">
              <button
                onClick={(e) => handleZoom(e, 'out')}
                className="w-6 h-6 flex items-center justify-center bg-white/80 text-gray-800 rounded-full shadow-md hover:bg-white transition-colors text-lg font-bold"
                aria-label="Zoom out"
              >
                -
              </button>
              <button
                onClick={(e) => handleZoom(e, 'in')}
                className="w-6 h-6 flex items-center justify-center bg-white/80 text-gray-800 rounded-full shadow-md hover:bg-white transition-colors text-lg font-bold"
                aria-label="Zoom in"
              >
                +
              </button>
            </div>
          </>
        )}
        <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white rounded-full ${statusInfo.badge.replace('text-','bg-').replace('-100','-500')}`}>
            {statusInfo.text}
        </div>
      </div>
      
      <div className="flex-grow p-4">
        <h3 className="text-lg font-bold text-gray-800">{property.nombre}</h3>
        <p className="text-sm text-gray-500 truncate">{property.direccion}</p>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2"><HomeIcon className="w-4 h-4 text-gray-400" /><span className="capitalize">{property.tipo}</span></div>
          <div className="flex items-center space-x-2"><BedIcon className="w-4 h-4 text-gray-400" /><span>{property.habitaciones} Hab.</span></div>
          <div className="flex items-center space-x-2"><BathIcon className="w-4 h-4 text-gray-400" /><span>{property.banos} Baños</span></div>
          <div className="flex items-center space-x-2"><AreaIcon className="w-4 h-4 text-gray-400" /><span>{property.superficie_m2} m²</span></div>
        </div>
        
        <div className="pt-4 mt-4 border-t">
          <p className="text-sm font-semibold text-gray-500">Adeudo Infonavit:</p>
          <p className="text-xl font-bold text-[#fd7500]">{formatCurrency(property.adeudo_infonavit)}</p>
          <p className="mt-2 text-xs text-gray-400">
            Agua: {formatCurrency(property.adeudo_agua)} | Luz: {formatCurrency(property.adeudo_luz)} | Predial: {formatCurrency(property.adeudo_predial)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;