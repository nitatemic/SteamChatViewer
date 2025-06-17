import React from 'react';
import jsPDF from 'jspdf';

function ExportControls({ conversation, isLoading, avatars = {}, showAvatars = false }) {
  const exportToPDF = async () => {
    if (!conversation || isLoading) return;

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 190; // A4 width minus margins
      const pageHeight = 270; // A4 height minus margins
      let yPosition = 20;
      
      // Couleurs des participants
      const colors = [
        [102, 126, 234], [72, 187, 120], [237, 137, 54], [229, 62, 62], [159, 122, 234],
        [56, 178, 172], [214, 158, 46], [245, 101, 101], [66, 153, 225], [104, 211, 145]
      ];

      // Fonction simplifiée pour traiter les avatars
      const addAvatarIfPossible = async (avatarData, x, y, size = 8) => {
        if (!avatarData || !showAvatars) return false;
        
        try {
          // Vérifier si c'est une image valide
          if (!avatarData.startsWith('data:image/')) return false;
          
          // Ajouter directement l'image sans transformation complexe
          pdf.addImage(avatarData, 'JPEG', x, y, size, size);
          return true;
        } catch (error) {
          console.warn('Impossible d\'ajouter l\'avatar:', error);
          return false;
        }
      };

      // Titre
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Conversation Steam - ${conversation.participant}`, 105, yPosition, { align: 'center' });
      yPosition += 15;

      // Informations
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Participant: ${conversation.participant}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Nombre de messages: ${conversation.messages.length}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Date d'export: ${new Date().toLocaleDateString('fr-FR')}`, 20, yPosition);
      if (showAvatars && Object.keys(avatars).length > 0) {
        yPosition += 5;
        pdf.text(`Avec photos de profil`, 20, yPosition);
      }
      yPosition += 15;

      // Traiter les messages un par un
      for (let i = 0; i < conversation.messages.length; i++) {
        const message = conversation.messages[i];
        
        // Vérifier si on doit créer une nouvelle page
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }

        // Couleur du participant
        const participantIndex = conversation.participants.indexOf(message.author);
        const color = colors[participantIndex % colors.length];
        
        let messageStartX = 25;
        let avatarAdded = false;
        
        // Essayer d'ajouter l'avatar
        if (showAvatars && avatars[message.author]) {
          avatarAdded = await addAvatarIfPossible(avatars[message.author], 15, yPosition - 6, 8);
          if (avatarAdded) {
            messageStartX = 28;
          }
        }
        
        // Si pas d'avatar, utiliser le rectangle coloré
        if (!avatarAdded) {
          pdf.setFillColor(color[0], color[1], color[2]);
          pdf.rect(15, yPosition - 3, 3, 15, 'F');
        }

        // En-tête du message
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(color[0], color[1], color[2]);
        pdf.text(message.author, messageStartX, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(120, 120, 120);
        pdf.text(`${message.date} ${message.time}`, pageWidth - 30, yPosition);

        yPosition += 7;

        // Contenu du message
        pdf.setFontSize(9);
        pdf.setTextColor(50, 50, 50);
        pdf.setFont('helvetica', 'normal');
        
        // Découper le texte
        const lines = pdf.splitTextToSize(message.text, pageWidth - messageStartX);
        for (const line of lines) {
          if (yPosition > pageHeight - 10) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.text(line, messageStartX, yPosition);
          yPosition += 5;
        }

        yPosition += 5; // Espacement entre messages
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
