import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginRegister from "./components/loginRegister/LoginRegister";
import ErrorPage from "./components/errorPage/ErrorPage";
import FacultyRootLayout from './components/facultyRootLayout/FacultyRootLayout'
import AdminProfile from './components/adminProfile/AdminProfile'

function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <LoginRegister></LoginRegister>,
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/FacultyRootLayout",
      element: <FacultyRootLayout />,
    },
    {
      path: "/AdminProfile",
      element: <AdminProfile />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
