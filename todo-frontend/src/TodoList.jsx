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
          background: #f8f8f8;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        /* Subtle gradient overlay */
        .app-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(248,248,248,0) 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* Animated Background Elements - more subtle */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.03;
          mix-blend-mode: normal;
          pointer-events: none;
        }

        .blob-1 {
          top: 10%;
          left: -10%;
          width: 600px;
          height: 600px;
          background: #000000;
          animation: blob 20s infinite ease-in-out;
        }

        .blob-2 {
          top: 40%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: #000000;
          animation: blob 25s infinite ease-in-out;
          animation-delay: 5s;
        }

        .blob-3 {
          bottom: -10%;
          left: 30%;
          width: 550px;
          height: 550px;
          background: #000000;
          animation: blob 30s infinite ease-in-out;
          animation-delay: 10s;
        }

        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(50px, -30px) scale(1.05); }
          66% { transform: translate(-30px, 40px) scale(0.95); }
        }

        /* Confetti Animation */
        .confetti {
          position: fixed;
          width: 8px;
          height: 8px;
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
          max-width: 900px;
          margin: 0 auto;
          padding: clamp(60px, 10vw, 100px) clamp(24px, 5vw, 40px);
          z-index: 1;
        }

        @media (max-width: 768px) {
          .content-container {
            padding: 40px 20px;
          }
        }

        /* Header Section */
        .header {
          text-align: center;
          margin-bottom: clamp(60px, 10vw, 80px);
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .icon-wrapper {
          display: inline-block;
          margin-bottom: 24px;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .main-icon {
          background: #000000;
          color: white;
          padding: 20px;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .main-icon:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 300;
          color: #000000;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .subtitle {
          color: #666666;
          font-size: clamp(1rem, 2vw, 1.125rem);
          font-weight: 300;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          font-size: 0.875rem;
        }

        /* Progress Card */
        .progress-card {
          max-width: 600px;
          margin: 48px auto 0;
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          padding: clamp(28px, 4vw, 36px);
          border: 1px solid #e8e8e8;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .progress-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 768px) {
          .progress-card {
            padding: 24px;
          }
        }

        .progress-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .progress-label {
          font-size: 0.75rem;
          font-weight: 400;
          color: #999999;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .progress-percentage {
          font-size: 2rem;
          font-weight: 300;
          color: #000000;
          letter-spacing: -0.02em;
        }

        .progress-bar-bg {
          width: 100%;
          background: #f0f0f0;
          border-radius: 1px;
          height: 2px;
          overflow: hidden;
        }

        .progress-bar-fill {
          background: #000000;
          height: 100%;
          border-radius: 1px;
          transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .progress-text {
          margin-top: 16px;
          font-size: 0.875rem;
          font-weight: 300;
          color: #999999;
          letter-spacing: 0.02em;
        }

        .progress-count {
          font-weight: 400;
          font-size: 0.875rem;
          color: #000000;
        }

        /* Add Todo Card */
        .add-todo-card {
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          padding: clamp(32px, 4vw, 40px);
          margin-bottom: 60px;
          border: 1px solid #e8e8e8;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .add-todo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }

        .card-title {
          font-size: clamp(1.5rem, 3vw, 1.75rem);
          font-weight: 300;
          color: #000000;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 16px;
          letter-spacing: -0.01em;
        }

        .icon-badge {
          background: #f8f8f8;
          padding: 10px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          color: #000000;
          transition: all 0.3s ease;
        }

        .card-title:hover .icon-badge {
          background: #000000;
          color: #ffffff;
        }

        .input-group {
          margin-bottom: 16px;
        }

        .text-input, .textarea-input {
          width: 100%;
          padding: 16px 0;
          border: none;
          border-bottom: 1px solid #e8e8e8;
          font-size: clamp(1rem, 2vw, 1.125rem);
          background: transparent;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
          font-family: inherit;
          font-weight: 300;
          color: #000000;
        }

        .text-input::placeholder, .textarea-input::placeholder {
          color: #cccccc;
          font-weight: 300;
        }

        .text-input:hover, .textarea-input:hover {
          border-bottom-color: #cccccc;
        }

        .text-input:focus, .textarea-input:focus {
          border-bottom-color: #000000;
        }

        .textarea-input {
          resize: vertical;
          min-height: 80px;
          max-height: 200px;
          font-size: 1rem;
        }

        .add-button {
          width: 100%;
          background: #000000;
          color: white;
          font-weight: 400;
          padding: 18px 32px;
          border-radius: 2px;
          border: none;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 24px;
        }

        .add-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .add-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .add-button:disabled {
          background: #e8e8e8;
          color: #999999;
          cursor: not-allowed;
          opacity: 0.6;
        }

        /* Empty State */
        .empty-state {
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          padding: clamp(60px, 10vw, 100px) clamp(32px, 5vw, 48px);
          text-align: center;
          border: 1px solid #e8e8e8;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        .empty-state:hover {
          transform: translateY(-2px);
        }

        .empty-icon {
          color: #e8e8e8;
          margin-bottom: 32px;
          opacity: 0.4;
          animation: float 6s ease-in-out infinite;
        }

        .empty-title {
          color: #000000;
          font-size: clamp(1.5rem, 3vw, 1.75rem);
          font-weight: 300;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .empty-subtitle {
          color: #999999;
          font-size: clamp(1rem, 2vw, 1.125rem);
          font-weight: 300;
          line-height: 1.6;
          max-width: 500px;
          margin: 0 auto;
        }

        /* Section Headers */
        .section-header {
          font-size: 0.75rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #999999;
          animation: fadeInUp 1s ease-out both;
        }

        .section-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #000000;
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-spacer {
          margin-top: 60px;
        }

        /* Task Card */
        .task-card {
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          padding: clamp(24px, 4vw, 32px);
          border: 1px solid #e8e8e8;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: flex-start;
          gap: clamp(16px, 3vw, 24px);
          animation: fadeInUp 0.6s ease-out both;
        }

        .task-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          border-color: #d0d0d0;
        }

        .task-card.completed {
          opacity: 0.5;
        }

        /* Checkbox */
        .checkbox {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #e8e8e8;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: transparent;
          margin-top: 2px;
        }

        .checkbox:not(.checked):hover {
          border-color: #000000;
          background: #f8f8f8;
          transform: scale(1.05);
        }

        .checkbox.checked {
          background: #000000;
          border-color: #000000;
        }

        .checkbox.checked:hover {
          transform: scale(1.05);
        }

        /* Task Content */
        .task-content {
          flex: 1;
          min-width: 0;
        }

        .task-title {
          font-size: clamp(1.125rem, 2.5vw, 1.25rem);
          font-weight: 300;
          color: #000000;
          transition: all 0.3s ease;
          word-wrap: break-word;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }

        .task-title.completed {
          color: #cccccc;
          text-decoration: line-through;
        }

        .task-description {
          font-size: clamp(0.875rem, 2vw, 1rem);
          margin-top: 12px;
          line-height: 1.6;
          color: #999999;
          transition: all 0.3s ease;
          word-wrap: break-word;
          font-weight: 300;
        }

        .task-description.completed {
          color: #cccccc;
          text-decoration: line-through;
        }

        /* Task Actions */
        .task-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(10px);
          flex-shrink: 0;
        }

        .task-card:hover .task-actions {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 768px) {
          .task-actions {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .action-button {
          padding: 10px 20px;
          border-radius: 2px;
          font-weight: 400;
          font-size: 0.75rem;
          border: 1px solid #e8e8e8;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: #ffffff;
          color: #000000;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .action-button:hover {
          transform: translateY(-1px);
          border-color: #000000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .action-button:active {
          transform: translateY(0);
        }

        .delete-button {
          padding: 10px;
          color: #999999;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 2px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .delete-button:hover {
          background: #f8f8f8;
          border-color: #e8e8e8;
          color: #000000;
          transform: scale(1.05);
        }

        .delete-button:active {
          transform: scale(0.95);
        }

        /* Footer */
        .footer {
          margin-top: 80px;
          text-align: center;
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        .celebration {
          display: inline-block;
          background: #000000;
          border: 1px solid #000000;
          border-radius: 2px;
          padding: 24px 48px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .celebration:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .celebration-text {
          color: #ffffff;
          font-weight: 300;
          font-size: clamp(1.125rem, 2.5vw, 1.375rem);
          display: flex;
          align-items: center;
          gap: 16px;
          letter-spacing: -0.01em;
        }

        .emoji-bounce {
          font-size: clamp(1.5rem, 3vw, 1.875rem);
          display: inline-block;
          animation: bounce 1.5s infinite ease-in-out;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .remaining-text {
          color: #999999;
          font-weight: 300;
          font-size: clamp(1rem, 2vw, 1.125rem);
          letter-spacing: 0.01em;
        }

        .remaining-count {
          color: #000000;
          font-weight: 400;
        }

        /* Stagger animation for task cards */
        .task-card:nth-child(1) { animation-delay: 0s; }
        .task-card:nth-child(2) { animation-delay: 0.1s; }
        .task-card:nth-child(3) { animation-delay: 0.2s; }
        .task-card:nth-child(4) { animation-delay: 0.3s; }
        .task-card:nth-child(5) { animation-delay: 0.4s; }
        .task-card:nth-child(n+6) { animation-delay: 0.5s; }
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