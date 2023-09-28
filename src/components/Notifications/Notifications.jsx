import "../../assets/Notifications.css";

import { ItemNotification } from "./ItemNotification";
import imgBandeja from "../../assets/bandeja_notificaciones.png";
import { useNotifications } from "../../hooks/Notifications/useNotifications";

export const Notifications = () => {
  const {showNotifications, notifications, notificationCount, isOpenPanelNot} = useNotifications();

  return (
    <div className="div-notifications">
      <i className="bx bx-notification" onClick={showNotifications}></i>
      <div
        className={`div-numb-notif ${
          notificationCount > 0 ? "show-div" : "hide-div"
        }`}
      >
        <span className="span-notifications">{notificationCount}</span>
      </div>
      <div
        className={`bandeja-notif ${isOpenPanelNot ? "show-div" : "hide-div"}`}
      >
        <h3>Notificaciones</h3>
        {
          notifications.length > 0 
          ? notifications.map((notificacion) => (<ItemNotification key={notificacion.id} notificacion={notificacion}/>))  
          : <>
            <div className="no-notifications">
              <img src={imgBandeja} alt="" />              
              <p>No hay notificaciones pendientes</p>                
            </div>
          </>
        }
      </div>
    </div>
  );
};
