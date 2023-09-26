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

    useEffect(()=>{
      socket.io.on('reconnect', () => {
        // Volver a emitir el evento "setUserId" al servidor
        socket.emit('setUserId', {userId: user?.user.id, token});
      });          
    }, [user?.user.id, socket, token])
    
          
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
      
    const handleTaskNotification = async (data, error) => {
      if (data) {
        toast.success(data);
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

    useEffect(() => {    
      socket.on("task_created", handleTaskNotification);
      return () => socket.off("task_created", handleTaskNotification);
    },[socket, token])
    

  useEffect(() => {  
    socket.on("task_updated", handleTaskNotification);
    return () => socket.off("task_updated", handleTaskNotification);
  },[socket, token])

    
      //Envio de objeto con  sockets
  const onAddTask = async (task) =>{ 
    const {course, lessons, ...taskCreated} = task;      
    let strapiData = {
      data: {
        ...taskCreated,
        lessons: [lessons]
      },
    };
  
    try {
      await axios
      .post("http://localhost:1337/api/tasks", strapiData,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(()=>{
        console.log(strapiData.data);
      })
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
