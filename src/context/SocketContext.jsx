import PropTypes from "prop-types"
import { createContext } from "react";
import { useSocket } from "../hooks/Socket/useSocket";

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
    const { socket, online } = useSocket("http://localhost:1337");

    return (
        <SocketContext.Provider value={{socket, online}}>
            {children}            
        </SocketContext.Provider>
    );
}

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired
}