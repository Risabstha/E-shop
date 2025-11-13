import api from "../Api.ts";

export const registerUser = async(userData: { username: string; email: string; phone: string; password: string }) => {
    const response = await api.post('/api/auth/register', userData);    // api is axios instance
    return response;
    // return response.data;  // it excludes status from backend   
}


export const loginUser = async(credentials: { email: string; password: string }) => {
    const response = await api.post('/api/auth/login', credentials);    // api is axios instance
    return response;
}

export const updateUser = async(userData: { username?: string; email?: string; phone?: string }, userId: string, token: string) => {
    const response = await api.put(`/api/user/userUpdate/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
}