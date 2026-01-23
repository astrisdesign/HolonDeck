# JExTile

<div align="center">
  <img src="jextile-logo.png" alt="JExTile Logo" width="200"/>
  
  **A powerful, desktop-native JSON viewer and editor**
  
  Built with Tauri 2.0, React, and TypeScript
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
</div>

---

## ✨ Features

JExTile reimagines JSON editing through an intuitive, tile-based interface that makes working with complex data structures effortless:

### 🎯 Core Capabilities
- **📊 Visual Tile Navigation** - Browse JSON as interactive cards with smart data previews
- **🔍 Recursive Drill-Down** - Double-click any object or array to explore deeper without losing context
- **📝 Inline & Raw Editing** - Edit JSON visually or switch to a powerful Monaco-style editor
- **✅ Real-Time Validation** - Instant feedback on JSON syntax with detailed error messages
- **🔄 Unlimited Undo/Redo** - Full history tracking with 50-state memory
- **🎨 Adaptive Display** - Objects and arrays render with optimized previews showing nested structure

### 🚀 Productivity Features
- **Multi-Select Operations** - `Ctrl+Click` to select multiple items, `Shift+Click` for ranges
- **Drag-and-Drop Reordering** - Visually reorganize array items and object properties
- **Keyboard-First Design** - Complete keyboard navigation (see shortcuts below)
- **Smart Search** - Filter items instantly with real-time highlighting
- **Breadcrumb Navigation** - Always know your position in deeply nested structures
- **Invalid JSON Recovery** - Built-in editor to fix malformed JSON before parsing

### 💎 Polish & Accessibility
- **Native File Dialogs** - System-integrated save/export via Tauri
- **Zoom Control** - `Ctrl+Scroll` to scale interface from 50% to 200%
- **Responsive Grid** - Automatically adjusts from 1-4 columns based on window size
- **Dark Mode UI** - Beautiful, carefully crafted dark theme with custom font stack
- **Cross-Platform** - Windows, macOS, and Linux support

---

## 🎥 Demo

<div align="center">
  <img src="src-tauri/icons/screenshots/demo.gif" alt="JExTile Demo - Complete walkthrough" width="800"/>
  <p><em>See JExTile in action: file upload, tile navigation, JSON editing, and keyboard shortcuts</em></p>
</div>

---

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm/yarn
- **Rust** (for Tauri) - Install via [rustup](https://rustup.rs/)

### Setup

```bash
# Clone the repository
git clone https://github.com/astrisdesign/JExTile.git
cd JExTile

# Install dependencies
pnpm install

# Run in development mode
pnpm tauri dev
```

### Building for Production

```bash
# Build the desktop app
pnpm tauri build
```
This creates a compiled executable in src-tauri/target/release/. Run this executable to launch the app installer, and you have JExTile on your PC!
---

## 🛠️ Development

### Available Scripts

```bash
# Start development server (web-only, no Tauri)
pnpm dev

# Start Tauri development mode (desktop app)
pnpm tauri dev

# Build frontend
pnpm build

# Preview production build
pnpm preview

# Build Tauri app for production
pnpm tauri build
```

### Project Structure

```
JExTile/
├── src/
│   ├── components/
│   │   ├── FileUpload.tsx      # Drag-and-drop file upload
│   │   ├── JsonGrid.tsx        # Main grid view with navigation
│   │   ├── JsonCard.tsx        # Individual tile component
│   │   ├── JsonModal.tsx       # Raw JSON editor modal
│   │   └── HelpModal.tsx       # Keyboard shortcuts reference
│   ├── assets/                 # Fonts and images
│   ├── App.tsx                 # Root application component
│   ├── types.ts                # TypeScript type definitions
│   └── main.tsx                # React entry point
├── src-tauri/
│   ├── src/
│   │   ├── main.rs             # Tauri backend entry
│   │   └── lib.rs              # Rust library code
│   ├── Cargo.toml              # Rust dependencies
│   └── tauri.conf.json         # Tauri configuration
└── public/                     # Static assets
```

---

## ⌨️ Keyboard Shortcuts

### General
| Shortcut | Description |
|----------|-------------|
| `Ctrl+S` / `⌘+S` | Save changes (export to file) |
| `Ctrl+Z` / `⌘+Z` | Undo last action |
| `Ctrl+Shift+Z` / `⌘+⇧+Z` | Redo |
| `Ctrl+Scroll` | Zoom in/out (50% - 200%) |
| `Esc` | Close modal / Deselect items |

### Navigation
| Shortcut | Description |
|----------|-------------|
| `Arrow Keys` | Navigate between tiles in grid |
| `Enter` or `Tab` | Open selected item (drill down) |
| `Shift+Enter` or `Shift+Tab` | Go to parent level |
| `S` | Focus search bar |
| `D` | View details of selected item |

### Selection & Editing
| Shortcut | Description |
|----------|-------------|
| `Click` | Select single item |
| `Ctrl+Click` / `⌘+Click` | Toggle item selection |
| `Shift+Click` | Select range of items |
| `Shift+Arrow` | Extend selection |
| `Ctrl+Arrow` / `⌘+Arrow` | Reorder selected items |
| `Delete` | Delete selected item(s) |

---

## 🏗️ Technical Architecture

### Frontend Stack
- **React 19** - Modern UI with concurrent rendering
- **TypeScript 5.8** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling with custom design system
- **Vite 7** - Lightning-fast build tool and HMR
- **Lucide React** - Beautiful, consistent icon library

### Backend
- **Tauri 2.0** - Secure, lightweight Rust-based desktop framework
- **Tauri Plugins**:
  - `@tauri-apps/plugin-dialog` - Native file save dialogs
  - `@tauri-apps/plugin-fs` - Secure filesystem access
  - `@tauri-apps/plugin-opener` - System resource opening

### Key Design Patterns
- **Immutable State Updates** - All data changes create new snapshots for undo/redo
- **Deep Path Tracking** - Breadcrumb-based navigation maintains context at any depth
- **Drag-and-Drop State Management** - Deterministic reordering using snapshot refs
- **Comprehensive Keyboard Handling** - Global and local keyboard event management

### Performance Optimizations
- **useMemo** hooks for expensive computations (filtering, sorting)
- **useCallback** for stable function references
- **Virtualized scrolling** (automatic via CSS Grid)
- **Debounced validation** in JSON editor

---

## 🧩 Use Cases

JExTile is perfect for:

- 📊 **Data Analysis** - Explore large API responses or database exports
- 🔧 **Configuration Management** - Edit app configs with visual feedback
- 🧪 **Testing & Debugging** - Inspect and modify test data on the fly
- 📦 **API Development** - Review and edit JSON payloads
- 🎓 **Learning** - Understand complex JSON structures visually
- 🔄 **Data Migration** - Transform data between different schemas

---

## 🚧 Roadmap

Future enhancements planned:

- [ ] **Schema Validation** - JSON Schema support with visual errors
- [ ] **Specialized Editors** - Tree views for hierarchical data, Gantt charts for timelines
- [ ] **Import/Export** - CSV, YAML, TOML conversion
- [ ] **Diff View** - Compare two JSON files side-by-side
- [ ] **Plugins** - Extensible architecture for custom data types
- [ ] **Cloud Sync** - Optional file synchronization

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Tauri](https://tauri.app/) - The secure desktop framework
- Fonts: [Inter](https://rsms.me/inter/) & [Source Serif 4](https://github.com/adobe-fonts/source-serif)
- Inspired by the need for better JSON UI

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/astrisdesign">Astris Design</a>
  
  ⭐ Star this repo if you find it useful!
</div>
