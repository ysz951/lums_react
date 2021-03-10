import React, { createContext } from 'react';

const Context = createContext();


export default Context;
export const ContextProvider = props => {
    const setRole = role => {
        localStorage.setItem('role', role);
    }
    const role = localStorage.getItem('role');
    const logout = () => {
        localStorage.removeItem('role');
    }
    const value = {
        role,
        setRole,
        logout
    }
    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}