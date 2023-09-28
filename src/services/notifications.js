import instance from "./config";

export const getNotificationsService = async({id})=>{
   const {data} = await instance.get(`notifications/${id}`);
    return data;
}