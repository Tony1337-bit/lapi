import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { DocViewer } from './components/DocViewer';
import { DOCS_DATA, NAV_ITEMS } from './constants';
import { Search, X } from 'lucide-react';
import { SearchResult } from './types';

export default function App() {
  const [activeDocId, setActiveDocId] = useState<string>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleNavSelect = (id: string) => {
    if (DOCS_DATA[id]) {
      setActiveDocId(id);
      setIsSidebarOpen(false);
      setShowSearchResults(false);
      setSearchQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    Object.entries(DOCS_DATA).forEach(([id, section]) => {
      let relevanceScore = 0;
      let preview = '';

      // Check title
      if (section.title.toLowerCase().includes(lowerQuery)) {
        relevanceScore += 10;
        preview = section.title;
      }

      // Check description
      if (section.description?.toLowerCase().includes(lowerQuery)) {
        relevanceScore += 5;
        preview = section.description;
      }

      // Search through blocks
      section.blocks.forEach((block) => {
        if (block.type === 'text' && block.content.toLowerCase().includes(lowerQuery)) {
          relevanceScore += 3;
          if (!preview) {
            // Extract plain text from HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = block.content;
            preview = tempDiv.textContent || tempDiv.innerText || '';
          }
        } else if (block.type === 'code' && block.content.toLowerCase().includes(lowerQuery)) {
          relevanceScore += 2;
          if (!preview) preview = block.content;
        } else if (block.type === 'list') {
          block.items.forEach(item => {
            if (item.toLowerCase().includes(lowerQuery)) {
              relevanceScore += 2;
              if (!preview) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = item;
                preview = tempDiv.textContent || tempDiv.innerText || '';
              }
            }
          });
        }
      });

      if (relevanceScore > 0) {
        // Truncate preview
        if (preview.length > 100) {
          preview = preview.substring(0, 100) + '...';
        }

        results.push({
          id,
          title: section.title,
          preview: preview || section.description || 'No preview available',
          score: relevanceScore,
        });
      }
    });

    // Sort by relevance
    results.sort((a, b) => (b.score || 0) - (a.score || 0));
    setSearchResults(results.slice(0, 8)); // Limit to top 8 results
    setShowSearchResults(true);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
      if (e.key === 'Escape') {
        setShowSearchResults(false);
        setSearchQuery('');
        setShowDownloadModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeDoc = DOCS_DATA[activeDocId];

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Sidebar 
        activeId={activeDocId} 
        onSelect={handleNavSelect}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main className="lg:pl-72 min-h-screen transition-all duration-300">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#050507]/80 border-b border-glass-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center justify-between h-16">
              
              <div className="flex-1 flex items-center max-w-lg" ref={searchRef}>
                <div className="relative w-full group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                    placeholder="Search documentation..."
                    className="
                      block w-full pl-10 pr-20 py-2 
                      bg-glass-200 border border-glass-border rounded-lg
                      text-gray-300 placeholder-gray-600
                      focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50
                      transition-all text-sm
                    "
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setShowSearchResults(false);
                        }}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                    <span className="text-xs text-gray-600 bg-glass-300 px-1.5 py-0.5 rounded border border-glass-border">⌘K</span>
                  </div>
                </div>

                {/* Search Results Dropdown - SOLID BACKGROUND */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute left-4 right-100 top-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-[100]">
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.map((result, idx) => (
                        <button
                          key={result.id}
                          onClick={() => handleNavSelect(result.id)}
                          className="
                            w-full text-left px-4 py-3 
                            hover:bg-gray-800 transition-colors
                            border-b border-gray-700 last:border-b-0
                            focus:outline-none focus:bg-gray-800
                          "
                        >
                          <div className="font-medium text-white text-sm mb-1">
                            {result.title}
                          </div>
                          <div className="text-xs text-gray-400 line-clamp-2">
                            {result.preview}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results - SOLID BACKGROUND */}
                {showSearchResults && searchQuery && searchResults.length === 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-4 z-[100]">
                    <div className="text-center text-gray-400 text-sm">
                      No results found for "{searchQuery}"
                    </div>
                  </div>
                )}
              </div>

              <div className="ml-4 flex items-center gap-4">
                <button className="hidden sm:block text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  API Reference
                </button>
                <button 
                  onClick={() => setShowDownloadModal(true)}
                  className="hidden sm:flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="px-4 py-8 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <DocViewer data={activeDoc} />
        </div>
      </main>

      {/* Download Modal */}
      {showDownloadModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowDownloadModal(false)}
        >
          <div 
            className="bg-glass-100 border border-glass-border rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-glass-border flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Download LAPI</h3>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <p className="text-gray-300 text-sm">
                Choose your preferred download option:
              </p>

              {/* Download Options */}
              <div className="space-y-3">
                <a
                  href="/lapi.lua"
                  download="lapi.lua"
                  className="flex items-center justify-between p-4 bg-glass-200 hover:bg-glass-300 border border-glass-border rounded-lg transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium text-sm">Direct Download</div>
                    <div className="text-gray-400 text-xs mt-1">lapi.lua (Latest version)</div>
                  </div>
                  <svg className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>

                <a
                  href="https://github.com/Tony1337-bit/lapi/blob/main/lapi.lua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-glass-200 hover:bg-glass-300 border border-glass-border rounded-lg transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium text-sm">GitHub Repository</div>
                    <div className="text-gray-400 text-xs mt-1">View source & contribute</div>
                  </div>
                  <svg className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>

              {/* Info Box */}
              <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                <div className="flex gap-3">
                  <div className="text-indigo-400 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="font-medium text-white">Installation:</span> Place lapi.lua in your gamesense directory and require it in your script.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-glass-200 border-t border-glass-border flex justify-end">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
