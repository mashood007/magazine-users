
import { useStore } from '@/utils/store';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface AuthGuardProps {
  children: ReactNode; // Define children prop explicitly
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // const localStorageData = window.localStorage.getItem('zustand_data');
  // const accessToken = useStore((state: any) => state.accessToken)



  let accessToken: any = null
  if (typeof window !== 'undefined') {
    const userHeaders = window.localStorage.getItem('zustand')
    const _userHeaders = JSON.parse(userHeaders || "{}")
    accessToken = _userHeaders.state?.accessToken
  }
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [accessToken, router]);

  return <>{children}</>;
};

export default AuthGuard;
