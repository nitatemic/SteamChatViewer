import React from 'react';

const ChatViewer = ({ conversation, isLoading, avatars = {}, showAvatars = false }) => {
  if (isLoading) {
    return (
      <div className="loading">
        <p>Chargement des messages...</p>
      </div>
    );
  }

  if (!conversation || !conversation.messages || conversation.messages.length === 0) {
    return (
      <div className="no-messages">
        <p>Aucun message trouvé dans ce fichier.</p>
      </div>
    );
  }

  // Créer un mapping des participants vers leurs couleurs
  const getParticipantColorClass = (author) => {
    const participantIndex = conversation.participants.indexOf(author);
    return `participant-${participantIndex % 10}`; // Cycle à travers 10 couleurs
  };

  return (
    <div className="chat-messages">
      {conversation.messages.map((message, index) => (
        <div 
          key={index} 
          className={`message ${getParticipantColorClass(message.author)} ${showAvatars ? 'with-avatar' : ''}`}
        >
          {showAvatars && (
            <div className="message-avatar">
              {avatars[message.author] ? (
                <img 
                  src={avatars[message.author]} 
                  alt={`Avatar de ${message.author}`}
                  className="avatar-image"
                />
              ) : (
                <div className="default-avatar">
                  {message.author.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}
          <div className="message-content">
            <div className="message-header">
              <span className="message-author">{message.author}</span>
              <span className="message-time">{message.date} {message.time}</span>
            </div>
            <div className="message-text">{message.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatViewer;
