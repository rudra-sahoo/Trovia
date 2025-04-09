import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
import { Header } from "./components/Header/Header";
import Authentication from "./pages/Authentication";
import { AuthProvider } from "./contexts/AuthContext";
import Contact from './pages/Contact';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main> {/* Remove the pt-16 padding */}
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
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
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
