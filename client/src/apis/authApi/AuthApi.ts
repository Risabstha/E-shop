import api from "../Api.ts";

export const registerUser = async(userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', userData);    // api is axios instance
    return response.data;
}


export const loginUser = async(credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);    // api is axios instance
    return response.data;
}