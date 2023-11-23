import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Body from './Components/Body';
import HomePage from './Components/HomePage';
import OnBoardComponent from './Components/OnBoardComponent';
import ProtectedRoutes from './Components/ProtectedRoutes';
import SignInComponent from './Components/SignInComponent';
import TaskDetail from "./Components/TaskDetail";
import TaskForm from './Components/TaskForm';
import "./index.css";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/signin",
        element: <SignInComponent />
      },
      {
        path: "/onboarduser",
        element: <OnBoardComponent />
      },
      {
        path: "/homepage",
        element: <HomePage />
      },
      {
        path: "/taskdetail",
        element: <TaskDetail />
      },
      {
        path: "/addtask",
        element: <TaskForm />
      },
    ]
  }
])

function App() {



  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoutes />}>
            <Route path='/' element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </div>
  );
}

export default App;