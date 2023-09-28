import PropTypes from 'prop-types';
import { createContext } from "react";
import { useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {

    const [notifications, setNotifications] = useState([]);

    const loadNotifications = (data) =>{
        setNotifications(data);
    }

    return (
        <NotificationContext.Provider value = {{ notifications, loadNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
}

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
}