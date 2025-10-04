import React, { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
import { MOCK_DATA, searchData, type SearchResults } from '../data/mockData';
import type { Course, NewsArticle, AppInfo } from '../types';
import type { Service, Product } from '../data/mockData';

// Estado de la aplicación
interface AppState {
  // Datos
  courses: Course[];
  services: Service[];
  products: Product[];
  news: NewsArticle[];
  apps: AppInfo[];
  
  // UI State
  activePage: string;
  isSearchOpen: boolean;
  searchQuery: string;
  searchResults: SearchResults;
  
  // Mobile
  isMobileMenuOpen: boolean;
}

// Acciones
type AppAction =
  | { type: 'SET_ACTIVE_PAGE'; payload: string }
  | { type: 'TOGGLE_SEARCH_MODAL' }
  | { type: 'CLOSE_SEARCH_MODAL' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'PERFORM_SEARCH'; payload: string }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'CLOSE_MOBILE_MENU' };

// Estado inicial
const initialState: AppState = {
  courses: MOCK_DATA.courses,
  services: MOCK_DATA.services,
  products: MOCK_DATA.products,
  news: MOCK_DATA.news,
  apps: MOCK_DATA.apps,
  activePage: 'Panel',
  isSearchOpen: false,
  searchQuery: '',
  searchResults: {
    courses: [],
    services: [],
    products: [],
    news: [],
  },
  isMobileMenuOpen: false,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_ACTIVE_PAGE':
      return {
        ...state,
        activePage: action.payload,
        isMobileMenuOpen: false, // Cerrar menú móvil al navegar
      };
    
    case 'TOGGLE_SEARCH_MODAL':
      return {
        ...state,
        isSearchOpen: !state.isSearchOpen,
      };
    
    case 'CLOSE_SEARCH_MODAL':
      return {
        ...state,
        isSearchOpen: false,
      };
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    
    case 'PERFORM_SEARCH':
      const searchResults = searchData(action.payload);
      return {
        ...state,
        searchQuery: action.payload,
        searchResults,
        activePage: 'Resultados de Búsqueda',
        isSearchOpen: false,
      };
    
    case 'TOGGLE_MOBILE_MENU':
      return {
        ...state,
        isMobileMenuOpen: !state.isMobileMenuOpen,
      };
    
    case 'CLOSE_MOBILE_MENU':
      return {
        ...state,
        isMobileMenuOpen: false,
      };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Hooks específicos para mejor performance
export const useAppState = () => {
  const { state } = useApp();
  return state;
};

export const useAppDispatch = () => {
  const { dispatch } = useApp();
  return dispatch;
};

// Selectores memoizados para evitar re-renders innecesarios
export const useCourses = () => {
  const { state } = useApp();
  return useMemo(() => state.courses, [state.courses]);
};

export const useServices = () => {
  const { state } = useApp();
  return useMemo(() => state.services, [state.services]);
};

export const useProducts = () => {
  const { state } = useApp();
  return useMemo(() => state.products, [state.products]);
};

export const useNews = () => {
  const { state } = useApp();
  return useMemo(() => state.news, [state.news]);
};

export const useApps = () => {
  const { state } = useApp();
  return useMemo(() => state.apps, [state.apps]);
};

export const useSearchResults = () => {
  const { state } = useApp();
  return useMemo(() => state.searchResults, [state.searchResults]);
};

export const useUIState = () => {
  const { state } = useApp();
  return useMemo(() => ({
    activePage: state.activePage,
    isSearchOpen: state.isSearchOpen,
    searchQuery: state.searchQuery,
    isMobileMenuOpen: state.isMobileMenuOpen,
  }), [state.activePage, state.isSearchOpen, state.searchQuery, state.isMobileMenuOpen]);
};
