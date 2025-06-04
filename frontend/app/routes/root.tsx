import { useEffect } from 'react';

export default function Root() {
    useEffect(() => {
        const userId = localStorage.getItem('_id');
        window.location.href = userId ? '/classes' : '/login';
    }, []);

    return null;
} 