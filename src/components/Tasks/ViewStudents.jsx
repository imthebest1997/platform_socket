import { useEffect, useState } from 'react'

import { RegisterTasks } from '../RegisterTasks/RegisterTasks';
import axios from 'axios'
import { getToken } from "../../helpers/helpers";
import { socket } from "../../config/socket";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

export const ViewStudents = () => {
    const token = getToken();
    const [tasks, setTasks] = useState([]);
    const { user } = useAuthContext();

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
    
    return (
        <div>ViewStudents</div>
    )
}
