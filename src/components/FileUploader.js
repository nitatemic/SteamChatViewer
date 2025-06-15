import React, { useCallback, useState } from 'react';

const FileUploader = ({ onFileUpload, isLoading }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleClick = () => {
    if (!isLoading) {
      document.getElementById('file-input').click();
    }
  };

  return (
    <div className="file-uploader">
      <div
        className={`file-upload-area ${isDragOver ? 'drag-over' : ''} ${isLoading ? 'loading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="upload-icon">
          {isLoading ? '⏳' : '📁'}
        </div>
        <h3 className="upload-text">
          {isLoading 
            ? 'Traitement en cours...' 
            : 'Glissez-déposez votre fichier de conversation Steam ici'
          }
        </h3>
        <p className="upload-subtext">
          {isLoading 
            ? 'Veuillez patienter...' 
            : 'ou cliquez pour sélectionner un fichier (.txt)'
          }
        </p>
      </div>
      
      <input
        id="file-input"
        type="file"
        accept=".txt"
        onChange={handleFileSelect}
        className="hidden-input"
        disabled={isLoading}
      />
    </div>
  );
};

export default FileUploader;
