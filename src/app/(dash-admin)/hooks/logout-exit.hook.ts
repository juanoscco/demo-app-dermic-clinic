import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useLogoutMutation } from '@/app/(auth)/services/authApi';

export default function LogoutExitHook() {
    const [logout, { isLoading }] = useLogoutMutation();
    const router = useRouter();
    const handleLogout = async () => {
      await logout()
      Cookies.remove('token');
      router.push('/')
    }
    
    return {
        handleLogout, isLoading
    }
}
