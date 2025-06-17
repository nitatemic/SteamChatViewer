import React, { useState, useEffect } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import ChatViewer from './components/ChatViewer';
import ExportControls from './components/ExportControls';
import AvatarManager from './components/AvatarManager';
import { parseSteamChat } from './utils/chatParser';

function App() {
  const [conversation, setConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avatars, setAvatars] = useState({});
  const [showAvatars, setShowAvatars] = useState(() => {
    const savedShowAvatars = localStorage.getItem('showAvatars');
    return savedShowAvatars ? JSON.parse(savedShowAvatars) : false;
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Récupérer la préférence sauvegardée ou utiliser la préférence système
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      return JSON.parse(savedTheme);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Sauvegarder la préférence dans localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    // Appliquer la classe au body
    document.body.className = isDarkMode ? 'dark-mode' : '';
  }, [isDarkMode]);

  useEffect(() => {
    // Sauvegarder la préférence d'affichage des avatars
    localStorage.setItem('showAvatars', JSON.stringify(showAvatars));
  }, [showAvatars]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAvatarsChange = (newAvatars) => {
    setAvatars(newAvatars);
  };

  const handleToggleAvatars = (show) => {
    setShowAvatars(show);
  };

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const text = await file.text();
      const parsedConversation = parseSteamChat(text, file.name);
      setConversation(parsedConversation);
    } catch (err) {
      console.error('Erreur lors du parsing:', err);
      setError('Erreur lors du traitement du fichier. Vérifiez que c\'est bien un export de conversation Steam.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="header-content">
          <div>
            <h1>Steam Chat Viewer</h1>
            <p>Convertissez vos conversations Steam en documents élégants</p>
          </div>
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Basculer en mode clair' : 'Basculer en mode sombre'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <div className="container">
        <div className="upload-section">
          <FileUploader 
            onFileUpload={handleFileUpload} 
            isLoading={isLoading}
          />
          {error && (
            <div className="error">
              {error}
            </div>
          )}
        </div>

        {conversation && (
          <div className="chat-section">
            <div className="chat-header">
              <div>
                <h2 className="chat-title">Conversation avec {conversation.participant}</h2>
                <div className="chat-info">
                  {conversation.messages.length} messages
                </div>
              </div>
              <ExportControls 
                conversation={conversation} 
                isLoading={isLoading}
                avatars={avatars}
                showAvatars={showAvatars}
              />
            </div>

            <AvatarManager
              participants={conversation.participants}
              onAvatarsChange={handleAvatarsChange}
              showAvatars={showAvatars}
              onToggleAvatars={handleToggleAvatars}
            />
            
            <ChatViewer 
              conversation={conversation} 
              isLoading={isLoading}
              avatars={avatars}
              showAvatars={showAvatars}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
