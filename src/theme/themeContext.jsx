// CityShield AI — Global Theme Context & Design Token Manager
// Supports Pop Light, Ocean, and Midnight Pop themes with persistent state.

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    subtitle: 'Navy, Teal & Cyan',
    type: 'dark',
    accentColor: '#00F0FF',
    previewBadge: 'bg-cyan-500'
  },
  'pop-light': {
    id: 'pop-light',
    name: 'Pop Light',
    subtitle: 'Off-White, Violet & Coral',
    type: 'light',
    accentColor: '#7C3AED',
    previewBadge: 'bg-violet-600'
  },
  'midnight-pop': {
    id: 'midnight-pop',
    name: 'Midnight Pop',
    subtitle: 'Charcoal, Lilac & Lime',
    type: 'dark',
    accentColor: '#A855F7',
    previewBadge: 'bg-lime-400'
  }
};

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('cityshield_theme');
      if (saved && THEMES[saved]) return saved;
    } catch (e) {
      // Fallback
    }
    return 'ocean'; // Default
  });

  const setTheme = (newTheme) => {
    if (THEMES[newTheme]) {
      setThemeState(newTheme);
      try {
        localStorage.setItem('cityshield_theme', newTheme);
      } catch (e) {
        console.error('Failed to save theme', e);
      }
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (THEMES[theme].type === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
