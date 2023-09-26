import { RegisterTasks } from '../../components/RegisterTasks/RegisterTasks';
import { TasksList } from '../../components/Tasks/TasksList';
import { useAuthContext } from "../../context/AuthContext";
import { useTask } from '../../hooks/Tasks/useTask';

export const Tasks = () => {
  const { user } = useAuthContext();
  const { tasks, onAddTask, online } = useTask();

  return (
    <>
      <div className="row">
        <div className="col-md-12  d-flex justify-content-center">
          <h1>ID User: {user?.user.username} </h1>
        </div>
        
        <div className="col-md-12 d-flex justify-content-center">
          <h2>Status: {
              online ? 'Online' : 'Offline'  
          }</h2>
        </div>

        <div className="col-md-6">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Task Finish Date</th>                
              </tr>
            </thead>
            <tbody>
              <TasksList tasks = {tasks}/>
            </tbody>
          </table>
        </div>

        {
          user?.user.role.id === 3 &&
            <div className="col-md-6">
              <h1>Register Form</h1>
              <RegisterTasks onNewTask = { (value) => onAddTask(value) } />
            </div>            
        }
      </div>
    </>
  );
};
