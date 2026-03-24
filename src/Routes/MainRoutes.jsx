import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../MainLayout/MainLayout";
import Project from "../pages/Project";
import MyTasks from "../pages/MyTasks";
import KanbanBoard from "../pages/KanbanBoard";
import ViewProject from "../pages/ViewProject";
import CreateProject from "../pages/CreateProject";
import CreateTask from "../pages/CreateTask";
import ProtectedRoute from "../components/ProtectedRoute";
import Team from "../pages/Team";
import Settings from "../pages/Settings";

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
    {
      path: "/viewproject",
      element: <ViewProject />,
    },
    {
      path: "/create-project",
      element: (
        <ProtectedRoute allowedRoles={["project_manager"]}>
          <CreateProject />
        </ProtectedRoute>
      ),
    },
    {
      path: "/create-task",
      element: (
        <ProtectedRoute allowedRoles={["project_manager"]}>
          <CreateTask />
        </ProtectedRoute>
      ),
    },
    {
      path: "/team",
      element: <Team />,
    },
    {
      path: "/settings",
      element: <Settings />,
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
