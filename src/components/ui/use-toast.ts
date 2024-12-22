import { toast } from 'sonner';

export const useToast = () => {
  return {
    toast: {
      ...toast,
      error: (message: string) => toast.error(message),
      success: (message: string) => toast.success(message),
      warning: (message: string) => toast.warning(message),
      info: (message: string) => toast.info(message),
    },
  };
};