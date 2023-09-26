import axios from 'axios'

export const listTasks = async (token)=>{
    try {
        const response = await axios({
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "get",
        url: "http://localhost:1337/api/tasks",
        });
        setTasks(response.data);
      } catch (error) {
          toast.error(error);
      }
}
