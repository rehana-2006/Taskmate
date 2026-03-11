import { RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Router from './Routes/Router'
import MainLayout from './MainLayout/MainLayout'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import CreateProject from './pages/CreateProject'
import CreateTask from './pages/CreateTask'
import ProjectCountCard from './components/ProjectCountCard'
import ProjectCard from './components/ProjectCard'


function App() {
  return(
    <div>
      <RouterProvider router={Router} />
    </div>
  )
}

export default App
