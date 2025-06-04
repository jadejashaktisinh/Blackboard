import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('_id');
        if (userId) {
            navigate('/classes', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    // Return null or a loading indicator while redirecting
    return null;
} 