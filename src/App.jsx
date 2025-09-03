import { useRoutes } from "react-router-dom";

/* Import Components */

/* Import Pages */
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "/quiz",
      element: (
        <ProtectedRoute requireUser>
          <Quiz />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div className="app">
      <div className="content">{routes}</div>
    </div>
  );
}

export default App;
