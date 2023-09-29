import instance from './config'

export const listTasks = async ()=>{
    const {data} = await instance.get("/tasks");
    return data;
}

export const createTask = async (task)=>{
    const {data} = await instance.post("/tasks",task);
    return data;
}

export const updateTask = async (task)=>{
    const {data} = await instance.put(`/tasks/${task.id}`,task);
    return data;
}

export const deleteTask = async (id)=>{
    const {data} = await instance.delete(`/tasks/${id}`);
    return data;
}

export const getTaskByIdAndSlug = async (id, slug)=>{
    const {data} = await instance.get(`/tasks/${id}/${slug}`);
    return data;
}