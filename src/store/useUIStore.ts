import { create } from 'zustand';

type UIState = {
  headerTheme: 'light' | 'dark';
  activeSection: string;
  isMenuOpen: boolean;
  setHeaderTheme: (theme: 'light' | 'dark') => void;
  setActiveSection: (section: string) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  headerTheme: 'light',
  activeSection: 'hero',
  isMenuOpen: false,
  setHeaderTheme: (theme) => {
    set({ headerTheme: theme });
  },
  setActiveSection: (section) => {
    set({ activeSection: section });
  },
  setIsMenuOpen: (isOpen) => {
    set({ isMenuOpen: isOpen });
  },
}));
