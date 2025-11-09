export const lightTheme = {
  name: 'light',
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    secondary: '#8b5cf6',
    background: '#ffffff',
    backgroundSecondary: '#f8fafc',
    surface: '#ffffff',
    surfaceHover: '#f1f5f9',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    shadow: 'rgba(0, 0, 0, 0.1)',
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
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
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
    primary: '#3b82f6',
    primaryHover: '#60a5fa',
    secondary: '#a78bfa',
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    surface: '#1e293b',
    surfaceHover: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export type Theme = typeof lightTheme;
