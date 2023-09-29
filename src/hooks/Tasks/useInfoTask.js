import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getTaskByIdAndSlug } from "../../services/task_services";
import { toast } from "react-toastify";

export const useInfoTask = () => {
    const {hash, state} = useLocation();
    const {slug} = useParams();
    const id = hash.split("#")[1];
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
  
    useEffect(() => {
      if (state === null) {
        navigate("/");
      }
    }, [navigate, state]);
    
    const searchActivity = ()=>{
      getTaskByIdAndSlug(id, slug)
        .then((data)=>{
          console.log("Consultando nuevamente");
          setTask(data);
        })
        .catch(()=>{
          toast.error("Error al cargar la tarea");
          navigate("/", {
            replace: true            
          });
      });    
    }
  
    const handleBackPage = () =>{
      navigate("/", {
        replace: true            
      });
    }
  
    useEffect(()=>{
      searchActivity();
    }, [id, slug]);
    
    return {task, handleBackPage};
}
