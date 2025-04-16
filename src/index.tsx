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
// Import new pages
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';
import HelpCenter from './pages/Support/HelpCenter';

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
      path: "/auth/callback",
      element: <AuthCallback />,
    },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "auth",
          element: <Authentication />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "account",
          element: <Account />,
        },
        // Legal and support pages with explicit paths
        {
          path: "privacy",
          element: <PrivacyPolicy />,
        },
        {
          path: "terms",
          element: <TermsOfService />,
        },
        {
          path: "help",
          element: <HelpCenter />,
        },
        // Keep this last - catch-all route for client-side routing in production
        {
          path: "*",
          element: <LandingPage />,
        }
      ],
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
