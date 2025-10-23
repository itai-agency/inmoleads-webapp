import React, { useState, useEffect } from 'react';
import { Property, PropertyStatus } from '@/types';
import { isGoogleMapsConfigured, getEmbedMapUrl } from '../config/maps';
import CloseIcon from './icons/CloseIcon';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
  onUpdate: (property: Property) => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onUpdate }) => {
  const [visited, setVisited] = useState(false);
  const [comments, setComments] = useState(property.comentarios_cliente || '');

  useEffect(() => {
    // Reset state if property changes
    setVisited(false);
    setComments(property.comentarios_cliente || '');
  }, [property]);

  const handleMarkAsVisited = () => {
    if (!visited) return;
    const updatedProperty: Property = {
      ...property,
      status: PropertyStatus.Visitada,
      comentarios_cliente: comments,
    };
    onUpdate(updatedProperty);
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);

  const InfoGridItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="p-3 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );

  const isApiKeyMissing = !isGoogleMapsConfigured();
  const mapEmbedUrl = getEmbedMapUrl(property.coordenadas.lat, property.coordenadas.lng);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60" onClick={onClose}>
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] p-6 overflow-y-auto bg-white rounded-xl shadow-2xl transform transition-all" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <CloseIcon className="w-6 h-6" />
        </button>

        <header className="pb-4 mb-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{property.nombre}</h2>
          <p className="text-gray-500">{property.direccion}</p>
        </header>

        <main className="space-y-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <InfoGridItem label="Tipo" value={property.tipo.charAt(0).toUpperCase() + property.tipo.slice(1)} />
            <InfoGridItem label="Habitaciones" value={property.habitaciones} />
            <InfoGridItem label="Baños" value={property.banos} />
            <InfoGridItem label="Superficie" value={`${property.superficie_m2} m²`} />
            <InfoGridItem label="Adeudo Infonavit" value={formatCurrency(property.adeudo_infonavit)} />
            <InfoGridItem label="Adeudo Agua" value={formatCurrency(property.adeudo_agua)} />
            <InfoGridItem label="Adeudo Luz" value={formatCurrency(property.adeudo_luz)} />
            <InfoGridItem label="Adeudo Predial" value={formatCurrency(property.adeudo_predial)} />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-700">Ubicación</h3>
            <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 overflow-hidden">
              {isApiKeyMissing ? (
                <div className="text-center p-2">
                  <p className="font-semibold">Mapa no disponible</p>
                  <p className="text-sm">Se requiere una API Key de Google Maps válida.</p>
                </div>
              ) : (
                <iframe
                  title={`Mapa de ${property.nombre}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapEmbedUrl}>
                </iframe>
              )}
            </div>
          </div>
          
          <div className="p-4 space-y-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <input 
                id="visit-checkbox"
                type="checkbox" 
                checked={visited}
                onChange={() => setVisited(!visited)}
                className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="visit-checkbox" className="ml-3 text-sm text-gray-700">
                Confirmo que he visitado la propiedad y verificado su estado físico.
              </label>
            </div>

            <textarea
              placeholder="Comentarios del inversionista después de marcar visita o revisar ficha..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />

            <button 
              onClick={handleMarkAsVisited}
              disabled={!visited}
              className="w-full px-4 py-2 font-semibold text-white bg-[#0A3AFF] rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              Marcar como Visitada y Guardar Comentarios
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PropertyModal;