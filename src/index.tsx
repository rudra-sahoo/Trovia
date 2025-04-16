import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LandingPage } from "./screens/LandingPage";
import { Header } from "./components/Header/Header";
import { Account } from "./pages/Account/Account";
import Authentication from "./pages/Authentication/Authentication";
import Contact from './pages/Contact';
import AuthCallback from './pages/Authentication/AuthCallback';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/auth",
          element: <Authentication />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        // Add a catch-all route for client-side routing in production
        {
          path: "*",
          element: <LandingPage />,
        }
      ],
    },
    {
      path: "/auth/callback",
      element: <AuthCallback />,
    },
  ],
  {
    future: { 
      v7_relativeSplatPath: true,
    },
    basename: "/",
  }
);

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
