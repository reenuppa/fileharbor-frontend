import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter, NextRouter } from 'next/router';

// Define the User interface with your required properties
export interface User {
  id: number;
  firstname: string;
  lastname:string;
  email: string;
  token: string; // Adjust the type as needed
}

export const getUserFromLocalStorage = (): User | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

const setUserToLocalStorage = (userData: User) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

const clearUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

const headersList = {
  "Accept": "*/*",
};

export function useAuthSession(router: NextRouter) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    setUserToLocalStorage(userData);
    checkUserAuthenticated(router);
  };

  const logout = () => {
    setUser(null);
    clearUserFromLocalStorage();
    checkUserAuthenticated(router);
  };

  // Check user authentication on component mount
  useEffect(() => {
    checkUserAuthenticated(router);
  }, [router]);

  return { user, login, logout };
}

export const checkUserAuthenticated = async (router: NextRouter) => {
  try {
    var token = '';

    if (typeof window !== 'undefined') {
      if (!router) {
        const router = useRouter();
      }
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      token = user?.token;
    }

    if (token) {
      const headersWithToken = {
        ...headersList,
        "Authorization": `Bearer ${token}`
      };

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getuser`, {
        headers: headersWithToken
      });

      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          router.push('/signin'); // Redirect to login page if unauthorized
        }
      } else if (response.status === 404) {
        // Handle the 404 error if needed
      } else if (response.status === 200) {
        if (typeof window !== 'undefined') {
          const currentPathname = router.pathname;
          if (currentPathname === '/signin' || currentPathname === '/register') {
            router.push('/dashboard');
          }
        }
      }
    } else {
      if (typeof window !== 'undefined') {
        router.push('/signin'); // Redirect to login page if no token
      }
    }
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.error(error);
      router.push('/signin'); // Redirect to login page if there is an error
    }
  }
};

export function useSessionExpiration() {
  const [isActive, setIsActive] = useState(true);

  const resetSession = () => {
    setIsActive(true);
  };

  useEffect(() => {
    let timeoutId: any;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsActive(false);
      } else {
        resetSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    timeoutId = setTimeout(() => {
      setIsActive(false);
    }, 20 * 60 * 1000); // 20 minutes in milliseconds

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isActive;
}
