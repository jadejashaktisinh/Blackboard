import React from 'react';

interface LoaderProps {
    isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
               
            </div>
        </div>
    );
};

// Global loader state management
let loaderInstance: { setLoading?: (isLoading: boolean) => void } = {};

export const showLoader = () => {
    if (loaderInstance.setLoading) {
        loaderInstance.setLoading(true);
    }
};

export const hideLoader = () => {
    if (loaderInstance.setLoading) {
        loaderInstance.setLoading(false);
    }
};

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        loaderInstance.setLoading = setIsLoading;
        return () => {
            loaderInstance.setLoading = undefined;
        };
    }, []);

    return (
        <>
            {children}
            <Loader isLoading={isLoading} />
        </>
    );
};

export default Loader; 