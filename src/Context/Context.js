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
    const logout = () => {
        localStorage.removeItem('role');
    }
    useEffect(() => {
        if (role.length) {
            localStorage.setItem('role', role);
        }
    }, [role]);
    return (
        <Context.Provider value={{ role, setRole, logout }}>
            {props.children}
        </Context.Provider>
    )
}