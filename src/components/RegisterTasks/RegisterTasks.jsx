import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {useForm} from "../../hooks/useForm"

export const RegisterTasks = ({onNewTask}) => {
    
    const {formState, onInputChange, title, content, task_finish_date, file_size_maximun, accepted_files, course, lessons} = useForm({
        title: '',
        content: '',
        task_finish_date: "",
        file_size_maximun: "",
        accepted_files: "",
        lessons: "",
        course: "",
        user_created: 536
    });
    
    const [lessonsByCourse, setLessonsByCourse] = useState([]);
    const [students, setStudents] = useState([]);
    
    const getLessonsAndStudentsByCourse = async (course) => {
        const studentIds = [];
        course = parseInt(course);
        const url = 'http://localhost:5173/src/resources/cohorts.json';
        const resp = await fetch(url);
        const data = await resp.json();
        const filteredData = data.filter(item => item.course_id === course);
        // Extrae el arreglo de lessons de los objetos filtrados
        const studentsArray = filteredData.map(item => item.students);
        const lessonsArray = filteredData.map(item => item.lessons);

        // const students = lessonsArray[0];
        for(let {id} of studentsArray[0]){
            studentIds.push(id);
        }        
        // Extrae el arreglo de lessons de los objetos filtrados
        setStudents(studentIds);
        setLessonsByCourse(lessonsArray[0]);
    }

    useEffect(() => {        
        if(course != '')
            getLessonsAndStudentsByCourse(course)
    }, [course])
    

    const onSubmit = (event)=>{
        event.preventDefault();
        if(title == "" || content == '' || task_finish_date == '' || file_size_maximun == '' || accepted_files == "" || lessons == "") return toast.error("El registro no esta completo, verifique los campos");
        onNewTask(formState, students);        
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
                    type="datetime-local" 
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
                <label htmlFor="txtCursos"> Cursos: </label>
            </div>

            <div className="col-md-9 d-flex align-items-center">
                <select name="course" id="txtCursos" className="form-control"  onChange={onInputChange}>
                    <option value=""> -- Seleccione un curso --</option>
                    <option value = {24}  > Cuarto 24 </option>
                    <option value=  {4}  > Inicial II </option>
                    <option value=  {21} > Cuarto A Test </option>
                    <option value=  {22} > Cuarto B Test </option>
                </select>
            </div>


            <div className="col-md-3 d-flex align-items-center">
                <label htmlFor="txtLessons"> Clase: </label>
            </div>

            <div className="col-md-9 d-flex align-items-center">
                <select name="lessons" id="txtLessons" className="form-control"  onChange={onInputChange}>
                    <option value=""> -- Seleccione una clase --</option>
                    {
                        lessonsByCourse.map((lesson)=>{
                            return (
                                <option value={lesson} key={lesson}> {lesson} </option>
                            )
                        })
                    }
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
    onNewTask: PropTypes.func,
}