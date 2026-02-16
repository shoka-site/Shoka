import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            setLocation('/admin/login');
        }
    }, [isAuthenticated, setLocation]);

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
