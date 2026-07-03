import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import { QuizPage } from "./pages/Quiz/QuizPage";
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";
import NotFound from "./pages/NotFound/NotFound";

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage />,
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        router={router}
      />
    </>
  );
}

export default App;
