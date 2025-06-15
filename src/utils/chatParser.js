/**
 * Parse Steam chat export files
 * Supports multiple date formats and extracts messages with timestamps
 */

export const parseSteamChat = (content, fileName = '') => {
  const lines = content.split('\n').filter(line => line.trim());
  const messages = [];
  const participants = new Set();
  
  // Regex patterns for different message formats
  const patterns = {
    // Format: [{date} 16:06] Username: Message
    withBraces: /^\[(\{date\}|\d{2}\/\d{2}\/\d{4}) (\d{1,2}:\d{2})\] ([^:]+): (.+)$/,
    
    // Format: [13/06/2025 19:29] Username: Message  
    fullDate: /^\[(\d{2}\/\d{2}\/\d{4}) (\d{1,2}:\d{2})\] ([^:]+): (.+)$/,
    
    // Date separator: ──────────13/06/2025──────────
    dateSeparator: /^─+(\d{2}\/\d{2}\/\d{4})─+$/
  };
  
  let currentDate = null;
  
  for (const line of lines) {
    // Check for date separator
    const dateSeparatorMatch = line.match(patterns.dateSeparator);
    if (dateSeparatorMatch) {
      currentDate = dateSeparatorMatch[1];
      continue;
    }
    
    // Try to match message patterns
    let messageMatch = null;
    let messageDate = null;
    let messageTime = null;
    let username = null;
    let messageContent = null;
    let datePart = null;
    
    // Try full date format first
    messageMatch = line.match(patterns.fullDate);
    if (messageMatch) {
      [, messageDate, messageTime, username, messageContent] = messageMatch;
    } else {
      // Try {date} format
      messageMatch = line.match(patterns.withBraces);
      if (messageMatch) {
        [, datePart, messageTime, username, messageContent] = messageMatch;
        messageDate = datePart === '{date}' ? currentDate : datePart;
      }
    }
    
    if (messageMatch && messageDate && messageTime && username && messageContent) {
      // Parse the date and time
      const [day, month, year] = messageDate.split('/');
      const [hours, minutes] = messageTime.split(':');
      
      // Create a proper Date object
      const timestamp = new Date(
        parseInt(year),
        parseInt(month) - 1, // Month is 0-indexed
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );
      
      const message = {
        timestamp: timestamp.toISOString(),
        author: username.trim(),
        text: messageContent.trim(),
        date: messageDate,
        time: messageTime
      };
      
      messages.push(message);
      participants.add(username.trim());
    }
  }
  
  // Sort messages by timestamp
  messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
  // Extract participant name from file name if possible
  let participantName = 'Inconnu';
  if (fileName) {
    const nameMatch = fileName.match(/(\d+)\s*-\s*(.+)\.txt$/);
    if (nameMatch) {
      participantName = nameMatch[2].trim();
    }
  }
  
  const result = {
    messages,
    participants: Array.from(participants),
    participant: participantName,
    totalMessages: messages.length,
    dateRange: messages.length > 0 ? {
      start: messages[0].timestamp,
      end: messages[messages.length - 1].timestamp
    } : null
  };
  
  return result;
};
