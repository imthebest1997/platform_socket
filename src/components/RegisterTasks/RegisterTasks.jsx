import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {useForm} from "../../hooks/useForm"

export const RegisterTasks = ({onNewTask}) => {

    const {formState, onInputChange, title, content, task_finish_date, file_size_maximun, accepted_files} = useForm({
        title: '',
        content: '',
        task_finish_date: "",
        file_size_maximun: "",
        accepted_files: "",
        lessons: [30],
        user_created: 536
    });
    
    
    const onSubmit = (event)=>{
        event.preventDefault();
        if(title == "" || content == '' || task_finish_date == '' || file_size_maximun == '' || accepted_files == "") return toast.error("El registro no esta completo, verifique los campos");
        onNewTask(formState);
    }

    return (
        <form onSubmit={onSubmit} className='row g-2'>

            <div className="col-md-3 d-flex align-items-center">
            <label htmlFor="txtTitle">Title of class: </label>
            </div>

            <div className="col-md-9 d-flex align-items-center">
            <input 
                type="text" 
                className="form-control" 
                id="txtTitle" 
                name='title' 
                onChange={onInputChange}
            />

            </div>

            <div className="col-md-3 d-flex align-items-center">
            <label htmlFor="txtContent">Content: </label>
            </div>

            <div className="col-md-9 d-flex align-items-center">
            <input 
                type="text" 
                className="form-control" 
                id="txtContent" 
                name='content' 
                onChange={onInputChange}
            />
            </div>

            <div className="col-md-3 d-flex align-items-center">
                <label htmlFor="txtFinishDate">Task Finish Date: </label>
            </div>

            <div className="col-md-9 d-flex align-items-center">
                <input 
                    type="date" 
                    className="form-control" 
                    id="txtFinishDate" 
                    name='task_finish_date' 
                    onChange={onInputChange}
                />
            </div>

            
            <div className="col-md-3 d-flex align-items-center">
                <label htmlFor="txtAcceptedFiles">Accepted Files: </label>
            </div>

            <div className="col-md-9 d-flex align-items-center">
                <select name="accepted_files" id="txtAcceptedFiles" className="form-control"  onChange={onInputChange}>
                    <option value=""> -- Seleccione un formato --</option>
                    <option value=".pdf">PDF</option>
                    <option value=".txt">TXT</option>
                    <option value=".ppt">Power Point</option>

                </select>
            </div>



            <div className="col-md-3 d-flex align-items-center">
                <label htmlFor="txtFileSizeMaximun">File Size Maximun: </label>
            </div>

            <div className="col-md-9 d-flex align-items-center">
                <input 
                    type="number" 
                    className="form-control" 
                    id="txtFileSizeMaximun" 
                    name='file_size_maximun' 
                    onChange={onInputChange}
                />
            </div>


            <div className="col-auto">
                <button className='btn btn-primary' onClick={onSubmit}>Save</button>              
            </div>
        </form>
    )
}

RegisterTasks.propTypes = {
    onNewTask: PropTypes.func
}