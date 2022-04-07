export const useToken = () => {
  const getToken = () => {
    return localStorage.getItem('AUTH_TOKEN') ?? '';
  };

  const setToken = async (tokenToSave: string) => {
    localStorage.setItem('AUTH_TOKEN', tokenToSave ?? '');
  };

  const removeToken = async () => {
    localStorage.removeItem('AUTH_TOKEN');
  };

  return { getToken, setToken, removeToken };
};
