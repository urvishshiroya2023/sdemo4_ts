import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Body from './Components/Body';
import HomePage from './Components/HomePage';
import OnBoardForm from './Components/OnBoardForm';
import SignInForm from './Components/SignInForm';
import "./index.css";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <SignInForm />
      },
      {
        path: "/onboarduser",
        element: <OnBoardForm />
      },
      {
        path: "/homepage",
        element: <HomePage />
      },
    ]
  }
])

function App() {
  return (
    <div className="">
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </div>
  );
}

export default App;