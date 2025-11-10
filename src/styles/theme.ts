export const lightTheme = {
  name: 'light',
  colors: {
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    secondary: '#ec4899',
    background: 'linear-gradient(180deg, #f3e8ff 0%, #fce7f3 100%)',
    backgroundSecondary: '#faf5ff',
    surface: '#ffffff',
    surfaceHover: '#f3e8ff',
    text: '#4c1d95',
    textSecondary: '#7c3aed',
    border: '#e9d5ff',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#8b5cf6',
    shadow: 'rgba(139, 92, 246, 0.15)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
};

export const darkTheme = {
  ...lightTheme,
  name: 'dark',
  colors: {
    primary: '#a78bfa',
    primaryHover: '#c4b5fd',
    secondary: '#f472b6',
    background: 'linear-gradient(180deg, #1e1046 0%, #2d1b69 100%)',
    backgroundSecondary: '#2d1b69',
    surface: 'rgba(61, 47, 122, 0.6)',
    surfaceHover: 'rgba(72, 55, 109, 0.8)',
    text: '#f3e8ff',
    textSecondary: '#c4b5fd',
    border: 'rgba(167, 139, 250, 0.2)',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#a78bfa',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },
};

export type Theme = typeof lightTheme;
