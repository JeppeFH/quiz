import { useRoutes } from "react-router-dom";

/* Import Components */
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

/* Import Pages */
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import QRCodeGenerator from "./pages/qRCodeGenerator/QRCodeGenerator";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/qrcode", element: <QRCodeGenerator /> },
    {
      path: `/quiz/:id`,
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
