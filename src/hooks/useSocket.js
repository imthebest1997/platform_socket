import { useEffect, useMemo, useState } from "react";

import { io } from "socket.io-client"

export const useSocket = (serverPath = "http://localhost:1337") => {

    const socket = useMemo( () => io.connect(serverPath), [serverPath]);

    const [online, setOnline] = useState(false);

    //Establecer estado de conexion
    useEffect(()=>{
        setOnline(socket.connected);
    }, [socket]);

    //Escuchamos cuando nos conectamos
    useEffect(()=>{
        socket.on("connect", () => {
            setOnline(true);
        });
    }, [socket]);

    //Escuchamos cuando nos desconectamos
    useEffect(()=>{
        socket.on("disconnect", () => {
            setOnline(false);
        });
    }, [socket]);
    
    
    return {
        socket,
        online
    };
}
