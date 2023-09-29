import { useContext, useEffect, useState } from "react";

import { NotificationContext } from "../../context/NotificationContext";
import axios from "axios";
import { getNotificationsService } from "../../services/notifications_services";
import { getToken } from "../../helpers/helpers";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../Socket/useSocketContext";

export const useNotifications = () => {
  const { loadNotifications } = useContext(NotificationContext);
  const { user } = useAuthContext();
  const { socket } = useSocketContext();

  const token = getToken();
  const {notifications} = useContext(NotificationContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isOpenPanelNot, setIsOpenPanelNot] = useState(false); //Bandeja de notificaciones

  //TODO: Ojo con el tema del socket
  useEffect(() => {
      if (user?.user.id !== undefined) {
        getNotifications();
        console.log("Get notifications");
      }
  }, [user, socket]);


  useEffect(() => {
    if (notifications.length > 0) {
      console.log("El contador de notificaciones se actualizo");
      //Para el conteo de notificaciones solo se deben contar las notificaciones que tengan la propiedad isOpenPanel en false
      const count = notifications.filter((notification) => !notification.isOpenPanel).length;
      setNotificationCount(count);
    }
  }, [notifications]);

  useEffect(() => {
    socket.on("new_notifications", handleNotification);
    return () => {
      socket.off("new_notifications", handleNotification);
    };
  }, [socket, token]);

  const handleNotification = async (data, error) => {
    if (data) {
      try {
        const data = await getNotificationsService({ id: user.user.id });
        loadNotifications(data);
        // toast.info("Llegaron notificaciones");
        // const count = notifications.filter((notification) => !notification.isOpenPanel).length;
        // setNotificationCount(count);  
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error(error);
    }
  };



  //Retrieve all notifications
  const getNotifications = () => {
    try {
      getNotificationsService({ id: user.user.id })
          .then((data) => {
          loadNotifications(data);
          })
          .catch(() => {
          toast.error("Error, en el servidor");
          });
      } catch (error) {
      toast.error("Error al consultar las notificaciones.");
      }
  };
  
  const showNotifications = async() => {
    setIsOpenPanelNot(!isOpenPanelNot);
    //Cuando se abre el panel de notificaciones, se debe actualizar en todas las notificaciones la propiedad isOpenPanel en true
    if (!isOpenPanelNot) {
      const notificationsToUpdate = notifications.filter((notification) => !notification.isOpenPanel);      
      if (notificationsToUpdate.length > 0) {
        await updateNotificationsState(notificationsToUpdate);
        setNotificationCount(0);
      }
    }
  };
  
  //Metodo para actualizar el estado de la bandeja de notificaciones al abrir por primera vez.
  const updateNotificationsState = async (notificaciones) => {
    try {
      const config = {headers: {'Authorization': `Bearer ${token}`}};  
      // Recorre el arreglo de notificaciones y realiza la petición para actualizar el estado de cada una
      for (const notification of notificaciones) {
        await axios.put(`http://localhost:1337/api/notifications/statePanel/${notification.id}`, { isOpenPanel: true }, config);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    notificationCount,
    notifications: notifications || [],
    isOpenPanelNot,
    showNotifications,
  }
}
