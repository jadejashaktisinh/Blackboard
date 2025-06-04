import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/Navbar";
import { IsOpen } from "./Contex/IsOpen";
import { useEffect, useState } from "react";
import { AuthenticationContext } from "./Contex/AuthenticationContext";
import { hideLoader, LoaderProvider, showLoader } from "./utils/loader";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel:"stylesheet",
    href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  },
  {
    rel:'icon',
    href:"https://kit.fontawesome.com/c42195777b.js"
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => setIsOpen(!isOpen);
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const currentPath = window.location.pathname;
      const userId = localStorage.getItem('_id');
      
      
      if (!userId && currentPath !== '/login' && currentPath !== '/signup') {
        window.location.href = '/login';
        return;
      }
      
      
      if (userId && (currentPath === '/login' || currentPath === '/signup')) {
        window.location.href = '/classes';
        return;
      }
    };

    checkAuth();
  }, [flag]);

  return(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <LoaderProvider>
          <AuthenticationContext>
            <IsOpen.Provider value={isOpen}>
             
                <Navbar set={handleClick} setFlag={setFlag} flag={flag} />
                
                  <Outlet context={{flag, setFlag }} />
                
            
            </IsOpen.Provider>
          </AuthenticationContext>
        </LoaderProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {

  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
