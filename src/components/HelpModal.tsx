import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const shortcuts = [
    // General
    { keys: ['Ctrl', 'S'], mac: ['⌘', 'S'], description: 'Save changes' },
    { keys: ['Ctrl', 'Z'], mac: ['⌘', 'Z'], description: 'Undo' },
    { keys: ['Ctrl', 'Shift', 'Z'], mac: ['⌘', '⇧', 'Z'], description: 'Redo' },
    // Navigation
    { keys: ['Arrows'], mac: ['Arrows'], description: 'Navigate grid' },
    { keys: ['Enter'], mac: ['Enter'], description: 'Open item' },
    { keys: ['Tab'], mac: ['Tab'], description: 'Open item (Alt)' },
    { keys: ['Shift', 'Enter'], mac: ['⇧', 'Enter'], description: 'Go to parent' },
    { keys: ['Shift', 'Tab'], mac: ['⇧', 'Tab'], description: 'Go to parent (Alt)' },
    { keys: ['S'], mac: ['S'], description: 'Focus search' },
    // Actions
    { keys: ['D'], mac: ['D'], description: 'View details' },
    { keys: ['Ctrl', 'Arrows'], mac: ['⌘', 'Arrows'], description: 'Reorder items' },
    { keys: ['Shift', 'Arrows'], mac: ['⇧', 'Arrows'], description: 'Range select' },
    { keys: ['Delete'], mac: ['Delete'], description: 'Delete item' },
    { keys: ['Esc'], mac: ['Esc'], description: 'Close / Deselect' },
  ];

  // Detect if user is on Mac
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-base/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl max-h-full bg-base rounded-2xl shadow-2xl border border-subtle flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-subtle bg-surface shrink-0">
          <h3 className="text-lg font-serif font-medium text-white">Keyboard Shortcuts</h3>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-white hover:bg-highlight rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8 bg-base overflow-y-auto">
          <div className="space-y-4">
            {shortcuts.map((shortcut, index) => {
              const keysToDisplay = isMac ? shortcut.mac : shortcut.keys;
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-surface/50 rounded-lg border border-subtle hover:border-accent/30 transition-colors"
                >
                  <span className="text-text-main font-medium">{shortcut.description}</span>
                  <div className="flex items-center gap-1">
                    {keysToDisplay.map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        {keyIndex > 0 && (
                          <span className="text-text-dim mx-1 font-bold">+</span>
                        )}
                        <kbd className="px-3 py-1.5 bg-highlight border border-subtle rounded-md text-accent font-mono text-sm font-bold shadow-sm min-w-[2.5rem] text-center">
                          {key}
                        </kbd>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-subtle bg-surface text-xs text-text-dim flex justify-center font-mono shrink-0">
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
