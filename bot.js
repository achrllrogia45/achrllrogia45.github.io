// Bot Chat Component - Reusable across pages
// Usage: Just add <script src="bot.js"></script> and call initBot() or add <div id="bot-container"></div>

(function() {
  'use strict';

  // Bot component as a global function
  window.ChatBot = function ChatBot() {
    const CHAT_IFRAME_KEY = "hg-chatbot-iframe-open";
    const CHAT_SESSION_KEY = "hg-chatbot-session-data";
    const CHAT_CONVERSATION_ID_KEY = "hg-chatbot-conversation-id";
    const CHAT_IFRAME_CONTENT_KEY = "hg-chatbot-iframe-state";
    
    const [open, setOpen] = React.useState(() => {
      // Restore open state from localStorage for cross-page persistence
      try {
        return localStorage.getItem(CHAT_IFRAME_KEY) === "true";
      } catch {
        return false;
      }
    });

    const [iframeLoaded, setIframeLoaded] = React.useState(false);

    React.useEffect(() => {
      localStorage.setItem(CHAT_IFRAME_KEY, open ? "true" : "false");
    }, [open]);

    // Animation classes
    const animationClass = open ? "animate-fade-in-up" : "animate-fade-out-down";

    // Keep iframe always mounted, just hide/show modal UI
    const iframeRef = React.useRef(null);
    
    // Enhanced iframe source with session restoration
    const [iframeSrc] = React.useState(() => {
      const baseUrl = "https://copilotstudio.microsoft.com/environments/Default-bc8ae832-0e7c-4850-970a-80e5f762c781/bots/cr10f_dynamicInfoBot/webchat";
      const conversationId = getConversationId();
      
      // Add parameters to help maintain session across page loads
      const params = new URLSearchParams({
        __version__: "2",
        userId: `user_${conversationId}`,
        sessionId: conversationId,
        // Add timestamp from existing session to help with restoration
        restore: localStorage.getItem(CHAT_SESSION_KEY) ? "true" : "false"
      });

      return `${baseUrl}?${params.toString()}`;
    });

    // Generate or retrieve conversation ID - moved before iframeSrc
    function getConversationId() {
      let conversationId = localStorage.getItem(CHAT_CONVERSATION_ID_KEY);
      if (!conversationId) {
        conversationId = 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem(CHAT_CONVERSATION_ID_KEY, conversationId);
      }
      return conversationId;
    }

    // Session persistence functionality with enhanced cross-page support
    const saveSessionData = React.useCallback(() => {
      try {
        const sessionData = {
          timestamp: Date.now(),
          url: window.location.href,
          conversationId: getConversationId(),
          iframeLoaded: iframeLoaded,
          // Store page navigation history
          pageHistory: JSON.parse(localStorage.getItem('hg-page-history') || '[]')
        };
        localStorage.setItem(CHAT_SESSION_KEY, JSON.stringify(sessionData));
        
        // Track page visits for session continuity
        const pageHistory = sessionData.pageHistory;
        const currentPage = {
          url: window.location.href,
          timestamp: Date.now()
        };
        pageHistory.push(currentPage);
        // Keep only last 10 pages
        if (pageHistory.length > 10) pageHistory.shift();
        localStorage.setItem('hg-page-history', JSON.stringify(pageHistory));
        
      } catch (error) {
        console.log('Session save error:', error);
      }
    }, [iframeLoaded]);

    const loadSessionData = React.useCallback(() => {
      try {
        const sessionData = localStorage.getItem(CHAT_SESSION_KEY);
        if (sessionData) {
          const parsed = JSON.parse(sessionData);
          // Check if session is not too old (24 hours)
          const twentyFourHours = 24 * 60 * 60 * 1000;
          if (Date.now() - parsed.timestamp < twentyFourHours) {
            return parsed;
          }
        }
      } catch (error) {
        console.log('Could not load session data');
      }
      return null;
    }, []);

    // Generate or retrieve conversation ID
    const getConversationIdCallback = React.useCallback(() => {
      return getConversationId();
    }, []);

    // Enhanced iframe src with session parameters
    const getIframeSrc = React.useCallback(() => {
      const baseUrl = "https://copilotstudio.microsoft.com/environments/Default-bc8ae832-0e7c-4850-970a-80e5f762c781/bots/cr10f_dynamicInfoBot/webchat";
      const conversationId = getConversationId();
      
      // Use consistent URL to maintain session - the key is NOT reloading the iframe
      const params = new URLSearchParams({
        __version__: "2"
      });

      return `${baseUrl}?${params.toString()}`;
    }, []);

    // Enhanced iframe load handling with session restoration
    React.useEffect(() => {
      if (iframeRef.current) {
        const iframe = iframeRef.current;
        
        const handleLoad = () => {
          console.log('Chat iframe loaded on:', window.location.href);
          setIframeLoaded(true);
          
          // Try to restore session after iframe loads
          setTimeout(() => {
            const sessionData = loadSessionData();
            if (sessionData && sessionData.conversationId) {
              console.log('Restoring chat session:', sessionData.conversationId);
              
              // Post message to iframe to restore session if possible
              try {
                iframe.contentWindow?.postMessage({
                  type: 'RESTORE_SESSION',
                  sessionId: sessionData.conversationId,
                  userId: `user_${sessionData.conversationId}`
                }, '*');
              } catch (error) {
                console.log('Could not send restore message to iframe');
              }
            }
            
            saveSessionData();
          }, 3000); // Wait longer for iframe to fully initialize
        };

        const handleError = () => {
          console.log('Chat iframe failed to load');
          setIframeLoaded(false);
        };

        iframe.addEventListener('load', handleLoad);
        iframe.addEventListener('error', handleError);
        
        return () => {
          iframe.removeEventListener('load', handleLoad);
          iframe.removeEventListener('error', handleError);
        };
      }
    }, [saveSessionData, loadSessionData]);

    // Save session on page unload (before navigation)
    React.useEffect(() => {
      const handleBeforeUnload = () => {
        saveSessionData();
      };

      const handlePageHide = () => {
        saveSessionData();
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('pagehide', handlePageHide);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('pagehide', handlePageHide);
      };
    }, [saveSessionData]);

    // Save session when chat is closed
    React.useEffect(() => {
      if (!open) {
        saveSessionData();
      }
    }, [open, saveSessionData]);

    // Clear old sessions periodically (older than 7 days)
    React.useEffect(() => {
      const clearOldSessions = () => {
        try {
          const sessionData = localStorage.getItem(CHAT_SESSION_KEY);
          if (sessionData) {
            const parsed = JSON.parse(sessionData);
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - parsed.timestamp > sevenDays) {
              localStorage.removeItem(CHAT_SESSION_KEY);
              localStorage.removeItem(CHAT_CONVERSATION_ID_KEY);
            }
          }
        } catch (error) {
          // Ignore errors
        }
      };

      clearOldSessions();
    }, []);

    // Function to reset chat session (for manual reset)
    const resetChatSession = React.useCallback(() => {
      localStorage.removeItem(CHAT_SESSION_KEY);
      localStorage.removeItem(CHAT_CONVERSATION_ID_KEY);
      localStorage.removeItem(CHAT_IFRAME_KEY);
      // Force iframe reload by changing src to reset conversation
      if (iframeRef.current) {
        const timestamp = Date.now();
        iframeRef.current.src = `https://copilotstudio.microsoft.com/environments/Default-bc8ae832-0e7c-4850-970a-80e5f762c781/bots/cr10f_dynamicInfoBot/webchat?__version__=2&reset=${timestamp}`;
      }
    }, []);

    // Expose reset function globally for debugging/manual reset
    React.useEffect(() => {
      window.resetChatSession = resetChatSession;
    }, [resetChatSession]);
    
    return React.createElement(React.Fragment, null,
      // Floating button when chat is closed
      !open && React.createElement('button', {
        className: "fixed bottom-6 right-6 z-50 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all",
        onClick: () => setOpen(true),
        'aria-label': "Open chat"
      }, React.createElement('span', {
        className: "text-3xl font-bold"
      }, "?")),

      // Chat modal - Always render iframe, just control modal visibility
      React.createElement('div', {
        className: `fixed bottom-6 right-6 z-50 w-[600px] max-w-[95vw] h-[650px] bg-white rounded-xl shadow-2xl flex flex-col ${animationClass}`,
        style: {
          animation: open ? "fadeInUp 0.4s" : "fadeOutDown 0.4s",
          display: open ? "flex" : "none"
        }
      },
        // Header
        React.createElement('div', {
          className: "flex items-center justify-between px-4 py-2 border-b"
        },
          React.createElement('div', {
            className: "flex items-center gap-2"
          },
            React.createElement('img', {
              src: "images/hg_logo_header_black.svg",
              alt: "HG Logo",
              className: "rounded-full w-8 h-8 object-contain",
            }),
            // React.createElement('span', {
            //   className: "font-semibold text-black"
            // }, "Human's Bot"),
            // Session indicator with better info
            React.createElement('span', {
              className: "text-xs text-gray-500 ml-2",
              title: `Session: ${getConversationId().slice(-8)} | Loaded: ${iframeLoaded ? 'Yes' : 'No'}`
            }, iframeLoaded ? "●" : "○")
          ),
          React.createElement('div', {
            className: "flex items-center gap-2"
          },
            // Reset button
            React.createElement('button', {
              className: "text-gray-400 hover:text-red-500 text-sm px-2 py-1 rounded hover:bg-gray-100 transition-colors",
              onClick: resetChatSession,
              title: "Reset chat session",
              'aria-label': "Reset chat session"
            }, "↻"),
            // Close button
            React.createElement('button', {
              className: "text-gray-400 hover:text-black text-xl",
              onClick: () => setOpen(false),
              'aria-label': "Close chat"
            }, "×")
          )
        ),
        
        // Iframe content - Always mounted iframe for session persistence
        React.createElement('div', {
          style: { flex: 1, width: "100%", height: "100%", position: 'relative' }
        },
          React.createElement('iframe', {
            ref: iframeRef,
            src: iframeSrc,
            frameBorder: "0",
            style: { width: "100%", height: "100%" },
            allow: "microphone; camera; geolocation",
            sandbox: "allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          }),
          // Loading overlay when iframe is not ready
          !iframeLoaded && React.createElement('div', {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#666'
            }
          }, 'Connecting to chat...')
        )
      )
    );
  };

  // Utility functions for session management
  window.getChatSessionInfo = function() {
    try {
      const sessionData = localStorage.getItem('hg-chatbot-session-data');
      const conversationId = localStorage.getItem('hg-chatbot-conversation-id');
      const isOpen = localStorage.getItem('hg-chatbot-iframe-open');
      const pageHistory = localStorage.getItem('hg-page-history');
      
      return {
        hasSession: !!sessionData,
        conversationId: conversationId,
        isOpen: isOpen === 'true',
        sessionData: sessionData ? JSON.parse(sessionData) : null,
        pageHistory: pageHistory ? JSON.parse(pageHistory) : [],
        currentPage: window.location.href
      };
    } catch (error) {
      return { error: error.message };
    }
  };

  window.clearAllChatData = function() {
    localStorage.removeItem('hg-chatbot-session-data');
    localStorage.removeItem('hg-chatbot-conversation-id');
    localStorage.removeItem('hg-chatbot-iframe-open');
    localStorage.removeItem('hg-page-history');
    console.log('All chat data cleared. Refresh the page to start a fresh session.');
  };

  // Debug function to show session info
  window.debugChatSession = function() {
    const info = window.getChatSessionInfo();
    console.log('=== Chat Session Debug ===');
    console.log('Has Session:', info.hasSession);
    console.log('Conversation ID:', info.conversationId);
    console.log('Is Open:', info.isOpen);
    console.log('Current Page:', info.currentPage);
    console.log('Page History:', info.pageHistory);
    console.log('Session Data:', info.sessionData);
    console.log('========================');
    return info;
  };

  // Auto-initialize function that can be called from any page
  window.initBot = function() {
    // Check if React is available
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
      console.error('Bot requires React and ReactDOM to be loaded first');
      return;
    }

    // Create or find bot container
    let botContainer = document.getElementById('bot-container');
    if (!botContainer) {
      botContainer = document.createElement('div');
      botContainer.id = 'bot-container';
      document.body.appendChild(botContainer);
    }

    // Render the bot
    const root = ReactDOM.createRoot ? ReactDOM.createRoot(botContainer) : null;
    if (root) {
      root.render(React.createElement(window.ChatBot));
    } else {
      // Fallback for older React versions
      ReactDOM.render(React.createElement(window.ChatBot), botContainer);
    }
  };

  // Auto-initialize if DOM is ready and React is available
  function autoInit() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', autoInit);
      return;
    }
    
    if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
      window.initBot();
    }
  }

  // Try to auto-initialize
  autoInit();

})();
