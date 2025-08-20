import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const getUsers = () => API.get('/users').then(r => r.data);
export const addUser = (payload) => API.post('/users', payload).then(r => r.data);
export const claimPoints = (payload) => API.post('/claims', payload).then(r => r.data);
export const getLeaderboard = () => API.get('/leaderboard').then(r => r.data);
export const getHistory = () => API.get('/history').then(r => r.data);
