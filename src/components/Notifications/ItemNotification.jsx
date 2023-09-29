import { calculateTimeElapsed, getToken } from "../../helpers/helpers";

import { NotificationContext } from "../../context/NotificationContext";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const ItemNotification = ({notificacion}) => {
    const {title, body, isRead} = notificacion;
    const {message, fecha_emision} = body;
    const token = getToken();
    const {loadNotifications} = useContext(NotificationContext);
    const navigate = useNavigate();

    const redireccionarActividad = async ()=>{
        if(!notificacion.isRead){
            await updateStateRead(notificacion);
        }
        navigate(`info-task${notificacion.link}`,{
            state: notificacion.body.tipo_actividad
        });
    }

    const updateStateRead = async(data) =>{
        try {
            const config = {headers: {'Authorization': `Bearer ${token}`}};  
            // Recorre el arreglo de notificaciones y realiza la petición para actualizar el estado de cada una
            const res = await axios.put(`http://localhost:1337/api/notifications/stateRead/${data.id}`, { isRead: true }, config);      
            if(res.status === 200){
                loadNotifications(res.data);
            }
        } catch (error) {
            toast.error("Error, al actualizar notificacion.")      
        }
    }

    return (
        <div className="item-notify" onClick={redireccionarActividad}>
            <div className="body-notification">
                <h6>{title}</h6>
                <p className="limit-2-lines">{message}</p>
                <span>Hace {calculateTimeElapsed(fecha_emision)}</span>
            </div>

            <div className="state-notification">
            {
                !isRead ? <span className="state-notify"></span> : <span className="state-notify-read"></span>
            }          
            </div>
        </div>
    )
}

ItemNotification.propTypes = {
    notificacion: PropTypes.object.isRequired
}