import React, { useState, createContext, useEffect } from 'react';

const Context = createContext();


export default Context;
export const ContextProvider = props => {
    const [role, setRole] = useState("");
    useEffect(() => {
        if (localStorage.getItem('role')) {
            setRole(localStorage.getItem('role'));
        }
    }, []);
    useEffect(() => {
        if (role.length) {
            localStorage.setItem('role', role);
        }
    }, [role]);
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