# 💬 Steam Chat Viewer

<div align="center">

![Steam Chat Viewer](https://img.shields.io/badge/SteamChatViewer-blue?style=for-the-badge&logo=steam)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)

**Transform your Steam chat exports into beautiful, readable documents**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

Steam Chat Viewer is a modern React application that converts Steam chat export files into beautifully formatted, readable documents. Whether you want to preserve important conversations or simply make them more presentable, this tool transforms plain text exports into elegant, color-coded conversations with PDF export capabilities.

## ✨ Features

### 🎨 **Beautiful Interface**
- Modern, responsive design with gradient backgrounds
- Intuitive drag & drop file upload
- Clean, readable message layout with smooth animations

### 🌈 **Color-Coded Participants**
- Automatic color assignment for each participant
- 10 distinct color palette that cycles for larger conversations
- Consistent colors across interface and exports

### 📄 **Multiple Export Options**
- **PDF Export**: High-quality, vectorized PDF with preserved colors
- **Print Support**: Browser-native printing with optimized layouts
- **Responsive Design**: Perfect viewing on desktop and mobile devices

### 🔧 **Smart Parsing**
- Automatic detection of Steam chat export formats
- Support for multiple date formats (`{date}` placeholders and full dates)
- Intelligent timestamp parsing and sorting

### 🚀 **Performance Optimized**
- Built with modern React 18
- Yarn package management
- Fast, client-side processing

### Supported File Format
```
──────────13/06/2025──────────
[{date} 16:06] Nitatemic: C'est un test
[{date} 17:06] Nitatemic: Nouveau test
[13/06/2025 19:29] Nitatemic: Full timestamp format also supported
```

## 🚀 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/nitatemic/SteamChatViewer.git
   cd SteamChatViewer
   ```

2. **Install dependencies**
   ```bash
   yarn
   ```

3. **Start the development server**
   ```bash
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
yarn build
```

The optimized build will be available in the `build/` directory.

## 📝 Usage

### Step 1: Upload & Convert
1. Open Steam Chat Viewer in your browser
2. Drag and drop your exported `.txt` file or click to browse
3. Watch as your conversation is instantly transformed

### Step 2: Export & Share
- **PDF Export**: Click the PDF button for a professional document
- **Print**: Use the print button for immediate printing
- **View**: Enjoy the beautiful, color-coded conversation

## 🎨 Color System

Each participant is automatically assigned a unique color from our carefully selected palette:

| Participant | Color | Hex Code |
|-------------|-------|----------|
| 1st | 🔵 Blue | `#667eea` |
| 2nd | 🟢 Green | `#48bb78` |
| 3rd | 🟠 Orange | `#ed8936` |
| 4th | 🔴 Red | `#e53e3e` |
| 5th | 🟣 Purple | `#9f7aea` |
| 6th | 🟦 Teal | `#38b2ac` |
| 7th | 🟡 Yellow | `#d69e2e` |
| 8th | 🌹 Pink | `#f56565` |
| 9th | 🔷 Light Blue | `#4299e1` |
| 10th | 🟢 Light Green | `#68d391` |

*Colors cycle automatically for conversations with more than 10 participants.*

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0
- **Styling**: CSS3 with modern features
- **PDF Generation**: jsPDF
- **Date Handling**: date-fns
- **Build Tool**: Create React App
- **Package Manager**: Yarn

## 📁 Project Structure

```
steam-chat-viewer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChatViewer.js
│   │   ├── ExportControls.js
│   │   └── FileUploader.js
│   ├── utils/
│   │   └── chatParser.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `yarn test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### What We're Looking For
- 🐛 Bug fixes
- ✨ New features
- 📖 Documentation improvements
- 🎨 UI/UX enhancements
- 🌍 Internationalization
- 🔧 Performance optimizations


## 🙏 Acknowledgments

- Steam for providing chat export functionality
- The React community for excellent documentation
- jsPDF for reliable PDF generation
- All contributors who help improve this project

---

<div align="center">

**Made with ❤️ for the Steam community**

[⭐ Star this repo](https://github.com/yourusername/steam-chat-viewer) if you found it helpful!

</div>
