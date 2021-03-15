let debounceTimeout: NodeJS.Timeout | undefined;
const debounce = (callback: any, timeout: number) => (...args: any) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
    debounceTimeout = undefined;
  }

  debounceTimeout = setTimeout(() => {
    callback(...args);
    debounceTimeout = undefined;
  }, timeout);
};

export default debounce;