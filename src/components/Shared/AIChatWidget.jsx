/**
 * AI Chat Widget - Floating chat bubble for Sherman AI assistance.
 * Communicates with the sherman-ai-proxy backend on Render.com.
 */

import React, { useState, useRef, useEffect } from 'react';

const AI_PROXY_URL = 'https://sherman-ai-proxy.onrender.com';
const AI_API_KEY = 'sherman-ai-key-2024';

const S = {
  bubble: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: '#2c5530',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    zIndex: 9999,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  window: {
    position: 'fixed',
    bottom: 90,
    right: 24,
    width: 380,
    maxHeight: 520,
    borderRadius: 12,
    background: '#fff',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9998,
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
  },
  header: {
    background: '#2c5530',
    color: '#fff',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 15,
    fontWeight: 600,
  },
  headerActions: { display: 'flex', gap: 8 },
  headerBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
    padding: '4px 8px',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    minHeight: 300,
    maxHeight: 360,
    background: '#f8f9fa',
  },
  msgUser: {
    alignSelf: 'flex-end',
    background: '#2c5530',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: '12px 12px 4px 12px',
    maxWidth: '80%',
    fontSize: 14,
    lineHeight: 1.5,
    wordBreak: 'break-word',
  },
  msgAI: {
    alignSelf: 'flex-start',
    background: '#fff',
    color: '#333',
    padding: '10px 14px',
    borderRadius: '12px 12px 12px 4px',
    maxWidth: '80%',
    fontSize: 14,
    lineHeight: 1.5,
    border: '1px solid #e0e0e0',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  loading: {
    alignSelf: 'flex-start',
    color: '#999',
    fontSize: 13,
    fontStyle: 'italic',
    padding: '8px 0',
  },
  welcome: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
    lineHeight: 1.6,
    padding: '20px 10px',
  },
  inputArea: {
    display: 'flex',
    gap: 8,
    padding: 12,
    borderTop: '1px solid #e0e0e0',
    background: '#fff',
  },
  input: {
    flex: 1,
    padding: '10px 12px',
    border: '2px solid #ddd',
    borderRadius: 6,
    fontSize: 14,
    outline: 'none',
    fontFamily: "'Segoe UI', sans-serif",
    resize: 'none',
  },
  sendBtn: {
    padding: '10px 16px',
    background: '#2c5530',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [bubbleHover, setBubbleHover] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) setTimeout(() => inputRef.current.focus(), 100);
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: 'user', content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);

    try {
      const resp = await fetch(`${AI_PROXY_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': AI_API_KEY },
        body: JSON.stringify({ messages: updated.map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || `Server returned ${resp.status}`);
      }

      const data = await resp.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I encountered an error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {isOpen && (
        <div style={S.window}>
          <div style={S.header}>
            <span>Sherman AI Assistant</span>
            <div style={S.headerActions}>
              <button style={S.headerBtn} onClick={() => { setMessages([]); }} title="Clear chat">Clear</button>
              <button style={S.headerBtn} onClick={() => setIsOpen(false)} title="Close">X</button>
            </div>
          </div>

          <div style={S.messages}>
            {messages.length === 0 && (
              <div style={S.welcome}>
                <strong>Welcome to Sherman AI</strong><br /><br />
                Ask me about creating quotes, managing customers, understanding pricing,
                using the Scrubb page, generating documents, or anything else about the bidding system.
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} style={msg.role === 'user' ? S.msgUser : S.msgAI}>{msg.content}</div>
            ))}
            {isLoading && <div style={S.loading}>Thinking...</div>}
            <div ref={endRef} />
          </div>

          <div style={S.inputArea}>
            <textarea
              ref={inputRef}
              style={{ ...S.input, ...(inputFocused ? { borderColor: '#2c5530' } : {}) }}
              rows={1}
              placeholder="Ask a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
            <button
              style={{ ...S.sendBtn, ...(!input.trim() || isLoading ? { opacity: 0.5, cursor: 'not-allowed' } : {}) }}
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        style={{ ...S.bubble, ...(bubbleHover ? { transform: 'scale(1.1)', boxShadow: '0 6px 20px rgba(0,0,0,0.4)' } : {}) }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setBubbleHover(true)}
        onMouseLeave={() => setBubbleHover(false)}
        title="Chat with Sherman AI"
      >
        {isOpen ? '\u2715' : '\uD83D\uDCAC'}
      </button>
    </>
  );
}
