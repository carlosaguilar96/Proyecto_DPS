import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [miVariable, setMiVariable] = useState(1);
    const [miVariable2, setMiVariable2] = useState(1);

    return (
        <AppContext.Provider value={{ miVariable, setMiVariable, miVariable2, setMiVariable2 }}>
            {children}
        </AppContext.Provider>
    );
};