import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginRegister from "./components/loginRegister/LoginRegister";
import ErrorPage from "./components/errorPage/ErrorPage";
import CompleteProfile from "./components/completeProfile/CompleteProfile";
import FacultyPage from "./components/facultyPage/FacultyPage";
import AdminPage from "./components/adminPage/AdminPage";

function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <LoginRegister></LoginRegister>,
      errorElement: <ErrorPage></ErrorPage>,
    },
    // {
    //   path: "/CompleteProfile",
    //   element: <CompleteProfile></CompleteProfile>,
    // },
    {
      path: "/FacultyPage",
      element: <FacultyPage />,
    },
    {
      path: "/AdminPage",
      element: <AdminPage />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
