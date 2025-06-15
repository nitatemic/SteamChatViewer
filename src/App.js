import React, { useState } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import ChatViewer from './components/ChatViewer';
import ExportControls from './components/ExportControls';
import { parseSteamChat } from './utils/chatParser';

function App() {
  const [conversation, setConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="app">
      <header className="header">
        <h1>Steam Chat Viewer</h1>
        <p>Convertissez vos conversations Steam en documents élégants</p>
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
              />
            </div>
            
            <ChatViewer 
              conversation={conversation} 
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
