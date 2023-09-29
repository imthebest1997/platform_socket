import { useInfoTask } from "../../hooks/Tasks/useInfoTask"

export const InfoTask = () => {
  
  const {task, handleBackPage} = useInfoTask();

  return (
    <>
      <h1>InfoTask</h1>
      {task && (
        <div className="row">
          <div className="col-10">
            <h3> <b>ID: </b> {task.id}</h3>
            <h3> <b>Title: </b> {task.title}</h3>
            <h5> <b>Content: </b>  {task.content}</h5>
            <h5> <b>Finish Date: </b>  {task.task_finish_date}</h5>
            <button 
              className="btn btn-outline-dark"
              onClick={handleBackPage}
            >
              Regresar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
