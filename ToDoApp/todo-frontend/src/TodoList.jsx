import { useState } from 'react';
import { Trash2, Check, X, Plus, CheckCircle2, Circle } from 'lucide-react';

const TodoList = () => {
  const [Todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [description, setDescription] = useState('');
  const [celebrateComplete, setCelebrateComplete] = useState(false);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    const created = { 
      id: Date.now(),
      name: newTodo,
      isCompleted: false,
      description: description
    };
    setTodo([...Todo, created]);
    setNewTodo('');
    setDescription('');
  };

  const handleDelete = (id) => {
    setTodo(Todo.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (todo) => {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted 
    };
    
    const updatedList = Todo.map(t => t.id === todo.id ? updatedTodo : t);
    setTodo(updatedList);
    
    const allComplete = updatedList.length > 0 && updatedList.every(t => t.isCompleted);
    if (allComplete && !todo.isCompleted) {
      setCelebrateComplete(true);
      setTimeout(() => setCelebrateComplete(false), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddTodo();
    }
  };

  const completedCount = Todo.filter(t => t.isCompleted).length;
  const totalCount = Todo.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app-container {
          min-height: 100vh;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        /* Animated Background Elements */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.15;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .blob-1 {
          top: 80px;
          left: 40px;
          width: 384px;
          height: 384px;
          background: #000000;
          animation: blob 7s infinite ease-in-out;
        }

        .blob-2 {
          top: 160px;
          right: 40px;
          width: 384px;
          height: 384px;
          background: #000000;
          animation: blob 7s infinite ease-in-out;
          animation-delay: 2s;
        }

        .blob-3 {
          bottom: 80px;
          left: 50%;
          width: 384px;
          height: 384px;
          background: #000000;
          animation: blob 7s infinite ease-in-out;
          animation-delay: 4s;
        }

        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        /* Confetti Animation */
        .confetti {
          position: fixed;
          width: 12px;
          height: 12px;
          animation: confetti-fall linear forwards;
          pointer-events: none;
          z-index: 9999;
        }

        @keyframes confetti-fall {
          0% { 
            transform: translateY(0) rotateZ(0deg); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(100vh) rotateZ(720deg); 
            opacity: 0; 
          }
        }

        /* Main Content Container */
        .content-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        @media (max-width: 768px) {
          .content-container {
            padding: 30px 16px;
          }
        }

        /* Header Section */
        .header {
          text-align: center;
          margin-bottom: 40px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .icon-wrapper {
          display: inline-block;
          margin-bottom: 16px;
        }

        .main-icon {
          background: #000000;
          color: white;
          padding: 14px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .main-icon:hover {
          transform: scale(1.1);
        }

        .title {
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 800;
          color: #000000;
          margin-bottom: 12px;
        }

        .subtitle {
          color: #666666;
          font-size: clamp(1rem, 2vw, 1.125rem);
        }

        /* Progress Card */
        .progress-card {
          max-width: 500px;
          margin: 32px auto 0;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 20px;
          border: 2px solid #e5e5e5;
          transition: all 0.3s ease;
        }

        .progress-card:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .progress-card {
            padding: 16px;
          }
        }

        .progress-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .progress-label {
          font-size: 0.875rem;
          font-weight: 700;
          color: #000000;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .progress-percentage {
          font-size: 1.5rem;
          font-weight: 800;
          color: #000000;
        }

        .progress-bar-bg {
          width: 100%;
          background: #e5e5e5;
          border-radius: 9999px;
          height: 12px;
          overflow: hidden;
        }

        .progress-bar-fill {
          background: #000000;
          height: 100%;
          border-radius: 9999px;
          transition: width 0.7s ease-out;
        }

        .progress-text {
          margin-top: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #666666;
        }

        .progress-count {
          font-weight: 700;
          font-size: 1rem;
          color: #000000;
        }

        /* Add Todo Card */
        .add-todo-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: clamp(20px, 3vw, 28px);
          margin-bottom: 32px;
          border: 2px solid #e5e5e5;
          transition: all 0.3s ease;
        }

        .add-todo-card:hover {
          transform: scale(1.01);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .card-title {
          font-size: clamp(1.25rem, 2.5vw, 1.5rem);
          font-weight: 700;
          color: #000000;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-badge {
          background: #f5f5f5;
          padding: 8px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          color: #000000;
        }

        .input-group {
          margin-bottom: 12px;
        }

        .text-input, .textarea-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          font-size: clamp(0.9rem, 2vw, 1rem);
          background: #ffffff;
          transition: all 0.3s ease;
          outline: none;
          font-family: inherit;
        }

        .text-input:hover, .textarea-input:hover {
          border-color: #cccccc;
        }

        .text-input:focus, .textarea-input:focus {
          border-color: #000000;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
        }

        .textarea-input {
          resize: vertical;
          min-height: 60px;
          max-height: 150px;
        }

        .add-button {
          width: 100%;
          background: #000000;
          color: white;
          font-weight: 700;
          padding: 14px 20px;
          border-radius: 12px;
          border: none;
          font-size: clamp(0.95rem, 2vw, 1.125rem);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .add-button:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .add-button:active:not(:disabled) {
          transform: scale(0.98);
        }

        .add-button:disabled {
          background: #cccccc;
          cursor: not-allowed;
          opacity: 0.6;
        }

        /* Empty State */
        .empty-state {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: clamp(40px, 8vw, 64px) clamp(20px, 4vw, 32px);
          text-align: center;
          border: 2px solid #e5e5e5;
          transition: all 0.3s ease;
        }

        .empty-state:hover {
          transform: scale(1.01);
        }

        .empty-icon {
          color: #e5e5e5;
          margin-bottom: 24px;
          opacity: 0.6;
          animation: float 3s ease-in-out infinite;
        }

        .empty-title {
          color: #000000;
          font-size: clamp(1.25rem, 3vw, 1.5rem);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .empty-subtitle {
          color: #666666;
          font-size: clamp(0.95rem, 2vw, 1.125rem);
        }

        /* Section Headers */
        .section-header {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
          padding: 0 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #000000;
        }

        .section-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #000000;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .section-spacer {
          margin-top: 32px;
        }

        /* Task Card */
        .task-card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          padding: clamp(16px, 3vw, 20px);
          border: 2px solid #e5e5e5;
          transition: all 0.3s ease;
          display: flex;
          align-items: flex-start;
          gap: clamp(12px, 2vw, 16px);
        }

        .task-card:hover {
          transform: scale(1.01);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          border-color: #000000;
        }

        .task-card.completed {
          opacity: 0.6;
        }

        /* Checkbox */
        .checkbox {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 10px;
          border: 2px solid #e5e5e5;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: transparent;
          margin-top: 2px;
        }

        .checkbox:not(.checked):hover {
          border-color: #000000;
          background: #f5f5f5;
          transform: scale(1.1) rotate(12deg);
        }

        .checkbox.checked {
          background: #000000;
          border-color: #000000;
        }

        .checkbox.checked:hover {
          transform: scale(1.1) rotate(12deg);
        }

        /* Task Content */
        .task-content {
          flex: 1;
          min-width: 0;
        }

        .task-title {
          font-size: clamp(1rem, 2vw, 1.125rem);
          font-weight: 700;
          color: #000000;
          transition: all 0.3s ease;
          word-wrap: break-word;
        }

        .task-title.completed {
          color: #999999;
          text-decoration: line-through;
        }

        .task-description {
          font-size: clamp(0.85rem, 1.8vw, 0.875rem);
          margin-top: 8px;
          line-height: 1.5;
          color: #666666;
          transition: all 0.3s ease;
          word-wrap: break-word;
        }

        .task-description.completed {
          color: #999999;
          text-decoration: line-through;
        }

        /* Task Actions */
        .task-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0;
          transition: all 0.3s ease;
          transform: scale(0.95);
          flex-shrink: 0;
        }

        .task-card:hover .task-actions {
          opacity: 1;
          transform: scale(1);
        }

        @media (max-width: 768px) {
          .task-actions {
            opacity: 1;
            transform: scale(1);
          }
        }

        .action-button {
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 700;
          font-size: clamp(0.75rem, 1.8vw, 0.875rem);
          border: 2px solid #e5e5e5;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          background: #ffffff;
          color: #000000;
          white-space: nowrap;
        }

        .action-button:hover {
          transform: scale(1.05);
          border-color: #000000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .action-button:active {
          transform: scale(0.95);
        }

        .delete-button {
          padding: 8px;
          color: #000000;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .delete-button:hover {
          background: #f5f5f5;
          border-color: #e5e5e5;
          transform: scale(1.1);
        }

        .delete-button:active {
          transform: scale(0.95);
        }

        /* Footer */
        .footer {
          margin-top: 48px;
          text-align: center;
        }

        .celebration {
          display: inline-block;
          background: #f5f5f5;
          border: 2px solid #000000;
          border-radius: 12px;
          padding: 16px 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .celebration:hover {
          transform: scale(1.05);
        }

        .celebration-text {
          color: #000000;
          font-weight: 700;
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .emoji-bounce {
          font-size: clamp(1.5rem, 3vw, 1.875rem);
          display: inline-block;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .remaining-text {
          color: #666666;
          font-weight: 500;
          font-size: clamp(1rem, 2vw, 1.125rem);
        }

        .remaining-count {
          color: #000000;
          font-weight: 700;
        }
      `}</style>

      <div className="app-container">
        {/* Animated Background Blobs */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>

        {/* Celebration Confetti */}
        {celebrateComplete && (
          <>
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random()}s`,
                  backgroundColor: i % 2 === 0 ? '#000000' : '#ffffff',
                  border: i % 2 === 0 ? 'none' : '2px solid #000000',
                  borderRadius: Math.random() > 0.5 ? '50%' : '0'
                }}
              ></div>
            ))}
          </>
        )}

        <div className="content-container">
          {/* Header */}
          <div className="header">
            <div className="icon-wrapper">
              <div className="main-icon">
                <CheckCircle2 size={36} />
              </div>
            </div>
            <h1 className="title">TaskFlow</h1>
            <div className="subtitle">
              <span>Organize your life, one task at a time</span>
            </div>

            {/* Progress Card */}
            {totalCount > 0 && (
              <div className="progress-card">
                <div className="progress-header">
                  <span className="progress-label">Progress</span>
                  <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="progress-text">
                  <span className="progress-count">{completedCount}</span> of <span className="progress-count">{totalCount}</span> tasks completed
                </div>
              </div>
            )}
          </div>

          {/* Add Todo Card */}
          <div className="add-todo-card">
            <h2 className="card-title">
              <div className="icon-badge">
                <Plus size={20} />
              </div>
              Create New Task
            </h2>
            <div className="input-group">
              <input
                type="text"
                className="text-input"
                value={newTodo}
                placeholder="What needs to be done?"
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="input-group">
              <textarea
                className="textarea-input"
                value={description}
                placeholder="Add some details... (optional)"
                onChange={(e) => setDescription(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button 
              className="add-button"
              onClick={handleAddTodo}
              disabled={!newTodo.trim()}
            >
              <Plus size={20} />
              <span>Add Task</span>
            </button>
          </div>

          {/* Todo List */}
          {Todo.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Circle size={60} strokeWidth={3} style={{margin: '0 auto'}} />
              </div>
              <p className="empty-title">No tasks yet</p>
              <p className="empty-subtitle">Create your first task to get started on your journey to productivity</p>
            </div>
          ) : (
            <>
              {/* Active Tasks */}
              {Todo.filter(t => !t.isCompleted).length > 0 && (
                <div>
                  <h3 className="section-header">
                    <div className="section-dot"></div>
                    Active Tasks ({Todo.filter(t => !t.isCompleted).length})
                  </h3>
                  <div className="tasks-list">
                    {Todo.filter(t => !t.isCompleted).map(todo => (
                      <TaskCard 
                        key={todo.id} 
                        todo={todo} 
                        onToggle={handleToggleComplete}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Tasks */}
              {Todo.filter(t => t.isCompleted).length > 0 && (
                <div className="section-spacer">
                  <h3 className="section-header">
                    <div className="section-dot"></div>
                    Completed ({Todo.filter(t => t.isCompleted).length})
                  </h3>
                  <div className="tasks-list">
                    {Todo.filter(t => t.isCompleted).map(todo => (
                      <TaskCard 
                        key={todo.id} 
                        todo={todo} 
                        onToggle={handleToggleComplete}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Footer */}
          {totalCount > 0 && (
            <div className="footer">
              {completedCount === totalCount ? (
                <div className="celebration">
                  <span className="celebration-text">
                    <span className="emoji-bounce">🎉</span>
                    Amazing! All tasks completed!
                    <span className="emoji-bounce" style={{animationDelay: '0.15s'}}>✨</span>
                  </span>
                </div>
              ) : (
                <p className="remaining-text">
                  Keep going! <span className="remaining-count">{totalCount - completedCount}</span> task{totalCount - completedCount !== 1 ? 's' : ''} remaining
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const TaskCard = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`task-card ${todo.isCompleted ? 'completed' : ''}`}>
      <button
        className={`checkbox ${todo.isCompleted ? 'checked' : ''}`}
        onClick={() => onToggle(todo)}
      >
        {todo.isCompleted && <Check size={18} color="white" strokeWidth={3} />}
      </button>

      <div className="task-content">
        <h3 className={`task-title ${todo.isCompleted ? 'completed' : ''}`}>
          {todo.name}
        </h3>
        {todo.description && (
          <p className={`task-description ${todo.isCompleted ? 'completed' : ''}`}>
            {todo.description}
          </p>
        )}
      </div>

      <div className="task-actions">
        <button
          className="action-button"
          onClick={() => onToggle(todo)}
        >
          {todo.isCompleted ? (
            <>
              <X size={14} />
              Undo
            </>
          ) : (
            <>
              <Check size={14} />
              Done
            </>
          )}
        </button>
        <button
          className="delete-button"
          onClick={() => onDelete(todo.id)}
          title="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TodoList;