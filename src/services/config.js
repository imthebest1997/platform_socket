import axios from 'axios';
import {getToken} from '../helpers/helpers'

const token = getToken();

const instance = axios.create({
    baseURL:'http://localhost:1337/api',
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export default instance;