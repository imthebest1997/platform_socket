import PropTypes from "prop-types";

export const TasksList = ({tasks = []}) => {
    return (
        tasks.map((task)=>
             (
              <tr key={task.id}>
                <td> { task.id }</td>
                <td> { task.title }</td>
                <td> { task.content }</td>
                <td> { task.task_finish_date }</td>
              </tr>
            )
        )
    )
}

TasksList.propTypes = {
    tasks: PropTypes.array.isRequired
}