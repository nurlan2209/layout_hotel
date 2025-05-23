import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiList, FiGrid, FiCalendar } from 'react-icons/fi';
import './Rooms.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const loadData = async () => {
      const roomsData = await import('../../mockData/rooms.json');
      setRooms(roomsData.rooms);
    };

    loadData();
  }, []);

  // Group rooms by type
  const standardRooms = rooms.filter(r => r.type === 'Standard');
  const superiorRooms = rooms.filter(r => r.type === 'Superior');
  const villas = rooms.filter(r => r.type === 'Villa');

  // Timeline view data
  const timelineData = [
    { room: '103', guest: 'Keniesha Wood', dates: 'Jun 17 - Jun 30', color: '#90c695' },
    { room: '105', guest: 'Alex Walker', dates: 'Jun 18 - Jun 24', color: '#90c695' },
    { room: '107', guest: 'New guest', dates: 'Jun 23 - Jun 24', color: '#5bc0de' },
    { room: '202', guest: 'Usha Oliver', dates: 'Jun 10 - Jul 5', color: '#90c695' },
    { room: 'Villa 2', guest: 'Sung Jin-Shil', dates: 'Jun 22 - Jun 24', color: '#90c695' }
  ];

  const renderGridView = () => (
    <>
      {/* Standard Rooms */}
      <div className="room-section">
        <h3>STANDARD ROOMS</h3>
        <div className="rooms-grid">
          {standardRooms.map(room => (
            <div key={room.id} className={`room-card ${room.status}`}>
              <h4>Room {room.number}</h4>
              {room.status === 'occupied' && room.currentGuests.length > 0 && (
                <div className="guest-avatars">
                  {room.currentGuests.map((guest, i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/32?img=${room.id + i + 90}`} 
                      alt={guest} 
                    />
                  ))}
                </div>
              )}
              {room.checkInDate && (
                <p className="dates">{room.checkInDate.split('-')[1]} {room.checkInDate.split('-')[2]} - {room.checkOutDate.split('-')[1]} {room.checkOutDate.split('-')[2]}</p>
              )}
              {room.status === 'maintenance' && (
                <div className="maintenance-badge">🔧</div>
              )}
              {room.status === 'occupied' && (
                <div className="occupied-indicator">!</div>
              )}
              {room.status === 'available' && (
                <div className="available-indicator">🔗</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Superior Rooms */}
      <div className="room-section">
        <h3>SUPERIOR ROOMS</h3>
        <div className="rooms-grid">
          {superiorRooms.map(room => (
            <div key={room.id} className={`room-card ${room.status}`}>
              <h4>Room {room.number}</h4>
              {room.status === 'occupied' && room.currentGuests.length > 0 && (
                <div className="guest-avatars">
                  {room.currentGuests.map((guest, i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/32?img=${room.id + i + 90}`} 
                      alt={guest} 
                    />
                  ))}
                </div>
              )}
              {room.checkInDate && (
                <p className="dates">{room.checkInDate.split('-')[1]} {room.checkInDate.split('-')[2]} - {room.checkOutDate.split('-')[1]} {room.checkOutDate.split('-')[2]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Villas */}
      <div className="room-section">
        <h3>VILLAS</h3>
        <div className="rooms-grid villas-grid">
          {villas.map(room => (
            <div key={room.id} className={`room-card villa ${room.status}`}>
              {room.status === 'maintenance' && (
                <div className="maintenance-banner">
                  Bring extra bed<br/>
                  TV is not working
                </div>
              )}
              <h4>{room.number}</h4>
              {room.status === 'occupied' && room.currentGuests.length > 0 && (
                <div className="guest-avatars">
                  {room.currentGuests.map((guest, i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/32?img=${room.id + i + 90}`} 
                      alt={guest} 
                    />
                  ))}
                </div>
              )}
              {room.checkInDate && (
                <p className="dates">{room.checkInDate.split('-')[1]} {room.checkInDate.split('-')[2]} - {room.checkOutDate.split('-')[1]} {room.checkOutDate.split('-')[2]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Beach Illustration */}
      <div className="beach-illustration">
        <div className="sun"></div>
        <div className="clouds">
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
        </div>
        <div className="water"></div>
        <div className="sand"></div>
      </div>
    </>
  );

  const renderTimelineView = () => {
    const days = ['Thu 17', 'Fri 18', 'Sat 19', 'Sun 20', 'Mon 21', 'Tue 22', 'Wed 23', 'Thu 24', 'Fri 25', 'Sat 26', 'Sun 27', 'Mon 28', 'Tue 29', 'Wed 30', 'Thu 01', 'Fri 02', 'Sat 03', 'Sun 04'];
    const percentages = ['10%', '20%', '20%', '20%', '20%', '40%', '40%', '40%', '30%', '20%', '20%', '20%', '20%', '20%', '10%', '10%', '10%', '10%'];

    return (
      <div className="timeline-view">
        <div className="timeline-header">
          <span className="timeline-date">Jun 2018</span>
          <span className="timeline-date today">Today</span>
          <span className="timeline-date">Jul 2018</span>
        </div>
        
        <div className="timeline-grid">
          <div className="timeline-labels">
            <div className="label-section">STANDARD ROOMS</div>
            {standardRooms.map(room => (
              <div key={room.id} className="room-label">Room {room.number}</div>
            ))}
            <div className="label-section">SUPERIOR ROOMS</div>
            {superiorRooms.map(room => (
              <div key={room.id} className="room-label">Room {room.number}</div>
            ))}
            <div className="label-section">VILLAS</div>
            {villas.map(room => (
              <div key={room.id} className="room-label">{room.number}</div>
            ))}
          </div>

          <div className="timeline-content">
            <div className="timeline-header-days">
              {days.map((day, i) => (
                <div key={i} className="day-header">
                  <div className="day-label">{day}</div>
                  <div className="occupancy-rate">{percentages[i]}</div>
                </div>
              ))}
            </div>

            <div className="timeline-rows">
              {/* Standard Rooms Timeline */}
              <div className="timeline-section-row"></div>
              {standardRooms.map(room => (
                <div key={room.id} className="timeline-row">
                  {room.number === '103' && (
                    <div className="booking-bar" style={{ gridColumn: '1 / 14', backgroundColor: '#90c695' }}>
                      Keniesha Wood
                    </div>
                  )}
                  {room.number === '105' && (
                    <div className="booking-bar" style={{ gridColumn: '2 / 8', backgroundColor: '#90c695' }}>
                      Alex Walker
                    </div>
                  )}
                  {room.number === '107' && (
                    <div className="booking-bar" style={{ gridColumn: '6 / 8', backgroundColor: '#5bc0de' }}>
                      New guest →
                    </div>
                  )}
                </div>
              ))}

              {/* Superior Rooms Timeline */}
              <div className="timeline-section-row"></div>
              {superiorRooms.map(room => (
                <div key={room.id} className="timeline-row">
                  {room.number === '202' && (
                    <div className="booking-bar" style={{ gridColumn: '1 / 19', backgroundColor: '#90c695' }}>
                      Usha Oliver
                    </div>
                  )}
                </div>
              ))}

              {/* Villas Timeline */}
              <div className="timeline-section-row"></div>
              {villas.map(room => (
                <div key={room.id} className="timeline-row">
                  {room.number === 'Villa 2' && (
                    <div className="booking-bar" style={{ gridColumn: '6 / 8', backgroundColor: '#90c695' }}>
                      Sung Jin-Shil
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rooms">
      <div className="rooms-header">
        <h1>Rooms</h1>
        <div className="header-controls">
          <div className="search-box">
            <FiSearch />
            <input type="text" placeholder="Quick search" />
          </div>
          <button className="filter-btn">
            <FiFilter /> Filter
          </button>
          <div className="view-toggle">
            <span>View:</span>
            <button 
              className={viewMode === 'timeline' ? 'active' : ''}
              onClick={() => setViewMode('timeline')}
            >
              <FiList /> Timeline
            </button>
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid /> Scheme
            </button>
          </div>
        </div>
      </div>

      <div className="rooms-content">
        {viewMode === 'grid' ? renderGridView() : renderTimelineView()}
      </div>
    </div>
  );
};

export default Rooms;