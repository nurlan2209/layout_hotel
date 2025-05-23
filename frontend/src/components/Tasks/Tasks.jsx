import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiPlus, FiGrid, FiList, FiUser } from 'react-icons/fi';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState({
    inbox: [],
    next: [],
    inProgress: [],
    finished: [],
    failed: []
  });
  const [showCompleted, setShowCompleted] = useState(false);
  const [viewMode, setViewMode] = useState('board');

  useEffect(() => {
    const loadData = async () => {
      const tasksData = await import('../../mockData/tasks.json');
      
      // Group tasks by status
      const groupedTasks = {
        inbox: [],
        next: [],
        inProgress: [],
        finished: [],
        failed: []
      };

      tasksData.tasks.forEach(task => {
        if (groupedTasks[task.status]) {
          groupedTasks[task.status].push(task);
        }
      });

      setTasks(groupedTasks);
    };

    loadData();
  }, []);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return '#e74c3c';
      case 'high': return '#f39c12';
      case 'medium': return '#3498db';
      case 'low': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const renderTask = (task) => (
    <div key={task.id} className="task-card">
      <div className="task-header">
        <h4>{task.title}</h4>
        <div 
          className="task-priority" 
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        />
      </div>
      <p className="task-room">Room {task.room}</p>
      {task.assignee && (
        <div className="task-assignee">
          <img 
            src={`https://i.pravatar.cc/32?img=${task.id + 80}`} 
            alt={task.assignee} 
          />
          <span>{task.assignee}</span>
          {task.dueDate && <span className="due-date">{task.dueDate}</span>}
        </div>
      )}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
    </div>
  );

  return (
    <div className="tasks">
      <div className="tasks-header">
        <h1>Tasks</h1>
        <div className="header-controls">
          <div className="search-box">
            <FiSearch />
            <input type="text" placeholder="Quick search" />
          </div>
          <button className="filter-btn">
            <FiFilter /> Filter
          </button>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            Show completed
          </label>
          <button className="assignees-btn">
            <FiUser /> Assignees
          </button>
          <div className="view-toggle">
            <span>View:</span>
            <button 
              className={viewMode === 'board' ? 'active' : ''}
              onClick={() => setViewMode('board')}
            >
              <FiGrid /> Board
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <FiList /> List
            </button>
          </div>
        </div>
      </div>

      <div className="tasks-board">
        {/* Inbox Column */}
        <div className="task-column">
          <div className="column-header">
            <h3>Inbox <span className="task-count">{tasks.inbox.length}</span></h3>
            <button className="add-task-btn">
              <FiPlus /> New Task
            </button>
          </div>
          <div className="task-list">
            {tasks.inbox.map(renderTask)}
          </div>
        </div>

        {/* Next Column */}
        <div className="task-column">
          <div className="column-header">
            <h3>Next <span className="task-count">{tasks.next.length}</span></h3>
            <button className="add-task-btn">
              <FiPlus /> New Task
            </button>
          </div>
          <div className="task-list">
            {tasks.next.map(renderTask)}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="task-column">
          <div className="column-header">
            <h3>In Progress</h3>
            <button className="add-task-btn">
              <FiPlus /> New Task
            </button>
          </div>
          <div className="task-list">
            {tasks.inProgress.map(renderTask)}
          </div>
        </div>

        {/* Finished Column */}
        <div className="task-column">
          <div className="column-header">
            <h3>Finished <span className="task-count">{tasks.finished.length}</span></h3>
            <button className="add-task-btn">
              <FiPlus /> New Task
            </button>
          </div>
          <div className="task-list">
            {tasks.finished.map(renderTask)}
          </div>
        </div>

        {/* Failed Column */}
        <div className="task-column">
          <div className="column-header">
            <h3>Failed <span className="task-count">{tasks.failed.length}</span></h3>
            <button className="add-task-btn">
              <FiPlus /> New Task
            </button>
          </div>
          <div className="task-list">
            {tasks.failed.map(renderTask)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;