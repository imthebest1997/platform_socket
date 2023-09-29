import { createTask, listTasks } from "../../services/task_services";
import { useEffect, useState } from "react";

import { getToken } from "../../helpers/helpers";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../Socket/useSocketContext";

export const useTask = () => {
  const token = getToken();
  const [tasks, setTasks] = useState([]);
  const { user } = useAuthContext();
  const { online, socket } = useSocketContext();

  useEffect(() => {
    if (user?.user.id !== undefined) {
      socket.emit("setUserId", { userId: user?.user.id, token });
    }
    console.log("Efecto setUserID");
  }, [user?.user.id]);

  useEffect(() => {
    socket.io.on("reconnect", () => {
      // Volver a emitir el evento "setUserId" al servidor
      socket.emit("setUserId", { userId: user?.user.id, token });
    });
  }, [user?.user.id, socket, token]);

  useEffect(() => {
    listTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [socket]);

  const handleTaskNotification = async (data, error) => {
    if (data) {
      // toast.success(data);
      try {
        const data = await listTasks();
        setTasks(data);
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    socket.on("task_created", handleTaskNotification);
    socket.on("task_updated", handleTaskNotification);
    return () => {
      socket.off("task_created", handleTaskNotification);
      socket.off("task_updated", handleTaskNotification);
    };
  }, [socket, token]);

  //Envio de objeto con  sockets
  const onAddTask = async (task) => {
    const { course, lessons, ...taskCreated } = task;
    let strapiData = {
      data: {
        ...taskCreated,
        lessons: [lessons],
      },
    };

    try {
      const data = await createTask(strapiData);
      console.log(data);      
    } catch (error) {
      toast.error(error);
    }
  };

  return {
    tasks,
    onAddTask,
    online,
  };
};
