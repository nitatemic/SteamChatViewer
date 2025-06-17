import React, { useState, useEffect } from 'react';

const AvatarManager = ({ participants, onAvatarsChange, showAvatars, onToggleAvatars }) => {
  const [avatars, setAvatars] = useState({});
  const [dragOver, setDragOver] = useState('');

  useEffect(() => {
    // Charger les avatars depuis le localStorage
    const savedAvatars = localStorage.getItem('steamChatAvatars');
    if (savedAvatars) {
      try {
        const parsedAvatars = JSON.parse(savedAvatars);
        setAvatars(parsedAvatars);
        onAvatarsChange(parsedAvatars);
      } catch (error) {
        console.error('Erreur lors du chargement des avatars:', error);
      }
    }
  }, [onAvatarsChange]);

  const saveAvatars = (newAvatars) => {
    localStorage.setItem('steamChatAvatars', JSON.stringify(newAvatars));
    setAvatars(newAvatars);
    onAvatarsChange(newAvatars);
  };

  const handleFileUpload = (participant, file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newAvatars = {
        ...avatars,
        [participant]: e.target.result
      };
      saveAvatars(newAvatars);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (participant, e) => {
    e.preventDefault();
    setDragOver('');
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(participant, files[0]);
    }
  };

  const handleDragOver = (participant, e) => {
    e.preventDefault();
    setDragOver(participant);
  };

  const handleDragLeave = () => {
    setDragOver('');
  };

  const removeAvatar = (participant) => {
    const newAvatars = { ...avatars };
    delete newAvatars[participant];
    saveAvatars(newAvatars);
  };

  const clearAllAvatars = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous les avatars ?')) {
      saveAvatars({});
    }
  };

  return (
    <div className="avatar-manager">
      <div className="avatar-controls">
        <label className="avatar-toggle">
          <input
            type="checkbox"
            checked={showAvatars}
            onChange={(e) => onToggleAvatars(e.target.checked)}
          />
          <span>Afficher les photos de profil</span>
        </label>
        
        {Object.keys(avatars).length > 0 && (
          <button 
            className="clear-avatars-btn"
            onClick={clearAllAvatars}
            title="Supprimer tous les avatars"
          >
            🗑️ Effacer tout
          </button>
        )}
      </div>

      {showAvatars && (
        <div className="avatar-list">
          <h3>Photos de profil</h3>
          <p className="avatar-help">
            Glissez-déposez une image ou cliquez pour sélectionner une photo pour chaque participant.
          </p>
          
          {participants.map((participant) => (
            <div key={participant} className="avatar-item">
              <div className="participant-name">{participant}</div>
              
              <div 
                className={`avatar-upload ${dragOver === participant ? 'drag-over' : ''}`}
                onDrop={(e) => handleDrop(participant, e)}
                onDragOver={(e) => handleDragOver(participant, e)}
                onDragLeave={handleDragLeave}
              >
                {avatars[participant] ? (
                  <img 
                    src={avatars[participant]} 
                    alt={`Avatar de ${participant}`}
                    className="avatar-image"
                  />
                ) : (
                  <label className="upload-placeholder">
                    <div className="upload-icon">📷</div>
                    <div>Cliquez ou glissez une image</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(participant, e.target.files[0])}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>

              {avatars[participant] && (
                <div className="avatar-controls-right">
                  <label className="change-avatar-btn">
                    📁 Changer
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(participant, e.target.files[0])}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <button 
                    className="remove-avatar-btn"
                    onClick={() => removeAvatar(participant)}
                    title="Supprimer cet avatar"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarManager;
