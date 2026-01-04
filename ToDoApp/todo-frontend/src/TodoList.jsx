import {useEffect, useState} from 'react';
import {
  getAllTodoItems,
  createTodoItem,
  deleteTodoItem,
  updateTodoItem
} from './services/todoApi';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const data = await getAllTodoItems();
      console.log('Fetched todos:', data);
      console.log('Todo Ids:', data.map(t => t.id)); // Changed to lowercase
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const created = await createTodoItem({ 
        name: newTodo,           // Changed to lowercase
        isCompleted: false,       // Already camelCase
        description: ""
      });
      console.log('Created todo:', created);
      setTodos([...todos, created]);
      setNewTodo('');
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodoItem(id);
      setTodos(todos.filter(todo => todo.id !== id)); // Changed to lowercase
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const handleToggleComplete = async (todo) => {
  try {
    console.log('Toggling todo:', todo);
    const updated = await updateTodoItem(todo.id, { 
      ...todo, 
      isCompleted: !todo.isCompleted 
    });
    console.log('Updated todo received:', updated);
    setTodos(todos.map(t => t.id === todo.id ? updated : t));
  } catch (err) {
    console.error('Failed to update todo:', err);
  }
};
  return (
    <div style={{ padding: '20px' }}>
      <h2>My Todo List</h2>

      <input
        type="text"
        value={newTodo}
        placeholder="Enter new todo"
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginTop: '10px' }}> {/* Changed to lowercase */}
            <span
              style={{
                textDecoration: todo.isCompleted ? 'line-through' : 'none',
                marginRight: '10px'
              }}
            >
              {todo.name} {/* Changed to lowercase */}
            </span>
            <button onClick={() => handleToggleComplete(todo)}>
              {todo.isCompleted ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '5px' }}> {/* Changed to lowercase */}
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;