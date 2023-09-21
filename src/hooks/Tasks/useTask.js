import { useEffect, useState } from 'react'

import axios from 'axios'
import { getToken } from "../../helpers/helpers";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../hooks/useSocketContext"

// import { socket } from "../../config/socket"
export const useTask = () => {
    const token = getToken();
    const [tasks, setTasks] = useState([]);
    const { user } = useAuthContext();
    const {online, socket} = useSocketContext();
    
    useEffect(()=>{
        if(user?.user.id !== undefined){
          socket.emit('setUserId', {userId: user?.user.id, token});      
        }
    }, [user?.user.id])
          
    socket.io.on('reconnect', () => {
        // Volver a emitir el evento "setUserId" al servidor
        socket.emit('setUserId', {userId: user?.user.id, token});
    });
      
    
    useEffect(() => {    
        axios({
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "get",
            url: "http://localhost:1337/api/tasks",
        }).then((res) => {
            setTasks(res.data);
        });    
    }, [token]);
      
    useEffect(() => {
        const handleTaskNotification = async (data, error) => {
            if (data) {
                toast.success(data.message);
                try {
                    const response = await axios({
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "get",
                    url: "http://localhost:1337/api/tasks",
                    });
                    setTasks(response.data);
                } catch (error) {
                    toast.error(error);
                }
            } else {
                toast.error(error);
            }
        };
    
        socket.on("task_created", handleTaskNotification);
        return () => socket.off("task_created", handleTaskNotification);

    },[socket, token])
    
      //Envio de objeto con  sockets
    const onAddTask = async (task, students) =>{ 
        const {course, ...taskCreated} = task;
        
        let strapiData = {
          data: {
            ...taskCreated,
          },
        };
    
        try {
          await axios
          .post("http://localhost:1337/api/tasks", strapiData,{
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }).then(() => {
            //la tarea creada es opcional en su envio, se puede enviar
            //solo el nombre y la fecha o los datos que se deseen
            socket.emit("create_task", {
              students, 
              ...taskCreated
            }, (error) => {
              if (error) {
                toast.error(error);
              }
            });
          });
        }catch (error) {
            toast.error(error);      
        }
    }
    
    return{
        tasks,
        onAddTask,
        online
    }
}
