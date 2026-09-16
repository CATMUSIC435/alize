import { create } from 'zustand';

type UIState = {
  headerTheme: 'light' | 'dark';
  activeSection: string;
  isMenuOpen: boolean;
  isIntroComplete: boolean;
  heroMode: 'day' | 'night';
  setHeaderTheme: (theme: 'light' | 'dark') => void;
  setActiveSection: (section: string) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  setIsIntroComplete: (isComplete: boolean) => void;
  setHeroMode: (mode: 'day' | 'night') => void;
};

export const useUIStore = create<UIState>((set) => ({
  headerTheme: 'light',
  activeSection: 'hero',
  isMenuOpen: false,
  isIntroComplete: false,
  heroMode: 'day',
  setHeaderTheme: (theme) => {
    set({ headerTheme: theme });
  },
  setActiveSection: (section) => {
    set({ activeSection: section });
  },
  setIsMenuOpen: (isOpen) => {
    set({ isMenuOpen: isOpen });
  },
  setIsIntroComplete: (isComplete) => {
    set({ isIntroComplete: isComplete });
  },
  setHeroMode: (mode) => {
    set({ heroMode: mode });
  },
}));
