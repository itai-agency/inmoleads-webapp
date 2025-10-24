import React, { useState, useCallback, useEffect } from 'react';
import LoginPage from './src/components/LoginPage';
import Dashboard from './src/components/Dashboard';
import PropertyModal from './src/components/PropertyModal';
import Header from './src/components/Header';
import { Property, PropertyStatus } from './types';
import { PROPERTIES_DATA } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Cargar el estado de autenticación desde localStorage al inicializar
    const savedAuthState = localStorage.getItem('isLoggedIn');
    return savedAuthState === 'true';
  });
  const [properties, setProperties] = useState<Property[]>(PROPERTIES_DATA);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  }, []);

  const handleSelectProperty = useCallback((property: Property) => {
    setSelectedProperty(property);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  const handleUpdateProperty = useCallback((updatedProperty: Property) => {
    setProperties(prevProperties =>
      prevProperties.map(p => (p.id === updatedProperty.id ? updatedProperty : p))
    );
    setSelectedProperty(updatedProperty);
  }, []);


  return (
    <div className="min-h-screen font-sans">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <Dashboard 
            properties={properties} 
            onSelectProperty={handleSelectProperty}
            onLogout={handleLogout}
          />
          {selectedProperty && (
            <PropertyModal 
              property={selectedProperty} 
              onClose={handleCloseModal} 
              onUpdate={handleUpdateProperty}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;