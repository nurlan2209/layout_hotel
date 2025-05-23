import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiMoreHorizontal } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState({
    bookings: [],
    satisfactionRate: {},
    newGuests: {},
    activities: [],
    tasks: []
  });

  useEffect(() => {
    // Load mock data
    const loadData = async () => {
      const bookingsData = await import('../../mockData/bookings.json');
      const activitiesData = await import('../../mockData/activities.json');
      const tasksData = await import('../../mockData/tasks.json');

      setData({
        bookings: bookingsData.bookings,
        satisfactionRate: bookingsData.satisfactionRate,
        newGuests: bookingsData.newGuests,
        activities: activitiesData.activities,
        tasks: tasksData.tasks.filter(t => t.status === 'inbox').slice(0, 3)
      });
    };

    loadData();
  }, []);

  // Calendar data
  const calendarDate = new Date(2018, 8); // September 2018
  const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="overview-btn">Overview ▼</button>
        <div className="dashboard-actions">
          <button className="btn-primary">👤 New Guest</button>
          <button className="btn-outline">📋 New Reservation</button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Satisfaction Rate Card */}
        <div className="card">
          <h3>Satisfaction rate</h3>
          <div className="satisfaction-rate">
            <span className="rate-value">{data.satisfactionRate.current}%</span>
            <span className="rate-change">↑ {data.satisfactionRate.change}%</span>
          </div>
          <div className="satisfaction-emojis">
            <span>😢 {data.satisfactionRate.negative}</span>
            <span>😐 {data.satisfactionRate.neutral}</span>
            <span>😊 {data.satisfactionRate.positive}</span>
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="card chart-card">
          <div className="card-header">
            <h3>Bookings</h3>
            <span className="card-subtitle">MANAGE BOOKINGS</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.bookings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* New Guests Card */}
        <div className="card">
          <h3>New Guests</h3>
          <div className="new-guests-header">
            <span className="guests-value">{data.newGuests.current}</span>
            <span className="guests-change">↑ {data.newGuests.change}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(data.newGuests.current / data.newGuests.goal) * 100}%` }}
            />
          </div>
          <p className="progress-text">This month goal is {data.newGuests.goal}</p>
          <div className="guest-list">
            {data.newGuests.thisMonth?.map((guest, i) => (
              <div key={i} className="guest-item">
                <img src={`https://i.pravatar.cc/40?img=${i+10}`} alt={guest.name} />
                <span className="guest-name">{guest.name}</span>
                <span className="guest-time">{guest.daysAgo} days</span>
              </div>
            ))}
          </div>
          <button className="see-all-btn">SEE ALL GUESTS</button>
        </div>

        {/* Urgent Tasks */}
        <div className="card tasks-card">
          <h3>Urgent & vip tasks</h3>
          {data.tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                <h4>{task.title}</h4>
                <p>Room {task.room}</p>
              </div>
              <div className="task-assignee">
                {task.assignee && (
                  <img src={`https://i.pravatar.cc/32?img=${task.id+20}`} alt={task.assignee} />
                )}
              </div>
            </div>
          ))}
          <button className="see-all-btn">SEE ALL TASKS</button>
        </div>

        {/* Calendar */}
        <div className="card calendar-card">
          <h3>Calendar</h3>
          <div className="calendar-header">
            <span>September</span>
          </div>
          <div className="calendar-grid">
            <div className="weekdays">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="days">
              {[...Array(firstDay)].map((_, i) => (
                <span key={`empty-${i}`} className="empty-day"></span>
              ))}
              {[...Array(daysInMonth)].map((_, i) => (
                <span 
                  key={i+1} 
                  className={`day ${i+1 === 8 ? 'selected' : ''}`}
                >
                  {i+1}
                </span>
              ))}
            </div>
          </div>
          <div className="calendar-events">
            <div className="event-item">
              <h4>September 8</h4>
              <p className="room-info">Room 103</p>
              <div className="guest-avatars">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/24?img=${i+30}`} alt="Guest" />
                ))}
                <span>3 guests</span>
              </div>
              <p className="event-date">Sept 4 — Sept 12</p>
            </div>
            <div className="event-item">
              <p className="room-info">Room 202</p>
              <div className="guest-avatars">
                {[4,5].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/24?img=${i+30}`} alt="Guest" />
                ))}
                <span>2 guests</span>
              </div>
              <p className="event-date">Sept 6— Sept 12</p>
            </div>
            <div className="event-item">
              <p className="room-info">Villa 1</p>
              <div className="guest-avatars">
                {[6,7,8,9,10].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/24?img=${i+30}`} alt="Guest" />
                ))}
                <span>5 guests</span>
              </div>
              <p className="event-date">Sept 4 — Sept 12</p>
            </div>
          </div>
          <p className="calendar-rooms">3 rooms occupied</p>
          <h4 className="calendar-month">October</h4>
        </div>

        {/* Activity Log */}
        <div className="card activity-card">
          <h3>Activity Log</h3>
          {data.activities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-content">
                <p className="activity-room">Room {activity.room}</p>
                <p className="activity-action">
                  {activity.action.includes('Guest') && <strong>Guest </strong>}
                  {activity.action.includes('Maria Peterson') && <strong>Maria Peterson </strong>}
                  {activity.action.replace('Guest ', '').replace('Maria Peterson ', '')}
                </p>
              </div>
              <span className="activity-time">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;