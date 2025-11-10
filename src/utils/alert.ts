import Swal from 'sweetalert2';

// Get current theme from localStorage
const getCurrentTheme = (): 'light' | 'dark' => {
  const theme = localStorage.getItem('theme');
  return theme === 'dark' ? 'dark' : 'light';
};

// SweetAlert2 configuration based on theme
const getSwalConfig = () => {
  const isDark = getCurrentTheme() === 'dark';

  return {
    background: isDark ? '#1a1d29' : '#ffffff',
    color: isDark ? '#e8e9ed' : '#2c3e50',
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280',
  };
};

export const showSuccess = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    ...getSwalConfig(),
  });
};

export const showError = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonText: 'OK',
    ...getSwalConfig(),
  });
};

export const showWarning = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonText: 'OK',
    ...getSwalConfig(),
  });
};

export const showInfo = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'info',
    title,
    text,
    confirmButtonText: 'OK',
    ...getSwalConfig(),
  });
};

export const showConfirm = async (
  title: string,
  text?: string,
  confirmButtonText = 'Yes',
  cancelButtonText = 'Cancel'
): Promise<boolean> => {
  const result = await Swal.fire({
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    ...getSwalConfig(),
  });

  return result.isConfirmed;
};

export const showDeleteConfirm = async (
  itemName: string,
  customMessage?: string
): Promise<boolean> => {
  return showConfirm(
    'Are you sure?',
    customMessage || `Do you want to delete "${itemName}"? This action cannot be undone.`,
    'Yes, delete it',
    'Cancel'
  );
};

export const showLoading = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
    ...getSwalConfig(),
  });
};

export const closeAlert = () => {
  Swal.close();
};

export const toast = {
  success: (message: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
      ...getSwalConfig(),
    });

    return Toast.fire({
      icon: 'success',
      title: message,
    });
  },

  error: (message: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      ...getSwalConfig(),
    });

    return Toast.fire({
      icon: 'error',
      title: message,
    });
  },

  info: (message: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      ...getSwalConfig(),
    });

    return Toast.fire({
      icon: 'info',
      title: message,
    });
  },

  warning: (message: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      ...getSwalConfig(),
    });

    return Toast.fire({
      icon: 'warning',
      title: message,
    });
  },
};
