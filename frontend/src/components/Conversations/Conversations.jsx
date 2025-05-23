import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiX, FiPhone, FiMail, FiPaperclip, FiSend } from 'react-icons/fi';
import './Conversations.css';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const convData = await import('../../mockData/conversations.json');
      const guestsData = await import('../../mockData/guests.json');
      
      // Merge guest data with conversations
      const enrichedConversations = convData.conversations.map(conv => {
        const guest = guestsData.guests.find(g => g.id === conv.guestId);
        return { ...conv, guestData: guest };
      });
      
      setConversations(enrichedConversations);
      if (enrichedConversations.length > 0) {
        setSelectedConversation(enrichedConversations[1]); // Select Ea Tipene by default
      }
    };

    loadData();
  }, []);

  const handleTaskToggle = (task) => {
    setSelectedTasks(prev => 
      prev.includes(task) 
        ? prev.filter(t => t !== task)
        : [...prev, task]
    );
  };

  return (
    <div className="conversations">
      <div className="conversations-header">
        <h1>Conversations</h1>
        <div className="header-controls">
          <div className="search-box">
            <FiSearch />
            <input type="text" placeholder="Quick search" />
          </div>
          <button className="filter-btn">
            <FiFilter /> Filter
          </button>
          <div className="status-indicator">
            <span className="status-dot online"></span>
            <span>Online</span>
          </div>
        </div>
      </div>

      <div className="conversations-layout">
        {/* Conversations List */}
        <div className="conversations-list">
          {conversations.map(conv => (
            <div 
              key={conv.id}
              className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''} ${conv.unread ? 'unread' : ''}`}
              onClick={() => setSelectedConversation(conv)}
            >
              <img 
                src={`https://i.pravatar.cc/48?img=${conv.id + 40}`} 
                alt={conv.guest} 
                className="guest-avatar"
              />
              <div className="conversation-info">
                <h4>{conv.guest}</h4>
                <p>{conv.lastMessage}</p>
                {conv.unread && <span className="unread-indicator">2</span>}
              </div>
              {conv.status === 'online' && <span className="online-status"></span>}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selectedConversation && (
            <>
              <div className="chat-header">
                <div className="chat-guest-info">
                  <img 
                    src={`https://i.pravatar.cc/48?img=${selectedConversation.id + 40}`} 
                    alt={selectedConversation.guest} 
                  />
                  <div>
                    <h3>{selectedConversation.guest}</h3>
                    {selectedConversation.room && (
                      <p>Room: {selectedConversation.room} • {selectedConversation.checkIn} — {selectedConversation.checkOut}</p>
                    )}
                  </div>
                  {selectedConversation.status === 'online' && (
                    <span className="online-badge">• Online</span>
                  )}
                </div>
                <button className="create-task-btn" onClick={() => setShowTaskPanel(true)}>
                  Create a task
                </button>
                <button className="close-btn">
                  <FiX />
                </button>
              </div>

              <div className="messages-container">
                {selectedConversation.messages?.map(msg => (
                  <div key={msg.id} className={`message ${msg.sender === 'hotel' ? 'sent' : 'received'}`}>
                    {msg.sender === 'guest' && (
                      <div className="message-header">
                        <span className="message-sender">{selectedConversation.guest}</span>
                        <span className="message-time">{msg.time}</span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                    {msg.images && (
                      <div className="message-images">
                        {msg.images.map((img, i) => (
                          <div key={i} className="image-placeholder"></div>
                        ))}
                      </div>
                    )}
                    {msg.sender === 'hotel' && (
                      <div className="message-footer">
                        <span className="message-sender">Ann Tsibuiski (you) assigned to this conversation</span>
                        <span className="message-time">{msg.time} {msg.reaction && `(Reaction ${msg.reaction} sec)`}</span>
                      </div>
                    )}
                  </div>
                ))}
                {!selectedConversation.messages?.length && (
                  <div className="no-messages">
                    <p>{selectedConversation.status === 'expired' ? 'Expired chats' : 'No messages yet'}</p>
                  </div>
                )}
              </div>

              <div className="message-input">
                <input 
                  type="text" 
                  placeholder="Reply..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button className="attach-btn">
                  <FiPaperclip />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Guest Details Panel */}
        <div className={`guest-panel ${showTaskPanel ? 'show-tasks' : ''}`}>
          {selectedConversation?.guestData && (
            <>
              <div className="guest-header">
                <img 
                  src={`https://i.pravatar.cc/100?img=${selectedConversation.id + 40}`} 
                  alt={selectedConversation.guest} 
                />
                <h2>{selectedConversation.guest}</h2>
                <span className="trusted-badge">Trusted</span>
                <div className="guest-actions">
                  <button><FiPhone /> Call</button>
                  <button><FiMail /> Email</button>
                </div>
              </div>

              <div className="guest-details">
                <div className="detail-tabs">
                  <button className="active">Guest Details</button>
                  <button>Stay Details</button>
                  <button>History</button>
                  <button>Notes</button>
                  <button>Documents</button>
                </div>

                <div className="detail-content">
                  <section>
                    <h4>CONTACT INFORMATION</h4>
                    <div className="detail-row">
                      <label>First Name</label>
                      <span>{selectedConversation.guestData.firstName}</span>
                    </div>
                    <div className="detail-row">
                      <label>Last Name</label>
                      <span>{selectedConversation.guestData.lastName}</span>
                    </div>
                    <div className="detail-row">
                      <label>Email</label>
                      <span>{selectedConversation.guestData.email}</span>
                    </div>
                    <div className="detail-row">
                      <label>Phone</label>
                      <span>{selectedConversation.guestData.phone}</span>
                    </div>
                    <div className="detail-row">
                      <label>Sex</label>
                      <span>{selectedConversation.guestData.sex}</span>
                    </div>
                  </section>

                  <section>
                    <h4>ADDRESS</h4>
                    <div className="detail-row">
                      <label>Country</label>
                      <span>{selectedConversation.guestData.country}</span>
                    </div>
                    <div className="detail-row">
                      <label>City</label>
                      <span>{selectedConversation.guestData.city}</span>
                    </div>
                    <div className="detail-row">
                      <label>Address</label>
                      <span>{selectedConversation.guestData.address}</span>
                    </div>
                  </section>

                  {selectedConversation.guestData.spouse && (
                    <section>
                      <h4>FAMILY MEMBERS</h4>
                      <div className="detail-row">
                        <label>Spouse</label>
                        <span className="family-member">
                          <img src="https://i.pravatar.cc/24?img=60" alt="Spouse" />
                          {selectedConversation.guestData.spouse}
                        </span>
                      </div>
                      {selectedConversation.guestData.children?.map((child, i) => (
                        <div key={i} className="detail-row">
                          <label>Child {i + 1}</label>
                          <span className="family-member">
                            <img src={`https://i.pravatar.cc/24?img=${61+i}`} alt={child} />
                            {child}
                          </span>
                        </div>
                      ))}
                    </section>
                  )}
                </div>

                {showTaskPanel && (
                  <div className="tasks-panel">
                    <h4>Tasks</h4>
                    <div className="task-options">
                      <label>
                        <input 
                          type="checkbox" 
                          onChange={() => handleTaskToggle('clean')}
                          checked={selectedTasks.includes('clean')}
                        />
                        Clean up room
                      </label>
                      <label>
                        <input 
                          type="checkbox"
                          onChange={() => handleTaskToggle('linen')}
                          checked={selectedTasks.includes('linen')}
                        />
                        Change linen and towels when guests are out.
                      </label>
                      <label>
                        <input 
                          type="checkbox"
                          onChange={() => handleTaskToggle('bottle')}
                          checked={selectedTasks.includes('bottle')}
                        />
                        Bring complimentary bottle of red wine
                      </label>
                    </div>
                    <button className="all-tasks-btn">ALL TASKS</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversations;