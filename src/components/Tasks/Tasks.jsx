import { useEffect, useState } from 'react'

import { RegisterTasks } from '../RegisterTasks/RegisterTasks';
import axios from 'axios'
import { getToken } from "../../helpers/helpers";
import { socket } from "../../config/socket";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

// import cursosJson from "../../resources/cursos.json"
  
export const Tasks = () => {
  const token = getToken();
  const [tasks, setTasks] = useState([]);
  const { user } = useAuthContext();
  
  socket.emit('setUserId', user?.user.id);

  useEffect(() => {
    //Descomentar cuando se adapte al proyecto original, se debe insertar cuando se ingrese al curso x primera vez
    // socket.emit("join", { lessons }, (error) => { //Sending the username to the backend as the user connects.
    //   if (error) return alert(error);
    // });
    
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
  
    socket.on("task", handleTaskNotification);

    return () => {
      socket.off("task", handleTaskNotification);
    };

  },[socket, token])

  //Envio de objeto con  sockets
  const onAddTask = (task, students) => { 
    console.log(students);       
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
