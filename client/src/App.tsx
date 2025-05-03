import { createBrowserRouter, RouterProvider } from "react-router";

import HeroPage from "./pages/hero-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
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
