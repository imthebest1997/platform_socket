import { useEffect, useState } from 'react'

import { RegisterTasks } from '../RegisterTasks/RegisterTasks';
import axios from 'axios'
import { getToken } from "../../helpers/helpers";
import { socket } from "../../config/socket"
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

// import { useSocket } from "../../hooks/useSocket";

export const Tasks = () => {
  const token = getToken();
  const [tasks, setTasks] = useState([]);
  const { user } = useAuthContext();
  //const {online, socket} = useSocket();

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

    return () => {
      socket.off("task_created", handleTaskNotification);
    };

  },[socket, token])

  //Envio de objeto con  sockets
  const onAddTask = (task, students) => { 
    socket.emit("create_task", {
      ...task,
      token,
      students
    }, (error) => {
      if (error) {
        toast.error(error);
      }
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12  d-flex justify-content-center">
          <h1>ID User: {user?.user.username} </h1>
        </div>
        
        <div className="col-md-12 d-flex justify-content-center">
          <h2>Status: {
              // online ? 'Online' : 'Offline'  
          }</h2>
        </div>

        <div className="col-md-6">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Task Finish Date</th>                
              </tr>
            </thead>
            <tbody>{
              tasks.map((task)=>{
                return (
                  <tr key={task.id}>
                    <td> { task.id }</td>
                    <td> { task.title }</td>
                    <td> { task.content }</td>
                    <td> { task.task_finish_date }</td>
                  </tr>
                );
              })
            }</tbody>
          </table>
        </div>

        {
          user?.user.role.id === 3 &&
            <div className="col-md-6">
                <h1>Register Form</h1>
                <RegisterTasks onNewTask = { (value, students) => onAddTask(value, students) } />
            </div>            
        }

      </div>
    </>
  );
};
