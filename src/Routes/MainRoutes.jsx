import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../MainLayout/MainLayout";
import App from "../App";
import Project from "../pages/Project";
import MyTasks from "../pages/MyTasks";
import KanbanBoard from "../pages/KanbanBoard";

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/projects",
      element: <Project />,
    },
    {
      path: "/mytasks",
      element: <MyTasks />,
    },
    {
      path: "/board",
      element: <KanbanBoard />,
    },
  ],
};

export default MainRoutes;
// const MainRoutes={
//     path:"/",
//     element:<MainRoutes/>,
//     children:[
//         {
//             path:"/applyleave",
//             element:<ApplyLeave/>
//         },
//         {
//             path:"/myattendance",
//             element:<MyAttendance/>
//         },
//         {
//             path:"/myprofile",
//             element:<MyProfile/>
//         }
//     ]
// }

// export default MainRoutes;
