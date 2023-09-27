import { toast } from "react-toastify";
import { useState } from "react";

// import { useNavigate } from "react-router-dom";
export const useNotifications = () => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [isActiveNotif, setIsActiveNotif] = useState(false);
    // const navigate = useNavigate();
  
    const showNotifications = () => {
      setIsActiveNotif(!isActiveNotif);
      if (notificationCount > 0) {
        setNotificationCount(0);
      }
    };
  
    const redireccionarActividad = (route) => {
      toast.info("Redireccionando a " + route);
      // navigate("/actividad");
    }

    
    return {
        notificationCount,
        isActiveNotif,
        setIsActiveNotif,
        showNotifications,
        redireccionarActividad
    }
}
