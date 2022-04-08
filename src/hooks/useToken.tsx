export const useToken = () => {
  const getToken = () => {
    return localStorage.getItem('AUTH_TOKEN') ?? '';
  };

  const setToken = (tokenToSave: string) => {
    localStorage.setItem('AUTH_TOKEN', tokenToSave ?? '');
  };

  const removeToken = () => {
    localStorage.removeItem('AUTH_TOKEN');
  };

  return { getToken, setToken, removeToken };
};
