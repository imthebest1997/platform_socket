import { useContext, useEffect, useState } from "react";

import { NotificationContext } from "../../context/NotificationContext";
import axios from "axios";
import { getNotificationsService } from "../../services/notifications";
import { getToken } from "../../helpers/helpers";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../Socket/useSocketContext";

export const useNotifications = () => {
  const { loadNotifications } = useContext(NotificationContext);
  const { user } = useAuthContext();
  const { socket } = useSocketContext();

  const token = getToken();
  const data = useContext(NotificationContext);
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
    if (data?.notifications.length > 0) {
      //Para el conteo de notificaciones solo se deben contar las notificaciones que tengan la propiedad isOpenPanel en false
      const count = data?.notifications.filter((notification) => !notification.isOpenPanel).length;
      setNotificationCount(count);
    }
  }, [data?.notifications]);
      

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
      const notificationsToUpdate = data?.notifications.filter((notification) => !notification.isOpenPanel);      
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
    notifications: data?.notifications || [],
    isOpenPanelNot,
    showNotifications,
  }
}
