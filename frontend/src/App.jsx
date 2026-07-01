import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import { QuizPage } from "./pages/Quiz/QuizPage";
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";
import ResultsPage from "./pages/Results/ResultsPage";

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
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
