import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api/ToDoItem',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get todo item by ID
export const getTodoItemsById = async (id) => { 
    try {  
    const response = await apiClient.get(`/${id}`);
    return response.data;
    }catch(error) {
    console.error('Error fetching todo item by ID:', error);
    throw error;
  }
};
// Get all todo items
export const getAllTodoItems = async () => {
    try {
        const response = await apiClient.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching todo items:', error);
        throw error;
    }
};
// Create a new todo item post request
export const createTodoItem = async (todoItem) => {
    try {
        const response = await apiClient.post('/', todoItem);
        return response.data;
    } catch (error) {
        console.error('Error creating todo item:', error);
        throw error;
    }
};
// Update an existing todo item put request
export const updateTodoItem = async (id, todoItem) => {
    try {
        const response = await apiClient.put(`/${id}`, todoItem);
        return response.data;
    }catch(error){
        console.error('Error updating todo item:',error);
        throw error;
    }
};
// delete a todo item delete request
export const deleteTodoItem = async (id) => {
    try {
        await apiClient.delete(`/${id}`);
    } catch (error) {
        console.error('Error deleting todo item:', error);
        throw error;
    }
};
