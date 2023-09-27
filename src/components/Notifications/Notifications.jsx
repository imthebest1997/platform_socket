import "../../assets/Notifications.css";

import { useNotifications } from "../../hooks/Tasks/useNotifications";

export const Notifications = () => {
  const {showNotifications, notificationCount, isActiveNotif, redireccionarActividad} = useNotifications();

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

      {/* Bandeja de notificaciones */}
      <div
        className={`bandeja-notif ${isActiveNotif ? "show-div" : "hide-div"}`}
      >
        <h3>Notificaciones</h3>

        <div className="item-notify" onClick={() => redireccionarActividad("/task/id")}>
          <div className="body-notification">
            <h6>Tarea de derivadas</h6>
            <p>Realizar 150 ejercicios del libro de Cálculo de Purcell.</p>
            <span>Hace 12 horas</span>
          </div>

          <div className="state-notification">
            <span className="state-notify"></span>
          </div>
        </div>

        <div className="item-notify" onClick={() => redireccionarActividad("/task/id")}>
          <div className="body-notification">
            <h6>Tarea de derivadas</h6>
            <p className="limit-3-lines">
              Realizar 150 ejercicios del libro de Cálculo de
              Purcell.SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
              SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSsssssssssssssssssssssssssssssssssssss
              ddddddddddddddddd
            </p>
            <span>Hace 12 horas</span>
          </div>

          <div className="state-notification">
            <span className="state-notify"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
