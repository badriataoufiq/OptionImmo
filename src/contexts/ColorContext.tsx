import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ColorPreferences {
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
}

interface ColorContextType {
  colors: ColorPreferences;
  updateColors: (colors: Partial<ColorPreferences>) => Promise<void>;
  resetColors: () => Promise<void>;
}

const defaultColors: ColorPreferences = {
  primaryColor: '#14b8a6',
  backgroundColor: '#0f172a',
  accentColor: '#06b6d4',
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

// Applique les variables CSS au document
function applyColors(colors: ColorPreferences) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', colors.primaryColor);
  root.style.setProperty('--color-background', colors.backgroundColor);
  root.style.setProperty('--color-accent', colors.accentColor);
}

export function ColorProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<ColorPreferences>(defaultColors);

  useEffect(() => {
    loadColors();
  }, []);

  // Charge les couleurs depuis le localStorage (plus besoin de Supabase)
  function loadColors() {
    const savedColors = localStorage.getItem('user_color_preferences');
    
    if (savedColors) {
      const loadedColors = JSON.parse(savedColors);
      setColors(loadedColors);
      applyColors(loadedColors);
    } else {
      applyColors(defaultColors);
    }
  }

  // Sauvegarde les couleurs localement
  async function updateColors(newColors: Partial<ColorPreferences>) {
    const updatedColors = { ...colors, ...newColors };
    
    localStorage.setItem('user_color_preferences', JSON.stringify(updatedColors));
    setColors(updatedColors);
    applyColors(updatedColors);
  }

  async function resetColors() {
    localStorage.removeItem('user_color_preferences');
    setColors(defaultColors);
    applyColors(defaultColors);
  }

  return (
    <ColorContext.Provider value={{ colors, updateColors, resetColors }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColors() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColors must be used within ColorProvider');
  }
  return context;
}