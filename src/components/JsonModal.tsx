import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { JsonValue } from '../types';
import { X, Copy, Check, Save as SaveIcon, AlertTriangle } from 'lucide-react';

interface JsonModalProps {
  data?: JsonValue;
  initialText?: string;
  title?: string;
  onClose: () => void;
  onSave: (newData: JsonValue) => void;
}

const JsonModal: React.FC<JsonModalProps> = ({ data, initialText, title = "Edit Object", onClose, onSave }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showErrorDetail, setShowErrorDetail] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Initialize text
  useEffect(() => {
    if (initialText !== undefined) {
        setText(initialText);
        // If initializing with text that might be invalid, ensure validation runs immediately by relying on the validation useEffect below
    } else if (data !== undefined) {
        setText(JSON.stringify(data, null, 2));
    }
  }, [data, initialText]);

  // Validation effect
  useEffect(() => {
    try {
      JSON.parse(text);
      setError(null);
      // Don't auto-hide error detail if user opened it, but maybe we should if error is resolved?
      // For now, let's keep it open if user opened it, until they close it or error is resolved
      if (error === null) setShowErrorDetail(false); 
    } catch (e: any) {
      setError(e.message);
    }
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = useCallback(() => {
    if (error) return;
    try {
      const parsed = JSON.parse(text);
      onSave(parsed);
    } catch (e) {
      console.error(e);
    }
  }, [text, error, onSave]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
          onClose();
          return;
      }
      
      // Ctrl+S / Cmd+S to Save
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
          e.preventDefault();
          e.stopPropagation(); // Stop bubbling so App.tsx doesn't trigger export
          handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleSave]);

  const lineCount = useMemo(() => text.split('\n').length, [text]);

  const handleScroll = () => {
      if (textAreaRef.current && lineNumbersRef.current) {
          lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
      }
  };

  return (
    <div id="json-modal-root" className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-base/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-[90vw] h-[90vh] bg-base rounded-2xl shadow-2xl border border-subtle flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div 
            className="flex items-center justify-between px-6 py-4 border-b border-subtle bg-surface shrink-0"
            onClick={() => setShowErrorDetail(false)}
        >
          <div className="flex items-center gap-3">
             <h3 className="text-lg font-serif font-medium text-white">{title}</h3>
             {error && (
                 <button
                     onClick={(e) => {
                         e.stopPropagation();
                         setShowErrorDetail(prev => !prev);
                     }}
                     className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-100 text-xs hover:bg-red-500/30 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-500/40"
                 >
                     <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                     <span className="truncate max-w-[200px] text-left">{error}</span>
                 </button>
             )}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); handleSave(); }}
              disabled={!!error}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${error 
                    ? 'bg-subtle text-text-dim cursor-not-allowed' 
                    : 'bg-accent text-base hover:bg-accent/90 shadow-glow'
                }
              `}
              title="Save Changes (Ctrl+S)"
            >
              <SaveIcon className="w-4 h-4" />
              <span>Save</span>
            </button>
            
            <div className="w-px h-6 bg-subtle mx-2"></div>

            <button 
              onClick={(e) => { e.stopPropagation(); handleCopy(); }}
              className="p-2 text-text-muted hover:text-accent hover:bg-highlight rounded-lg transition-colors"
              title="Copy JSON"
            >
              {copied ? <Check className="w-5 h-5 text-accent" /> : <Copy className="w-5 h-5" />}
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-text-muted hover:text-white hover:bg-highlight rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expanded Error Region */}
        {error && showErrorDetail && (
            <div className="px-6 py-4 bg-red-500/20 border-b border-red-500/30 text-red-100 text-sm font-mono break-words whitespace-pre-wrap overflow-y-auto max-h-[200px] shrink-0 animate-in slide-in-from-top-2 duration-200 shadow-inner">
                {error}
            </div>
        )}

        {/* Editor Area */}
        <div className="flex-1 relative bg-base flex overflow-hidden">
            {/* Line Numbers */}
            <div 
                ref={lineNumbersRef}
                className="hidden sm:block w-12 py-6 text-right pr-3 bg-surface/30 text-text-dim/40 font-mono text-sm font-bold leading-relaxed select-none overflow-hidden border-r border-subtle/50"
            >
                {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                ))}
            </div>

            <textarea
                ref={textAreaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onScroll={handleScroll}
                onClick={() => setShowErrorDetail(false)}
                spellCheck={false}
                className="flex-1 w-full h-full p-6 bg-transparent text-text-main font-mono text-[13px] font-medium resize-none focus:outline-none selection:bg-accent/20 selection:text-white leading-relaxed whitespace-pre"
            />
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-subtle bg-surface text-xs text-text-dim flex justify-between font-mono font-bold shrink-0">
           <span>{text.length} chars, {lineCount} lines</span>
           <span>{error ? 'Invalid JSON' : 'Ready to Save'}</span>
        </div>
      </div>
    </div>
  );
};

export default JsonModal;
