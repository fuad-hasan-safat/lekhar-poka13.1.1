import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useTabSyncAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if ((event.key === 'logout' && event.newValue === 'true') || 
          (event.key === 'login' && event.newValue === 'true')) {
        router.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  const triggerLogout = () => {
    localStorage.setItem('logout', 'true');
    localStorage.removeItem('logout'); // Clean up to avoid multiple reloads
  };

  const triggerLogin = () => {
    localStorage.setItem('login', 'true');
    localStorage.removeItem('login'); // Clean up to avoid multiple reloads
  };

  return { triggerLogout, triggerLogin };
};

export default useTabSyncAuth;
