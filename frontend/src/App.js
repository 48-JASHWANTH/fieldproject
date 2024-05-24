import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginRegister from './components/loginRegister/LoginRegister';
import ErrorPage from './components/errorPage/ErrorPage';
import CompleteProfile from './components/completeProfile/CompleteProfile';
import FacultyPage from './components/facultyPage/FacultyPage';
import AdminPage from './components/adminPage/AdminPage';
import BasicInfo from './components/profileForms/BasicInfo';
import Education from './components/profileForms/Education';
import Publications from './components/profileForms/Publications';
import Authors from './components/profileForms/Authors';
import Nomination from './components/profileForms/Nomination';
import Patents from './components/profileForms/Patents';
import Projects from './components/profileForms/Projects';
import FacultyProfile from './components/facultyProfile/FacultyProfile';
import FacultyInfo from './components/facultyInfo/FacultyInfo';
import ApiTemp from './components/others/ApiTemp'
import AppraisalTemp from './components/others/AppraisalTemp'
import BookChaptersTemp from './components/others/BookChaptersTemp'
import BooksTemp from './components/others/BooksTemp'
import CollaborationTemp from './components/others/CollaborationTemp'
import ConsultancyTemp from './components/others/ConsultancyTemp'
import FundedProjectsTemp from './components/others/FundedProjectsTemp'
import NotificationTemp from './components/others/NotificationTemp'
import PatentsTemp from './components/others/NotificationTemp';
import PublicationsTemp from './components/others/PublicationsTemp';

function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <LoginRegister />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/FacultyPage",
      element: <FacultyPage />,
      children: [
        {
          path: "CompleteProfile",
          element: <CompleteProfile />,
          children: [
            {
              path: "BasicInfo",
              element: <BasicInfo />,
            },
            {
              path: "Education",
              element: <Education />,
            },
            {
              path: "Publications",
              element: <Publications />,
            },
            {
              path: "Projects",
              element: <Projects />,
            },
            {
              path: "Patents",
              element: <Patents />,
            },
            {
              path: "Nomination",
              element: <Nomination />,
            },
            {
              path: "Authors",
              element: <Authors />,
            },
            {
              path: "",
              element: <Navigate to="BasicInfo" />,
            },
          ],
        },
        {
          path: "FacultyInfo",
          element: <FacultyInfo />,
          children: [
            {
              path: "FacultyProfile",
              element: <FacultyProfile />,
            },
            {
              path:"PublicationsTemp",
              element:<PublicationsTemp></PublicationsTemp>,
            },
            {
              path:"PatentsTemp",
              element:<PatentsTemp></PatentsTemp>
            },
            {
              path:"BookChaptersTemp",
              element:<BookChaptersTemp></BookChaptersTemp>
            },
            {
              path:"BooksTemp",
              element:<BooksTemp></BooksTemp>
            },
            {
              path:"FundedProjectsTemp",
              element:<FundedProjectsTemp/>
            },
            {
              path:"ConsultancyTemp",
              element:<ConsultancyTemp></ConsultancyTemp>
            },
            {
              path:"ApiTemp",
              element:<ApiTemp></ApiTemp>
            },
            {
              path:"CollaborationTemp",
              element:<CollaborationTemp></CollaborationTemp>
            },
            {
              path:"AppraisalTemp",
              element:<AppraisalTemp></AppraisalTemp>
            },
            {
              path:"NotificationTemp",
              element:<NotificationTemp></NotificationTemp>
            },
            {
              path:"",
              element: <Navigate to = 'FacultyProfile'/>
            }
          ],
        },
        {
          path: "",
          element: <Navigate to="CompleteProfile/BasicInfo" />,
        },
      ],
    },
    {
      path: "AdminPage",
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
