// import { RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
// import Router from './Routes/Router'
import MainLayout from './MainLayout/MainLayout'
import Dashboard from './pages/Dashboard'
import Signup from './components/Signup'
import CreateProject from './components/project/CreateProject'


function App() {
  return(
    <div>
      {/* <MainLayout/> */}
      {/* <Dashboard/> */}
      {/* <Login/> */}
      {/* <Signup/> */}
      <CreateProject/>
      {/* <RouterProvider router={Router}/> */}
    </div>
  )
}

export default App
