import React, { useState, useCallback } from 'react';
import LoginPage from './src/components/LoginPage';
import Dashboard from './src/components/Dashboard';
import PropertyModal from './src/components/PropertyModal';
import { Property, PropertyStatus } from './types';
import { PROPERTIES_DATA } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [properties, setProperties] = useState<Property[]>(PROPERTIES_DATA);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
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