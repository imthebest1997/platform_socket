import { useEffect, useState } from 'react'

import { RegisterTasks } from '../RegisterTasks/RegisterTasks';
import axios from 'axios'
import { getToken } from "../../helpers/helpers";
import { socket } from "../../config/socket";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

export const Tasks = () => {
  const token = getToken();
  const [tasks, setTasks] = useState([]);
  const [lessons, setLessons] = useState([6]); // Cuando se use en produccion, se debe enviar como parametro el slug o id del lesson, en el SetState
  const { user } = useAuthContext();

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


  useEffect(() => {
    socket.emit("join", { lessonsId:lessons }, (error) => { 
      if (error) return toast.error(error);
    });
  }, [lessons]);

  //Envio de objeto con  sockets
  const onAddTask = (task) => {
    socket.emit("create_task", {
      ...task,
      lessons,
      token
    }, (error) => {
      if (error) {
        toast.error(error);
      }
    });
  }

  //Seteo del curso al cual se asigna la tarea
  const onSetLesson = (lessonId) =>{
    setLessons([lessonId]);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12  d-flex justify-content-center">
          <h1>ID User: {user?.user.username} </h1>
        </div>
        {/* Botones para entrar a notificaciones por cursos */}
        <div className="col-md-12 d-flex justify-content-center">
          <button className="btn btn-primary"      onClick={()=>onSetLesson(6)}> Curso A </button>
          <button className="btn btn-success mx-2" onClick={()=>onSetLesson(7)}> Curso B </button>
          <button className="btn btn-secondary"    onClick={()=>onSetLesson(16)}> Curso C </button>
          <button className="btn btn-warning mx-2" onClick={()=>onSetLesson(30)}> Curso D </button>
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

        <div className="col-md-6">
            <h1>Register Form</h1>
            <RegisterTasks onNewTask = { (value) => onAddTask(value) } />
        </div>  
      </div>
    </>
  );
};
