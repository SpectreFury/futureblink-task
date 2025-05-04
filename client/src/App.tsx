import { createBrowserRouter, RouterProvider } from "react-router";

import HeroPage from "./pages/hero-page";
import DashboardPage from "./pages/dashboard-page";
import SequencePage from "./pages/sequence-page";

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
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
