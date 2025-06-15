import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ExportControls({ conversation, isLoading }) {
  const exportToPDF = async () => {
    if (!conversation || isLoading) return;

    try {
      // Créer un élément temporaire pour le contenu à exporter
      const exportContent = document.createElement('div');
      exportContent.style.width = '210mm'; // A4 width
      exportContent.style.padding = '20mm';
      exportContent.style.fontFamily = 'Arial, sans-serif';
      exportContent.style.fontSize = '12px';
      exportContent.style.lineHeight = '1.5';
      exportContent.style.color = '#333';
      exportContent.style.background = 'white';
      exportContent.style.position = 'absolute';
      exportContent.style.left = '-9999px';
      exportContent.style.top = '0';

      // Ajouter le titre
      const title = document.createElement('h1');
      title.textContent = `Conversation Steam - ${conversation.participant}`;
      title.style.fontSize = '18px';
      title.style.marginBottom = '20px';
      title.style.textAlign = 'center';
      title.style.borderBottom = '2px solid #333';
      title.style.paddingBottom = '10px';
      exportContent.appendChild(title);

      // Ajouter les informations de la conversation
      const info = document.createElement('div');
      info.style.marginBottom = '30px';
      info.style.fontSize = '11px';
      info.style.color = '#666';
      info.innerHTML = `
        <p><strong>Participant:</strong> ${conversation.participant}</p>
        <p><strong>Nombre de messages:</strong> ${conversation.messages.length}</p>
        <p><strong>Date d'export:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
      `;
      exportContent.appendChild(info);

      // Ajouter les messages
      conversation.messages.forEach((message, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.style.marginBottom = '15px';
        messageDiv.style.padding = '10px';
        messageDiv.style.border = '1px solid #ddd';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.backgroundColor = '#f9f9f9';
        messageDiv.style.pageBreakInside = 'avoid';
        
        // Obtenir la couleur du participant
        const participantIndex = conversation.participants.indexOf(message.author);
        const colors = [
          '#667eea', '#48bb78', '#ed8936', '#e53e3e', '#9f7aea',
          '#38b2ac', '#d69e2e', '#f56565', '#4299e1', '#68d391'
        ];
        const participantColor = colors[participantIndex % colors.length];
        messageDiv.style.borderLeft = `4px solid ${participantColor}`;

        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.marginBottom = '5px';
        header.style.fontWeight = 'bold';
        header.style.fontSize = '11px';

        const author = document.createElement('span');
        author.textContent = message.author;
        author.style.color = participantColor;

        const time = document.createElement('span');
        time.textContent = `${message.date} ${message.time}`;
        time.style.color = '#666';
        time.style.fontFamily = 'monospace';

        header.appendChild(author);
        header.appendChild(time);

        const text = document.createElement('div');
        text.textContent = message.text;
        text.style.wordWrap = 'break-word';
        text.style.color = '#555';

        messageDiv.appendChild(header);
        messageDiv.appendChild(text);
        exportContent.appendChild(messageDiv);
      });

      document.body.appendChild(exportContent);

      // Convertir en canvas puis en PDF
      const canvas = await html2canvas(exportContent, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      document.body.removeChild(exportContent);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Ajouter la première page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Ajouter des pages supplémentaires si nécessaire
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Télécharger le PDF
      const fileName = `conversation-steam-${conversation.participant.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      alert('Erreur lors de l\'export PDF. Veuillez réessayer.');
    }
  };

  const printConversation = () => {
    window.print();
  };

  if (!conversation || conversation.messages.length === 0) {
    return null;
  }

  return (
    <div className="export-controls">
      <button 
        className="btn btn-primary" 
        onClick={exportToPDF}
        disabled={isLoading}
        title="Exporter en PDF"
      >
        📄 PDF
      </button>
      <button 
        className="btn btn-secondary" 
        onClick={printConversation}
        disabled={isLoading}
        title="Imprimer"
      >
        🖨️ Imprimer
      </button>
    </div>
  );
}

export default ExportControls;
