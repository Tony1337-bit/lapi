import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Box, BookOpen, Layers, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { NavItem } from '../types';

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect, isOpen, onToggle }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'getting-started': true,
    'modules': true,
    'resources': false
  });

  const toggleGroup = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const NavItemRenderer = ({ item, level = 0 }: { item: NavItem, level?: number }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded[item.id];
    const isActive = activeId === item.id;
    
    // Icon selection logic based on ID for top-level items
    let Icon = null;
    if (level === 0) {
        if (item.id === 'getting-started') Icon = BookOpen;
        else if (item.id === 'modules') Icon = Box;
        else Icon = Layers;
    }

    return (
      <div className="mb-1">
        <button
          onClick={() => hasChildren ? toggleGroup(item.id) : onSelect(item.id)}
          className={`
            w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200
            ${isActive ? 'bg-brand-accent/20 text-indigo-300 border border-brand-accent/20' : 'text-gray-400 hover:text-white hover:bg-glass-200'}
            ${level > 0 ? 'pl-10 text-sm' : 'font-medium'}
          `}
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon size={16} className={isActive ? 'text-indigo-400' : 'text-gray-500'} />}
            <span>{item.label}</span>
          </div>
          {hasChildren && (
            <span className="text-gray-600">
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-0.5">
            {item.children?.map(child => (
              <NavItemRenderer key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={onToggle}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-brand-accent rounded-full shadow-xl shadow-indigo-500/40 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-72 bg-[#050507]/90 backdrop-blur-xl border-r border-glass-border
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-glass-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
                L
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white">LAPI</h1>
                <p className="text-xs text-gray-500">Lua API Wrapper</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {NAV_ITEMS.map(item => (
              <NavItemRenderer key={item.id} item={item} />
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-glass-border">
            <div className="p-3 rounded-lg bg-glass-200 border border-glass-border">
              <p className="text-xs text-gray-400 mb-2">Current Version</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-indigo-300">v1.0.0-stable</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};