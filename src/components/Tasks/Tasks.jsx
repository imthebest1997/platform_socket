import { useEffect, useState } from 'react'

import { RegisterTasks } from '../RegisterTasks/RegisterTasks';
import axios from 'axios'
import { getToken } from "../../helpers/helpers";
import { socket } from "../../config/socket";
import { toast } from "react-toastify";

socket.on("hello", (res) => {
  console.log(res);
  toast.success(res.message);
});

socket.on('taskCreated', (task) => {
  console.log(task);
  toast.success(task.message);
});


export const Tasks = () => {
  const token = getToken();
  const [tasks, setTasks] = useState([]);

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
  
    socket.on("task", handleTaskNotification);

    return () => {
      socket.off("task", handleTaskNotification);
    };

  },[socket, token])

  const onAddTask = (task) => {
    // setTasks([task, ...tasks])
    socket.emit("create_task", {
      ...task,
      token
    }, (error) => {
      if (error) {
        toast.error(error);
      }
    });
  }


  return (
    <>
      <div className="row">
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
