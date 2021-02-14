import React, { useState, createContext } from 'react';

const Context = createContext();


export default Context;
export const ContextProvider = props => {
    const [role, setRole] = useState("");
    return (
        <Context.Provider value={[role, setRole]}>
            {props.children}
        </Context.Provider>
    )
}