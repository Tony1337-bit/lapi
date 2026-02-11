import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DocViewer } from './components/DocViewer';
import { DOCS_DATA } from './constants';
import { Search } from 'lucide-react';

export default function App() {
  const [activeDocId, setActiveDocId] = useState<string>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavSelect = (id: string) => {
    if (DOCS_DATA[id]) {
      setActiveDocId(id);
      setIsSidebarOpen(false); // Close mobile sidebar on selection
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              <div className="flex-1 flex items-center max-w-lg">
                <div className="relative w-full group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documentation..."
                    className="
                      block w-full pl-10 pr-3 py-2 
                      bg-glass-200 border border-glass-border rounded-lg
                      text-gray-300 placeholder-gray-600
                      focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50
                      transition-all text-sm
                    "
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                     <span className="text-xs text-gray-600 bg-glass-300 px-1.5 py-0.5 rounded border border-glass-border">⌘K</span>
                  </div>
                </div>
              </div>

              <div className="ml-4 flex items-center gap-4">
                <button className="hidden sm:block text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  API Reference
                </button>
                <a 
                  href="#" 
                  className="hidden sm:flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  Download
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="px-4 py-8 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <DocViewer data={activeDoc} />
        </div>
      </main>
    </div>
  );
}