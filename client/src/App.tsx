import { createBrowserRouter, RouterProvider } from "react-router";

import HeroPage from "./pages/hero-page";
import DashboardPage from "./pages/dashboard-page";
import SequencePage from "./pages/sequence-page";
import EmailEditor from "./pages/email-editor";
import { Toaster } from "./components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard/:id",
    element: <SequencePage />,
  },
  {
    path: "/email-editor",
    element: <EmailEditor />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  );
}

export default App;
