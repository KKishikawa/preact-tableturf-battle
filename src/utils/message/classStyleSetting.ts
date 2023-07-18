export type MessageClass = {
  bodyClass: string;
  icon: string;
  dismiss: string;
};
export const messageClass: {
  info: MessageClass;
  error: MessageClass;
  success: MessageClass;
  warn: MessageClass;
} = {
  info: {
    bodyClass: 'text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300',
    icon: 'fa-solid fa-circle-info',
    dismiss:
      'bg-gray-100 w-8 text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
  },
  error: {
    bodyClass: 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800',
    icon: 'fa-solid fa-circle-xmark',
    dismiss:
      'bg-red-100 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300',
  },
  success: {
    bodyClass:
      'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800',
    icon: 'fa-solid fa-circle-check',
    dismiss:
      'bg-green-100 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300',
  },
  warn: {
    bodyClass:
      'text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800',
    icon: 'fa-solid fa-circle-exclamation',
    dismiss:
      'bg-yellow-100 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300',
  },
};

export const closeMessageClass = '-translate-y-full opacity-0 max-h-0';
