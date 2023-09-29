import instance from "./config";

export const getNotificationsService = async({id})=>{
   const {data} = await instance.get(`notifications/${id}`);
    return data;
}

export const updateNotificationService = async({id})=>{
    const {data} = await instance.put(`notifications/${id}`);
    return data;
}

export const deleteNotificationService = async({id})=>{
    const {data} = await instance.delete(`notifications/${id}`);
    return data;
}

export const createNotificationService = async({id})=>{
    const {data} = await instance.post(`notifications/${id}`);
    return data;
}