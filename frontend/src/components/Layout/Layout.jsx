import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiMessageCircle, 
  FiUsers, 
  FiCheckSquare, 
  FiGrid,
  FiSettings,
  FiHelpCircle
} from 'react-icons/fi';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/conversations', icon: FiMessageCircle, label: 'Conversations' },
    { path: '/guests', icon: FiUsers, label: 'Guests' },
    { path: '/tasks', icon: FiCheckSquare, label: 'Tasks' },
    { path: '/rooms', icon: FiGrid, label: 'Rooms' }
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">💎</div>
        </div>
        
        <nav className="nav-menu">
          {navItems.map(item => (
            <NavLink 
              key={item.path}
              to={item.path} 
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
            >
              <item.icon size={20} />
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <FiSettings size={20} />
          </button>
          <button className="nav-item">
            <FiHelpCircle size={20} />
          </button>
          <div className="user-avatar">
            <img src="https://i.pravatar.cc/150?img=3" alt="User" />
          </div>
        </div>
      </aside>

      <div className="main-container">
        <header className="header">
          <div className="header-left">
            <span className="update-status">Updates</span>
          </div>
          <div className="header-right">
            <span className="session-time">Session: 34 minutes</span>
            <span className="user-name">User: Ann Tsibuiski</span>
          </div>
        </header>

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;