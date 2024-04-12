import React, {useEffect} from 'react';
import Navigator from './src/navigation/Navigator';
import {connectToDatabase, createTables} from './src/data/database/FoodDB';
import ThemeContextProvider from './src/components/hooks/ThemeContext';
import LocaleContextProvider from './src/components/hooks/LocaleContext';

const FoodApp = () => {
  const initializeDatabase = async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };

  useEffect(() => {
    initializeDatabase();
  }, [initializeDatabase]);

  return (
    <ThemeContextProvider>
      <LocaleContextProvider>
        <Navigator />
      </LocaleContextProvider>
    </ThemeContextProvider>
  );
};

export default FoodApp;
