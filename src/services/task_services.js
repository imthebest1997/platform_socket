import instance from './config'

export const listTasks = async ()=>{
    const {data} = await instance.get("/tasks");
    return data;
}
