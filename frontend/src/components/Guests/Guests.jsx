import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiX, FiEdit2, FiDollarSign } from 'react-icons/fi';
import './Guests.css';

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [showAllGuests, setShowAllGuests] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const guestsData = await import('../../mockData/guests.json');
      setGuests(guestsData.guests);
    };

    loadData();
  }, []);

  const recentGuests = guests.slice(0, 8);
  const displayedGuests = showAllGuests ? guests : recentGuests;

  const getGroupColor = (group) => {
    switch(group) {
      case 'Trusted': return '#27ae60';
      case 'Previous': return '#3498db';
      case 'New': return '#f39c12';
      default: return '#666';
    }
  };

  return (
    <div className="guests">
      <div className="guests-header">
        <h1>Guests</h1>
        <div className="header-controls">
          <div className="search-box">
            <FiSearch />
            <input type="text" placeholder="Quick search" />
          </div>
          <button className="filter-btn">
            <FiFilter /> Filter
          </button>
        </div>
      </div>

      <div className="guests-content">
        <div className="guests-table-container">
          <h2>{showAllGuests ? 'All Guests' : 'Most Recent'}</h2>
          <table className="guests-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Reservations</th>
                <th>Nights stayed</th>
                <th>Last visit</th>
                <th>Group</th>
              </tr>
            </thead>
            <tbody>
              {displayedGuests.map((guest) => (
                <tr key={guest.id} onClick={() => setSelectedGuest(guest)}>
                  <td>
                    <img src={`https://i.pravatar.cc/40?img=${guest.id + 50}`} alt={guest.firstName} />
                  </td>
                  <td>{guest.firstName} {guest.lastName}</td>
                  <td>{guest.reservations}</td>
                  <td>{guest.nightsStayed}</td>
                  <td>{new Date(guest.lastVisit).toLocaleDateString()}</td>
                  <td>
                    <span 
                      className="group-badge" 
                      style={{ backgroundColor: getGroupColor(guest.group) }}
                    >
                      {guest.group}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {!showAllGuests && (
            <div className="show-all-section">
              <h2>All Guests</h2>
              <table className="guests-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Reservations</th>
                    <th>Nights stayed</th>
                    <th>Last visit</th>
                    <th>Group</th>
                  </tr>
                </thead>
              </table>
              <button 
                className="show-all-btn"
                onClick={() => setShowAllGuests(true)}
              >
                Show all guests
              </button>
            </div>
          )}
        </div>

        {selectedGuest && (
          <div className="guest-modal">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close-modal" onClick={() => setSelectedGuest(null)}>
                  <FiX />
                </button>
                <div className="modal-actions">
                  <button className="btn-outline">
                    <FiEdit2 /> New Reservation
                  </button>
                  <button className="btn-outline">
                    <FiDollarSign /> Payment
                  </button>
                </div>
              </div>

              <div className="guest-profile">
                <img 
                  src={`https://i.pravatar.cc/120?img=${selectedGuest.id + 50}`} 
                  alt={selectedGuest.firstName} 
                />
                <h2>{selectedGuest.firstName} {selectedGuest.lastName}</h2>
                <span 
                  className="group-badge large" 
                  style={{ backgroundColor: getGroupColor(selectedGuest.group) }}
                >
                  {selectedGuest.group}
                </span>
              </div>

              <div className="guest-tabs">
                <button className="tab active">Guest Details</button>
                <button className="tab">Stay Details</button>
                <button className="tab">History</button>
                <button className="tab">Notes</button>
                <button className="tab">Documents</button>
              </div>

              <div className="guest-info">
                <section>
                  <h3>CONTACT INFORMATION</h3>
                  <div className="info-row">
                    <label>First Name</label>
                    <span>{selectedGuest.firstName}</span>
                  </div>
                  <div className="info-row">
                    <label>Last Name</label>
                    <span>{selectedGuest.lastName}</span>
                  </div>
                  <div className="info-row">
                    <label>Email</label>
                    <span>{selectedGuest.email}</span>
                  </div>
                  <div className="info-row">
                    <label>Phone</label>
                    <span>{selectedGuest.phone}</span>
                  </div>
                  <div className="info-row">
                    <label>Sex</label>
                    <span>{selectedGuest.sex}</span>
                  </div>
                  {selectedGuest.phone && (
                    <div className="info-row">
                      <label>Phone</label>
                      <span>{selectedGuest.phone}</span>
                    </div>
                  )}
                </section>

                <section>
                  <h3>ADDRESS</h3>
                  <div className="info-row">
                    <label>Country</label>
                    <span>{selectedGuest.country}</span>
                  </div>
                  <div className="info-row">
                    <label>City</label>
                    <span>{selectedGuest.city}</span>
                  </div>
                  <div className="info-row">
                    <label>Address</label>
                    <span>{selectedGuest.address}</span>
                  </div>
                </section>

                {selectedGuest.spouse && (
                  <section>
                    <h3>FAMILY MEMBERS</h3>
                    <div className="info-row">
                      <label>Spouse</label>
                      <div className="family-member">
                        <img src="https://i.pravatar.cc/24?img=70" alt="Spouse" />
                        <span>{selectedGuest.spouse}</span>
                      </div>
                    </div>
                    {selectedGuest.children?.map((child, i) => (
                      <div key={i} className="info-row">
                        <label>Child {i + 1}</label>
                        <div className="family-member">
                          <img src={`https://i.pravatar.cc/24?img=${71+i}`} alt={child} />
                          <span>{child}</span>
                        </div>
                      </div>
                    ))}
                  </section>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guests;