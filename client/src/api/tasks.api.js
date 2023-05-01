import axios from 'axios';

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/task/api/v1/task/'
})

export const getAllTasks = () => tasksApi.get('/')
export const getTask = (id) => tasksApi.get(`/${id}`)
export const createTask = (task) => tasksApi.post('/', task)
export const deleteTask = (id) => tasksApi.delete(`/${id}`) // esta forma se llama interpolacion de JavaScript
export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task)